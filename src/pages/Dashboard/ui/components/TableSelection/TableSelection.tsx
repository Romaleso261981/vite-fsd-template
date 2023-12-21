import { useState } from 'react';

import { Table, ScrollArea, Group, Avatar, Text, LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { Direction, UserDataEnum } from '../../../../../shared/types/enums';
import { SortedField, UserData } from '../../../../../shared/types/Types';

import styles from './TableSelection.module.css';

type Props = {
  userData: UserData[];
};

export const TableSelection = (props: Props) => {
  const { userData = [] } = props;
  const navigate = useNavigate();
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
  const rows = sortedData.map((item: UserData) => {
    const handleNavigate = () => {
      navigate(`${item.id}`);
    };

    return (
      <Table.Tr key={item.id} onClick={handleNavigate} className={styles.item}>
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>
          <Group gap="sm">
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
