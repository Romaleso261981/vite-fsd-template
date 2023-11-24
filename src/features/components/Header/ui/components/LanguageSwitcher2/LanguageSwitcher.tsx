import { useState } from 'react';

import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import images from './images';
import classes from './LanguagePicker.module.css';

const data = [
  { label: 'En', image: images.english },
  { label: 'ua', image: images.ukraine2 },
];

export const LanguagePicker = () => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);

  const { i18n } = useTranslation();

  type props = {
    label: string;
    image: string;
  };
  const changeLanguage = (item: props) => {
    i18n.changeLanguage(item.label);
    setSelected(item);
  };

  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => changeLanguage(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
