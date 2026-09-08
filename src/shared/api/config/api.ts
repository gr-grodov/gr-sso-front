import axios from "axios";
import { env } from "@/shared/config/env";
import { setupCsrfInterceptor } from "./csrf.interceptor";
import { setupUnauthorizationInterceptor } from "./unauthorization.interceptor";

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

setupCsrfInterceptor(api);
setupUnauthorizationInterceptor(api);