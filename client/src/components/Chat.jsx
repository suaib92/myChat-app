import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const PORT = 5000; // Ensure this matches the server's port

  useEffect(() => {
    const socketUrl = `ws://localhost:${PORT}`; // Use a fixed domain/IP for local development
    const newSocket = new WebSocket(socketUrl);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newSocket.onmessage = (event) => {
      try {
        // Attempt to parse the message as JSON
        const receivedMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      } catch (error) {
        // If parsing fails, treat the message as plain text
        console.error('Error parsing JSON:', error);
        setMessages((prevMessages) => [...prevMessages, { content: event.data, sender: 'AI', avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.disneyplusinformer.com%2Fwp-content%2Fuploads%2F2021%2F06%2FLuca-Profile-Avatars-3.png&f=1&nofb=1&ipt=192bf984412fe3008666d7ec2b22afb8863d893ea61f5d1f4db93c3c66182b92&ipo=images' }]);
      }
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        content: messageInput,
        timestamp: new Date().toISOString(),
        sender: 'Jessica', // Hardcoded for now, should come from user data later
        avatar: 'https://github.com/shadcn.png' // Use the provided avatar for Jessica
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput('');
      try {
        socket.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[40rem] w-[1150px] bg-gray-900 p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start rounded-full justify-${message.sender === 'Jessica' ? 'start' : 'end'} mb-4`}>
            {message.sender === 'Jessica' && (
              <Avatar size="small">
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender.substr(0, 1)}</AvatarFallback>
              </Avatar>
            )}
            {message.sender !== 'Jessica' && (
              <div className="flex justify-end items-center space-x-2"> {/* Updated this line */}
                <div className={`max-w-md rounded-full py-2 px-4 text-white ${message.sender === 'Jessica' ? 'bg-blue-500' : 'bg-green-500'} rounded-full`}>
                  {message.content}
                </div>
                <Avatar size="small">
                  <img src={message.avatar} alt={message.sender} className="rounded-full h-12 w-12" />
                </Avatar>
              </div>
            )}
            {/* Move the sender's message outside of the conditional rendering */}
            {message.sender === 'Jessica' && (
              <div className={`max-w-md ml-2  rounded-full py-2 px-4 text-white ${message.sender === 'Jessica' ? 'bg-blue-500' : 'bg-green-500'} rounded-full`}>
                {message.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 bg-gray-800 text-white rounded-full focus:outline-none border border-red-500"
        />
        <button onClick={sendMessage} className="py-2 px-4 bg-red-600 text-white rounded-full ">Send</button>
      </div>
    </div>
  );
  
}

export default Chat;
