export type Priority = 'P1' | 'P2' | 'P3';

export interface Todo {
  id: string;
  text: string;
  priority: Priority;
  completed: boolean;
}
