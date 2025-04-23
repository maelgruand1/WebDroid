// /components/BatteryStatus.tsx

import React, { useEffect, useState } from 'react';
import { System } from './Classes/System';

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [isCharging, setIsCharging] = useState<boolean>(false);

  useEffect(() => {
    const updateBatteryStatus = async () => {
      const { level, isCharging } = await System.getBatteryStatus();
      setBatteryLevel(level);
      setIsCharging(isCharging);
    };

    updateBatteryStatus();
  }, []);

  return (
    <span className="battery-status">
      🔋 {batteryLevel}% {isCharging && '(Charging)'}
    </span>
  );
};

export default BatteryStatus;

