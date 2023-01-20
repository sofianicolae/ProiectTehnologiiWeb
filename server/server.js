import express from "express"
import {sequelize} from "./sequelize.js"

const app = express();
const port = 8080;
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
import  cors from "cors"
app.use(cors());

import {userRouter} from './routes/users.js'
import {professorRouter} from './routes/professors.js'
import {projectRouter} from './routes/projects.js'
import {otherProjectRouter} from './routes/otherprojects.js'
import {registerRouter} from './routes/auth.js'
import {selectedPRojectRouter} from './routes/selectedProject.js'
import {fileRouter} from './routes/addFile.js'
import {getFilesRouter} from './routes/getFiles.js'
import {getFileRouter} from './routes/deleteFile.js'


app.use("/api",userRouter );
app.use("/api", professorRouter);
app.use("/api", projectRouter);
app.use("/api", otherProjectRouter);
app.use("/api", registerRouter);
app.use("/api", selectedPRojectRouter);
app.use("/api", fileRouter);
app.use("/api", getFilesRouter);
app.use("/api", getFileRouter);

app.listen(port, async () => {
  console.log("Server started on http://localhost:8080");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
