import React, { useEffect } from "react";
import Router from "router/Index";
import { loginToken } from "store/Index";

function App() {
  useEffect(() => {
    return () => {
      loginToken.clear();
    };
  }, []);

  return <Router />;
}

export default App;
