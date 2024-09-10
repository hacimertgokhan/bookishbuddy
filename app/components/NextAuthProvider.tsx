"use client";

import React from 'react';
import {SessionProvider} from "next-auth/react";

// @ts-ignore
const NextAuthProvider = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthProvider;