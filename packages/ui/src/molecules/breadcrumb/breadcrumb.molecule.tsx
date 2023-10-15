import { useMemo, type FC } from 'react';

import type { BreadcrumbProps } from './props';

import { Stack as Box, Button, Nav, Text } from '../../atoms/index';
import { Link } from "solito/link";

import { ArrowLeft } from '@tamagui/lucide-icons';

const Breadcrumb: FC<BreadcrumbProps> = ({
  levels,
  separator,
  onBackClick,
  rightElement,
  backgroundColor,
  textColor,
  lastLevelInteractive = true,
  ...props
}) => {

  const breadcrumbLevels = useMemo(() => {
    return levels.map(({ label, href }, index) => {
      const isLastLevel = levels.length - 1 === index;
      const labelEl =
        isLastLevel && !lastLevelInteractive ? (
          <Text fontFamily="$body" color={textColor}>{label}</Text>
        ) : (
          <Link color={textColor} href={href}>
            {label}
          </Link>
        );

      return (
        <Box key={`${label}-${href}`} gap={1}>
          <Text fontFamily="$body">{labelEl}</Text>
          {index < levels.length - 1 && (
            <Text color={textColor} fontSize="$2" fontFamily="$body" >
              {separator}
            </Text>
          )}
        </Box>
      );
    });
  }, [levels]);

  return (
    <Nav
      {...props}
      role="navigation"
      accessibilityLabel="breadcrumbs navigator"
      backgroundColor={backgroundColor}
    >
      {onBackClick && (
        <Button variant="outlined" onPress={onBackClick}>
          <ArrowLeft color={textColor} />
        </Button>
      )}
      <Box gap={1}>
        {breadcrumbLevels}
      </Box>
      <Box ml={3}>{rightElement}</Box>
    </Nav>
  );
};

export { Breadcrumb };
