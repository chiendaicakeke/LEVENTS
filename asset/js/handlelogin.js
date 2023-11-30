import fetchApi from "./fetAPI.js";
import storage from "./storage.js";

fetchApi.use("https://localhost:44390/api");

const login = async (data) => {
  const response = await fetchApi.get("/Users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

const logout = () => {
  storage.remove("account");
};

export { login, logout };
