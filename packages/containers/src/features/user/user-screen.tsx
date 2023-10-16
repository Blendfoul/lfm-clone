import React from 'react';

import { ScrollView, UserInformation } from '@lfm-clone/ui';
import useSWR from 'swr';

import { User } from '../../types';

export const UserScreen: React.FC = () => {
  const { data } = useSWR<User>('user');

  if (!data) {
    return null;
  }

  return (
    <ScrollView>
      <UserInformation
        avatar={data?.avatar}
        license={data?.license}
        ratingBySim={data?.rating_by_sim}
        origin={data?.origin ?? 'pt'}
        name={`${data?.vorname} ${data?.nachname}`}
        team={data?.twitch_channel}
        safetyRating={data?.safety_rating ?? '0'}
      />
    </ScrollView>
  );
};
