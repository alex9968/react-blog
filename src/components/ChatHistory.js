import React, { Component  } from "react";

const ChatHistory = ({chatHistory}) => {

  const Message = ({data}) =>(
    <div style={{ backgroundColor:'lightgrey', color:'#fff' }}>
      {data}
    </div>
  )

  const messages = chatHistory.map(msg => <Message key={+new Date() + Math.random()} data={msg.data} />);
  return (
    <div className=''>
      <h2>Chat History</h2>
      {messages}

    </div>

  );
}
export default ChatHistory;
