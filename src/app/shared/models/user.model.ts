export interface User {
  id?: number;
  username: string;
  password?: string;
  role: 'admin' | 'student';
} 