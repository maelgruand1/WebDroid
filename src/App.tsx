import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Recent from './components/Recent';
import StatusBar from './components/StatusBar';
import Back from './components/Back';
import TextEditor from './components/TextEditor';

function App() {
  const [status, setStatus] = useState<'home' | 'recent' | 'back' | 'editor'>('home');

  const renderScreen = () => {
    switch (status) {
      case 'home':
        return <Home openApp={setStatus} />;
      case 'recent':
        return <Recent />;
      case 'back':
        return <Back />;
      case 'editor':
        return <TextEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="phone-frame">
      <div className="screen">
        {renderScreen()}
      </div>
      <StatusBar setStatus={setStatus} />
    </div>
  );
}

export default App;
