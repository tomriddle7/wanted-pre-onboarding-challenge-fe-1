import api from "services/api.service";
import { loginToken } from "store/Index";
import { TodoItem } from "types/Index";

const todoService = {
  getTodos: (): Promise<{ data: TodoItem[] }> => api.get("/todos", { headers: { "Authorization": loginToken.get() } }),
  getTodoById: (id: string): Promise<{ data: TodoItem }> => api.get(`/todos/${id}`, { headers: { "Authorization": loginToken.get() } }),
  createTodo: (title: string, content: string): Promise<{ data: TodoItem }> => api.post("/todos", { title, content }, { headers: { "Authorization": loginToken.get() } }),
  updateTodo: (id: string, title: string, content: string): Promise<{ data: TodoItem }> => api.put(`/todos/${id}`, { title, content }, { headers: { "Authorization": loginToken.get() } }),
  deleteTodo: (id: string): Promise<void> => api.delete(`/todos/${id}`, { headers: { "Authorization": loginToken.get() } }),
};

export default todoService;
