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
    const res = await fetch(`${backend_url}/auth/google?code=${code}`);

    if (res.status !== 200) return false;

    const response = await res.json();

    return response;
};

export const getUserApi = async (token: string) => {
    const res = await fetch(`${backend_url}/getuser`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        throw new Error("Access denied");
    }

    const response = await res.json();
    console.log("response: ", response);

    return response.user;
};

export const getWorkspacesApi = async (
    token: string,
    query: string | undefined
) => {
    const res = await fetch(
        `${backend_url}/workspace${query ? "?q=" + query : ""}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (res.status === 401) {
        throw new Error("Access denied");
    }

    const response = await res.json();
    console.log("response: ", response);

    return response.workspaces;
};

export const deleteWorkspaceApi = async (token: string, id: string) => {
    const data = {
        id: id,
    };

    const res = await fetch(`${backend_url}/workspace`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
        },
    });

    if (res.status === 401) {
        throw new Error("Access denied");
    }

    const response = await res.json();
    console.log("response: ", response);

    return response;
};

export const updateWorkspaceStatusApi = async (
    token: string,
    id: string,
    status: "running" | "stopped"
) => {
    const data = {
        id: id,
        status: status,
    };

    const res = await fetch(`${backend_url}/workspace`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
        },
    });

    if (res.status === 401) {
        throw new Error("Access denied");
    }

    const response = await res.json();
    console.log("response: ", response);

    return response;
};
