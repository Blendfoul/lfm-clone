import React from 'react';

import { UserInfoProps } from './props';
import { YStack, SizableText, Stack, Image, XStack, XGroup } from '../../atoms';
import { Card } from '../card';
import { License } from '../license/license.molecule';

export const UserInformation: React.FC<UserInfoProps> = ({
  avatar,
  license,
  name,
  ratingBySim,
  origin,
  safetyRating,
  team,
}) => {
  return (
    <Card
      bordered
      title=""
      m="$2"
      header={
        <>
          <Stack flexDirection="row" space>
            <YStack flex={1} space="$2">
              <XStack flex={1} jc="space-between" ai="center" gap="$2">
                <SizableText fontFamily="$body">{name}</SizableText>
                <Image
                  source={{ uri: `https://flagcdn.com/h40/${origin.toLowerCase()}.png` }}
                  alt={name}
                  width={35}
                  height={25}
                  borderRadius={5}
                  $platform-web={{
                    width: 35,
                    height: 25,
                    src: `https://flagcdn.com/h40/${origin.toLowerCase()}.png`,
                    alt: name,
                    style: {
                      borderRadius: 5,
                    },
                  }}
                />
              </XStack>
              <SizableText fontFamily="$body" theme="alt1" fontSize="$1">
                {team}
              </SizableText>
              <License license={license} safetyRating={safetyRating} safetyRatingDivision="C" />
            </YStack>
            <Image
              width={100}
              height={100}
              source={{ uri: avatar, width: 100, height: 100 }}
              borderRadius={5}
              $platform-web={{
                loading: 'eager',
                src: avatar,
                alt: name,
                width: 100,
                height: 100,
                style: {
                  borderRadius: 5,
                },
              }}
            />
          </Stack>
        </>
      }
      footer={
        <XStack space="$2" alignItems="center" jc="space-evenly" flex={1}>
          {ratingBySim.map((rating) => (
            <XGroup space="$1" size="$3" ai="center" key={rating.sim_id}>
              <XGroup.Item>
                <Stack ai="center" px="$2.5" bg="silver" py="$2">
                  <Image
                    source={{ uri: `https://lowfuelmotorsport.com${rating.logo_url}` }}
                    alt={rating.name}
                    width={45}
                    height={27}
                    $platform-web={{
                      width: 45,
                      height: 27,
                      src: `https://lowfuelmotorsport.com${rating.logo_url}`,
                      alt: rating.name,
                    }}
                  />
                </Stack>
              </XGroup.Item>
              <XGroup.Item>
                <SizableText
                  fontWeight="bold"
                  textAlign="center"
                  width="$6"
                  py="$2"
                  bg="silver"
                  color="white"
                >
                  {rating.rating}
                </SizableText>
              </XGroup.Item>
            </XGroup>
          ))}
        </XStack>
      }
    />
  );
};
