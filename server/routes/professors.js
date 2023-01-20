// import {User,Project,File, UserProject, Grade} from '../models/index.js'
import express from 'express'
import  { Op } from "sequelize"
const professorRouter = express.Router();

import {User} from "../models/user.js"
import {Project} from "../models/project.js"
import {UserProject} from "../models/userProject.js"
import {Grade} from "../models/grade.js"
import {File} from "../models/file.js"
// const professorRouter = require("express").Router();
// const { Op } = require("sequelize");

professorRouter.route("/students").get(async (req, res) => {
  try {
    const student = await User.findAll({
      where: {
        userType: 1, //inseamna ca este student , 0 e profesor
      },
    });
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json(err);
  }
});

professorRouter.route("/students/:idStudent/projects")
.get(async (req, res) => {
  try {
    console.log('eh?');
    const userProject = await UserProject.findAll({
      where: {
        UserId: req.params.idStudent,
      },
    });
    let listProjects = [];
    for (let i = 0; i < userProject.length; i++) {
      listProjects.push(userProject[i].ProjectId);
    }

    const projects = await Project.findAll({
      where: {
        id: {
          [Op.in]: listProjects,
        },
      },
    });

    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json(err);
  }
});

professorRouter
  .route("/students/:studentId/projects/:projectId")
  .get(async (req, res) => {
    try {
      const projects = await UserProject.findAll({
        where: {
          UserId: req.params.studentId,
        },
      });
      if (projects) {
        const projectChosen = await Project.findAll({
          where: {
            id: req.params.projectId,
          },
        });
        return res.status(200).json(projectChosen);
      } else {
        return res.status(404).json({ message: "project not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

professorRouter
  .route("/students/:studentId/projects/:projectId/files")
  .get(async (req, res) => {
    try {
      const studentProjects = await UserProject.findAll({
        where: {
          UserId: req.params.studentId,
        },
      });

      if (studentProjects) {
        const files = await File.findAll({
          where: {
            idProject: req.params.projectId,
          },
        });
        res.status(200).json(files);
      } else {
        return res.status(404).json({ message: "project not found" });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  });

professorRouter
  .route("/students/:studentId/projects/:projectId/files/:idFile")
  .get(async (req, res) => {
    try {
      const studentProjects = await UserProject.findAll({
        where: {
          UserId: req.params.studentId,
        },
      });

      if (studentProjects) {
        const files = await File.findAll({
          where: {
            id: req.params.idFile,
            idProject: req.params.projectId,
          },
        });
        res.send(files);
      } else {
        return res.status(404).json({ message: "project not found" });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  });

professorRouter
  .route("/students/:studentId/projects/:projectId/grade")
  .get(async (req, res) => {
    try {
      const grades = await Grade.findAll({
        where: {
          idProject: req.params.projectId,
        },
      });

      listOfGrades = [];

      for (let i = 0; i < grades.length; i++) {
        listOfGrades.push(grades[i].grade);
      }

      maxValue = 0;
      for (let i = 0; i < listOfGrades.length; i++) {
        if (listOfGrades[i] >= maxValue) {
          maxValue = listOfGrades[i];
        }
      }

      minValue = 11;
      for (let i = 0; i < listOfGrades.length; i++) {
        if (listOfGrades[i] <= minValue) minValue = listOfGrades[i];
      }

      counter = 0;
      sum = 0;

      for (let i = 0; i < listOfGrades.length; i++) {
        if (listOfGrades[i] === minValue || listOfGrades[i] === maxValue) {
        } else {
          sum = sum + listOfGrades[i];
          counter++;
        }
      }

      result = (sum / counter).toFixed(2);

      res.send({ grade: result });
    } catch (err) {
      return res.status(500).json(err);
    }
  });

export {professorRouter}
