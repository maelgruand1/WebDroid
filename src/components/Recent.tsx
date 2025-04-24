import React from 'react';
import './styles/Recent.css';
import { User } from './Classes/User';

interface RecentProps {
  user: User; // Accepter l'utilisateur en prop
}

const Recent: React.FC<RecentProps> = ({ user }) => {
  return (
    <div className="recent-screen">
      <h1 className="App-title">Recents App</h1>
      
      <p>User : {user.name}</p> {/* Afficher le nom de l'utilisateur ou d'autres informations utiles */}
    </div>
  );
}

export default Recent;
