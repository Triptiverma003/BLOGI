import { Route , Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Delete from "./Pages/Delete";
import Login from "./Pages/Login";
import { useEffect } from "react";
import axios from "axios";
import Logout from "./Pages/Logout";

function App (){
  
    const token = window.localStorage.getItem("token");

  useEffect(() => {
    const timestamp = 1000 * 60 * 3 - 5;
    // const timestamp = 10000;

    let interval = setInterval(() => {
      if (token !== null) {
        updateToken();
      }
    }, timestamp);

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const updateToken = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_AUTH_API}/private/refreshtoken`;

      const response = await axios.get(apiUrl, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        const data = await response.data;

        window.localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);

      window.localStorage.removeItem("token");
    }

    console.log("Inside update token");
  };
  return (
   <Routes>
    <Route path="/add" element = {<Add />} />
    <Route path="/" element={<Home />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/blog/:id" element={<Blog />} />
    <Route path="/delete/:id" element = {<Delete/>} />
    <Route path ="/login" element = {<Login/>} />
    <Route path = "/logout" element = {<Logout/>}/>
   </Routes>
  );

}

export default App;