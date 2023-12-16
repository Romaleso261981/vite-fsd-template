import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import cx from 'clsx';

import { data } from './data/mockdata';
import classes from './TableSelection.module.css';

export const TableSelection = () => {
  const [selection, setSelection] = useState(['1']);
  const [sortedField, setSortedField] = useState<SortedField>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: SortedField) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  type MyData = {
    id: string;
    avatar: string;
    name: string;
    nickName: string;
    rule: string;
    phone: string;
    email: string;
    balans: number;
  };

  type SortedField = keyof MyData;

  // Ваша функція сортування
  const sortData = (data: MyData[], field: SortedField, direction: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }

      return aValue < bValue ? 1 : -1;
    });
  };

  const sortedData = sortData(data, sortedField, sortDirection);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id),
    );

  const rows = sortedData.map((item: MyData) => {
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
            <Table.Th onClick={() => handleSort('name')}>
              ФИО {sortedField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('rule')}>
              Роль {sortedField === 'rule' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('nickName')}>
              Никнейм{' '}
              {sortedField === 'nickName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('phone')}>
              Телефон {sortedField === 'phone' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('email')}>
              Почта {sortedField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('balans')}>
              Баланс {sortedField === 'balans' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
