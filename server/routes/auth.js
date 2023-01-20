import {User} from '../models/index.js'
import express from 'express'

const registerRouter=express.Router();

registerRouter.route("/register").post(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export  {registerRouter};
