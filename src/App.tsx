import React, { useState } from 'react';
import './App.css';
import RequireAuth from "./components/Register"; // Vérifie l'authentification
import Signup from './components/Signup'; // Importation de Signup
import Home from './components/Home';
import Recent from './components/Recent';
import StatusBar from './components/StatusBar';
import Back from './components/Back';
import TextEditor from './components/TextEditor';
import { User } from './components/Classes/User';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleSignupSuccess = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <>
      {!user ? (
        <Signup onSignupSuccess={handleSignupSuccess} />
      ) : (
        <RequireAuth>
          {(user: User) => <PhoneUI user={user} />}
        </RequireAuth>
      )}
    </>
  );
}

type MainAppProps = {
  user: User;
};

const PhoneUI: React.FC<MainAppProps> = ({ user }) => {
  const [status, setStatus] = useState<'home' | 'recent' | 'back' | 'editor'>('home');

  const renderScreen = () => {
    switch (status) {
      case 'home':
        return <Home openApp={setStatus} user={user} />;
      case 'recent':
        return <Recent user={user} />;
      case 'back':
        return <Back user={user} />;
      case 'editor':
        return <TextEditor user={user} />;
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
};

export default App;
