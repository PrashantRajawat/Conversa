import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  return <div>Home</div>;
};

export default Home;
