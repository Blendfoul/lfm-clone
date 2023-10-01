import { Button, Paragraph, YStack } from '@lfm-clone/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'

import { useLink, useParams } from 'solito/navigation'

type Params = { id: string };

export function UserDetailScreen() {
  const { id } = useParams<Params>();
  const link = useLink({
    href: '/',
  })

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="700">{`User ID: ${id}`}</Paragraph>
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
