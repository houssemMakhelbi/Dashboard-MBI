import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://54.37.204.5:8080/chagra/api';

  constructor(private http: HttpClient) {
  }
  getall(){
    return this.http.get(this.baseUrl + '/userorders')
  }
}
