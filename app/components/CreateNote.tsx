"use client";

import React, {useState} from 'react';
import {GiPencil} from "react-icons/gi";
import {MdCancel} from "react-icons/md";
import toast from "react-hot-toast";

interface Props {
    setEnable: any
    email: any
    id: any,
    setNotes: any,
}

const CreateNote = (props:Props) => {
    const [note, setNote] = useState("")
    const [deepnote, setDeepNote] = useState("")
    const [title, setTitle] = useState("")
    const [book, setBook] = useState("")
    const [writer, setWriter] = useState("")
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [Public, setPublic] = useState(false)

    async function Form(e:any) {
        e.preventDefault();
        try {
            fetch('http://localhost:8000/note/create', {
                cache: "no-cache",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note: note,
                    deep_note: deepnote,
                    email: props.email,
                    title: title,
                    between: `${min}-${max}`,
                    book_name: book,
                    public: Public,
                    writer: writer,
                    id: props.id,
                })
            })
                .then(response => {response.json()})
                .then(data => {
                    props.setNotes(data.data);
                    toast.success("Not başarıyla eklendi !")
                    props.setEnable(false)
                })
                .catch(error => {
                    props.setEnable(false)
                    console.error('Hata ' + error);
            })
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={"absolute w-screen top-0 h-screen flex items-center justify-center m-auto"}>
            <form onSubmit={Form} style={{zIndex: '3'}}
                 className={"bg-[#101010] w-[900px] items-center justify-center border-dashed border-zinc-900 h-[700px] flex flex-col gap-6 border-[1px] p-12"}>
                <label className={"flex w-full text-start font-sans flex-col font-bold text-4xl"}>
                    Oh, Bu harika !
                    <p className={"font-sans text-4xl font-thin text-indigo-300"}>Yeni Bir Not.</p>
                </label>
                <br/>
                <div className={"grid grid-cols-2 grid-rows-1 gap-6"}>
                    <input type={"text"}
                           placeholder={"Başlık."}
                           className={"w-[250px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all hover:border-zinc-800 border-[1px]"}
                           onChange={(e) => {
                               setTitle(e.currentTarget.value);
                           }}/>
                    <div className={"flex gap-[21px] flex-row"}>
                        <input type={"text"}
                               placeholder={"Kitap adı."}
                               className={"w-[115px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all hover:border-zinc-800 border-[1px]"}
                               onChange={(e) => {
                                   setBook(e.currentTarget.value);
                               }}/>

                        <input type={"text"}
                               placeholder={"Kitap Yazarı."}
                               className={"w-[115px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all hover:border-zinc-800 border-[1px]"}
                               onChange={(e) => {
                                   setWriter(e.currentTarget.value);
                               }}/>
                    </div>
                    <textarea
                        placeholder={"Notunuz."}
                        className={"w-[250px] p-2 resize-none mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all h-[150px] hover:border-zinc-800 border-[1px]"}
                        onChange={(e) => {
                            setNote(e.currentTarget.value);
                        }}/>
                    <textarea
                        placeholder={"Anahtar kelimeler ve dip not."}
                        className={"w-[250px] p-2 resize-none mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all h-[150px] hover:border-zinc-800 border-[1px]"}
                        onChange={(e) => {
                            setDeepNote(e.currentTarget.value);
                        }}/>
                    <div className={"flex-col flex"}>
                        <label className={"font-bold font-sans ml-1"}>Sayfa Aralığı</label>
                        <div className={"flex-row gap-1 items-center flex"}>
                            <input type={"text"}
                                   placeholder={"0"}
                                   className={"w-[40px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all text-sm hover:border-zinc-800"}
                                   onChange={(e) => {
                                       setMin(Number(e.currentTarget.value));
                                   }}/> |
                            <input type={"text"}
                                   placeholder={"0"}
                                   className={"w-[40px] p-2 h-fit mt-1 border-zinc-900 bg-transparent outline-none rounded-md transition-all text-sm hover:border-zinc-800"}
                                   onChange={(e) => {
                                       setMax(Number(e.currentTarget.value));
                                   }}/>
                        </div>
                    </div>
                    <div className={"relative items-center h-[45px] justify-center flex flex-col rounded-xl"}>
                        <label className={"text-md font-bold font-sans "}>
                            Herkese Açık
                        </label>
                        <span
                            onClick={() => {
                                setPublic(!Public)
                            }}
                            className={"w-[40px] h-[20px] bg-indigo-300 rounded-full border-[1px] border-zinc-900 hover:border-zinc-800 relative"}>
                            <span className={`w-[20px] h-[20px] cursor-pointer -translate-y-[1px] ${Public === true ? "translate-x-[20px] bg-indigo-500" : "-translate-x-[1px] bg-indigo-200"} transition-all absolute rounded-full`}></span>
                        </span>
                    </div>
                </div>
                <button
                    type={"submit"}
                    className={"border-zinc-900 w-fit h-fit flex gap-1 items-center justify-center hover:gap-2 transition-all hover:border-zinc-800 border-[1px] px-4 py-1 rounded-md text-sm"}>
                    <GiPencil/> Notunu Oluştur
                </button>
                <button
                    onClick={() => {
                        props.setEnable(false);
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

export default CreateNote;