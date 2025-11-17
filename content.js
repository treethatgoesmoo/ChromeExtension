// Content script for detecting and controlling media elements

let mediaElements = [];
let observer = null;

// Find all media elements (audio and video)
function findMediaElements() {
  const videos = Array.from(document.querySelectorAll('video'));
  const audios = Array.from(document.querySelectorAll('audio'));
  return [...videos, ...audios];
}

// Notify background script about media presence
function notifyMediaPresence() {
  mediaElements = findMediaElements();

  if (mediaElements.length > 0) {
    chrome.runtime.sendMessage({
      type: 'MEDIA_DETECTED',
      count: mediaElements.length
    }).catch(err => console.error('Error sending MEDIA_DETECTED:', err));
  } else {
    chrome.runtime.sendMessage({
      type: 'MEDIA_REMOVED'
    }).catch(err => console.error('Error sending MEDIA_REMOVED:', err));
  }
}

// Control media elements based on command
function controlMedia(command, value) {
  mediaElements = findMediaElements();

  mediaElements.forEach(media => {
    try {
      switch (command) {
        case 'play':
          media.play().catch(err => console.error('Play error:', err));
          break;

        case 'pause':
          media.pause();
          break;

        case 'toggle':
          if (media.paused) {
            media.play().catch(err => console.error('Play error:', err));
          } else {
            media.pause();
          }
          break;

        case 'volume':
          if (value !== undefined) {
            media.volume = Math.max(0, Math.min(1, value));
          }
          break;

        case 'volumeUp':
          media.volume = Math.min(1, media.volume + 0.1);
          break;

        case 'volumeDown':
          media.volume = Math.max(0, media.volume - 0.1);
          break;

        case 'mute':
          media.muted = true;
          break;

        case 'unmute':
          media.muted = false;
          break;

        case 'toggleMute':
          media.muted = !media.muted;
          break;

        case 'next':
          // Trigger next track (if supported by media controls API)
          if (media.fastSeek) {
            media.currentTime = Math.min(media.duration, media.currentTime + 10);
          } else if (media.duration) {
            media.currentTime = Math.min(media.duration, media.currentTime + 10);
          }
          // Also try to trigger next via keyboard event
          triggerMediaKey('nexttrack');
          break;

        case 'previous':
          // Trigger previous track
          if (media.currentTime > 3) {
            // If more than 3 seconds in, restart current track
            media.currentTime = 0;
          } else {
            // Otherwise go back 10 seconds
            media.currentTime = Math.max(0, media.currentTime - 10);
          }
          triggerMediaKey('previoustrack');
          break;

        case 'seek':
          if (value !== undefined && media.duration) {
            media.currentTime = value;
          }
          break;

        case 'seekForward':
          media.currentTime = Math.min(media.duration || media.currentTime + 10, media.currentTime + 10);
          break;

        case 'seekBackward':
          media.currentTime = Math.max(0, media.currentTime - 10);
          break;
      }
    } catch (err) {
      console.error('Error controlling media:', err);
    }
  });
}

// Trigger media key events for sites that use Media Session API
function triggerMediaKey(key) {
  if ('mediaSession' in navigator) {
    try {
      const event = new KeyboardEvent('keydown', {
        key: key,
        code: key,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    } catch (err) {
      console.error('Error triggering media key:', err);
    }
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'MEDIA_COMMAND') {
    controlMedia(request.command, request.value);
    sendResponse({ success: true });
  }
  return true;
});

// Set up mutation observer to detect dynamically added media elements
function setupObserver() {
  observer = new MutationObserver((mutations) => {
    let shouldCheck = false;

    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === 'VIDEO' || node.nodeName === 'AUDIO') {
            shouldCheck = true;
            break;
          }
          if (node.querySelectorAll) {
            const mediaInNode = node.querySelectorAll('video, audio');
            if (mediaInNode.length > 0) {
              shouldCheck = true;
              break;
            }
          }
        }
      }
    }

    if (shouldCheck) {
      notifyMediaPresence();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize
function init() {
  // Initial check for media elements
  notifyMediaPresence();

  // Set up observer for dynamic content
  if (document.body) {
    setupObserver();
  } else {
    // Wait for body to be available
    const bodyObserver = new MutationObserver(() => {
      if (document.body) {
        setupObserver();
        bodyObserver.disconnect();
      }
    });
    bodyObserver.observe(document.documentElement, { childList: true });
  }

  // Re-check periodically for media elements
  setInterval(notifyMediaPresence, 5000);
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

console.log('Universal Media Controller content script loaded');
