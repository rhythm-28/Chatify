import { React, useState, useEffect } from "react";
import axios from "axios";

const Chats = () => {
    
  const [allChats, setAllChats] = useState([]);

  async function fetchChats() {
    const { chats } = await axios.get("/api/chat");
    setAllChats(chats);
    console.log(chats);
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1> Chats page h bhai ye</h1>
    </div>
  );
};

export default Chats;
