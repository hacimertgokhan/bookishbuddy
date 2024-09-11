"use server";

const ResponseException = async (response) => {
    if (response.status === 403) {
        return { status: 403, message: "Bu işlemi yapmaya yetkiniz yok" };
    } else if (response.status < 205) {
        let data = await response.json();
        return data;
    } else if (response.status === 400) {
        let data = await response.json();
        return data;
    } else {
        return {
            status: response.status,
            message: response?.message || "Bir hata oluştu",
        };
    }
};

export const signIn = async (url, email, password) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store',
        body: JSON.stringify({
            email: email,
            password: password
        }),

    });

    return await ResponseException(result);

};
