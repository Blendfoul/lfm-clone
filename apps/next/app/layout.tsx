'use client';

import { ApplicationStateProvider, ContainerProvider } from '@lfm-clone/containers';
import { Breadcrumb, Stack } from '@lfm-clone/ui';

import { TamaguiProvider } from './TamaguiProvider';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider>
          <ContainerProvider>
            <ApplicationStateProvider>
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
            </ApplicationStateProvider>
          </ContainerProvider>
        </TamaguiProvider>
      </body>
    </html>
  );
}
