import { MessageOutlined, PhoneOutlined } from '@ant-design/icons';

export const getTabItems = (activeTab, setActiveTab) => [
  {
    key: 'messages',
    label: (
      <button 
        type="button"
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-md  ${
          activeTab === 'messages' ? 'text-blue' : 'text-gray-700'
        }`}
        onClick={() => setActiveTab('messages')}
      >
        <MessageOutlined />
        <span>Messages</span>
      </button>
    ),
  },
  {
    key: 'calls',
    label: (
      <button
        type="button"
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-md ${
          activeTab === 'calls' ? 'text-blue' : 'text-gray-700'
        }`}
        onClick={() => setActiveTab('calls')}
      >
        <PhoneOutlined />
        <span>Calls</span>
      </button>
    ),
  },
];
