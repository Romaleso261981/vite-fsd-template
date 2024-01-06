import { FC, useEffect, useState } from 'react';

import {
  Table,
  ScrollArea,
  Group,
  Avatar,
  ActionIcon,
  rem,
  Autocomplete,
} from '@mantine/core';
import { IconPencil, IconFileCheck } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../../app/store';
import { editUser } from '../../../../../features/user/userSlice';
import { Direction, UserDataEnum } from '../../../../../shared/types/enums';
import { SortedField, User } from '../../../../../shared/types/Types';

import styles from './TableSelection.module.css';

type Props = {
  userData: User[];
};

export const TableSelection: FC<Props> = ({ userData = [] }) => {
  const dispach: AppDispatch = useDispatch();
  const [sortedField, setSortedField] = useState<SortedField>(UserDataEnum.ID);
  const [sortDirection, setSortDirection] = useState<Direction.ASC | Direction.DESC>(
    Direction.ASC,
  );
  const [editing, setEditing] = useState<string | null>();
  const [users, setUsers] = useState<User[]>(userData);

  useEffect(() => {
    if (userData !== null) {
      setUsers(userData);
    }
  }, [userData]);

  const handleSort = (field: SortedField) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === Direction.ASC ? Direction.DESC : Direction.ASC);
    } else {
      setSortedField(field);
      setSortDirection(Direction.ASC);
    }
  };

  const sortData = (
    userData: User[],
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

  const handleEdit = (id: any) => {
    setEditing(id);
  };

  const handleChange = (id: string, updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)),
    );
  };
  const handleSave = (id: string, updatedUser: User) => {
    dispach(editUser({ id, updatedUser }));
    setEditing(null);
  };

  const getActionButton = (id: string, user: User) => {
    if (editing === id) {
      return (
        <ActionIcon variant="subtle" color="gray">
          <IconFileCheck
            onClick={() => handleSave(id, user)}
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
      );
    }

    return (
      <ActionIcon variant="subtle" color="gray">
        <IconPencil
          onClick={() => handleEdit(id)}
          style={{ width: rem(16), height: rem(16) }}
          stroke={1.5}
        />
      </ActionIcon>
    );
  };

  const sortedData = sortData(users, sortedField, sortDirection);
  const rows = sortedData.map((item: User) => {
    return (
      <Table.Tr key={item.id} className={styles.item}>
        {editing === item.id ? (
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} src={item.profilePic} radius={26} />
              <Autocomplete
                type="text"
                value={item.name}
                className={styles.Input}
                onChange={(value) => handleChange(item.id, { name: value } as User)}
              />
            </Group>
          </Table.Td>
        ) : (
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} src={item.profilePic} radius={26} />
              <Autocomplete className={styles.Input} value={item.name} />
            </Group>
          </Table.Td>
        )}
        {editing === item.id ? (
          <Table.Td>
            <Autocomplete
              className={styles.Input}
              type="text"
              value={item.rule}
              onChange={(value) => handleChange(item.id, { rule: value } as User)}
            />
          </Table.Td>
        ) : (
          <Table.Td>
            <Autocomplete className={styles.Input} value={item.rule} />
          </Table.Td>
        )}
        {editing === item.id ? (
          <Table.Td>
            <Autocomplete
              className={styles.Input}
              type="text"
              value={item.name}
              onChange={(value) => handleChange(item.id, { name: value } as User)}
            />
          </Table.Td>
        ) : (
          <Table.Td>
            <Autocomplete className={styles.Input} value={item.name} />
          </Table.Td>
        )}
        {editing === item.id ? (
          <Table.Td>
            <Autocomplete
              className={styles.Input}
              type="text"
              value={item.email}
              onChange={(value) => handleChange(item.id, { email: value } as User)}
            />
          </Table.Td>
        ) : (
          <Table.Td>
            <Autocomplete className={styles.Input} value={item.email} />
          </Table.Td>
        )}
        <Group gap={0} justify="flex-end">
          {getActionButton(item.id, item)}
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
              ФИО{' '}
              {sortedField === UserDataEnum.ID &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.RULE)}>
              Роль{' '}
              {sortedField === UserDataEnum.RULE &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.NAME)}>
              Никнейм{' '}
              {sortedField === UserDataEnum.NAME &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
            <Table.Th onClick={() => handleSort(UserDataEnum.EMAIL)}>
              почта{' '}
              {sortedField === UserDataEnum.EMAIL &&
                (sortDirection === Direction.ASC ? '↑' : '↓')}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
