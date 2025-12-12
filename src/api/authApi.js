import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000",
});


export const registerUser = async (user) => {
    const exists = await api.get(`/users?email=${user.email}`);
    if (exists.data.length) throw new Error("User already exists");


    const res = await api.post("/users", user);
    return res.data;
};


export const loginUser = async ({ email, password }) => {
    const res = await api.get(`/users?email=${email}&password=${password}`);
    return res.data.length ? res.data[0] : null;
};
