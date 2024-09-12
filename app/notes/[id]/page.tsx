"use client"

import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import Loading from "@/app/components/Loading";
import {useRouter} from "next/navigation";
import {AiFillHome} from "react-icons/ai";
import { CgEditFade, CgEditMarkup } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { FcDownload } from 'react-icons/fc';
import { GoDownload } from 'react-icons/go';
import toast from 'react-hot-toast';

interface Props {
    params: any,
}

const Page = (props:Props) => {
    
    const {data: session, status} = useSession();
    const [note, setNote] = useState();
    const [found, setFound] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const router = useRouter();
    if(!session) {
        toast.error("Hey, öncelikle giriş yapmalısın !")
        router.push('/login');
    }

    
    const DeleteNote = () => {
        try {
            fetch('http://localhost:8000/note/delete-note-by-id', {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: note.email,
                    id: note.id,
                    belong_to: note.belong_to,
                })
            }).then(response => response.json())
            .then(data => {
                toast.success("Not başarıyla silindi !");
                router.push('/notes');
                return data;
            }).catch(error => {
                return error;
            })
        } catch(e) {
            console.log(e)
        }
    }

    const getNoteById = async () => {
        try {
            fetch('http://localhost:8000/note/get-note-by-id', {
                cache: "no-cache",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: session?.user.email,
                    id: session?.user.id,
                    note_id: Number(props.params.id)
                })
            })
                .then(response => response.json())
                .then(data => {
                    setNote(data.data);
                    setFound(true)
                    setLoaded(true)
                    return data
                })
                .catch(error => {
                    setFound(false)
                    setLoaded(true)
                    return error;
                });
        } catch (e) {
            setFound(false)
            setLoaded(true)
            console.log(e)
        }
    }

    useEffect(() => {
        getNoteById()
    }, [])
    return (

        <>
            <div className={"w-screen h-screen flex flex-col p-24"}>
                {
                    loaded ? (
                        found ? (
                            <div className={"grid grid-cols-1 grid-rows-3 gap-5 items-center justify-center"}>
                                <div>
                                    <h1 className={"text-5xl font-bold font-sans"}>{note.title}</h1>
                                    <p className={"text-2xl font-thin font-sans"}>{note.book_name}</p>
                                </div>
                                
                                <div className={"grid grid-cols-1 grid-rows-2 gap-5 items-center justify-center"}>
                                    <div>
                                        <label className={"flex-col text-2xl flex font-bold font-sans"}>
                                            Ana notunuz
                                            <div className={"text-xl font-thin font-sans"}>
                                                {note.note}
                                            </div>
                                        </label>
                                    </div>
                                    <br/>
                                    <div>
                                        <label className={"flex-col text-2xl flex font-bold font-sans"}>
                                            Dip not ve Anahtar kelimeler
                                            <div className={"text-xl font-thin font-sans"}>
                                                {note.deep_note}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                    <div>
                                        <label className={"flex-col text-2xl flex font-bold font-sans"}>
                                            Yazar
                                            <div className={"text-xl font-thin font-sans"}>
                                                {note.writer}
                                            </div>
                                        </label>
                                    </div>
                            </div>
                        ) : (
                            <Loading></Loading>
                        )
                    ) : (
                        <Loading></Loading>
                    )
                }
            </div>

            <div className={"w-screen absolute text-xl gap-12 flex items-center justify-center bottom-0 h-[150px]"}>
                <button
                    onClick={() => {router.push('./')}}
                ><AiFillHome/></button>
                <button><BiEdit/></button>
                <button onClick={() => {DeleteNote()}}><BsTrash/></button>
                <button><GoDownload/></button>
            </div>

        </>
    )
        ;
};

export default Page;