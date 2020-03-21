import React, { Component  } from "react";

const ChatHistory = ({chatHistory}) => {

  const messages = chatHistory.map(msg => <p>{msg.data}</p>);
  return (
    <div className=''>
      <h2>Chat History</h2>
      {messages}
    </div>

  );
}
export default ChatHistory;
