import './App.css';
import { useState } from 'react';
import ToggleButton from './components/ToggleButton/ToggleButton';

function App() {
  const [isDisabled, setIsDisabled] = useState(false);

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

  function handleToggle() {
    setIsDisabled(!isDisabled);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
        <button onClick={handleClick}>Click Me</button>
        <ToggleButton handleToggle={handleToggle} isDisabled={isDisabled} />
      </header>
    </div>
  );
}

export default App;
