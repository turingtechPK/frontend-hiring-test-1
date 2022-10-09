// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import instance from "./interceptors";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
export async function fetchMyAPI() {
  let data = await instance.get("calls");

  return data.data.nodes;
}
export async function archivechange(id: string) {
  // const token: any = JSON.parse(localStorage.getItem("token"));
  // return fetch(`https://frontend-test-api.aircall.io/calls/${id}/archive`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token.access_token}`,
  //   },
  // }).then((data) => {
  //   return data.json();
  // });
  let data = await instance.put(`calls/${id}/archive`);
  return data;
}
export async function addnote(id: string, note: string) {
  let data = await instance.post(`calls/${id}/note`, { content: note });
  return data;
  // return fetch(`https://frontend-test-api.aircall.io/calls/${id}/note`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     "Authorization": `Bearer ${token.access_token}`
  //   },
  //   body: {content:JSON.stringify(note)}

  // })
  //   .then(data => {return data.json()})
}
export async function loginUser(credentials: string) {
  return fetch("https://frontend-test-api.aircall.io/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    return data.json();
  });
}
