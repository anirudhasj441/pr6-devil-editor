const backend_url: string = "http://127.0.0.1:5000";

export const signInApi = async () => {};

export const signUpApi = async () => {};

export const googleSignInApi = async (code: string) => {
    const res = await fetch(`${backend_url}?code=${code}`);

    const response = await res.json();

    return response;
};
