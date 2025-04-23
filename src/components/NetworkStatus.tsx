import React, { useEffect, useState } from 'react';
import { System } from './Classes/System';

const NetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<string>('📶');

  useEffect(() => {
    const updateNetworkStatus = async () => {
      const status = await System.getNetworkStatus();
      setNetworkStatus(status);
    };

    updateNetworkStatus(); // Appel initial

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    const interval = setInterval(updateNetworkStatus, 2000); // Vérifie régulièrement

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="network-status">
      {networkStatus}
    </span>
  );
};

export default NetworkStatus;
