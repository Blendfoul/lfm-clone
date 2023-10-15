/** @type {import('next').NextConfig} */
const { join } = require('path');

const { withNx, composePlugins } = require('@nrwl/next');
const { withTamagui } = require('@tamagui/next-plugin');

const boolVals = {
  true: true,
  false: false,
};

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development';

const tamaguiPlugin = withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui'],
  importsWhitelist: ['constants.js', 'colors.js'],
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  logTimings: true,
  disableExtraction,
  enableCSSOptimizations: false,
  // experiment - reduced bundle size react-native-web
  useReactNativeWebLite: true,
  shouldExtract: (path) => {
    if (path.includes(join('packages', 'app'))) {
      return true;
    }
  },
  excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  modularizeImports: {
    '@tamagui/lucide-icons': {
      transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
      skipDefaultConversion: true,
    },
  },
  transpilePackages: [
    'solito',
    'react-native-web',
    'expo-linking',
    'expo-constants',
    'expo-modules-core',
  ],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      'lowfuelmotorsport.com',
      'steamcdn-a.akamaihd.net',
      'avatars.steamstatic.com',
      'api2.lowfuelmotorsport.com',
      'avatars.akamai.steamstatic.com',
      'api.lowfuelmotorsport.de',
    ],
  },
};

const plugins = [tamaguiPlugin, withNx];

module.exports = composePlugins(...plugins)(nextConfig);
