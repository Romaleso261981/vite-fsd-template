import { useEffect, useState } from 'react';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { getFirestoreData } from '../../shared/helpers/getData';
import { DatabasePaths } from '../../shared/types/enums';
import { UserData } from '../../shared/types/Types';
import { FormAddClient } from '../Dashboard/ui/components/FormAddClient/FormAddClient';
import { NavbarMinimal } from '../Dashboard/ui/components/Navbar/Navbar';
import { Search } from '../Dashboard/ui/components/Search/Search';
import { TableSelection } from '../Dashboard/ui/components/TableSelection/TableSelection';

const Admin = () => {
  const [opened, { toggle }] = useDisclosure();
  const [userData, setUserData] = useState<UserData[]>([]);
  const getData = async () => {
    const data = await getFirestoreData<UserData>(DatabasePaths.USERS, 20);

    if (data) {
      setUserData(data as UserData[]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar p={10} w={80}>
        <NavbarMinimal />
      </AppShell.Navbar>

      <AppShell.Main pl={15} ml={100}>
        <FormAddClient userData={userData} />
        <Search />
        <TableSelection userData={userData} />
      </AppShell.Main>
    </AppShell>
  );
};

export default Admin;
