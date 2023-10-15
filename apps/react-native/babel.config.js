module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ...(process.env.EAS_BUILD_PLATFORM === 'android'
      ? []
      : [
          [
            '@tamagui/babel-plugin',
            {
              components: ['@lfm-clone/ui', 'tamagui'],
              config: './tamagui.config.ts',
            },
          ],
        ]),
    'transform-inline-environment-variables',
  ],
};
