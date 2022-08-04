import { useNavigate, Outlet } from "react-router-dom";
import { loginToken } from "store/Index";

function Layout() {
  const navigate = useNavigate();

  return (
    <main className="main">
      <button
        onClick={() => {
          loginToken.clear();
          navigate("/auth");
        }}
      >
        LogOut
      </button>
      <Outlet />
    </main>
  );
}

export default Layout;
