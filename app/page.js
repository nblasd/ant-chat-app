import { Layout } from 'antd';
import Sidebar from '@/app/components/Sidebar';
import ChatWindow from '@/app/components/ChatWindow';
import ContactPanel from '@/app/components/ContantPanel';

export default function HomePage() {
  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Left Sidebar */}
      <div>
        <Sidebar />
      </div>
    
      {/* Middle Chat Window */}
      <ChatWindow />

      {/* Right Contact Panel */}
      <ContactPanel />
    </Layout>
  );
}
