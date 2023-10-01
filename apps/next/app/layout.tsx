'use client'

import { TamaguiProvider } from './TamaguiProvider';
import { ApplicationStateProvider, ContainerProvider } from '@lfm-clone/containers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider>
          <ContainerProvider>
            <ApplicationStateProvider>
              {children}
            </ApplicationStateProvider>
          </ContainerProvider>
        </TamaguiProvider>
      </body>
    </html>
  )
}
