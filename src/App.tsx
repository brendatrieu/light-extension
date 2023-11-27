import './App.css';

function App() {
  async function handleClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.runtime.sendMessage({
          action: 'disableTint',
          tabId: tab.id,
        });
      }
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
