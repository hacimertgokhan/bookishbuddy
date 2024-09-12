"use client";

import Image from "next/image";
import {useSession} from "next-auth/react";
import React, {useState} from "react";
import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {GiPencil} from "react-icons/gi";
import EditProfile from "@/app/components/EditProfile";

export default function Home() {
    const [edit, setEdit] = useState(false)
    const {data:session, status} = useSession()
    const router = useRouter();
    if(!session) {
        toast.error("Hey, öncelikle giriş yapmalısın !")
        router.push('/login');
    }
    return (
          <>
            <Navigation/>
              <div className="w-screen select-none items-center h-screen flex flex-col">
                  <div className={"p-12 grid xl:w-[1000px] xl:flex justify-center flex-col grid-cols-1 items-center"}>
                      <Image className={"rounded-full"}
                          // @ts-ignore
                             src={session?.user.avatar} alt={"hacimertgokhan"} width={100} height={100}/>

                      <p className={"font-sans text-xl mt-1 font-bold"}>{session?.user.username}</p>
                      <p className={"font-sans text-sm font-normal"}>{session?.user.email}</p>
                      <p className={"font-sans grad h-[50px] flex items-center justify-center text-center text-fade mt-2"}>{session?.user.description}</p>
                  </div>
                  <div className={"xl:w-[500px] h-[1px] bg-zinc-800"}></div>
                  <br/>
                  <div className={"grid xl:w-[1000px] xl:flex justify-center flex-col grid-cols-1 items-center"}>
                      <button
                          onClick={() => {
                              setEdit(true);
                          }}
                          className={"border-zinc-900 flex gap-1 items-center justify-center hover:gap-2 transition-all hover:border-zinc-800 border-[1px] px-4 py-1 rounded-md text-sm"}>
                          <GiPencil/> Açıklamayı Düzenle
                      </button>
                  </div>
              </div>
              <Footer/>
              {edit ? 
                  <EditProfile setEdit={setEdit} email={session?.user.email}/> : <></>}
          </>
    );
}
