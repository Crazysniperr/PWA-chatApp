import React, { useEffect, useState } from 'react';
import "../App.css"

const ChatComponent = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.111.128.67/assignment/chat?page=0');
        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    {chats.map((chat, index) => (
      <div
        className={`chat-message ${index % 2 === 0 ? 'left' : 'right'}`}
        key={chat.id}
      >
        <img src={chat.sender.image} alt="User" className="user-icon" />
        <div className="message-content">
            <p>{chat.message}</p>
          <span>{chat.time}</span>
        </div>
      </div>
    ))}
  </>
  );
};

export default ChatComponent;
