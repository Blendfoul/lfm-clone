import { useMemo } from 'react';

import { LicenseProps } from './props';
import { SizableText, XGroup } from '../../atoms';

export const License: React.FC<LicenseProps> = ({
  license,
  safetyRating,
  safetyRatingDivision,
}) => {
  const licenseColors = useMemo(
    () => ({
      ROOKIE: 'red',
      IRON: '#515c5f',
      'IRON+': '#515c5f',
      BRONZE: '#bf8970',
      'BRONZE+': '#bf8970',
      SILVER: '#c0c0c0',
      'SILVER+': '#c0c0c0',
      GOLD: 'gold',
      'GOLD+': 'gold',
      PLATINUM: 'black',
      DIAMOND: '#305496',
      LEGEND: 'purple',
      ALIEN: 'greenyellow',
    }),
    []
  );

  const srColors = useMemo(
    () => ({
      F: 'red',
      E: '#808080',
      D: '#c65911',
      C: '#dbdbdb',
      B: '#ffff00',
      A: '#7030a0',
      S: '#00b050',
    }),
    []
  );

  return (
    <XGroup orientation="horizontal" size="$3">
      <XGroup.Item>
        <SizableText
          width="$4.5"
          textAlign="center"
          fontFamily="$body"
          backgroundColor={srColors['C']}
          px="$2"
          py="$0.5"
          fontWeight="bold"
        >
          {safetyRating}
        </SizableText>
      </XGroup.Item>
      <XGroup.Item>
        <SizableText
          width="$9"
          fontFamily="$body"
          backgroundColor={licenseColors[license]}
          color="white"
          px="$2"
          py="$0.5"
          textAlign="center"
          fontWeight="bold"
        >
          {license}
        </SizableText>
      </XGroup.Item>
    </XGroup>
  );
};
