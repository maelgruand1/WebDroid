// components/PhoneUI.tsx

import React, { useState } from 'react';
import Home from './Home';
import Recent from './Recent';
import Back from './Back';
import TextEditor from './TextEditor';
import StatusBar from './StatusBar';
import { User } from './Classes/User';

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

export default PhoneUI;
