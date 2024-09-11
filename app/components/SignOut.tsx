"use client";

import React from 'react';
import {signOut} from "next-auth/react";

const SignOut = ({children}) => {
    return (
        <button style={{background: 'transparent', display: 'flex', placeItems: 'center', justifyContent: 'center', gap: '0.5em', cursor: 'pointer'}} onClick={() => signOut({ callbackUrl: '/' })}>
            {children}
        </button>
    );
};

export default SignOut;