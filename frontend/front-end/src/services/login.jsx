import axios from 'axios';

const baseURL = "http://localhost:8080/api/auth/login";

const login = async credentials => {
    const {data} = await axios.post(baseURL, credentials)
    return data
}

export default {login};