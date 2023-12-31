import { XStack, Image, YStack, Paragraph } from '@lfm-clone/ui';
import useSWR from 'swr';

import { User } from '../types';

export const UserData: React.FC = () => {
  const { data, error } = useSWR<User>(`user`);

  if (error || !data) {
    return null;
  }

  return (
    <XStack space="$2" alignItems="center" justifyContent="center">
      <Image
        source={{ uri: data.avatar }}
        alt={data.name}
        width={50}
        height={50}
        $platform-web={{
          width: 50,
          height: 50,
          src: data.avatar,
          alt: data.name,
        }}
      />
      <YStack justifyContent="center" alignItems="center">
        <XStack space="$2" alignItems="center">
          {data.rating_by_sim.map((rating) => (
            <XStack space="$1" ai="center" key={rating.sim_id}>
              <Image
                source={{ uri: `https://lowfuelmotorsport.com${rating.logo_url}` }}
                alt={rating.name}
                width={16}
                height={16}
                $platform-web={{
                  width: 16,
                  height: 16,
                  src: `https://lowfuelmotorsport.com${rating.logo_url}`,
                  alt: rating.name,
                }}
              />
              <Paragraph>{rating.rating}</Paragraph>
            </XStack>
          ))}
        </XStack>
        <Paragraph>SR: {data.safety_rating}</Paragraph>
      </YStack>
    </XStack>
  );
};
