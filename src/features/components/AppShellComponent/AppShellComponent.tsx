import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { FormAddClient } from '../../../pages/Dashboard/ui/components/FormAddClient/FormAddClient';
import { NavbarMinimal } from '../../../pages/Dashboard/ui/components/Navbar/Navbar';
import { Search } from '../../../pages/Dashboard/ui/components/Search/Search';
import { TableSelection } from '../../../pages/Dashboard/ui/components/TableSelection/TableSelection';
import { Header } from '../Header';

export const AppShellComponent = () => {
  const [opened, { toggle }] = useDisclosure();

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
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p={10} w={80}>
        <NavbarMinimal />
      </AppShell.Navbar>

      <AppShell.Main pl={15} ml={100}>
        <FormAddClient />
        <Search />
        <TableSelection />
      </AppShell.Main>
    </AppShell>
  );
};
