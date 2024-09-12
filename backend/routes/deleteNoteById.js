import express from "express";
import { PrismaClient } from '@prisma/client'
import {error, success} from "../server.js";
import {compare, hash} from 'bcrypt'
const prisma = new PrismaClient()

const router = express.Router();
router.post('/delete-note-by-id', async (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
    const belong_to = req.body.belong_to;
    if(!email || !id) {
        return error(res, "Girilen bilgiler geçersiz ya da eksik.", 400)
    }
    try {
        const checkEmail = await prisma.users.findUnique({
            where: {
                email: email,
            },
        })
        if(checkEmail) {
            const user = await prisma.notes.delete({
                where: {
                    id: id,
                },
              })
            if(user) {
                const user = await prisma.notes.findMany({
                    where: {
                        belong_to: belong_to,
                    },
                  })
                return success(res, user, 200)
            } else {
                return error(res, "Veriler bulunamadı.", 404)
            }
        } else {
            return error(res, "Hesap bulunamadı.", 404)
        }
    } catch (e) {
        return error(res, e.toString(), 500)
    }
})

export default router;
