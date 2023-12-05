import { FC } from 'react';

import { Autocomplete, Button, Loader, Paper, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import classes from './EnterNickName.module.css';

interface EnterNickNameProps {
  handleChange: (value: string) => void;
  handleSubmit: (value: string) => void;
  value: string;
  inputLoading: boolean;
}

const EnterNickName: FC<EnterNickNameProps> = ({
  value,
  handleChange,
  inputLoading,
  handleSubmit,
}) => {
  // Translation
  const { t } = useTranslation();

  return (
    <div className={classes.nickNameWrapper}>
      <Paper className={classes.nickNameTitle}>{t('authForm.enterNikName')}</Paper>
      <Autocomplete
        value={value}
        onChange={(value) => {
          handleChange(value);
        }}
        rightSection={inputLoading ? <Loader size="1rem" /> : null}
        placeholder="Your nick Name"
      />
      <Button
        type="submit"
        onClick={() => {
          handleSubmit(value);
        }}
        className={classes.nickNameButton}
      >
        <IconArrowLeft
          width={rem(50)}
          height={rem(20)}
          size={rem(10)}
          stroke={rem(2)}
          color="currentColor"
        />
      </Button>
    </div>
  );
};

export default EnterNickName;
