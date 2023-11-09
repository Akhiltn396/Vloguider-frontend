import axios from "axios";

const newRequest = axios.create({

baseURL:`https://vloguider-backend.onrender.com/api/pins`,
withCredentials:true
})

export default newRequest