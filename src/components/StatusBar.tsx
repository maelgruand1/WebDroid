import React from "react";
import './styles/StatusBar.css';
import home from './images/icons/home.png';
import recent from './images/icons/recent.png';
import back from './images/icons/back.png';

type Props = {
  setStatus: (status: 'home' | 'recent' | 'back') => void;
};

function StatusBar({ setStatus }: Props) {
  return (
    <div className="status-bar">
      <div className="nav-icon" onClick={() => setStatus('back')}>
        <img src={back} alt="Back" />
      </div>
      <div className="nav-icon" onClick={() => setStatus('home')}>
        <img src={home} alt="Home" />
      </div>
      <div className="nav-icon" onClick={() => setStatus('recent')}>
        <img src={recent} alt="Recent" />
      </div>
    </div>
  );
}

export default StatusBar;
