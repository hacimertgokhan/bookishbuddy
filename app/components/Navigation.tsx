"use client"

import React from 'react';
import Link from "next/link";
import {MdLogin, MdLogout, MdNotes, MdVerifiedUser} from "react-icons/md";
import {CgQuote} from "react-icons/cg";
import {BiHome} from "react-icons/bi";
import {useSession} from "next-auth/react";
import SignOut from "@/app/components/SignOut";

const Navigation = () => {
    const linkClass = "flex items-center justify-center gap-1";
    const {data:session, status} = useSession();

    const LoadWithSessionStatus = () => {
        if(session) {
            return (
                <>
                    <li>
                        <Link href={"/"} className={linkClass}><BiHome/> <p className='xl:flex hidden'>Anasayfa</p></Link>
                    </li>
                    <li>
                        <Link href={"/notes"} className={linkClass}><MdNotes/> <p className='xl:flex hidden'>Notlarım</p></Link>
                    </li>
                    <li>
                        <Link href={"/profile"} className={linkClass}><MdVerifiedUser/> <p className='xl:flex hidden'>Profilim</p></Link>
                    </li>
                    <li>
                        <SignOut><MdLogout/> <p className='xl:flex hidden'>Çıkış</p></SignOut>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li>
                        <Link href={"/about"} className={linkClass}><CgQuote/> <p className='xl:flex hidden'>Bookishbuddy nedir ?</p></Link>
                    </li>
                    <li>
                        <Link href={"/login"} className={linkClass}><MdLogin/> <p className=''>Giriş yap</p></Link>
                    </li>
                </>
            )
        }
    }

    return (
        <div className={"w-screen flex items-center justify-between xl:p-12 md:p-8 sm:p-4 p-4 h-[75px]"}>
            <h1 className={"font-bold md:text-3xl"}>BookishBuddy</h1>
            <ul className={"flex items-center justify-center xl:gap-24 md:gap-12 sm:gap-6 gap-6 font-sans"}>
                <LoadWithSessionStatus/>
            </ul>
        </div>
    );
};

export default Navigation;