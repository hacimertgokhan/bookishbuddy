"use client"

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import NotePanel from "@/app/components/NotePanel";
import {useEffect, useState} from "react";
import CreateNote from "@/app/components/CreateNote";
import {useSession} from "next-auth/react";
import NoteItem from "@/app/components/NoteItem";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";

export default function Home() {
    const [enable, setEnable] = useState(false)
    const {data:session, status} = useSession()
    const router = useRouter();
    const [notes, setNotes] = useState([]);
    const [found, setFound] = useState(true)
    const [loaded, setLoaded] = useState(true)

    const getAllNotesByUserId = async () => {
        setLoaded(false)
        setFound(false)
        try {
            fetch('http://localhost:8000/note/list', {
                cache: "no-cache",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: session?.user.email,
                    id: session?.user.id,
                })
            })
                .then(response => response.json())
                .then(data => {
                    if(data.data.length > 0) {
                        setNotes(data.data);
                        setLoaded(true)
                        setFound(true)
                    } else {
                        setNotes([]);
                    }
                    return data;
                })
                .catch(error => {
                    setNotes([]);
                    setFound(false)
                    setLoaded(true)
                    return error;
                });
        } catch (e) {
            setNotes([]);
            setFound(true)
            setLoaded(true)
            console.log(e)
        }
    }

    useEffect(() => {
        if(session) {
            getAllNotesByUserId()
        }
    }, [])

    return (
      <>
          <Navigation/>
          <NotePanel enable={enable} setEnable={setEnable}/>
          <div className="w-screen select-none items-center h-screen flex flex-col">
              <h1 className={"text-5xl font-bold"}>Notlarım</h1>
              <br/>
              <div className={"xl:grid-cols-4 md:grid-cols-2 select-none gap-10 xl:grid-rows-2 grid"}>
                  {
                      loaded ? (
                          found ? (
                            notes.map((a:any, b:number) => {
                                return (
                                    <NoteItem update={getAllNotesByUserId} id={session?.user.id} setNotes={setNotes} email={session?.user.email} data={a} key={b}/>
                                )
                            })
                          ) : (
                              <Loading></Loading>
                          )
                      ) : (
                          <Loading></Loading>
                      )
                  }
              </div>
          </div>
          {
              enable === true ? (
                  <CreateNote setFound={setFound} setLoaded={setLoaded} key={"Create Note Key"} update={getAllNotesByUserId} setNotes={setNotes} setEnable={setEnable} id={session?.user.id} email={session?.user.email}/>
              ) : (
                  <></>
              )
          }
          <Footer/>
      </>
  );
}
