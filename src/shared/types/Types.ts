export type UserData = {
  id: string;
  avatar: string;
  name: string;
  nickName: string;
  rule: string;
  phone: string;
  email: string;
  balans: number;
};

export type SortedField = keyof UserData;
