"use client";

import {useState} from "react";
import Navigation from "@/app/components/Navigation";

export default function Home() {

    return (
        <>
            <Navigation/>
            <div className="w-screen h-screen flex flex-col">
                <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
                    <div className={"-translate-y-28"}>
                        <h1 className={"font-bold text-7xl"}>Kitaplardan parçalar, <br/>Farklı çağlardan noktalar.</h1>
                        <p className={"font-medium text-3xl"}>BookishBuddy, sizi her çağa götürür.</p>
                        <br/>
                        <br/>
                        <a className={"w-[150px] h-[35px] bg-white text-zinc-800 p-4 cursor-pointer hover:bg-zinc-100 transition-all outline-none border-none font-bold text-xl rounded-md"}>
                            Hmm, denemekten zarar gelmez ?
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
