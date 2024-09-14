import React from 'react';
import Link from "next/link";
import {MdLogin} from "react-icons/md";
import {CgAnchor, CgLink, CgQuote, CgSupport} from "react-icons/cg";

const Navigation = () => {
    const linkClass = "flex items-center justify-center gap-1";
    return (
        <div className={"w-screen flex fixed bottom-0 items-center justify-between xl:p-12 md:p-8 sm:p-4 p-4 h-[75px]"}>
            <h1 className={"font-thin xl:text-xl md:text-sm"}>BookishBuddy, Bütün hakları saklıdır.</h1>
            <ul className={"flex items-center justify-center xl:gap-24 md:gap-12 sm:gap-6 gap-6 font-sans"}>
                <li>
                    <Link href={""} className={linkClass}><CgSupport/> <p className='xl:flex hidden'>Destek</p></Link>
                </li>
                <li>
                    <Link href={""} className={linkClass}><CgAnchor/> <p className='xl:flex hidden'>Diğer</p></Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;