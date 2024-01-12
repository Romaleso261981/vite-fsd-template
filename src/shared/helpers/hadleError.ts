import { notifications } from '@mantine/notifications';

export const hadleError = ({ title, message }: { title?: string; message: string }) => {
  notifications.show({
    title,
    message,
  });
};
