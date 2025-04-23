export class System {
    static async getBatteryStatus() {
      const nav: any = navigator;
      if ('getBattery' in nav) {
        const battery = await nav.getBattery();
        return {
          level: Math.round(battery.level * 100),
          isCharging: battery.charging
        };
      }
      return { level: 100, isCharging: false }; // Valeur par défaut
    }
  
    static getCurrentTime() {
      const date = new Date();
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    // Nouvelle version ASYNCHRONE
    static async getNetworkStatus(): Promise<string> {
      try {
        await fetch('https://clients3.google.com/generate_204', {
          method: 'GET',
          mode: 'no-cors',
          cache: 'no-cache'
        });
        return '📶';
      } catch {
        return '❌';
      }
    }
  }
  