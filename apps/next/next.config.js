/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin');
const { withNx, composePlugins } = require('@nrwl/next');
const { join } = require('path');

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development';

const tamaguiPlugin = withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui'],
  importsWhitelist: ['constants.js', 'colors.js'],
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  logTimings: true,
  disableExtraction,
  // experiment - reduced bundle size react-native-web
  useReactNativeWebLite: true,
  shouldExtract: (path) => {
    if (path.includes(join('packages', 'app'))) {
      return true
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
    domains: ['lowfuelmotorsport.com', 'steamcdn-a.akamaihd.net'],
  },
};

const plugins = [
  tamaguiPlugin,
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
