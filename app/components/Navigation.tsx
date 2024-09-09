import React from 'react';
import Link from "next/link";
import {MdLogin, MdLogout, MdNotes, MdVerifiedUser} from "react-icons/md";
import {CgQuote} from "react-icons/cg";

const Navigation = () => {
    const linkClass = "flex items-center justify-center gap-1";
    const session = false;

    const LoadWithSessionStatus = () => {
        if(session) {
            return (
                <>
                    <li>
                        <Link href={""} className={linkClass}><MdNotes/> Notlarım</Link>
                    </li>
                    <li>
                        <Link href={""} className={linkClass}><MdVerifiedUser/> Profilim</Link>
                    </li>
                    <li>
                        <Link href={""} className={linkClass}><MdLogout/> Çıkış yap</Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li>
                        <Link href={""} className={linkClass}><CgQuote/> BookishBuddy Nedir ?</Link>
                    </li>
                    <li>
                        <Link href={""} className={linkClass}><MdLogin/> Giriş yap</Link>
                    </li>
                </>
            )
        }
    }

    return (
        <div className={"w-screen flex items-center justify-between p-12 h-[75px]"}>
            <h1 className={"font-bold text-3xl"}>BookishBuddy</h1>
            <ul className={"flex items-center justify-center gap-24 font-sans"}>
                <LoadWithSessionStatus/>
            </ul>
        </div>
    );
};

export default Navigation;