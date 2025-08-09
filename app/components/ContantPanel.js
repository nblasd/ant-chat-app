'use client';

import { Layout, Input, List, Avatar, Button, Collapse, Modal } from 'antd';
import { PlusOutlined, SearchOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import { contacts as allContacts } from '../constants/contacts';

const { Sider } = Layout;

export default function ContactPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return allContacts;
    
    const query = searchQuery.toLowerCase().trim();
    return allContacts.filter(contact => {
      if (!contact) return false;
      
      const nameMatch = contact.name?.toLowerCase().includes(query) || false;
      const numberMatch = contact.number?.includes(query) || false;
      
      return nameMatch || numberMatch;
    });
  }, [searchQuery]);

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const groups = {};
    
    filteredContacts.forEach(contact => {
      if (!contact?.name) return;
      
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
    });
    
    // Sort the groups alphabetically
    return Object.entries(groups)
      .sort(([letterA], [letterB]) => letterA.localeCompare(letterB))
      .map(([letter, contacts]) => ({
        letter,
        contacts: [...contacts].sort((a, b) => a.name.localeCompare(b.name))
      }));
  }, [filteredContacts]);

  // Sample data for recent and favorite contacts
  const recentContacts = useMemo(() => {
    return allContacts.filter(contact => contact.status && contact.status !== 'New Message').slice(0, 3);
  }, []);

  const favoriteContacts = useMemo(() => {
    return allContacts.slice(0, 2); // First 2 contacts as favorites for demo
  }, []);

  return (
    <Sider 
      width={300} 
      className="border-l border-gray-400 flex flex-col"
      style={{
        backgroundColor: 'white',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* New Header */}
      <div className="p-4 border-b border-gray-200 flex justify-end items-center h-16">
        <div className="flex items-center gap-4">
          <Button 
            type="text" 
            icon={<InfoCircleOutlined className="text-gray-600" />} 
            className="flex items-center justify-center"
          />
          <Button 
            type="text" 
            icon={<SettingOutlined className="text-gray-600" />} 
            className="flex items-center justify-center"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col h-full" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Contact Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showModal}
            className="gradientStyle"
          >
            Add
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <Input 
            placeholder="Search contacts..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {/* Alphabetical Contacts */}
          {groupedContacts.map(({ letter, contacts }) => (
            <Collapse
              key={letter}
              defaultActiveKey={['1']}
              ghost
              className="mb-2"
            >
              <Collapse.Panel
                key="1"
                header={
                  <div className="font-semibold text-gray-500">
                    {letter}
                  </div>
                }
                className="custom-collapse"
              >
                <List
                  dataSource={contacts}
                  renderItem={(contact) => (
                    <List.Item className="hover:bg-gray-50 rounded-lg cursor-pointer pl-6">
                      <List.Item.Meta
                        avatar={<Avatar className="gradientStyle">{contact?.name?.[0] || '?'}</Avatar>}
                        title={contact?.name || 'Unknown'}
                        description={contact?.number || 'No number'}
                      />
                    </List.Item>
                  )}
                />
              </Collapse.Panel>
            </Collapse>
          ))}

          {/* Recent Contacts */}
          <Collapse
            defaultActiveKey={['1']}
            ghost
            className="mb-2"
          >
            <Collapse.Panel
              key="recent"
              header={
                <div className="font-bold text-black text-lg">
                  Recent
                </div>
              }
              className="custom-collapse"
            >
              <List
                dataSource={recentContacts}
                renderItem={(contact) => (
                  <List.Item className="hover:bg-gray-50 rounded-lg cursor-pointer pl-6">
                    <List.Item.Meta
                      avatar={<Avatar className="gradientStyle">{contact?.name?.[0] || '?'}</Avatar>}
                      title={<span className="text-gray-900">{contact?.name || 'Unknown'}</span>}
                      description={<span className="text-gray-500">{contact?.status || 'No status'}</span>}
                    />
                  </List.Item>
                )}Fav
              />
            </Collapse.Panel>
          </Collapse>

          {/* Favorites */}
          <Collapse
            defaultActiveKey={['1']}
            ghost
            className="mb-2"
          >
            <Collapse.Panel
              key="favorites"
              header={
                <div className="font-bold text-black text-lg">
                  Favorites
                </div>
              }
              className="custom-collapse"
            >
              <List
                dataSource={favoriteContacts}
                renderItem={(contact) => (
                  <List.Item className="hover:bg-gray-50 rounded-lg cursor-pointer pl-6">
                    <List.Item.Meta
                      avatar={<Avatar className="gradientStyle">{contact?.name?.[0] || '?'}</Avatar>}
                      title={<span className="text-gray-900">{contact?.name || 'Unknown'}</span>}
                      description={<span className="text-gray-500">{contact?.number || 'No number'}</span>}
                    />
                  </List.Item>
                )}
              />
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>

      {/* Add Contact Modal */}
      <Modal 
        title="Add New Contact" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} className="gradientStyle">
            Add Contact
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input placeholder="Enter name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <Input placeholder="Enter phone number" />
          </div>
        </div>
      </Modal>
    </Sider>
  );
}
