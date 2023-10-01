import { config } from '@lfm-clone/ui'

export type Conf = typeof config

declare module 'tamagui' {
  type TamaguiCustomConfig = Conf
}

export  { config };
