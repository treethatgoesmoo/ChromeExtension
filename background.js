// Background service worker for Universal Media Controller

// Store active media tabs
let mediaTabs = new Map();

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'MEDIA_DETECTED') {
    // Store tab with active media
    mediaTabs.set(sender.tab.id, {
      tabId: sender.tab.id,
      title: sender.tab.title,
      url: sender.tab.url,
      hasMedia: true
    });
    sendResponse({ success: true });
  } else if (request.type === 'MEDIA_REMOVED') {
    // Remove tab from active media tabs
    mediaTabs.delete(sender.tab.id);
    sendResponse({ success: true });
  } else if (request.type === 'GET_MEDIA_TABS') {
    // Return list of tabs with active media
    sendResponse({ tabs: Array.from(mediaTabs.values()) });
  } else if (request.type === 'CONTROL_MEDIA') {
    // Forward media control command to specific tab or all tabs
    const { command, tabId, value } = request;

    if (tabId) {
      // Control specific tab
      chrome.tabs.sendMessage(tabId, { type: 'MEDIA_COMMAND', command, value })
        .then(() => sendResponse({ success: true }))
        .catch(err => sendResponse({ success: false, error: err.message }));
    } else {
      // Control all tabs with media
      const promises = Array.from(mediaTabs.keys()).map(id =>
        chrome.tabs.sendMessage(id, { type: 'MEDIA_COMMAND', command, value })
          .catch(err => console.error(`Error controlling tab ${id}:`, err))
      );

      Promise.all(promises)
        .then(() => sendResponse({ success: true }))
        .catch(err => sendResponse({ success: false, error: err.message }));
    }

    return true; // Keep channel open for async response
  }

  return true;
});

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  mediaTabs.delete(tabId);
});

// Clean up when tabs are updated (e.g., navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    mediaTabs.delete(tabId);
  }
});

// Handle keyboard commands
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command);

  // Map commands to media control actions
  const commandMap = {
    'toggle-play-pause': 'toggle',
    'next-track': 'next',
    'previous-track': 'previous',
    'volume-up': 'volumeUp',
    'volume-down': 'volumeDown',
    'toggle-mute': 'toggleMute',
    'seek-forward': 'seekForward',
    'seek-backward': 'seekBackward'
  };

  const mediaCommand = commandMap[command];
  if (mediaCommand) {
    // Send command to all tabs with media
    const promises = Array.from(mediaTabs.keys()).map(id =>
      chrome.tabs.sendMessage(id, { type: 'MEDIA_COMMAND', command: mediaCommand })
        .catch(err => console.error(`Error controlling tab ${id}:`, err))
    );

    Promise.all(promises).then(() => {
      console.log(`Command ${command} executed on ${promises.length} tab(s)`);
    });
  }
});

console.log('Universal Media Controller background service worker loaded');
