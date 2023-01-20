import {File, Project} from '../models/index.js'
import express from 'express'

const fileRouter=express.Router();

fileRouter
    .route("/:idStudent/myprojects/:idProject/addFile")
    .post(async(req, res) => {
        try{
            const selectedProject= await Project.findByPk(req.params.idProject);
            if(selectedProject){
                const newFile=await File.create({
                    id:req.body.id,
                    fileName:req.body.fileName,
                    file:req.body.file,
                    idProject:selectedProject.id
                })
                return res.status(200).json(newFile);
            }
            
        }
        catch(err){
            
            return res.status(500).json(err);
        }
    })

    export {fileRouter}

