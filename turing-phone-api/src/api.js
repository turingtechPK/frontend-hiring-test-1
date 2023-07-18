import axios from "axios";

const baseUrl= 'https://frontend-test-api.aircall.io';

export const login = async (email, password) => {
   return await axios.post(
    `${baseUrl}/auth/login`,{
            username: email,
            password: password,
        }
    );
};

export const getCalls = async (page, rows) => {
   return await axios.get(`${baseUrl}/calls?offset=${page}&limit=${rows}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });
};
