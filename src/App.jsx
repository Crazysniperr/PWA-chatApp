import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [chats, setChats] = useState([]);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleAttachToggle = () => {
    setIsAttachOpen(!isAttachOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://3.111.128.67/assignment/chat?page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chat data");
        }
        const data = await response.json();
        if (pageNumber === 0) {
          setChats(data.chats);
          setName(data.name);
          setFrom(data.from);
          setTo(data.to);
        } else {
          setChats((prevChats) => [...prevChats, ...data.chats]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [pageNumber]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newChat = {
        id: chats.length + 1,
        sender: {
          image:
            "https://fastly.picsum.photos/id/551/160/160.jpg?hmac=DKAZaW3KPwMLhYwnJ-s_NOYKngMXo-nR1pEQzcNCgr0",
        },
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      };

      setChats([...chats, newChat]);
      setNewMessage("");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100; // Adjust this threshold value as needed
      const isNearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - threshold;

      if (isNearBottom) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="header">
          <div className="top">
            <div className="top-left">
              <box-icon name="left-arrow-alt"></box-icon>
              <span>{name}</span>
            </div>
            <div className="top-right">
              <box-icon name="edit"></box-icon>
            </div>
          </div>
          <div className="bottom">
            <div className="btm-left">
              <div className="grp-img">
                <img
                  src="https://fastly.picsum.photos/id/551/160/160.jpg?hmac=DKAZaW3KPwMLhYwnJ-s_NOYKngMXo-nR1pEQzcNCgr0"
                  alt=""
                />
                <img
                  src="https://fastly.picsum.photos/id/1072/160/160.jpg?hmac=IDpbpA5neYzFjtkdFmBDKXwgr-907ewXLa9lLk9JuA8"
                  alt=""
                />
                <img
                  src="https://fastly.picsum.photos/id/1072/160/160.jpg?hmac=IDpbpA5neYzFjtkdFmBDKXwgr-907ewXLa9lLk9JuA8"
                  alt=""
                />
                <img
                  src="https://fastly.picsum.photos/id/819/160/160.jpg?hmac=duWXAb-022KT3VnXfDCSyr0sLwddRYoP7RMFnidof_g"
                  alt=""
                />
              </div>
              <div className="from-to">
                <p>
                  <span>From</span> {from}
                </p>
                <p>
                  <span>To</span> {to}
                </p>
              </div>
            </div>
            <div className="btm-right">
              <box-icon
                name="dots-vertical-rounded"
                onClick={handleModalToggle}
                className="dot"
              ></box-icon>
              <div className={`modal ${isModalOpen ? "show" : ""}`}>
                <div className="members">
                  <box-icon name="user-check"></box-icon>
                  <span>Members</span>
                </div>
                <hr />
                <div className="num">
                  <box-icon name="phone-call"></box-icon>
                  <span>Share Number</span>
                </div>
                <hr />
                <div className="report">
                  <box-icon name="message-x"></box-icon>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-messages">
          <span className="hr">
            <hr />
            <span>{new Date().toLocaleTimeString()}</span>
            <hr />
          </span>
          {chats.map((chat, index) => (
            <div
              className={`chat-message ${index % 2 === 0 ? "left" : "right"}`}
              key={chat.id}
            >
              <img src={chat.sender.image} alt="User" className="user-icon" />
              <div className="message-content">
                <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
                <span>{chat.time}</span>
              </div>
            </div>
          ))}
          {newMessage && (
            <div className="chat-message right">
              <img
                src="https://fastly.picsum.photos/id/551/160/160.jpg?hmac=DKAZaW3KPwMLhYwnJ-s_NOYKngMXo-nR1pEQzcNCgr0"
                alt="User"
                className="user-icon"
              />
              <div className="message-content">
                <p>{newMessage}</p>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          )}
        </div>
        <div className="chat-input-container">
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="icon-container">
              <div className="attach">
                <box-icon name="paperclip" onClick={handleAttachToggle}></box-icon>
                <div className={`att-modal ${isAttachOpen ? "show" : ""}`}>
                  <i className="bx bx-camera"></i>
                  <i className="bx bx-video"></i>
                  <i className="bx bxs-file"></i>
                </div>
              </div>

              <box-icon name="send" onClick={sendMessage}></box-icon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
