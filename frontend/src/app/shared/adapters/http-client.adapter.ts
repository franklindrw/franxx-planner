import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

import type { IHttpPort } from "@core/ports/http.port";
import { environment } from "@env/environment";

type HttpOptions = {
  params?: HttpParams | Record<string, string>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

/**
 * Adapter para implementação do HttpClient nativo do angular
 * não é necessário por ser nativo do angular, feito apenas para estudo
 * @method get
 * @method post
 * @method put
 * @method patch
 * @method delete
 */

@Injectable({
  providedIn: 'root'
})
export class HttpClientAdapter implements IHttpPort {
  private readonly baseUrl: string = environment.API_URL;
  constructor(private http: HttpClient) {}

  async get<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${this.baseUrl}${endpoint}`, options));
  }

  post<T>(endpoint: string, body: any, options?: HttpOptions): Promise<T> {
    return firstValueFrom(
      this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options)
    );
  }

  put<T>(endpoint: string, body: any, options?: HttpOptions): Promise<T> {
    return firstValueFrom(
      this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options)
    );
  }

  delete<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    return firstValueFrom(
      this.http.delete<T>(`${this.baseUrl}${endpoint}`, options)
    );
  }

  patch<T>(endpoint: string, body: any, options?: HttpOptions): Promise<T> {
    return firstValueFrom(
      this.http.patch<T>(`${this.baseUrl}${endpoint}`, body, options)
    );
  }
}
