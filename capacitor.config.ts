import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.097ee2f7b418454a8c7afafb643dcfd7',
  appName: 'alaska-newspage',
  webDir: 'dist',
  server: {
    url: 'https://097ee2f7-b418-454a-8c7a-fafb643dcfd7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
