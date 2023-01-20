import React, { useState } from "react";
import { useNavigate } from "react-router";
import toastr from 'toastr'

function Login() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  let userId = 0;

  const getUsers = async () => {
    if (passwordLogin === "" && emailLogin == "") {
      toastr.error("Nu ai introdus datele!");
    } else if (passwordLogin === "") {
      toastr.error("Nu ai introdus parola!");
    } else if (emailLogin === "") {
      toastr.error("Nu ai introdus adresa de email!");
    } else {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();

      setUsers(data);
      let ok = 0;
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].email === emailLogin &&
          data[i].password === passwordLogin
        ) {
          userId = await data[i].id;

          if (data[i].userType === 1) {
            navigate(`/studentPage/:${userId}`);
            ok = 1;
          } else if (data[i].userType === 0) {
            navigate(`/proffesorPage/:${userId}`);
            ok = 1;
          }
        }
      }
      if (ok === 0) {
        toastr.error("Datele introduse nu sunt corecte!");
      }
    }
  };

  return (
    <>
      <button
        id="btnBackHome"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Inapoi
      </button>
      <div className="container">
        <div className="login">
          <h2>Conectare</h2>
          <input
            className="input"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmailLogin(e.target.value);
            }}
          ></input>
          <br></br>
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordLogin(e.target.value);
            }}
          ></input>
          <br></br>
          <button className="btnLogin" onClick={getUsers}>
            Conectare
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
