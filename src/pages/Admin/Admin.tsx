import { FC, useEffect } from 'react';

import { AppShell, Box, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { useSelectUserData } from '../../features/auth/authSlice';
import { getData, useSelectData } from '../../features/user/userSlice';

import { FormAddClient } from './ui/components/FormAddClient/FormAddClient';
import { Search } from './ui/components/Search/Search';
import { TableSelection } from './ui/components/TableSelection/TableSelection';

const Admin: FC = () => {
  const dataUsers = useAppSelector(useSelectData);
  const dispach = useAppDispatch();
  const userData = useAppSelector(useSelectUserData);
  const { t } = useTranslation();

  useEffect(() => {
    dispach(getData());
  }, [dispach]);

  if (userData?.email !== 'ladiginscormag@gmail.com') {
    return (
      <Box ta="center">
        <Text size="lg" ff="monospace">
          {t('AUTH.noAccess')}
        </Text>
      </Box>
    );
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Main pl={15} pr={40} ml={100}>
        <FormAddClient userData={dataUsers} />
        <Search />
        <TableSelection userData={dataUsers} />
      </AppShell.Main>
    </AppShell>
  );
};

export default Admin;
