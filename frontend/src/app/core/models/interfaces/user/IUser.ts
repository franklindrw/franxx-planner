export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  picture?: string;
  created_at: Date;
  updated_at: Date;
}
