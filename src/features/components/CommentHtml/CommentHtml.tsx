import { Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';

import classes from './CommentHtml.module.css';

const mockdata = [
  {
    id: 1,
    label: '4 passengers',
    src: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    alt: 'Jacob Warnhalter',
    title: 'Jacob Warnhalter',
    time: '10 minutes ego',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, repellendus. Quasi, nobis aliquid nihil porro, eaque quia et nam qui magnam minus, quisquam deleniti doloribus vero odit consectetur at sapiente voluptatibus nulla? Atque alias pariatur labore, at dolore, accusantium consequuntur eaque maiores repellendus distinctio, officia excepturi provident illo! Sit, harum.',
  },
  {
    id: 2,
    label: '100 km/h in 4 seconds',
    src: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    alt: 'Jacob Warnhalter',
    title: 'Jacob Warnhalter',
    time: '10 minutes ego',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, repellendus. Quasi, nobis aliquid nihil porro, eaque quia et nam qui magnam minus, quisquam deleniti doloribus vero odit consectetur at sapiente voluptatibus nulla? Atque alias pariatur labore, at dolore, accusantium consequuntur eaque maiores repellendus distinctio, officia excepturi provident illo! Sit, harum.',
  },
  {
    id: 3,
    label: 'Automatic gearbox',
    src: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    alt: 'Jacob Warnhalter',
    title: 'Jacob Warnhalter',
    time: '10 minutes ego',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, repellendus. Quasi, nobis aliquid nihil porro, eaque quia et nam qui magnam minus, quisquam deleniti doloribus vero odit consectetur at sapiente voluptatibus nulla? Atque alias pariatur labore, at dolore, accusantium consequuntur eaque maiores repellendus distinctio, officia excepturi provident illo! Sit, harum.',
  },
  {
    id: 4,
    label: 'Electric',
    src: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    alt: 'Jacob Warnhalter',
    title: 'Jacob Warnhalter',
    time: '10 minutes ego',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, repellendus. Quasi, nobis aliquid nihil porro, eaque quia et nam qui magnam minus, quisquam deleniti doloribus vero odit consectetur at sapiente voluptatibus nulla? Atque alias pariatur labore, at dolore, accusantium consequuntur eaque maiores repellendus distinctio, officia excepturi provident illo! Sit, harum.',
  },
];

export const CommentHtml = () => {
  const links = mockdata.map((item) => (
    <Paper withBorder radius="md" key={item.id} className={classes.comment}>
      <Group>
        <Avatar src={item.src} alt={item.alt} radius="xl" />
        <div>
          <Text fz="sm">{item.title}</Text>
          <Text fz="xs" c="dimmed">
            {item.time}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>{item.description}</div>
      </TypographyStylesProvider>
    </Paper>
  ));

  return <section className={classes.commentWrapper}>{links}</section>;
};
