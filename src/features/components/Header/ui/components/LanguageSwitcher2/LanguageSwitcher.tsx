import { Button, ButtonGroup } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const LanSwitcher = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <ButtonGroup variant="text">
        <Button onClick={() => onChangeLanguage('en')}>🇺🇸</Button>
        <Button onClick={() => onChangeLanguage('ua')}>ua</Button>
      </ButtonGroup>
    </div>
  );
};

export default LanSwitcher;
