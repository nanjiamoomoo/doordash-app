export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        credentials: "include"
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Login Failed")
        }
    })
}