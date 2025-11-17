// Popup script for Universal Media Controller

let mediaTabs = [];
let currentVolume = 100;
let isMuted = false;

// Get references to UI elements
const elements = {
  playPauseBtn: document.getElementById('playPauseBtn'),
  previousBtn: document.getElementById('previousBtn'),
  nextBtn: document.getElementById('nextBtn'),
  volumeSlider: document.getElementById('volumeSlider'),
  volumeValue: document.getElementById('volumeValue'),
  volumeUpBtn: document.getElementById('volumeUpBtn'),
  volumeDownBtn: document.getElementById('volumeDownBtn'),
  muteBtn: document.getElementById('muteBtn'),
  seekForwardBtn: document.getElementById('seekForwardBtn'),
  seekBackBtn: document.getElementById('seekBackBtn'),
  refreshBtn: document.getElementById('refreshBtn'),
  tabList: document.getElementById('tabList'),
  tabCount: document.getElementById('tabCount'),
  playIcon: document.getElementById('playIcon'),
  pauseIcon: document.getElementById('pauseIcon'),
  volumeIcon: document.getElementById('volumeIcon'),
  mutedIcon: document.getElementById('mutedIcon')
};

// Send media control command to all tabs
function sendMediaCommand(command, value = undefined) {
  chrome.runtime.sendMessage({
    type: 'CONTROL_MEDIA',
    command: command,
    value: value
  }, response => {
    if (chrome.runtime.lastError) {
      console.error('Error sending command:', chrome.runtime.lastError);
    }
  });
}

// Update the tab list display
function updateTabList() {
  chrome.runtime.sendMessage({ type: 'GET_MEDIA_TABS' }, response => {
    if (chrome.runtime.lastError) {
      console.error('Error getting media tabs:', chrome.runtime.lastError);
      return;
    }

    mediaTabs = response.tabs || [];
    elements.tabCount.textContent = mediaTabs.length;

    if (mediaTabs.length === 0) {
      elements.tabList.innerHTML = '<p class="no-media">No media detected</p>';
    } else {
      elements.tabList.innerHTML = mediaTabs.map(tab => `
        <div class="tab-item" data-tab-id="${tab.tabId}">
          <div class="tab-item-title">${escapeHtml(tab.title)}</div>
          <div class="tab-item-url">${escapeHtml(getHostname(tab.url))}</div>
        </div>
      `).join('');

      // Add click handlers to tab items
      document.querySelectorAll('.tab-item').forEach(item => {
        item.addEventListener('click', () => {
          const tabId = parseInt(item.getAttribute('data-tab-id'));
          chrome.tabs.update(tabId, { active: true });
        });
      });
    }
  });
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper function to get hostname from URL
function getHostname(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return url;
  }
}

// Update volume display
function updateVolumeDisplay(volume) {
  currentVolume = Math.round(volume);
  elements.volumeSlider.value = currentVolume;
  elements.volumeValue.textContent = `${currentVolume}%`;
}

// Update mute button display
function updateMuteDisplay(muted) {
  isMuted = muted;
  if (muted) {
    elements.volumeIcon.style.display = 'none';
    elements.mutedIcon.style.display = 'block';
  } else {
    elements.volumeIcon.style.display = 'block';
    elements.mutedIcon.style.display = 'none';
  }
}

// Event Listeners

// Play/Pause button
elements.playPauseBtn.addEventListener('click', () => {
  sendMediaCommand('toggle');
  // Toggle icon display
  const isPlaying = elements.playIcon.style.display !== 'none';
  elements.playIcon.style.display = isPlaying ? 'none' : 'block';
  elements.pauseIcon.style.display = isPlaying ? 'block' : 'none';
});

// Previous button
elements.previousBtn.addEventListener('click', () => {
  sendMediaCommand('previous');
});

// Next button
elements.nextBtn.addEventListener('click', () => {
  sendMediaCommand('next');
});

// Volume slider
elements.volumeSlider.addEventListener('input', (e) => {
  const volume = parseInt(e.target.value) / 100;
  updateVolumeDisplay(e.target.value);
  sendMediaCommand('volume', volume);
  if (volume > 0 && isMuted) {
    updateMuteDisplay(false);
    sendMediaCommand('unmute');
  }
});

// Volume up button
elements.volumeUpBtn.addEventListener('click', () => {
  const newVolume = Math.min(100, currentVolume + 10);
  updateVolumeDisplay(newVolume);
  sendMediaCommand('volume', newVolume / 100);
  if (isMuted) {
    updateMuteDisplay(false);
    sendMediaCommand('unmute');
  }
});

// Volume down button
elements.volumeDownBtn.addEventListener('click', () => {
  const newVolume = Math.max(0, currentVolume - 10);
  updateVolumeDisplay(newVolume);
  sendMediaCommand('volume', newVolume / 100);
});

// Mute button
elements.muteBtn.addEventListener('click', () => {
  const newMutedState = !isMuted;
  updateMuteDisplay(newMutedState);
  sendMediaCommand('toggleMute');
});

// Seek forward button
elements.seekForwardBtn.addEventListener('click', () => {
  sendMediaCommand('seekForward');
});

// Seek backward button
elements.seekBackBtn.addEventListener('click', () => {
  sendMediaCommand('seekBackward');
});

// Refresh button
elements.refreshBtn.addEventListener('click', () => {
  updateTabList();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Prevent default if we're handling the key
  const handled = true;

  switch(e.key) {
    case ' ':
    case 'k':
      e.preventDefault();
      elements.playPauseBtn.click();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      elements.seekBackBtn.click();
      break;
    case 'ArrowRight':
      e.preventDefault();
      elements.seekForwardBtn.click();
      break;
    case 'ArrowUp':
      e.preventDefault();
      elements.volumeUpBtn.click();
      break;
    case 'ArrowDown':
      e.preventDefault();
      elements.volumeDownBtn.click();
      break;
    case 'm':
      e.preventDefault();
      elements.muteBtn.click();
      break;
    case 'n':
      e.preventDefault();
      elements.nextBtn.click();
      break;
    case 'p':
      e.preventDefault();
      elements.previousBtn.click();
      break;
    default:
      // Key not handled
      break;
  }
});

// Load saved settings from storage
chrome.storage.local.get(['volume', 'muted'], (result) => {
  if (result.volume !== undefined) {
    updateVolumeDisplay(result.volume * 100);
  }
  if (result.muted !== undefined) {
    updateMuteDisplay(result.muted);
  }
});

// Save settings when changed
elements.volumeSlider.addEventListener('change', () => {
  chrome.storage.local.set({ volume: currentVolume / 100 });
});

elements.muteBtn.addEventListener('click', () => {
  chrome.storage.local.set({ muted: isMuted });
});

// Initialize on popup open
updateTabList();

// Refresh tab list periodically
setInterval(updateTabList, 2000);

console.log('Universal Media Controller popup loaded');
