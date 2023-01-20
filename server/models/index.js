import {File} from './file.js'
import {Grade} from './grade.js'
import {Project} from './project.js'
import {UserProject} from './userProject.js'
import {User} from './user.js'

Project.hasMany(File, { foreignKey: "idProject", sourceKey: "id" });
File.belongsTo(Project, { foreignKey: "idProject", targetKey: "id" });

Project.hasMany(Grade, { foreignKey: "idProject", sourceKey: "id" });
Grade.belongsTo(Project, { foreignKey: "idProject", targetKey: "id" });

Project.belongsToMany(User, { through: { model: UserProject, unique: false } });
User.belongsToMany(Project, { through: { model: UserProject, unique: false } });


export {User, UserProject, Grade, File, Project}