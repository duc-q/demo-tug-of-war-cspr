import { useMemo, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import './App.css'

function App() {
  const url = "wss://stream.binance.com:9443/ws/btcusdt@kline_1s";
  //Public API that will echo messages sent to it back to the client

  const [isStarted, setStarted] = useState(false);
  const [socketUrl, setSocketUrl] = useState(url);
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(isStarted ? socketUrl : null);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const data = useMemo(() => {
    if (lastMessage) {
      const result = JSON.parse(lastMessage.data)
      console.log(`🚀 ~ data ~ result:`, result)
      return result.p;
    }
    return null;
  }, [lastMessage]);

  

  console.log(`🚀 ~ App ~ lastMessage:`, lastMessage?.data)
  // console.log(`🚀 ~ App ~ readyState:`, readyState)

  return (
    <>
      <div>
        <h3>
          <strong>{data}</strong>
        </h3>
      </div>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <button onClick={() => setStarted(true)}>Start</button>
      <button onClick={() => setStarted(false)}>Stop</button>
    </>
  )
}

export default App
