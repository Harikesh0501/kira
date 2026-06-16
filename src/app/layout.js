// src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Kira | Privacy-First Desktop AI Voice Assistant',
  description: 'Kira is an advanced, local-first AI assistant that automates tasks, manages files, and controls your desktop using voice and text commands. Secure, fast, and extensible.',
  keywords: 'kira, ai desktop assistant, voice control pc, local llm, offline voice assistant, task automation, private ai, artificial intelligence desktop',
  authors: [{ name: 'Kira Team' }],
  icons: {
    icon: '/kira_logo.png?v=2',
  },
  openGraph: {
    title: 'Kira | Next-Gen Desktop AI Assistant',
    description: 'Control your PC, summarize files, and automate tasks locally. 100% private, extremely fast.',
    type: 'website',
    url: 'https://usekira.ai', // Placeholder
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/kira_logo.png?v=2" type="image/png" />
      </head>
      <body>
        <div className="ambient-glow glow-purple"></div>
        <div className="ambient-glow glow-cyan"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
