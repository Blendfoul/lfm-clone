import { useMemo } from 'react';

import { LicenseProps } from './props';
import { checkSrLicense } from './utils';
import { SizableText, XGroup } from '../../atoms';

export const License: React.FC<LicenseProps> = ({ license, safetyRating }) => {
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

  const calculatedSafetyRatingLicense = useMemo(
    () => checkSrLicense(+safetyRating),
    [safetyRating]
  );

  return (
    <XGroup orientation="horizontal" size="$3">
      <XGroup.Item>
        <SizableText
          width="$6.5"
          textAlign="center"
          fontFamily="$body"
          backgroundColor={srColors[calculatedSafetyRatingLicense[0]]}
          px="$2"
          py="$0.5"
          fontWeight="bold"
          fontSize="$1"
        >
          {calculatedSafetyRatingLicense} ({safetyRating})
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
          fontSize="$1"
        >
          {license}
        </SizableText>
      </XGroup.Item>
    </XGroup>
  );
};
