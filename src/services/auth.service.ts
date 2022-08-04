import api from "services/api.service";
import { SignResponseItem } from "types/Index";

const authService = {
  login: (email: string, password: string):Promise<SignResponseItem> => api.post("/users/login", { email, password }),
  signUp: (email: string, password: string):Promise<SignResponseItem> => api.post("/users/create", { email, password }),
};

export default authService;
