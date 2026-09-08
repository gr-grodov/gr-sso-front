import type { AxiosInstance } from "axios";


export function setupCsrfInterceptor(api: AxiosInstance): void {

  api.interceptors.request.use(config => {
    const token = getCookie("XSRF-TOKEN");
    if (token) {
        config.headers["X-XSRF-TOKEN"] = token;
    }

    return config;
  });
}

function getCookie(name: string): string | null {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith(name + "="))
    ?.split("=")[1] ?? null;
}
