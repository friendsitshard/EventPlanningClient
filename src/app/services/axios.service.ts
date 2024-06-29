import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  private axiosInstance = axios.create();

  constructor() { 
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );
  }

  login(url: string, credentials: any): Observable<any> {
    return new Observable((observer) => {
      axios.post(url, credentials).then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  register(url: string, userDetails: any): Observable<any> {
    return new Observable((observer) => {
      axios.post(url, userDetails).then((response) => {
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  getData(url: string): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance.get(url).then((response) => {
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  getEvents(url: string, page: number, pageSize: number): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance.get(`${url}?pageNumber=${page}&pageSize=${pageSize}`).then((response) => {
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  addEvent(url: string, eventDto: any): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance.post(url, eventDto).then((response) => {
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

}
