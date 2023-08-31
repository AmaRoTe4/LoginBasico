import {getAll ,getByIdG ,getAllById_prof ,updateG ,createG ,deleteG } from "../controllers/controllers.js"
import { ModelUsers } from '../models/models.js'
import express from 'express'

export const RouterUsers = express.Router()


RouterUsers.get('/', getAll(ModelUsers));
RouterUsers.get('/:id_prof', getAllById_prof(ModelUsers));
RouterUsers.get('/id/:id', getByIdG(ModelUsers));
RouterUsers.post('/', createG(ModelUsers));
RouterUsers.delete('/:id', deleteG(ModelUsers));
RouterUsers.patch('/:id', updateG(ModelUsers));