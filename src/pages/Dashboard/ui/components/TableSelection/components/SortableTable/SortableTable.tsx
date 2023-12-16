import React, { useState } from 'react';

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

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('columnName1')}>
            q {sortedField === 'columnName1' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('columnName2')}>
            {' '}
            {sortedField === 'columnName2' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          {/* Додайте інші колонки за необхідністю */}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            <td>{item.columnName1}</td>
            <td>{item.columnName2}</td>
            {/* Додайте інші комірки за необхідністю */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
