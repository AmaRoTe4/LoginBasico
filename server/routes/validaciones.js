import {getAll ,getByIdG ,updateG ,createG ,deleteG, getAllById_prof } from "../controllers/controllers.js"
import { ModelValidaciones } from '../models/models.js'
import express from 'express'

export const RouterValidaciones = express.Router()

RouterValidaciones.get('/', getAll(ModelValidaciones));
RouterValidaciones.get('/:id_prof', getAllById_prof(ModelValidaciones));
RouterValidaciones.get('/id/:id', getByIdG(ModelValidaciones));
RouterValidaciones.post('/', createG(ModelValidaciones));
RouterValidaciones.delete('/:id', deleteG(ModelValidaciones));
RouterValidaciones.patch('/:id', updateG(ModelValidaciones));