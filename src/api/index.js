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
    base[
      "Authorization"
    ] = `Bearer "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIzLCJ1c2VybmFtZSI6ImJyaWFuIiwiaWF0IjoxNjA2NzE0NzI5LCJleHAiOjE2MDczMTk1Mjl9.pUrBmkADX-q6hC5zQgvi-rCdSJ1VOBPmtnZpfGFoHBo"`;
  }

  return base;
}

export const fetchAPI = async (url, method = "GET", sendData = null) => {
  const fetchOptions = {
    method: method,
    headers: buildHeaders(),
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
};

export const addActivity = async (newActivity) => {
  console.log(newActivity);
  const url = `${BASE_URL}/activities`;
  const fetchOptions = {
    method: "POST",
    headers: buildHeaders(),
  };

  if (newActivity) {
    fetchOptions.body = JSON.stringify(newActivity);
  }

  const response = await fetch(url, fetchOptions);
  const { error, data } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  console.log(data);

  return data;
};

export const addRoutine = async (newRoutine) => {
  console.log(newRoutine);
  const url = `${BASE_URL}/routines`;
  const fetchOptions = {
    method: "POST",
    headers: buildHeaders(),
  };

  if (newRoutine) {
    fetchOptions.body = JSON.stringify(newRoutine);
  }

  const response = await fetch(url, fetchOptions);
  const { error, data } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  console.log(data);

  return data;
};
