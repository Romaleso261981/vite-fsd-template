import { Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanSwitcher = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <ButtonGroup variant="text" color="inherit">
        <Button onClick={() => onChangeLanguage('en')}>🇺🇸</Button>
        <Button onClick={() => onChangeLanguage('ua')}>ua</Button>
      </ButtonGroup>
    </div>
  );
};

export default LanSwitcher;
