import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "layout/Index";
import TodoIndex from "pages/Todo/Index";
import TodoDetail from "pages/Todo/Detail";
import Auth from "pages/Auth/Index";

// const TodoIndex = React.lazy(() => import("pages/Todo/Index"));
// const TodoDetail = React.lazy(() => import("pages/Todo/Detail"));
// const Auth = React.lazy(() => import("pages/Auth/Index"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<Layout />}>
          <Route index element={<TodoIndex />} />
          <Route path=":id" element={<TodoDetail />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route index element={<Navigate to="/todo" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
