import React from 'react';
import Link from "next/link";
import {MdLogin} from "react-icons/md";
import {CgAnchor, CgLink, CgQuote, CgSupport} from "react-icons/cg";

const Navigation = () => {
    const linkClass = "flex items-center justify-center gap-1";
    return (
        <div className={"w-screen flex fixed bottom-0 items-center justify-between p-12 h-[75px]"}>
            <h1 className={"font-thin"}>BookishBuddy, Bütün hakları saklıdır.</h1>
            <ul className={"flex items-center justify-center gap-24 font-sans"}>
                <li>
                    <Link href={""} className={linkClass}><CgSupport/> Destek</Link>
                </li>
                <li>
                    <Link href={""} className={linkClass}><CgLink/> İletişim</Link>
                </li>
                <li>
                    <Link href={""} className={linkClass}><CgAnchor/> Diğer</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;