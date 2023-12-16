import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import {} from '@tabler/icons-react';
import cx from 'clsx';

import { data } from './data/mockdata';
import classes from './TableSelection.module.css';

export const TableSelection = () => {
  const [selection, setSelection] = useState(['1']);
  const [sortedField, setSortedField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (field === sortedField) {
      // Змінюємо напрямок сортування при кліку на ту ж колонку
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Змінюємо поле сортування та встановлюємо напрямок за замовчуванням
      setSortedField(field);
      setSortDirection('asc');
    }
  };
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
            <Table.Th onClick={() => handleSort('ФИО')}>
              ФИО {sortedField === 'ФИО' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('Роль')}>
              Роль {sortedField === 'Роль' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('Никнейм')}>
              Никнейм {sortedField === 'Никнейм' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('Телефон')}>
              Телефон {sortedField === 'Телефон' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('Почта')}>
              Почта {sortedField === 'Почта' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort('Баланс')}>
              Баланс {sortedField === 'Баланс' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
