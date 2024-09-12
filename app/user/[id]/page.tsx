"use client"

import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";

interface Props {
    params: any,
}

const Page = (props:Props) => {
    const {data: session, status} = useSession();
    const [note, setNote] = useState();

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
                    note_id: props.params.id
                })
            })
                .then(response => response.json())
                .then(data => {
                    setNote(data.data);
                    console.log(data)
                    return data
                })
                .catch(error => {
                    return error;
                });
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNoteById()
    }, [])
    return (
        <div>
            {props.params.id}
            {JSON.stringify(note)}
        </div>
    );
};

export default Page;