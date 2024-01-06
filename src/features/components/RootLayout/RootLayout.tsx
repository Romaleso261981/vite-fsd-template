import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

const RootLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default RootLayout;
