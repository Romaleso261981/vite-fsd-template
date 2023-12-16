import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import {} from '@tabler/icons-react';
import cx from 'clsx';

import { data } from './data/mockdata';
import classes from './TableSelection.module.css';

export const TableSelection = () => {
  const [selection, setSelection] = useState(['1']);
  const [sortDirection, setSortDirection] = useState(true);
  const [sortFild, setSortFild] = useState<string>('ФИО');
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

  const handleSort = (value: string) => {
    setSortFild(value);
    setSortDirection((prev) => !prev);
  };

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr className={classes.TableHeader}>
            <Group
              align="center"
              onClick={() => {
                handleSort('ФИО');
              }}
            >
              <Table.Th>ФИО</Table.Th>
              {sortFild === 'ФИО' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                handleSort('Роль');
              }}
            >
              <Table.Th>Роль</Table.Th>
              {sortFild === 'Роль' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                handleSort('Никнейм');
              }}
            >
              <Table.Th>Никнейм</Table.Th>
              {sortFild === 'Никнейм' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                handleSort('Телефон');
              }}
            >
              <Table.Th>Телефон</Table.Th>
              {sortFild === 'Телефон' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                handleSort('Почта');
              }}
            >
              <Table.Th>Почта</Table.Th>
              {sortFild === 'Почта' && (sortDirection ? '↑' : '↓')}
            </Group>
            <Group
              align="center"
              onClick={() => {
                handleSort('Баланс');
              }}
            >
              <Table.Th>Баланс</Table.Th>
              {sortFild === 'Баланс' && (sortDirection ? '↑' : '↓')}
            </Group>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
