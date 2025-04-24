import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
import { User } from './Classes/User';
import './styles/Login.css';
type Props = {
  onLoginSuccess: (user: User) => void;
};

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const db = getFirestore();
      const docRef = doc(collection(db, 'users'), firebaseUser.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const user = User.fromData(snap.id, snap.data());
        onLoginSuccess(user);
      } else {
        alert("Profil utilisateur introuvable");
      }
      
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Erreur de connexion !");
    }
  };

  return (
    <div className='login-container'>
      <h1>Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
