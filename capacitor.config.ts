import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.growthquest.seityou',
  appName: '成長の書',
  webDir: 'dist-standalone',
  backgroundColor: '#05060f',
  ios: {
    contentInset: 'always',
    backgroundColor: '#05060f',
  },
}

export default config
