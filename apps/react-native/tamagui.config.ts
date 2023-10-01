// don't import from here, that's handled already
// instead this is just setting types for this folder

// eslint-disable-next-line @nx/enforce-module-boundaries
import { config } from '../../packages/ui/src/tamagui.config';

type Conf = typeof config

declare module 'tamagui' {
  type TamaguiCustomConfig = Conf
}

export default config
