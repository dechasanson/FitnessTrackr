export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

export const setToken = (token) => {
  localStorage.setItem("auth-token", token);
};

export const auth = async (username, password, isNew = false) => {
  let url = `${BASE_URL}/users` + (isNew ? "/register" : "/login");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log("response", response);
    const data = await response.json();

    // if (data.error) {
    //   throw Error(data.message);
    // }

    // if (data.token) {
    //   setToken(data.token);
    // }

    return data;
  } catch (err) {
    console.log("error auth function:", err);
  }
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
