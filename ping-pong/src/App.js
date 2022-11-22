import './App.css';
import {useEffect, useState} from 'react'
import {io} from 'socket.io-client'

var socket;
function App() {

  const [name,setName]=useState("");

  useEffect(()=>{
    socket = io.connect("http://localhost:8000");
    // console.log("hello")
  },[])

  const sendPing = ()=>{
    console.log("emmiting")
    socket.emit("ping","ping Message");
    socket.on("pong",(data)=>{
      console.log(data)
    })
  }

  const reqFile = ()=>{
    socket.emit("reqFile",name);
    socket.on("resFile",(data)=>{
      console.log(data)
    })
    socket.on("error",(data)=>{
      console.log(data)
    })
  }

  const prx = async ()=>{
    const res = await fetch(`/todos/1`, {
      method: "GET",
      headers: {"x-forwarded-host": "https://jsonplaceholder.typicode.com"}
    });
    if (!res.ok) return (console.log("Something went wrong"));
    
    console.log(res)
    const data = await res.json();
  
    console.log(JSON.stringify(data));
  }

  return (
    <>
      <button onClick={sendPing}>Send ping message</button><br />
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      <button onClick={reqFile}>request file</button>
      <button onClick={prx}>proxy server</button>
    </>
  );
}

export default App;
