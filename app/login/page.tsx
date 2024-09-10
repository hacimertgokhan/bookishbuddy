"use client";

import React, {useState} from 'react';
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

const Page = () => {
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const handleSubmit = async (e:any) => {
        e.preventDefault();


        const result = await signIn("database", {
            email,
            password,
            redirect: false,

        });

        if (result?.error === null) {
            window.location.replace("/");
            toast.error('Başarıyla giriş yaptın.'); // Displays a success message
        } else {
            toast.error('Kullanıcı adın ya da şifren hatalı.'); // Displays a success message
        }
    };

    return (
        <div className={"w-screen h-screen flex justify-center items-center"}>
            <div className={"w-[450px] h-[550px] flex items-center justify-center flex-col bg-transparent border-[1px] border-zinc-900"}>
                <h1 className={"text-center text-2xl font-bold"}>BookishBuddy`e Hoşgeldin !</h1>
                <br/>
                <form className="flex w-[300px] flex-col text-white gap-12" onSubmit={handleSubmit}>
                    <label className={"flex flex-col gap-1 font-sans font-bold text-xl"}>
                        Email adresin,
                        <input
                            className={"outline-none mt-2 border-[1px] border-zinc-900 py-1 px-4 rounded-sm bg-transparent text-white font-sans font-normal text-md"}
                            onChange={(e) => {
                            // @ts-ignore
                            setEmail(e.currentTarget.value)
                        }}/>
                    </label>
                    <label className={"flex flex-col gap-1 font-sans font-bold text-xl"}>
                        Şifren,
                        <input
                            className={"outline-none mt-2 border-[1px] border-zinc-900 py-1 px-4 rounded-sm bg-transparent text-white font-sans font-normal text-md"}
                            onChange={(e) => {
                                // @ts-ignore
                                setPassword(e.currentTarget.value)
                            }}/>
                    </label>
                    <button type={"submit"}>Giriş yap</button>
                </form>
            </div>
        </div>
    );
};

export default Page;