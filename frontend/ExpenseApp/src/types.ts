export type Transaction = {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description?: string;
  date: string;
};

export type Notification = {
  id: string;
  title: string;
  content: string;
  read: boolean;
};

export type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};
