export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Login Failed")
        }
    })
}

export const signup = (data) => {
    //data is a JSON object
    let str = JSON.stringify(data)
    const signupUrl = `/signup`
    return fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: str
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Signup Failed")
        }
    })
}

export const getRestaurants = () => {
    const getRestaurantsUrl = `/restaurants`
    return fetch(getRestaurantsUrl).then((response) => {
        console.log(response)
        if (response.status < 200 || response.status >= 300) {
            throw Error("Get Restaurants Failed")
        }
        return response.json();
    })
}