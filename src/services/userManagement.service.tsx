import { User } from "../interfaces/userManagement.interface";

const BASE_URL = "https://660160fd87c91a11641ab523.mockapi.io/users";

export const fetchUsers = () => fetch(BASE_URL);

export const deleteUser = (userId: string) =>
  fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
  });

export const updateUserDetails = (payload: User) =>
  fetch(`${BASE_URL}/${payload?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
