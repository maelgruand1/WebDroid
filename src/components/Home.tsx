// components/Home.tsx

import React from 'react';
import './styles/Home.css';
import SystemBar from './SystemBar'; // Importer le composant SystemBar
import textIcon from './images/icons/Venv.png';
import { User } from './Classes/User';  // Assurer que User est bien importé

type Props = {
  openApp: (app: 'editor') => void;
  user: User;  // Définir la prop `user` ici
};

function Home({ openApp, user }: Props) {  // Ajouter `user` dans les props de `Home`
  return (
    <div className="home-screen">
      <SystemBar /> {/* <- la barre dépliable ici */}
      <h1 className="App-title">WebDroid</h1>
      
      <p className="App-subtitle">Welcome, {user.name}!</p>  {/* Affiche le nom de l'utilisateur */}

      <div className="app-grid">
        <div className="app-icon" onClick={() => openApp('editor')}>
          <img src={textIcon} alt="Text Editor"  data-title="Ven (Text-Editor)"/>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
