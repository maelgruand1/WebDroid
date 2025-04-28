// src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';

import RequireAuth from "./components/Register";
import Signup from './components/Signup';
import PhoneUI from './components/PhoneUI';
import { User } from './components/Classes/User';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleSignupSuccess = (newUser: User) => {
    setUser(newUser);
  };

  // ➔ Facultatif : demander la permission de Notifications
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

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

export default App;
