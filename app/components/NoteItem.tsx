"use client";

import React from 'react';
import {MdPublic} from "react-icons/md";
import {useRouter} from "next/navigation";
import toast from 'react-hot-toast';
import { CgDetailsMore, CgRemove } from 'react-icons/cg';

interface Props {
    data: any,
    email: any,
    id: any,
    setNotes: any,
    update: any,
}

const NoteItem = (props:Props) => {

    const DeleteNote = () => {
        try {
            fetch('http://localhost:8000/note/delete-note-by-id', {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: props.email,
                    id: props.data.id,
                    belong_id: props.id,
                })
            }).then(response => response.json())
            .then(data => {
                toast.success("Not başarıyla silindi !");
                props.setNotes(data.data);
                props.update();
                return data;
            }).catch(error => {
                return error;
            })
        } catch(e) {
            console.log(e)
        }
    }

    const router = useRouter()
    return (
        <span className={"w-[275px] hover:shadow-md hover:shadow-[#101010] p-4 font-sans gap-12 grid grid-cols-1 grid-rows-3 flex-col h-[300px] cursor-pointer transition-all rounded-sm border-[#101010] shadow-sm border-[1px]"}>
            <div className={"w-full flex h-[50px] items-center flex-row justify-between"}>
                <h1 className={"font-medium text-xl"}>{props.data.book_name}</h1>
                <p className={"text-sm"}>{props.data.writer}</p>
            </div>
            <div className={"-translate-y-12 h-[225px] text-fade w-full"}>
                <p style={{whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis', height: '165px'}} className='TextOverflow'>
                    {props.data.note}...
                </p>
            </div>
            <div className={"w-full h-[75px] mt-1 flex items-center justify-between"}>
                <p className={"flex flex-row items-center justify-center gap-1 text-slate-300 text-sm font-medium"}><MdPublic/> {props.data.public === true ? "Herkese açık" : "Gizli"}</p>
                
                <div style={{zIndex: '5'}} className='flex flex-row gap-5 items-center justify-center'>
                    <button className='hover:text-emerald-600 transition-all' onClick={() => router.push(`/notes/${props.data.id}`)}><CgDetailsMore/></button>
                    <button className='hover:text-red-600 transition-all' onClick={() => DeleteNote()}><CgRemove/></button>
                </div>
            </div>
        </span>
    );
};

export default NoteItem;