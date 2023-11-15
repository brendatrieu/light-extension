export {};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.windows.create({
      type: 'popup',
      url: 'index.html',
      width: 400,
      height: 400,
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port);
  alert('[background.js] onInstalled');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup');
  alert('[background.js] onInstalled');
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log('[background.js] onSuspend');
  alert('[background.js] onSuspend');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id as number },
    func: () => {
      alert('Hello from my extension');
      document.body.style.backgroundColor = 'blue';
    },
  });
});
