import axios from "axios";
import { logout } from "./auth.loginlogout";
import {
  getLocalAccessToken,
  updateLocalAccessToken,
  getLocalRefreshToken,
} from "./auth.tokens";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refresh = getLocalRefreshToken();

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(err);
    if (
      originalConfig.url === "/api/jwt/refresh/" &&
      (err.response.status === 401 || err.response.status === 404)
    ) {
      logout();
    } else if (
      originalConfig.url === "/api/jwt/create/" &&
      err.response.status === 401
    ) {
      logout();
    } else if (originalConfig.url !== "/api/jwt/create/" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/api/jwt/refresh/", {
            refresh,
          });
          if (rs.status === 401 || rs.status === 404) logout();
          const access = rs.data.access;
          updateLocalAccessToken(access);

          return instance(originalConfig);
        } catch (_error) {
          console.log(_error);
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
