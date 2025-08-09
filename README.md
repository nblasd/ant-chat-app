# Ant Chat Application

A modern, responsive chat application built with Next.js and Ant Design, featuring real-time messaging, contact management, and a clean, intuitive user interface.

## 🚀 Features

- **Real-time Messaging**: Instant message exchange between users
- **Contact Management**: View and manage your contacts
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Ant Design for a polished look and feel
- **Dark/Light Mode**: Toggle between different themes

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.6
- **UI Library**: Ant Design 5.26.7
- **State Management**: React Context API
- **Styling**: CSS Modules with PostCSS
- **Package Manager**: npm

## 📦 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ant-chat-app.git
   cd ant-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
ant-chat-app/
├── app/                    # App router directory
│   ├── components/         # Reusable UI components
│   │   ├── ChatWindow.js   # Main chat interface
│   │   ├── ContactPanel.js # Contact management
│   │   └── Sidebar.js      # Navigation sidebar
│   ├── constants/          # Application constants
│   ├── public/             # Static files
│   ├── globals.css         # Global styles
│   └── page.js             # Main page component
├── public/                 # Static assets
└── ...
```

## 🎨 Customization

- Update theme colors in `app/globals.css`
- Modify the layout in `app/layout.js`
- Add new components in the `app/components` directory

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)
- [React Documentation](https://react.dev/)