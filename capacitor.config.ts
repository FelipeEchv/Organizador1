import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'BigNote',
  webDir: 'www',

  server:{
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: ['*']
  },
  plugins: {
    SQLite: {
      iosDatabaseLocation: 'library/Databases'
    }
  }
};

export default config;