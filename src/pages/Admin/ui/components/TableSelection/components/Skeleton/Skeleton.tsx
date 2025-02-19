import { Box, Skeleton } from '@mantine/core';

export const Skelet = () => {
  return (
    <>
      <Box display="flex">
        <Skeleton height={40} width="4%" mb={30} mr={110} />
        <Skeleton height={40} width="30%" mr={100} />
        <Skeleton height={40} width="30%" mt={6} mr={100} />
        <Skeleton height={40} mt={6} width="8%" mr={80} />
        <Skeleton height={40} mt={6} width="10%" />
      </Box>
      <Box display="flex">
        <Skeleton height={40} width="4%" mb={30} mr={110} />
        <Skeleton height={40} width="30%" mr={100} />
        <Skeleton height={40} width="30%" mt={6} mr={100} />
        <Skeleton height={40} mt={6} width="8%" mr={80} />
        <Skeleton height={40} mt={6} width="10%" />
      </Box>
      <Box display="flex">
        <Skeleton height={40} width="4%" mb={30} mr={110} />
        <Skeleton height={40} width="30%" mr={100} />
        <Skeleton height={40} width="30%" mt={6} mr={100} />
        <Skeleton height={40} mt={6} width="8%" mr={80} />
        <Skeleton height={40} mt={6} width="10%" />
      </Box>
    </>
  );
};
