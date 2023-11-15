import './App.css';

function App() {
  async function handleClick() {
    let [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        alert('Hello from my extension!');
      },
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
