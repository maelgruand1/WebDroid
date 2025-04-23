// /components/Home.tsx

import React from 'react';
import './styles/Home.css';
import SystemBar from './SystemBar'; // Importer le composant SystemBar
import textIcon from './images/icons/Venv.png';

type Props = {
  openApp: (app: 'editor') => void;
};

function Home({ openApp }: Props) {
    return (
      <div className="home-screen">
        <SystemBar /> {/* <- la barre dépliable ici */}
        <h1 className="App-title">WebDroid</h1>
        <p className="App-subtitle">Bienvenue sur votre Android du futur</p>
  
        <div className="app-grid">
          <div className="app-icon" onClick={() => openApp('editor')}>
            <img src={textIcon} alt="Text Editor" />
            <span>Ven (Text Editor)</span>
          </div>
        </div>
      </div>
    );
  }
  

export default Home;
