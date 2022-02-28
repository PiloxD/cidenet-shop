import { useEffect, useCallback, useState } from "react";
import Context from "../context/UserContext";


export default function useUser() {

    const [jwt, setJwt] = useState('');
    const infoStorage = window.localStorage.getItem('loggedAppUser')


    useEffect(() => {
        setJwt(infoStorage)
    }, [jwt])

    const login = useCallback(({ email, password }) => {
        setJwt(infoStorage)
    }, [setJwt])

    const logout = useCallback(() => {
        window.localStorage.removeItem('loggedAppUser', infoStorage)
        window.localStorage.removeItem('total')
        setJwt('')
    }, [setJwt])



    return {
        isLogged: Boolean(infoStorage),
        login,
        logout
    }
}