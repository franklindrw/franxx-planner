import { InjectionToken } from "@angular/core";

type O = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  signal?: AbortSignal;
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer';
}

export interface IHttpPort {
  get<T>(endpoint: string, options?: O): Promise<T>;
  post<T>(endpoint: string, body: unknown, options?: O): Promise<T>;
  put<T>(endpoint: string, body: unknown, options?: O): Promise<T>;
  delete<T>(endpoint: string, options?: O): Promise<T>;
  patch<T>(endpoint: string, body: unknown, options?: O): Promise<T>;
}

export const HTTP_PORT = new InjectionToken<IHttpPort>('HTTP_PORT');
