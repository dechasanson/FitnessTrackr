export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

const setToken = (token) => {
  localStorage.setItem("auth-token", token);
};

function buildHeaders() {
  let base = {
    "Content-Type": "application/json",
  };
  if (getToken()) {
    base["Authorization"] = `Bearer ${getToken()}`;
  }

  return base;
}

export const fetchAPI = async (url) => {
  const fetchOptions = {
    headers: buildHeaders(),
  };

  // if (sendData) {
  //   fetchOptions.body = JSON.stringify(sendData);
  // }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
};
