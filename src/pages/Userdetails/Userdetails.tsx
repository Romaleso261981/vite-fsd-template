import { useEffect, useState } from 'react';

import { Button, Container, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useParams } from 'react-router-dom';

import styles from './Userdetails.module.css';

import { useAppDispatch } from '@/app/store';
import { editUser } from '@/features/user/userSlice';
import { getUserRefById } from '@/shared/helpers/getUserById';
import { hadleError } from '@/shared/helpers/hadleError';
import { User } from '@/shared/types/Types';

const Userdetails = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const { id } = useParams();
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
      hadleError({
        title: 'success',
        message: 'Ви успішно змінили данні',
      });
    }
  };

  return (
    <Container>
      <form className={styles.formWrapper} onSubmit={handleSave}>
        <TextInput
          className={styles.input}
          label="Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          className={styles.input}
          label="Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          className={styles.input}
          label="Rule"
          {...form.getInputProps('rule')}
        />
        <Group gap="xl" grow>
          <Button
            type="submit"
            variant="gradient"
            miw={100}
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            Save
          </Button>
          <Link to="/admin">Go Back</Link>
        </Group>
      </form>
    </Container>
  );
};

export default Userdetails;
