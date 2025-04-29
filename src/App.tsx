<<<<<<< Updated upstream
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Recent from './components/Recent';
import StatusBar from './components/StatusBar';
import Back from './components/Back';
import TextEditor from './components/TextEditor';

=======
import './App.css';
import StatusBar from './components/StatusBar';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        {renderScreen()}
      </div>
      <StatusBar setStatus={setStatus} />
=======
        <h1 className="App-title">WebDroid</h1>
        <p className="App-subtitle">Bienvenue sur votre Android du futur</p>
        <StatusBar/>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
