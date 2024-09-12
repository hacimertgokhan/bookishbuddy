"use client";

import React from 'react';
import {signOut} from "next-auth/react";

interface Props {
    children: any,
}

const SignOut = (props:Props) => {
    return (
        <button style={{background: 'transparent', display: 'flex', placeItems: 'center', justifyContent: 'center', gap: '0.5em', cursor: 'pointer'}} onClick={() => signOut({ callbackUrl: '/' })}>
            {props.children}
        </button>
    );
};

export default SignOut;