import './App.css';

function App() {
  async function handleClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log('tabs', tabs);
      const tab = tabs[0];
      if (tab.id) {
        console.log('tabID');
        chrome.runtime.sendMessage({
          action: 'changeBackgroundColor',
          tabId: tab.id,
        });
      }
    });

    // chrome.runtime.sendMessage({

    // });
    // console.log('tab', tab);

    // await chrome.scripting.executeScript({
    //   target: { tabId: tab.id as number },
    //   func: () => {
    //     // document.body.style.backgroundColor = 'green';
    //     console.log('script');
    //     // alert('HELLO');
    //   },
    // });
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
