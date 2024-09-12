import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
const app = express()

import create_account from './routes/createAccount.js';
import loging_account from './routes/loginAccount.js';
import EditDescription from './routes/editDescription.js';
import createNote from "./routes/createNote.js";
import listNote from "./routes/listNote.js";
import getNoteById from "./routes/getNoteById.js";
import deleteNoteById from "./routes/deleteNoteById.js";

app.use(cors())
app.use(bodyParser.json())

export const error = (res, err, status) => {
    console.log(err)
    res.status(status).send(
        {
            data: err,
            type: 'Error',
            status: status
        }
    )
}

export const success = (res, success, status) => {
    console.log(success)
    res.status(status).send(
        {
            data: success,
            type: 'Success',
            status: status
        }
    )
}

app.use('/auth', create_account);
app.use('/auth', loging_account);
app.use('/profile', EditDescription);
app.use('/note', listNote);
app.use('/note', getNoteById);
app.use('/note', createNote);
app.use('/note', deleteNoteById);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at ${process.env.SERVER_PORT}`)
})