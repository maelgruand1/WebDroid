import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { User } from './Classes/User';
import './styles/Signup.css';
import Login from './Login';

type Props = {
  onSignupSuccess: (user: User) => void;
};

const Signup: React.FC<Props> = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleSignup = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const db = getFirestore();
      const userRef = doc(collection(db, 'users'), firebaseUser.uid);
      await setDoc(userRef, {
        name,
        username,
      });

      const user = new User(firebaseUser.uid, name, username);
      onSignupSuccess(user);
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      alert("Erreur d'inscription !");
    }
  };

  if (showLogin) {
    return <Login onLoginSuccess={onSignupSuccess} />;
  }

  return (
    <div className="signup-container">
      <h1>Inscription</h1>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>S'inscrire</button>
      <p>You have an account login now ? <button onClick={() => setShowLogin(true)}>Se connecter</button></p>
    </div>
  );
};

export default Signup;
