import * as React from "react";
import { useNavigate } from "react-router";
import "../assets/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="logo"></div>
        <p>Aplicație web pentru acordarea anonimă de note</p>

        <button
          className="btnRegister"
          onClick={() => {
            navigate("/register");
          }}
        >
          Creare cont
        </button>

        <button
          className="btnLogin"
          onClick={() => {
            navigate("/login");
          }}
        >
          Conectare
        </button>
      </div>
    </>
  );
};

export default Home;
