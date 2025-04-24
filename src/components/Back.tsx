// components/Back.tsx

import React from 'react';
import './styles/Back.css';
import { User } from './Classes/User'; // Assure-toi que tu importes la classe User

type Props = {
  user: User; // Ajoute la prop `user` ici
};

function Back({ user }: Props) { // Utilise `user` comme prop
  return (
    <div className="back-screen">
      <h1 className="App-title">Back</h1>
      <p className="App-subtitle">Hey, {user.name}!</p> {/* Affiche le nom de l'utilisateur */}
    </div>
  );
}

export default Back;
