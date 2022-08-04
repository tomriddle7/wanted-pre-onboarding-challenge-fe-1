export interface TodoItem {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignRequestItem {
  email: string;
  password: string;
}

export interface SignResponseItem {
  message: string;
  token: string;
}
