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

    if (data.error) {
      throw Error(data.message);
    }

    if (data.token) {
      setToken(data.token);
    }

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
  console.log("new activity inside of add activity", newActivity);
  const url = `${BASE_URL}/activities`;
  const fetchOptions = {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(newActivity),
  };

  const response = await fetch(url, fetchOptions);
  console.log(" response inside of api index in add activity", response);
  const data = await response.json();

  console.log("data inside of add activity", data);

  return data;
};

export const addRoutine = async (newRoutine) => {
  console.log(newRoutine);
  const url = `${BASE_URL}/routines`;
  const fetchOptions = {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(newRoutine),
  };

  const response = await fetch(url, fetchOptions);
  console.log(response);
  const data = await response.json();
  console.log("data in api index addroutine", data);

  return data;
};

/*export const deleteActivity = async (id) => {
  const url = `${BASE_URL}/activities/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: buildHeaders(),
  });

  const { data, error } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  return data;
};

/*export const addRoutine = async (newRoutine) => {
  await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      name: "newRoutine.name",
      goal: "newRoutine.goal",
    }),
  });
  const data = await response.json();

  return data;
};*/
