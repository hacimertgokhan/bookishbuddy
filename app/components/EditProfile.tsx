"use client";

import React, {useState} from 'react';
import {GiCancel, GiPencil} from "react-icons/gi";
import {CgCross} from "react-icons/cg";
import {FaCross} from "react-icons/fa";
import {FcCancel} from "react-icons/fc";
import {MdCancel} from "react-icons/md";
import toast from "react-hot-toast";

interface Props {
    setEdit: any
    email: any
}

const EditProfile = (props:Props) => {
    const [description, setDescription] = useState("")
    const [password, setPassword] = useState("")

    async function Form(e:any) {
        e.preventDefault();
        fetch('http://localhost:8000/profile/description', {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description,
                email: props.email,
                password: password,
            })
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Açıklaman başarıyla güncellendi, Açıklaman güncellenmediyse hesabına tekrardan giriş yapmayı deneyebilirsin.")
                    props.setEdit(false)
                    return response.json();
                } else {
                    toast.error("İşlem gerçekleşemedi.")
                    throw new Error(`Sunucu hatası: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Hata ' + error);
        })
    }

    return (
        <div className={"absolute w-screen top-0 h-screen flex items-center justify-center m-auto"}>
            <form onSubmit={Form} style={{zIndex: '3'}}
                 className={"bg-[#10101090] w-[350px] items-center justify-center border-dashed border-zinc-900 h-[350px] flex flex-col gap-6 border-[1px] p-12"}>
                <label className={"flex flex-col items-center justify-center"}>
                    Yeni açıklamanda ne yazacak ?
                </label>
                <input type={"text"}
                       className={"w-[250px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all hover:border-zinc-800 border-[1px]"}
                       onChange={(e) => {
                           setDescription(e.currentTarget.value);
                       }}/>
                <input type={"password"}
                       placeholder={"Lütfen şifrenizi belirtiniz."}
                       className={"w-[250px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all hover:border-zinc-800 border-[1px]"}
                       onChange={(e) => {
                           setPassword(e.currentTarget.value);
                       }}/>
                <button
                    type={"submit"}
                    className={"border-zinc-900 w-fit h-fit flex gap-1 items-center justify-center hover:gap-2 transition-all hover:border-zinc-800 border-[1px] px-4 py-1 rounded-md text-sm"}>
                    <GiPencil/> Açıklamayı Güncelle
                </button>
                <button
                    onClick={() => {
                        props.setEdit(false);
                    }}
                    className={"border-zinc-900 w-fit h-fit flex gap-1 items-center justify-center hover:gap-2 transition-all hover:border-zinc-800 border-[1px] px-4 py-1 rounded-md text-sm"}>
                    <MdCancel/> Pencereyi Kapat
                </button>
            </form>
            <div style={{zIndex: '2'}}
                 className={"absolute w-screen top-0 bg-zinc-900/50 h-screen flex items-center justify-center m-auto"}></div>
        </div>
    );
};

export default EditProfile;