import { useState } from 'react';

import { Center, Tooltip, UnstyledButton, Stack, rem, Burger } from '@mantine/core';
import { IconHome2, IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { mockdata } from './data/mockdata';
import classes from './NavbarMinimal.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

export const NavbarMinimal = () => {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };
  const goHome = () => {
    setActive(2);
    navigate('/auth');
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={goHome} />
  ));

  return (
    <>
      <Center>
        <Burger size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" onClick={logOut} />
      </Stack>
    </>
  );
};
