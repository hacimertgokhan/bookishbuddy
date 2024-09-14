"use client";

import React, {useState} from 'react';
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {AiOutlineRight} from "react-icons/ai";

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
            toast.success('Başarıyla giriş yaptın.'); // Displays a success message
        } else {
            toast.error('Kullanıcı adın ya da şifren hatalı.'); // Displays a success message
        }
    };

    return (
        <div className={"w-screen h-screen xl:flex xl:flex-row xl:justify-between justify-center items-center"}>
            <div className={"xl:grid-cols-1 xl:grid xl:w-[1000px] hidden xl:grid-rows-4 items-center justify-center h-screen p-24 w-1/2"}>
                <h1 className={"font-bold text-7xl font-sans"}>BookishBuddy<br/><p className={"text-3xl font-normal"}>En yakın kitap arkadaşın.</p></h1>
            </div>
            <div className={"LoginForm"}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className={"font-bold font-sans text-xl"}>Email adresin,</p>
                        <input
                            type={"email"}
                            placeholder={"Lütfen email adresinizi belirtin."}
                            onChange={(e) => {
                                // @ts-ignore
                                setEmail(e.currentTarget.value)
                            }}/>
                    </label>
                    <label>
                        <p className={"font-bold font-sans text-xl"}>Şifren,</p>
                        <input
                            type={"password"}
                            placeholder={"Hesap şifrenizi belirtin."}
                            onChange={(e) => {
                                // @ts-ignore
                                setPassword(e.currentTarget.value)
                            }}/>
                    </label>
                    <button type={"submit"} className={"CustomButton"}>
                        Giriş yap
                        <span className={"Icon"}>
                            <AiOutlineRight/>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;