import { Button, Flex, Input, Text, Title } from '@mantine/core';

import s from './FormAddClient.module.css';

export const FormAddClient = () => {
  return (
    <Flex
      mih={50}
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Title order={1}>Клиенты</Title>
      <Flex
        mih={50}
        gap="sm"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Text size="xl">Всего: 18</Text>
        <Button variant="filled">Button</Button>
      </Flex>
      <Flex
        mih={50}
        gap="sm"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Input.Wrapper label="Телефон">
          <Input placeholder="+380689478723" className={s.input} />
        </Input.Wrapper>
        <Input.Wrapper label="Никнейм">
          <Input placeholder="example" className={s.input} />
        </Input.Wrapper>
        <Input.Wrapper label="ФИО">
          <Input placeholder="Petro Petrov" className={s.input} />
        </Input.Wrapper>
        {/* <FileInput size="xs" placeholder="Input placeholder" />
        <FileInput size="xs" placeholder="Input placeholder" />
        <FileInput size="xs" placeholder="Input placeholder" /> */}
      </Flex>
    </Flex>
  );
};
