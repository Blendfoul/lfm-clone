'use client'

import '@tamagui/core/reset.css';

import { Stack } from '@lfm-clone/ui';
import { TamaguiProvider } from './TamaguiProvider';
import { ApplicationStateProvider, ContainerProvider } from '@lfm-clone/containers';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider>
          <ContainerProvider>
            <ApplicationStateProvider>
              <Stack padding="$3">
                {children}
              </Stack>
            </ApplicationStateProvider>
          </ContainerProvider>
        </TamaguiProvider>
      </body>
    </html>
  )
}
