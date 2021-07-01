import './App.css';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(5);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload])
    })
  }, )

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        {
          chat.map((payload, ind) => {
            return (
                <div className="chat">
                  <p className="message" key={ind}>{payload.message}</p><p className="user"> By: {payload.userName} </p>
                </div>
            )
          })
        }
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            value={message}
            placeholder="send text..."
            onChange={(e)=>{setMessage(e.target.value)}}
          />
          <button type="submit">send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
