import { Container, Flex } from '@mantine/core';

import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header';

import { NavbarMinimal } from './ui/components/Navbar/Navbar';
import { TableSelection } from './ui/components/TableSelection/TableSelection';

const Dashboard = () => {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    mt: 'md',
  };

  return (
    <>
      <Header />
      <Container {...demoProps}>
        <Flex
          mih={50}
          bg="rgba(0, 0, 0, .3)"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <NavbarMinimal />
          <TableSelection />
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
