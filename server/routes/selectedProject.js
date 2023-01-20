import {User,Project,File, UserProject, Grade} from '../models/index.js'
import express from 'express'
import  { Op } from "sequelize"
const selectedPRojectRouter = express.Router();

selectedPRojectRouter
  .route("/:idStudent/myprojects/:projectId")
  .get(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.idStudent);
      if (user) {
        const userProjects = await UserProject.findAll({
          where: {
            UserId: req.params.idStudent,
            ProjectId: req.params.projectId,
          },
        });

        if (userProjects.length === 1) {
          const project = await Project.findAll({
            where: {
              id: req.params.projectId,
            },
          });

          return res.status(200).json(project);
        }
      }
    } catch (err) {
      
      res.status(404).send({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.idStudent);
      if (user) {
        const userProjects = await UserProject.findAll({
          where: {
            UserId: req.params.idStudent,
            ProjectId: req.params.projectId,
          },
        });

        await Project.destroy({
          where: {
            id: req.params.projectId,
          },
        });

        await UserProject.destroy({
          where: {
            ProjectId: req.params.projectId,
          },
        });

        return res
          .status(404)
          .json({
            error: `The project with id ${req.params.projectId} has been deleted`,
          });
      }
    } catch (err) {
      res.status(405).send({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.idStudent);
      if (user) {
        const userProjects = await UserProject.findAll({
          where: {
            UserId: req.params.idStudent,
            ProjectId: req.params.projectId,
          },
        });

        if (userProjects.length === 1) {
          const project = await Project.findAll({
            where: {
              id: req.params.projectId,
            },
          });

          const updatedProject = await Project.update(
            {
              title: req.body.title,
              teamName: req.body.teamName,
              videoLink: req.body.videoLink,
            },
            {
              where: {
                id: req.params.projectId,
              },
            }
          );

          return res
            .status(200)
            .json({
              error: `The project with id ${req.params.projectId} has been updated`,
            });
        }
      }
    } catch (err) {
      res.status(405).send({ message: err.message });
    }
  });

export {selectedPRojectRouter};
