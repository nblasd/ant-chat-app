'use client';

import { Layout, Select, Input, Button, List, Avatar, Tag } from 'antd';
import { SearchOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { contacts, filterOptions } from '../constants/contacts';
import { getTabItems } from '../constants/tabs';

const { Sider } = Layout;

export default function Sidebar() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('messages');
  
  const filteredContacts = contacts.filter(contact => {
    const contactStatus = contact.status || ''; 
    const matchesFilter = activeFilter === 'All' || 
      contactStatus.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesTab = activeTab === 'messages' 
      ? contact.type === 'message' 
      : contact.type === 'call';
    
    return matchesFilter && matchesTab;
  });

  return (
    <Sider width={280} style={{backgroundColor: '#EFF1F2'}} className="flex flex-col">
      <div className="p-4 border-b border-gray-200 flex flex-col h-20 bg-white">
        <div className="text-xs text-gray-500 mb-1">Select your number</div>
        <div className="flex justify-between items-center">
          <Select 
            defaultValue="All Numbers" 
            className="w-40 gradientStyle text-white rounded-lg"
            bordered={false}
            dropdownStyle={{ minWidth: '200px' }}
            dropdownRender={(menu) => (
              <div className="bg-white rounded-lg shadow-lg">
                {menu}
              </div>
            )}
          >
            <Select.Option 
              value="all" 
              className="text-white"
            >
              All Numbers
            </Select.Option>
            <Select.Option 
              value="primary" 
              className="text-white"
            >
              Primary Number
            </Select.Option>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button 
              type="text" 
              icon={<MessageOutlined className="text-gray-600" />} 
              className="flex items-center justify-center"
            />
            <Button 
              type="text" 
              icon={<PhoneOutlined className="text-gray-600" />} 
              className="flex items-center justify-center"
            />
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex mb-4 p-1 rounded-lg">
          {getTabItems(activeTab, setActiveTab).map(tab => (
            <Button 
              key={tab.key}
              shape="round" 
              className={`text-xs px-3 h-8 flex items-center transition-colors ${
                activeTab === tab.key 
                  ? 'gradientStyle' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-500'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="mb-4"
        />

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {filterOptions.map(({ key, label }) => (
            <Button 
              key={key}
              shape="round" 
              className={`text-xs px-3 h-8 flex items-center ${
                activeFilter === key 
                  ? 'gradientStyle' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-500'
              }`}
              onClick={() => setActiveFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>

        <List
          itemLayout="horizontal"
          dataSource={filteredContacts}
          renderItem={(item) => (
            <List.Item className="hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
              <List.Item.Meta
                avatar={<Avatar className="gradientStyle">{item.name[0]}</Avatar>}
                title={item.name}
                description={
                  item.type === 'call' 
                    ? <Tag color={item.color}>{item.status}</Tag>
                    : <span className="text-blue-500">{item.status}</span>
                }
              />
              <div className="text-xs">{item.time}</div>
            </List.Item>
          )}
        />
      </div>
    </Sider>
  );
}
