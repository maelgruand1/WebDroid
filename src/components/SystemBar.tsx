import React, { useEffect, useState } from 'react';
import BatteryStatus from './BateryStatus';
import NetworkStatus from './NetworkStatus';
import { System } from './Classes/System';
import './styles/SystemBar.css';

const SystemBar = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => setCurrentTime(System.getCurrentTime());
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleSystemBar = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Le petit déclencheur toujours visible */}
      <div className="system-bar-trigger" onClick={toggleSystemBar}>
        ▲
      </div>

      {/* La barre dépliable */}
      <div className={`system-bar ${isOpen ? 'open' : ''}`}>
        <BatteryStatus />
        <span className="time">{currentTime}</span>
        <NetworkStatus />
      </div>
    </>
  );
};

export default SystemBar;
