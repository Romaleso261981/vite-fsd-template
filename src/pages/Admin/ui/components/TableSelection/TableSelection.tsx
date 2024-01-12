import { FC, useEffect, useState } from 'react';

import { TextInput, Title, Flex, Box, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../../../app/store';
import { useSelectLoading } from '../../../../../features/user/userSlice';
import { Direction, UserDataEnum } from '../../../../../shared/types/enums';
import { SortedField, User } from '../../../../../shared/types/Types';

import { Skelet } from './components/Skeleton/Skeleton';
import { sortData } from './helper/sortData';
import styles from './TableSelection.module.css';

type Props = {
  userData: User[];
};

export const TableSelection: FC<Props> = ({ userData = [] }) => {
  const [sortedField, setSortedField] = useState<SortedField>(UserDataEnum.ID);
  const [sortDirection, setSortDirection] = useState<Direction.ASC | Direction.DESC>(
    Direction.ASC,
  );
  const [users, setUsers] = useState<User[]>(userData);
  const isLoading = useAppSelector(useSelectLoading);

  const navigate = useNavigate();

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

  const userDetails = (id: string) => {
    navigate(`/admin/${id}`);
  };

  return (
    <>
      <Flex mih={50} gap="md" mt={80} justify="flex-start" direction="row">
        <Title
          className={styles.title}
          size="xs"
          onClick={() => handleSort(UserDataEnum.NAME)}
        >
          №
          {sortedField === UserDataEnum.NAME &&
            (sortDirection === Direction.ASC ? '↑' : '↓')}
        </Title>
        <Title
          className={styles.titleNickName}
          size="xs"
          onClick={() => handleSort(UserDataEnum.NAME)}
        >
          nickName
          {sortedField === UserDataEnum.NAME &&
            (sortDirection === Direction.ASC ? '↑' : '↓')}
        </Title>
        <Title
          className={styles.titleEmail}
          size="xs"
          onClick={() => handleSort(UserDataEnum.EMAIL)}
        >
          Email
          {sortedField === UserDataEnum.EMAIL &&
            (sortDirection === Direction.ASC ? '↑' : '↓')}
        </Title>
        <Title
          className={styles.titleRule}
          size="xs"
          onClick={() => handleSort(UserDataEnum.RULE)}
        >
          Rule
          {sortedField === UserDataEnum.NAME &&
            (sortDirection === Direction.ASC ? '↑' : '↓')}
        </Title>
      </Flex>
      {isLoading && <Skelet />}
      {!isLoading &&
        sortData(users, sortedField, sortDirection).map((item: User, index) => (
          <Box key={item.id}>
            <form>
              <Flex mih={50} gap="md" mt={10} justify="space-between" direction="row">
                <TextInput className={styles.inputNumber} defaultValue={index + 1} />
                <TextInput className={styles.inputName} defaultValue={item.name} />
                <TextInput className={styles.inputMail} defaultValue={item.email} />
                <TextInput className={styles.inputRule} defaultValue={item.rule} />
                <Button
                  variant="gradient"
                  onClick={() => userDetails(item.id)}
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                >
                  UserDetail
                </Button>
              </Flex>
            </form>
          </Box>
        ))}
    </>
  );
};
