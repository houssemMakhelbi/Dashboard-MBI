import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  private baseUrl = 'http://54.37.204.5:8080/chagra/api';

  constructor(private http: HttpClient) {
  }
  add(p,id){
    return this.http.post(this.baseUrl + "/upload/"+id, p)
  }
  delete(id){
    return this.http.delete(this.baseUrl + "/picture/" + id)
  }

}
