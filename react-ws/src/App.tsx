import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage,setlatestMessage]=useState("");

  useEffect(()=>{
    const s=new WebSocket('ws://localhost:8080')
    s.onopen=()=>{
      console.log('Connected')
      setSocket(s)
    }
    s.onmessage=(message)=>{
      console.log("Received message: ",message.data)
      setlatestMessage(message.data)
    }
    return ()=>s.close();
  },[])

  if(!socket){
    return <div>
      Connecting to socket server...
    </div>
  }

  return (
    <>
      <input onChange={(e)=>{
        setlatestMessage(e.target.value)
      }}></input>
      <button onClick={()=>{
        socket.send(latestMessage);
      }}>Send</button>
      {latestMessage}
    </>
  )
}

export default App
