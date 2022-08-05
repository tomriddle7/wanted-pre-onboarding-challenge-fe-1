import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "services/auth.service";
import { loginToken } from "store/Index";
import { SignRequestItem } from "types/Index";

function Todo() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const authType = searchParams.get("type") ?? "login";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [LoginItem, setLoginItem] = useState<SignRequestItem>({
    email: "",
    password: "",
  });

  const Login = async (e: any) => {
    e.preventDefault();
    if (isLoading) return false;
    setIsLoading(true);
    try {
      const { token } = await authService.login(
        LoginItem.email,
        LoginItem.password
      );
      if (token) {
        loginToken.set(token);
        navigate("/todo");
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const Signin = async (e: any) => {
    e.preventDefault();
    if (isLoading) return false;
    setIsLoading(true);
    try {
      const { token } = await authService.signUp(
        LoginItem.email,
        LoginItem.password
      );
      if (token) {
        loginToken.set(token);
        navigate("/todo");
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: any) => {
    setLoginItem({ ...LoginItem, [e.target.name]: e.target.value });
  };

  const isValid = (): boolean => {
    let val = false;
    if (/.+@.+\..{2,4}/.test(LoginItem.email) && LoginItem.password.length >= 8)
      val = true;
    return val;
  };

  return (
    <main className="main">
      <article>
        <h2>{authType === "signin" ? "Sign in" : "Login"}</h2>
        <form onSubmit={authType === "signin" ? Signin : Login}>
          <input type="email" name="email" value={LoginItem.email} onChange={handleInput} />
          <input
            type="password"
            name="password"
            value={LoginItem.password}
            onChange={handleInput}
          />
          <button type="submit" disabled={!isValid()}>
            Submit
          </button>
        </form>
        {authType === "login" && (
          <span
            onClick={() => {
              setSearchParams({ type: "signin" });
            }}
          >
            To Sign in
          </span>
        )}
        {authType === "signin" && (
          <span
            onClick={() => {
              setSearchParams({ type: "login" });
            }}
          >
            To Log in
          </span>
        )}
      </article>
    </main>
  );
}

export default Todo;
