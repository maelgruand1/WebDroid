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

  static async getNetworkStatus(): Promise<string> {
    try {
      await fetch('https://clients3.google.com/generate_204', {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return '📶'; // Connecté
    } catch {
      return '❌'; // Pas connecté
    }
  }

  // 🛎️ Envoyer une notification Web (sans erreurs TS)
  static async sendNotification(title: string, body: string) {
    if (!('Notification' in window)) {
      console.warn("Notifications not supported on this browser.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico' // ➔ tu peux personnaliser ici ton icône de notif
      });
    } else {
      console.warn("Notification permission denied.");
    }
  }
}
