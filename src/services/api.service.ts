import axios from "axios";
// import { createBrowserHistory } from "history";

// const customHistory = createBrowserHistory();

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.data.details === "Token is missing") {
      alert("토큰이 없습니다.");
      window.location.replace("/auth");
    }
    else throw error;
  }
);

export default api;
