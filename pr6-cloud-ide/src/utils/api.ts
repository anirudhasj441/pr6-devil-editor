const backend_url: string = "http://127.0.0.1:5000";

export const signInApi = async (email: string, password: string) => {
    const res = await fetch(`${backend_url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (res.status !== 200) return false;

    const response = await res.json();

    return response;
};

export const signUpApi = async (
    email: string,
    name: string,
    password: string
) => {
    const res = await fetch(`${backend_url}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify({
            email: email,
            name: name,
            password: password,
        }),
    });

    const response = await res.json();

    return response;
};

export const googleSignInApi = async (code: string) => {
    const res = await fetch(`${backend_url}?code=${code}`);

    if(res.status !== 200) return false;

    const response = await res.json();

    return response;
};
