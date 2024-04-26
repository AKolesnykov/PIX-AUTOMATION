import { LaunchOptions } from 'playwright';
interface IBrowserSettings {
  defaultStateHeadless: boolean;
  docker: IBrowserLaunchSettings;
  localHeadless: IBrowserLaunchSettings;
  localWithHead: IBrowserLaunchSettings;
}
interface IBrowserLaunchSettings {
  browserOptions: LaunchOptions;
  // contextOptions: BrowserContextOptions;
}

export const browserSettings: IBrowserSettings = {
  docker: {
    browserOptions: {
      args: [
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--disk-cache-size=33554432',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
        '--single-process',
        '--disable-gpu',
        '--font-render-hinting=none',
        '--start-fullscreen',
        '--start-maximized',
      ],
      headless: true,
      executablePath: process.env.EXC_PATH,
    },
    // contextOptions: {
    //   viewport: { width: 1700, height: 800 },
    //   recordVideo: { dir: '/tmp/' },
    //   locale: 'en-US',
    // },
  },
  localHeadless: {
    browserOptions: {
      args: ['--start-fullscreen', '--start-maximized'],
      headless: true,
    },
    // contextOptions: {
    //   viewport: { width: 1700, height: 800 },
    //   recordVideo: { dir: '/tmp/' },
    //   locale: 'en-US',
    // },
  },
  localWithHead: {
    browserOptions: {
      headless: false,
    },
    // contextOptions: {
    //   viewport: { width: 1200, height: 800 },
    //   recordVideo: { dir: 'test-results/' },
    //   locale: 'en-US',
    // },
  },
  defaultStateHeadless: false,
};
