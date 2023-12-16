import React, { useState } from 'react';

import { Avatar, Group, LoadingOverlay, Table, Text } from '@mantine/core';

// import classes from './SortableTable.module.css';

interface TableProps {
  data: any[]; // Ваші дані для відображення в таблиці
}

export const SortableTable: React.FC<TableProps> = ({ data }) => {
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

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortedField];
    const bValue = b[sortedField];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }

    return aValue < bValue ? 1 : -1;
  });

  const rows = sortedData.map((item) => {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <Group gap="md">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.rule}</Table.Td>
        <Table.Td>{item.nickName}</Table.Td>
        <Table.Td>{item.phone}</Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Group gap="sm">
          <LoadingOverlay />
          <Table.Td>{item.balans}</Table.Td>
        </Group>
      </Table.Tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('ФИО')}>
            ФИО {sortedField === 'ФИО' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('Роль')}>
            Роль {sortedField === 'Роль' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('Никнейм')}>
            Никнейм {sortedField === 'Никнейм' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('Телефон')}>
            Телефон {sortedField === 'Телефон' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('Почта')}>
            Почта {sortedField === 'Почта' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('Баланс')}>
            Баланс {sortedField === 'Баланс' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
