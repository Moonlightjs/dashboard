import CookieControl from "@/utils/CookieControl";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { setupCache } from "axios-cache-adapter";
import Logger from "./Logger";
// import Constants from "../constants";

// export function serialize(obj) {
//   var str = [];
//   for (var p in obj)
//     if (obj.hasOwnProperty(p)) {
//       if (obj[p] === null || obj[p] === undefined || obj[p] === "") continue;
//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//     }
//   return str.join("&");
// }

// const { BASE_API_URL, ERRORS, NETWORK_TIMEOUT } = Constants;

// const cache = setupCache({
//   maxAge: 15 * 60 * 1000,
//   debug: false,
//   exclude: {
//     query: false,
//   },
//   invalidate: async (config, request) => {
//     if (request.clearCacheEntry) {
//       await config.store.removeItem(config.uuid);
//     }
//   },
// });

// export const handleErrorResponse = (error) => {
//   return Promise.reject(
//     error ? (error.response ? error.response.data : error) : error
//   );
// };

// const errorDisplay = (notifyHandler, message, error_id) => {
//   if (!message) return;
//   if (!notifyHandler.isActive(error_id)) {
//     notifyHandler(message, {
//       type: "error",
//       toastId: error_id,
//     });
//   }
// };

// const errorHandler = async (
//   error,
//   notifyHandler,
//   invalidTokenHandler = null,
//   additionalInfo = null
// ) => {
//   if (!error) {
//     errorDisplay(notifyHandler);
//     return "Network Error";
//   }
//   if (error.code === "ECONNABORTED") {
//     errorDisplay(
//       notifyHandler,
//       "Request timeout, please try again later.",
//       ERRORS.NETWORK_ERROR
//     );
//     return Promise.reject({ ...error });
//   }

//   const response = error.response;

//   if (!response) {
//     errorDisplay(notifyHandler, "Network Error", ERRORS.NETWORK_ERROR);
//     return error;
//   }

//   switch (response.status) {
//     case 401:
//       if (invalidTokenHandler) invalidTokenHandler();
//       break;
//     case 403:
//     case 400:
//     case 429:
//       errorDisplay(notifyHandler, response.data.message, ERRORS.REQUEST_ERROR);
//       break;
//     default:
//       errorDisplay(notifyHandler, response.data.message, ERRORS.INTERNAL_ERROR);
//       Logger(error, additionalInfo);
//       break;
//   }

//   return Promise.reject(response.data);
// };

class HttpClient {
  private static instance: HttpClient;
  private request: AxiosInstance;

  private constructor() {
    console.log(import.meta.env.VITE_ROOT_API);
    this.request = axios.create({
      baseURL: import.meta.env.VITE_ROOT_API || "http://localhost:1998/api/v1",
      // adapter: cache.adapter,
    });
    this.request.defaults.timeout = process.env.VUE_APP_NETWORK_TIMEOUT
      ? parseInt(process.env.VUE_APP_NETWORK_TIMEOUT, 10)
      : undefined;

    this.request.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
    };

    // Request interceptor for API calls
    this.request.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: CookieControl.get("accessToken")
            ? "Bearer " + CookieControl.get("accessToken")
            : undefined,
          Accept: "application/json",
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    // Response interceptors for API
    this.request.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;

        // if no login =>
        if (
          error.response.status === 401 &&
          !CookieControl.get("refreshToken")
        ) {
          window.location.href = "/login";
          // return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.request
            .post("/auth/refresh-token", {
              refreshToken: CookieControl.get("refreshToken"),
            })
            .then((res) => {
              if (res.status === 201) {
                CookieControl.set(
                  "refreshToken",
                  res.data.data.refreshToken,
                  process.env.VUE_APP_REFRESH_TOKEN_TIME
                );
                CookieControl.set(
                  "accessToken",
                  res.data.data.accessToken,
                  60 * 10
                );
                this.request.defaults.headers.common["Authorization"] =
                  "Bearer " + CookieControl.get("accessToken");
                return this.request(originalRequest);
              }
            });
        }

        return Promise.reject(error);
      }
    );
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClient();
    }
    return this.instance;
  }

  public post<D = any, T = any>(
    url: string,
    data?: D,
    config?: {}
  ): Promise<AxiosResponse<T>> {
    return this.request.post(url, data, config);
  }

  public get<T = any>(url: string, config?: {}): Promise<AxiosResponse<T>> {
    return this.request.get<T, AxiosResponse<T>>(url, config);
  }

  public put<D = any, T = any>(
    url: string,
    data?: D,
    config?: {}
  ): Promise<AxiosResponse<T>> {
    return this.request.put<T, AxiosResponse<T>, D>(url, data, config);
  }

  public patch<D = any, T = any>(
    url: string,
    data?: D,
    config?: {}
  ): Promise<AxiosResponse<T>> {
    return this.request.patch(url, data, config);
  }

  public delete<T = any>(url: string, config?: {}): Promise<AxiosResponse<T>> {
    return this.request.delete<T, AxiosResponse<T>>(url, { ...config });
  }
}

export default HttpClient.getInstance();
