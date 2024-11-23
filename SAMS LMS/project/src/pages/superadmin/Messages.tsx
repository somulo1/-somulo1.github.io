import React, { useState } from 'react';
import { MessageCircle, Search, Send, User, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, I need help with...',
      timestamp: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Thank you for your help!',
      timestamp: 'Yesterday',
      unread: 0,
      online: false
    },
    // Add more mock chats as needed
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hey, I need help with the course registration.',
      timestamp: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'You',
      content: 'Sure, I can help you with that. What seems to be the issue?',
      timestamp: '10:31 AM',
      read: true
    },
    // Add more mock messages as needed
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add logic to send message
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white rounded-lg shadow-sm">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{chat.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {chat.lastMessage}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{chat.timestamp}</div>
                  {chat.unread > 0 && (
                    <div className="mt-1 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">
                    {chats.find((c) => c.id === selectedChat)?.name}
                  </div>
                  <div className="text-sm text-gray-500">Online</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'You' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'You'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === 'You' ? 'text-indigo-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Your Messages</h3>
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
