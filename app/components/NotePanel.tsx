import React from 'react';
import {MdCreate} from "react-icons/md";

interface Props {
    setEnable: any,
    enable: any,
}

const NotePanel = (props:Props) => {
    return (
        <div className={"xl:w-[1000px] md:w-[700px] sm:w-[400px] w-[350px] flex m-auto items-center justify-between h-[75px]"}>
            <div className={"flex gap-12 items-center justify-center"}>
                <button
                    onClick={() => {
                        props.setEnable(true)
                    }}
                    className={"border-zinc-900 hover:bg-zinc-900 flex gap-1 items-center justify-center hover:gap-2 transition-all hover:border-zinc-800 border-[1px] px-4 py-1 rounded-md text-sm"}
                >
                    <MdCreate/>
                    Oluştur</button>
            </div>
            <div>
                <input
                    className={"border-zinc-900 outline-none bg-transparent hover:bg-zinc-900 flex gap-1 items-center justify-center hover:gap-2 transition-all hover:border-zinc-800 border-[1px] px-4 py-1 rounded-md text-sm"}
                    placeholder={"Not ara..."} type={"search"}/>
            </div>
        </div>
    );
};

export default NotePanel;