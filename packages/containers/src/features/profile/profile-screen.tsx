import React from 'react';

import { Grid, ScrollView, SizableText, UserInformation } from '@lfm-clone/ui';
import { useParams } from 'solito/navigation';
import useSWR from 'swr';

import { User } from '../../types';

type Params = {
  id: string;
};

export const ProfileScreen: React.FC = () => {
  const { id } = useParams<Params>();
  const { data } = useSWR<User>(`users/getUserData/${id}`);

  if (!data) {
    return null;
  }

  return (
    <ScrollView>
      <Grid gridTemplateColumns="auto 1fr">
        <UserInformation
          avatar={data?.avatar}
          license={data?.license}
          ratingBySim={data?.rating_by_sim}
          origin={data?.origin ?? 'pt'}
          name={`${data?.vorname} ${data?.nachname}`}
          team={data?.twitch_channel}
          safetyRating={data?.safety_rating ?? '0'}
        />
        <Grid gridTemplateColumns="1fr" gap="$2">
          <SizableText>Hello world</SizableText>
        </Grid>
      </Grid>
    </ScrollView>
  );
};
