// import React, { useEffect } from 'react';

import { Select } from '@mantine/core';
// import { useLocalStorage } from '@mantine/hooks';
// import { useRouter } from 'next/router';

const ChangeLanguage = () => {
  const lang = 'ua';
  //   const [lang, setLang] = useLocalStorage({
  //     key: 'lang',
  //     defaultValue: 'en',
  //     getInitialValueInEffect: true,
  //   });
  //   const router = useRouter();
  //   const handleLocaleChange = (value: string) => {
  //     router.push(router.route, router.asPath, {
  //       locale: value,
  //     });
  //     setLang(value);
  //   };

  //   useEffect(() => {
  //     if (router.locale) {
  //       setLang(router.locale);
  //     }
  //   }, [router.locale]);

  return (
    <Select
      data={[
        { value: 'en', label: 'English' },
        { value: 'ua', label: 'Ukraine' },
        { value: 'ru', label: 'Ukraine' },
        { value: 'lt', label: 'Ukraine' },
        { value: 'ch', label: 'Ukraine' },
      ]}
      defaultValue="en"
      value={lang}
      // onChange={handleLocaleChange}
    />
  );
};

export default ChangeLanguage;
