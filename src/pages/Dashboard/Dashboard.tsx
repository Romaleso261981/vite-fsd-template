import { Container, Flex } from '@mantine/core';

import { FormAddClient } from './ui/components/FormAddClient/FormAddClient';
import { NavbarMinimal } from './ui/components/Navbar/Navbar';
import { Search } from './ui/components/Search/Search';
import { TableSelection } from './ui/components/TableSelection/TableSelection';

const Dashboard = () => {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
  };

  return (
    <Container size="xl" {...demoProps}>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <NavbarMinimal />
        <Flex
          mih={40}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <FormAddClient />
          <Search />
          <TableSelection />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Dashboard;
