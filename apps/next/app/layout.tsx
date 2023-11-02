'use client';

import { ApplicationStateProvider, ContainerProvider, DialogProvider } from '@lfm-clone/containers';
import { Breadcrumb, Stack } from '@lfm-clone/ui';

import { TamaguiProvider } from './TamaguiProvider';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api2.lowfuelmotorsport.com" />
      </head>
      <body>
        <TamaguiProvider>
          <ContainerProvider>
            <ApplicationStateProvider>
              <DialogProvider>
                <Stack padding="$3" space>
                  <Breadcrumb
                    levels={[
                      {
                        label: 'Home',
                        href: '/',
                      },
                    ]}
                  />
                  {children}
                </Stack>
              </DialogProvider>
            </ApplicationStateProvider>
          </ContainerProvider>
        </TamaguiProvider>
      </body>
    </html>
  );
}
