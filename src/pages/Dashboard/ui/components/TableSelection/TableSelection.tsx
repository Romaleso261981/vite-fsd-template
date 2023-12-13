import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import {} from '@tabler/icons-react';
import cx from 'clsx';

import { data } from './data/mockdata';
import classes from './TableSelection.module.css';

export const TableSelection = () => {
  const [selection, setSelection] = useState(['1']);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id),
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);

    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td onChange={() => toggleRow(item.id)}>{item.rule}</Table.Td>
        <Table.Td onChange={() => toggleAll()}>{item.nickName}</Table.Td>
        <Table.Td onChange={() => toggleAll()}>{item.phone}</Table.Td>
        <Table.Td onChange={() => toggleAll()}>{item.email}</Table.Td>
        <Group gap="sm">
          <LoadingOverlay />
          <Table.Td onChange={() => toggleAll()}>{item.balans}</Table.Td>
        </Group>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Group gap="sm" align="center">
              <Table.Th>ФИО</Table.Th>
            </Group>
            <Table.Th>Роль</Table.Th>
            <Table.Th>Никнейм</Table.Th>
            <Table.Th>Телефон</Table.Th>
            <Table.Th>Почта</Table.Th>
            <Table.Th>Баланс</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
