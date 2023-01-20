import Axios from "axios";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import toastr from "toastr";

const Register = () => {
  const [emailReg, setEmailReg] = useState("");
  const [passowordReg, setPassowordReg] = useState("");

  const navigate = useNavigate();
  const register = () => {
    const e = document.getElementById("userType");

    if (emailReg === "" && passowordReg === "") {
      toastr.error("Nu ai introdus datele!");
    } else if (emailReg === "") {
      toastr.error("Nu ai introdus adresa de email!");
    } else if (passowordReg === "") {
      toastr.error("Nu ai introdus parola!");
    } else {
      Axios.post("http://localhost:8080/api/register", {
        email: emailReg,
        password: passowordReg,
        userType: e.value,
      }).then((response) => {
        console.log(response);
      });

      navigate("/login");
    }
  };

  return (
    <div className="container">
      <button
        id="btnBackHome"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Inapoi
      </button>
      <div className="registration">
        <h1>Creare cont</h1>

        <input
          type="text"
          placeholder="Email"
          className="input"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        ></input>
        <br></br>

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => {
            setPassowordReg(e.target.value);
          }}
        ></input>
        <br></br>

        <select id="userType">
          <option value="1">Student</option>
          <option value="0">Profesor</option>
        </select>
        <br></br>
        <button onClick={register} className="btnRegister2">
          Creare cont
        </button>
      </div>
    </div>
  );
};

export default Register;
