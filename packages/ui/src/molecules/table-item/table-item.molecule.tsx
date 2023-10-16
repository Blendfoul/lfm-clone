import { TableItemProps } from './props';
import { Grid, SizableText, Image, YStack, Adapt, XGroup } from '../../atoms';

export const TableItem: React.FC<TableItemProps> = ({
  trackPosition,
  name,
  team,
  avatar,
  origin,
  children,
  ...rest
}) => {
  return (
    <Grid {...rest} justifyContent="space-between">
      <XGroup ai="center">
        <XGroup.Item>
          <SizableText width="$2.5" fontFamily="$body" textAlign="center">
            #{trackPosition}
          </SizableText>
        </XGroup.Item>
        <XGroup.Item>
          <Image
            source={{ uri: `https://flagcdn.com/h40/${origin}.png` }}
            alt={name.name}
            width={35}
            height={35}
            $platform-web={{
              width: 35,
              height: 35,
              src: `https://flagcdn.com/h40/${origin}.png`,
              alt: name.name,
              style: {
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              },
            }}
          />
        </XGroup.Item>
      </XGroup>
      <Image
        source={{ uri: avatar }}
        alt={name.name}
        width={35}
        height={35}
        $platform-web={{
          width: 35,
          height: 35,
          src: avatar,
          alt: name.name,
          style: {
            borderRadius: 5,
          },
        }}
      />
      <YStack space="$0" gap="$0">
        <SizableText fontFamily="$body">
          <Adapt when="gtSm">{name.name}</Adapt>
          <Adapt when="sm">{name.shortName}</Adapt>
        </SizableText>
        <Adapt when="gtSm">
          <SizableText fontFamily="$body" theme="alt1" fontSize="$1">
            {team}
          </SizableText>
        </Adapt>
      </YStack>
      {children}
    </Grid>
  );
};
