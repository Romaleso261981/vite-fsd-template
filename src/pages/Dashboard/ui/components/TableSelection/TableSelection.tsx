import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import {} from '@tabler/icons-react';
import cx from 'clsx';

import { data } from './data/mockdata';
import classes from './TableSelection.module.css';

export const TableSelection = () => {
  const [selection, setSelection] = useState(['1']);
  const [sortDirection, setSortDirection] = useState(true);
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

  const sortedField = 'columnName1';
  const toggleArow = (value: string) => {
    console.log(value);
    setSortDirection(!sortDirection);
  };

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Group
              align="center"
              onClick={() => {
                toggleArow('ФИО');
              }}
            >
              <Table.Th>ФИО</Table.Th>
              {sortedField === 'columnName1' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                toggleArow('Роль');
              }}
            >
              <Table.Th>Роль</Table.Th>
              {sortedField === 'columnName1' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                toggleArow('Никнейм');
              }}
            >
              <Table.Th>Никнейм</Table.Th>
              {sortedField === 'columnName1' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                toggleArow('Телефон');
              }}
            >
              <Table.Th>Телефон</Table.Th>
              {sortedField === 'columnName1' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                toggleArow('Почта');
              }}
            >
              <Table.Th>Почта</Table.Th>
              {sortedField === 'columnName1' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                toggleArow('Баланс');
              }}
            >
              <Table.Th>Баланс</Table.Th>
              {sortedField === 'columnName1' && (sortDirection ? '↑' : '↓')}
            </Group>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
