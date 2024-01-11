import { useEffect, useState } from 'react';

import { Button, Container, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Userdetails.module.css';

import { useAppDispatch } from '@/app/store';
import { editUser } from '@/features/user/userSlice';
import { getUserRefById } from '@/shared/helpers/getUserById';
import { User } from '@/shared/types/Types';

const Userdetails = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispach = useAppDispatch();

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

  const form = useForm({
    initialValues: {
      email: '',
      rule: '',
      name: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value!) ? null : 'Invalid email'),
    },
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user.name,
        email: user.email,
        rule: user.rule,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSave = () => {
    const updatedUser: Partial<User> = {
      ...form.values,
    };

    setUser(updatedUser);
    if (id) {
      dispach(editUser({ id, user: updatedUser }));
      notifications.show({
        title: 'success',
        message: 'Ви успішно змінили данні',
      });
    }
  };

  return (
    <Container>
      <form className={styles.formWrapper}>
        <TextInput
          className={styles.input}
          label="Name"
          placeholder="your@email.com"
          {...form.getInputProps('name')}
        />
        <TextInput
          className={styles.input}
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          className={styles.input}
          label="Rule"
          placeholder="your@email.com"
          {...form.getInputProps('rule')}
        />
        <Group gap="xl" grow>
          <Button
            fullWidth
            variant="gradient"
            onClick={handleSave}
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            Save
          </Button>
          <Button
            fullWidth
            variant="gradient"
            onClick={() => navigate('/admin')}
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            Go Back
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default Userdetails;
