import { Button, Flex, Input } from '@mantine/core';

import s from './Search.module.css';

export const Search = () => {
  return (
    <Flex
      mih={50}
      gap="sm"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Input placeholder="example" className={s.input} />
      {/* <FileInput size="xs" placeholder="Input placeholder" /> */}
      <Button variant="filled">Сбросить</Button>
    </Flex>
  );
};
