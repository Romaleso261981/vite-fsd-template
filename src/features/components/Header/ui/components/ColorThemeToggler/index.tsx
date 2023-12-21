import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import classes from './ColorThemeToggler.module.css';

export const ColorThemeToggler = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <ActionIcon
        variant="subtle"
        className={classes.control}
        color={colorScheme === 'dark' ? 'white' : 'black'}
        size="xl"
        onClick={() => toggleColorScheme()}
      >
        {colorScheme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </ActionIcon>
    </Group>
  );
};
