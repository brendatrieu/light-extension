export {};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.windows.create({
      type: 'popup',
      url: 'index.html',
      width: 300,
      height: 300,
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    !tab.incognito &&
    !/^chrome:/.test(tab.url as string)
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        if (!document.querySelector('#window-tint')) {
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.inset = '0';
          overlay.style.zIndex = '100000';
          overlay.style.pointerEvents = 'none';
          overlay.style.width = '100vw';
          overlay.style.height = '100vh';
          overlay.style.margin = '0';
          overlay.style.backgroundColor = 'rgba(247, 235, 201, 0.18)';
          overlay.id = 'window-tint';
          document.body.appendChild(overlay);
        }
      },
    });
  }
});

chrome.runtime.onMessage.addListener(
  (
    message: { action: string; tabId: number; color: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: { status: string }) => void
  ) => {
    if (message.action === 'changeBackgroundColor') {
      chrome.scripting
        .executeScript({
          target: { tabId: message.tabId },
          func: (color) => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.zIndex = '100000';
            overlay.style.pointerEvents = 'none';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.margin = '0';
            overlay.style.backgroundColor = color;
            overlay.id = 'window-tint';
            document.body.appendChild(overlay);
          },
          args: [message.color],
        })
        .then(() => {
          sendResponse({ status: 'success' });
        })
        .catch((error) => console.error('Error executing script', error));
    }
  }
);
