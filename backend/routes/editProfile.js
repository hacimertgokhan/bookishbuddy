import express from "express";
import { PrismaClient } from '@prisma/client'
import {error, success} from "../server.js";
import {compare, hash} from 'bcrypt'
const prisma = new PrismaClient()

const router = express.Router();
router.post('/update', async (req, res) => {
    const email = req.body.email;
    const avatar = req.body.avatar;
    const password = req.body.password;
    const description = req.body.description;
    if(!description || !avatar || !password || !email) {
        return error(res, "Girilen bilgiler geçersiz ya da eksik.", 400)
    }
    try {
        const checkEmail = await prisma.users.findUnique({
            where: {
                email: email,
            },
        })
        if(checkEmail) {
            const isPasswordsMatch = await compare(password, checkEmail.password);
            const user = await prisma.user.update({
                where: {
                    email: email,
                },
                data: { 
                    avatar: avatar,
                    description: description,
                 },
              })
              if(isPasswordsMatch) {
                
                if(user) {
                    return success(res, "Veriler güncellendi.", 200)
                } else {
                    return error(res, "Veriler güncellenemedi.", 404)
                }
              } else {
                return error(res, "Şifre geçersiz.", 404) 
              }
        } else {
            return error(res, "Hesap bulunamadı.", 404)
        }
    } catch (e) {
        return error(res, e.toString(), 500)
    }
})

export default router;
