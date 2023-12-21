import React, { useEffect, useState } from 'react';

import { Button, Text, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { getFirestoreData } from '../../shared/helpers/getData';
import { DatabasePaths } from '../../shared/types/enums';
import { UserData } from '../../shared/types/Types';

type UserParams = {
  [key: string]: string | undefined;
};

export const UserDetail: React.FC = () => {
  const { id } = useParams<UserParams>();
  const [user, setUser] = useState<UserData>();
  const getUserData = async () => {
    getFirestoreData<UserData>(DatabasePaths.USERS, 1, 'id', id)
      .then((data) => {
        if (data) {
          setUser(data[0]);
        }
      })
      .catch((err) => console.log(`error ${err}`));
  };

  useEffect(() => {
    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/admin');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <Title order={1}>{`User name ${user?.name}`}</Title>
      <Text size="lg">User ID: {user?.id}</Text>
      <Text size="lg">User balans: {user?.balans}</Text>
      <Text size="lg">User email: {user?.email}</Text>
      <Text size="lg">User phone: {user?.phone}</Text>
      <Text size="lg">User nickName: {user?.nickName}</Text>
      <Button size="lg" variant="outline" onClick={goBack} style={{ marginTop: 20 }}>
        Go Back to Admin
      </Button>
    </div>
  );
};
