import React, { useState } from 'react';
import { ViewState } from './types';
import FeatureCard from './components/FeatureCard';
import ChatModule from './components/ChatModule';
import ImageGenModule from './components/ImageGenModule';
import LiveAssistant from './components/LiveAssistant';
import MusicModule from './components/MusicModule';
import LoginScreen from './components/LoginScreen';
import { 
  BookOpen, 
  TrendingUp, 
  Image as ImageIcon, 
  FileEdit, 
  Mic, 
  Home, 
  Menu,
  Music,
  LogOut
} from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // If not authenticated, show Login Screen
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: Home },
    { id: ViewState.EDUCATION, label: 'Education Hub', icon: BookOpen },
    { id: ViewState.FINANCE, label: 'Financial Advisor', icon: TrendingUp },
    { id: ViewState.THUMBNAIL, label: 'Thumbnail Creator', icon: ImageIcon },
    { id: ViewState.MUSIC, label: 'Song Player', icon: Music },
    { id: ViewState.WRITER, label: 'Writer & PDF Tool', icon: FileEdit },
    { id: ViewState.VOICE_ASSISTANT, label: 'Live Assistant', icon: Mic },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView(ViewState.DASHBOARD);
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.EDUCATION:
        return <ChatModule mode="EDUCATION" title="Education Tutor" systemInstruction="You are an expert tutor. Explain concepts clearly, ask probing questions to check understanding, and adapt to the student's level. You can read images of homework problems." />;
      case ViewState.FINANCE:
        return <ChatModule mode="FINANCE" title="Financial Advisor" systemInstruction="You are a financial advisor. Analyze data provided by the user. When appropriate, output JSON data for charts in the format { title: string, data: [{name: string, value: number}], summary: string }. Always maintain a professional yet accessible tone." />;
      case ViewState.WRITER:
        return <ChatModule mode="WRITER" title="Content Writer & PDF Converter" systemInstruction="You are a professional content writer and document analyst. The user may upload images or PDFs (as text/images). Your task is to extract content, summarize, convert formats (e.g. PDF to Blog, Text to HTML), or write new creative content based on prompts. Be precise." />;
      case ViewState.THUMBNAIL:
        return <ImageGenModule />;
      case ViewState.MUSIC:
        return <MusicModule />;
      case ViewState.VOICE_ASSISTANT:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
             <div className="p-6 bg-indigo-500/20 rounded-full mb-6 animate-pulse">
                <Mic className="w-16 h-16 text-indigo-400" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Live Voice Assistant</h2>
             <p className="text-slate-400 max-w-md mb-8">Experience real-time, low-latency voice interaction with Gemini. Click the button below to start.</p>
             <button 
                onClick={() => setView(ViewState.DASHBOARD)} 
                className="text-slate-500 hover:text-white underline"
             >
                Return to Dashboard
             </button>
          </div>
        );
      case ViewState.DASHBOARD:
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <FeatureCard 
              title="Education Hub" 
              description="Get help with homework, learn new topics, and analyze study materials."
              icon={BookOpen} 
              color="from-blue-500 to-cyan-500"
              onClick={() => setView(ViewState.EDUCATION)}
            />
            <FeatureCard 
              title="Financial Advisor" 
              description="Analyze trends, visualize portfolio data, and get smart financial insights."
              icon={TrendingUp} 
              color="from-emerald-500 to-green-500"
              onClick={() => setView(ViewState.FINANCE)}
            />
            <FeatureCard 
              title="Thumbnail Creator" 
              description="Generate stunning 16:9 thumbnails and visuals from text prompts."
              icon={ImageIcon} 
              color="from-pink-500 to-rose-500"
              onClick={() => setView(ViewState.THUMBNAIL)}
            />
             <FeatureCard 
              title="Song Player" 
              description="Generate and play AI-composed music, sound effects, and melodies."
              icon={Music} 
              color="from-fuchsia-500 to-pink-500"
              onClick={() => setView(ViewState.MUSIC)}
            />
            <FeatureCard 
              title="Writer & PDF Converter" 
              description="Summarize documents, convert PDFs, and write professional blogs."
              icon={FileEdit} 
              color="from-purple-500 to-violet-500"
              onClick={() => setView(ViewState.WRITER)}
            />
            <FeatureCard 
              title="Live Assistant" 
              description="Talk to Gemini in real-time with voice and video support."
              icon={Mic} 
              color="from-orange-500 to-amber-500"
              onClick={() => setView(ViewState.VOICE_ASSISTANT)}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Mobile Nav Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            GEETHESH'S AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Your Intelligence Hub</p>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                view === item.id 
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 bg-slate-800/50 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 rounded-xl border border-slate-700 text-slate-400 transition-all text-sm mb-3 group"
            >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Sign Out</span>
            </button>
            <div className="p-2 text-center">
                <p className="text-[10px] text-slate-600 tracking-widest uppercase font-semibold">Geethesh 1.0</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm flex items-center justify-between px-8 lg:px-12">
            <h2 className="text-lg font-medium text-white ml-8 lg:ml-0">
                {navItems.find(n => n.id === view)?.label}
            </h2>
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-end mr-2">
                 <span className="text-xs font-bold text-slate-300">Admin User</span>
                 <span className="text-[10px] text-green-400 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                   Online
                 </span>
               </div>
               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-500/20">
                 GA
               </div>
            </div>
        </header>
        
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
           {renderContent()}
        </div>
      </main>

      {/* Live Assistant Modal Overlay */}
      {view === ViewState.VOICE_ASSISTANT && (
        <LiveAssistant onClose={() => setView(ViewState.DASHBOARD)} />
      )}

    </div>
  );
};

export default App;
