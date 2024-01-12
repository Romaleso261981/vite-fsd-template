import { useAppSelector } from '@/app/store';
import { useSelectUserData } from '@/features/auth/authSlice';

export const useAdminCheck = () => {
  const data = useAppSelector(useSelectUserData);

  if (data) {
    return data?.rule === 'admin';
  }

  return false;
};
