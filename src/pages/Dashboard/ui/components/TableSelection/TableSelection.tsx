import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import cx from 'clsx';

import { Direction, UserDataEnum } from '../../../../../shared/types/enums';
import { SortedField, UserData } from '../../../../../shared/types/Types';

import classes from './TableSelection.module.css';

type Props = {
  userData: UserData[];
};

export const TableSelection = (props: Props) => {
  const { userData } = props;

  const [selection, setSelection] = useState(['1']);
  const [sortedField, setSortedField] = useState<SortedField>(UserDataEnum.ID);
  const [sortDirection, setSortDirection] = useState<Direction.ASC | Direction.DESC>(
    Direction.ASC,
  );

  const handleSort = (field: SortedField) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === Direction.ASC ? Direction.DESC : Direction.ASC);
    } else {
      setSortedField(field);
      setSortDirection(Direction.ASC);
    }
  };

  const sortData = (
    userData: UserData[],
    field: SortedField,
    direction: Direction.ASC | Direction.DESC,
  ) => {
    return [...userData].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (direction === Direction.DESC) {
        return aValue > bValue ? 1 : -1;
      }

      return aValue < bValue ? 1 : -1;
    });
  };

  const sortedData = sortData(userData, sortedField, sortDirection);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === userData.length ? [] : userData.map((item) => item.id),
    );

  const rows = sortedData.map((item: UserData) => {
    const selected = selection.includes(item.id);

    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td onChange={() => toggleRow(item.id)}>{item.id}</Table.Td>
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
            <Table.Th onClick={() => handleSort(UserDataEnum.ID)}>
              ID{' '}
              {sortedField === UserDataEnum.ID &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.NAME)}>
              ФИО{' '}
              {sortedField === UserDataEnum.NAME &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.RULE)}>
              Роль{' '}
              {sortedField === UserDataEnum.RULE &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.NICKNAME)}>
              Никнейм{' '}
              {sortedField === UserDataEnum.NICKNAME &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.PHONE)}>
              Телефон{' '}
              {sortedField === UserDataEnum.PHONE &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.EMAIL)}>
              Почта{' '}
              {sortedField === UserDataEnum.EMAIL &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.BALANS)}>
              Баланс{' '}
              {sortedField === UserDataEnum.BALANS &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
