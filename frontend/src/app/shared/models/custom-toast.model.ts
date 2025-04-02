export interface ICustomToast {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  desc?: string;
}
