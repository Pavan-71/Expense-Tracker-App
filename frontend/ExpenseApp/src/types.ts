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
