import Axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import toastr from 'toastr'
const AddProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const idFinal = id.split(":");
  const [title, setTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const addVideo = () => {
    if (title === "" && teamName == "" && videoLink == "") {
      toastr.error("Nu ai introdus datele!");
    } else if (title === "") {
      toastr.error("Nu ai introdus titlul proiectului!");
    } else if (teamName === "") {
      toastr.error("Nu ai introdus numele echipei!");
    } else if (videoLink === "") {
      toastr.error("Nu ai introdus link-ul catre video!");
    } else {
      Axios.post(`http://localhost:8080/api/${idFinal[1]}/myprojects`, {
        title: title,
        teamName: teamName,
        videoLink: videoLink,
      }).then((response) => {
        console.log(response);
      });
      navigate(`/studentPage/:${idFinal[1]}`);
    }
  };

  return (
    <div className="container">
      <button
        id="btnBackHome"
        onClick={() => {
          navigate(`/studentPage/:${idFinal[1]}`);
        }}
      >
        Inapoi
      </button>
      <div className="container-addProject">
        <h2 className="title">Titlu proiect: </h2>
        <input
          className="input"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <h2 className="teamName">Nume echipa:</h2>
        <input
          className="input"
          type="text"
          onChange={(e) => {
            setTeamName(e.target.value);
          }}
        ></input>
        <h2 className="videoLink">Link video demonstrativ:</h2>
        <input
          className="input"
          type="text"
          onChange={(e) => {
            setVideoLink(e.target.value);
          }}
        ></input>
        <br></br>
        <button type="button" className="btnAdd" onClick={addVideo}>
          Adauga proiect
        </button>
      </div>
    </div>
  );
};

export default AddProject;
