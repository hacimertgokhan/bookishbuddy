"use client";

import {useState} from "react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export default function Home() {

    return (
        <>
            <Navigation/>
            <div className="w-screen h-screen flex flex-col">
                <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
                    <div className={"-translate-y-28"}>
                        <h1 className={"font-bold sm:text-2xl md:text-4xl xl:text-7xl text-xl"}>Kitaplardan parçalar, <br/>Farklı çağlardan noktalar.</h1>
                        <p className={"font-medium xl:text-3xl md:text-2xl sm:text-xl"}>BookishBuddy, sizi her çağa götürür.</p>
                        <br/>
                        <br/>
                        <a href="/notes" className={"w-[150px] h-[35px] bg-white text-zinc-800 p-4 cursor-pointer hover:bg-zinc-100 transition-all outline-none border-none font-bold text-xl rounded-md"}>
                            Hmm, denemekten zarar gelmez ?
                        </a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
