import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from './hooks/useSocket';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';

interface IMessage {
  username: string;
  content: string;
}

const App = () => {
  // Socket setup
  const { socket, isConnected } = useSocket();
  // state for messages and user
  const [Message, setMessages] = useState<IMessage[]>([]);
  // state for input field
  const [input, setInput] = useState('');
  // Generate a random username
  const [user] = useState(() => `User_${Math.floor(Math.random() * 10)}`);
  // Fetch initial messages and set up socket listeners
  useEffect(() => {
    // 1. Initial Data Fetch
    axios.get('http://localhost:5000/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error("Fetch error:", err));

    // 2. Socket Listener
    const handleReceive = (newMsg: IMessage) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    socket.on('receive_message', handleReceive);

    // 3. Cleanup (Bohat zaroori hai!)
    return () => {
      socket.off('receive_message', handleReceive);
    };
    // Dependency array ko khali rakhein ya socket.id check karein
  }, [socket]);
  // Handle sending messages
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && isConnected) {
      socket.emit('send_message', {
        username: user,  // Backend 'username' expect kar raha hai
        content: input   // Backend 'content' expect kar raha hai
      });
      setInput('');
    }
  };

  return (
    <div className="h-screen w-full bg-[#0f172a] flex items-center justify-center p-4">
      {/* Glow Effect */}
      <div className="absolute w-64 h-64 bg-cyan-500/50 rounded-full blur-[120px] top-10 left-10 animate-pulse" />
      <div className="absolute w-64 h-64 bg-blue-500/50 rounded-full blur-[120px] bottom-10 right-10 animate-pulse" />

      <div className="w-full max-w-2xl h-[85vh] flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10">
        {/* Chat Header */}
        <ChatHeader user={user} connected={isConnected} />
        <MessageList Message={Message} currentUser={user} />
        <MessageInput value={input} onChange={setInput} onSend={handleSend} />
      </div>
    </div>
  );


};

export default App;