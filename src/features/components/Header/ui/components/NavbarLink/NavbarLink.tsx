import { Stack, Tooltip, UnstyledButton, rem } from '@mantine/core';
import { IconHome2, IconLogin, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import { logOut, useSelectIsRegistered } from '../../../../../auth/authSlice';

import classes from './Navbar.module.css';

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

export const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(useSelectIsRegistered);
  const dispach = useAppDispatch();

  const hendlelogOut = () => {
    dispach(logOut());
    navigate('/auth');
  };
  const hendlelogin = () => {
    navigate('/auth');
  };

  return (
    <Stack justify="center" gap={0}>
      {isAuth ? (
        <NavbarLink icon={IconLogout} label="Logout" onClick={hendlelogOut} />
      ) : (
        <NavbarLink icon={IconLogin} label="Logout" onClick={hendlelogin} />
      )}
    </Stack>
  );
};
