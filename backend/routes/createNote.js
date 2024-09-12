import express from "express";
import { PrismaClient } from '@prisma/client'
import {error, success} from "../server.js";
import {compare, hash} from 'bcrypt'
const prisma = new PrismaClient()

const router = express.Router();
router.post('/create', async (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
    const title = req.body.title;
    const note = req.body.note;
    const writer = req.body.writer;
    const deep_note = req.body.deep_note;
    const between = req.body.between;
    const book_name = req.body.book_name;
    if(!title || !email || !book_name || !between || !deep_note || !note || !id) {
        return error(res, "Girilen bilgiler geçersiz ya da eksik.", 400)
    }
    try {
        const checkEmail = await prisma.users.findUnique({
            where: {
                email: email,
            },
        })
        if(checkEmail) {
            const user = await prisma.notes.create({
                data: {
                    created_at: new Date(),
                    deep_note: deep_note,
                    note: note,
                    between: between,
                    book_name: book_name,
                    title: title,
                    belong_to: id,
                    writer: writer,
                    public: false,
                 },
              })
            if(user) {
                const user = await prisma.notes.findMany({
                    where: {
                        belong_to: id,
                    },
                  })
                return success(res, user, 200)
            } else {
                return error(res, "Not eklenemedi.", 404)
            }
        } else {
            return error(res, "Hesap bulunamadı.", 404)
        }
    } catch (e) {
        return error(res, e.toString(), 500)
    }
})

export default router;
