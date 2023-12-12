import { Container } from '@mantine/core';

import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header';

import { NavbarMinimal } from './ui/components/Navbar/Navbar';

const Dashboard = () => {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    mt: 'md',
  };

  return (
    <>
      <Header />
      <Container {...demoProps}>
        <NavbarMinimal />
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
