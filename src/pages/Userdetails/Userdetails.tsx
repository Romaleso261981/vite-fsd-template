import { useEffect, useState } from 'react';

import {
  ActionIcon,
  Autocomplete,
  Button,
  Container,
  Group,
  Table,
  rem,
} from '@mantine/core';
import { IconFileCheck, IconEdit } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../app/store';
import { editUser } from '../../features/user/userSlice';
import { getUserRefById } from '../../shared/helpers/getUserById';
import { User } from '../../shared/types/Types';

import styles from './Userdetails.module.css';

const Userdetails = () => {
  const [user, setUser] = useState<User>();
  const [editing, setEditing] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispach = useAppDispatch();
  const goBack = () => {
    navigate('/admin');
  };

  const getUser = async (id: string) => {
    if (id) {
      const data = (await getUserRefById(id)) as User;

      if (data) {
        setUser(data);
      }
    }
  };

  useEffect(() => {
    getUser(id!);
  }, [id]);

  const handleChange = (updatedUser: User) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (updatedUser: User) => {
    dispach(editUser({ id, updatedUser }));
    setEditing(false);
  };

  const getActionButton = (user: User) => {
    if (editing) {
      return (
        <ActionIcon variant="subtle" color="gray">
          <IconFileCheck
            onClick={() => handleSave(user)}
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
      );
    }

    return (
      <ActionIcon variant="subtle" color="gray">
        <IconEdit
          onClick={() => handleEdit()}
          style={{ width: rem(16), height: rem(16) }}
          stroke={1.5}
        />
      </ActionIcon>
    );
  };

  return (
    <Container>
      <Button
        variant="gradient"
        mb={50}
        onClick={goBack}
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Go Admin
      </Button>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Rule</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr key={user?.id}>
              {editing ? (
                <Table.Td>
                  <Autocomplete
                    type="text"
                    value={user?.name}
                    onChange={(value) => handleChange({ name: value } as User)}
                  />
                </Table.Td>
              ) : (
                <Table.Td>
                  <Autocomplete value={user?.name} />
                </Table.Td>
              )}
              {editing ? (
                <Table.Td>
                  <Autocomplete
                    type="text"
                    value={user?.email}
                    className={styles.Input}
                    onChange={(value) => handleChange({ email: value } as User)}
                  />
                </Table.Td>
              ) : (
                <Table.Td>
                  <Autocomplete value={user?.email} />
                </Table.Td>
              )}
              {editing ? (
                <Table.Td>
                  <Autocomplete
                    type="text"
                    value={user?.rule}
                    className={styles.Input}
                    onChange={(value) => handleChange({ rule: value } as User)}
                  />
                </Table.Td>
              ) : (
                <Table.Td>
                  <Autocomplete value={user?.rule} />
                </Table.Td>
              )}
              <Table.Td>
                <Group gap={0} justify="flex-end">
                  {getActionButton(user!)}
                </Group>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Container>
  );
};

export default Userdetails;
