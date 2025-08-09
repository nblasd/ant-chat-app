'use client';

import { Layout, Avatar, Input, Button, Typography, Upload, message, Popover, Dropdown } from 'antd';
import { SendOutlined, PaperClipOutlined, SmileOutlined, PhoneOutlined, MoreOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react';

const { Content } = Layout;
const { Text } = Typography;
const { Dragger } = Upload;

// Simple emoji list
const EMOJIS = ['😀', '😂', '😍', '👍', '👋', '🎉', '❤️', '🔥', '✨', '🙏'];

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, how are you available for meeting', time: '9:30 AM', sent: false },
    { id: 2, text: 'Hello', time: '9:31 AM', sent: true },
    { id: 3, text: 'Hello, how are you available for meeting', time: '9:32 AM', sent: true },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const menuItems = [
    { key: '1', label: 'View Contact' },
    { key: '2', label: 'Media, links, and docs' },
    { key: '3', label: 'Search' },
    { key: '4', label: 'Mute notifications' },
    { key: '5', label: 'Disappearing messages' },
    { key: '6', label: 'Clear messages' },
    { key: '7', label: 'Delete chat' },
  ];

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      time: timeString,
      sent: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      
      const newMsg = {
        id: messages.length + 1,
        image: e.target.result,
        time: timeString,
        sent: true
      };
      
      setMessages(prev => [...prev, newMsg]);
    };
    reader.readAsDataURL(file);
    
    return false;
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = (e) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
  };

  const emojiPickerContent = (
    <div 
      ref={emojiPickerRef}
      className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 w-48 flex flex-wrap justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      {EMOJIS.map((emoji, index) => (
        <span 
          key={index}
          className="text-2xl cursor-pointer hover:bg-gray-100 rounded p-1"
          onClick={() => handleEmojiSelect(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );

  return (
    <Content className="bg-white flex flex-col border-r border-gray-200 relative">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <Avatar src="https://plus.unsplash.com/premium_photo-1691784778805-e1067ac42e01?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <div className="ml-4">
            <Text strong>Mishal Irfan</Text>
            <div className="text-xs text-gray-500">Last seen at 2:34 PM</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            type="text" 
            icon={<PhoneOutlined className="text-gray-600" />} 
            className="flex items-center justify-center"
          />
          <Dropdown
            menu={{
              items: menuItems,
              onClick: () => setDropdownVisible(false),
            }}
            trigger={['click']}
            open={dropdownVisible}
            onOpenChange={(visible) => setDropdownVisible(visible)}
          >
            <Button 
              type="text" 
              icon={<MoreOutlined className="text-gray-600" />} 
              className="flex items-center justify-center"
            />
          </Dropdown>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-[20px] p-3 max-w-[60%] ${
                msg.sent
                  ? 'gradientStyle text-white'
                  : 'bg-gray-100'
              }`}
            >
              {msg.image ? (
                <img 
                  src={msg.image} 
                  alt="Uploaded content" 
                  className="max-w-full h-auto rounded-lg mb-1"
                />
              ) : (
                <div>{msg.text}</div>
              )}
              <div className="text-[10px] mt-1 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t border-gray-200 p-2 flex items-center gap-2 relative">
        <Upload
          beforeUpload={handleFileUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button 
            icon={<PaperClipOutlined />} 
            onClick={(e) => e.stopPropagation()}
          />
        </Upload>
        
        <div className="relative">
          <Button 
            icon={<SmileOutlined />} 
            onClick={toggleEmojiPicker}
            className={showEmojiPicker ? 'bg-gray-200' : ''}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-10 left-0 z-10">
              {emojiPickerContent}
            </div>
          )}
        </div>
        
        <Input 
          placeholder="Type Message here" 
          className="flex-1" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          className="gradientStyle text-white" 
          onClick={handleSendMessage}
        />
      </div>
    </Content>
  );
}
