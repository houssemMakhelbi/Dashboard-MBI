import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private baseUrl = 'http://54.37.204.5:8080/chagra/api';

  constructor(private http: HttpClient) {
  }

  addslide(p,id) {
    let uploadURL = `${this.baseUrl}`+'/slide/'+id;
    return this.http.post<any>(uploadURL, p, {
      // This is required to manage post multipart updates
      headers: {}
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  getall(){
    return this.http.get(this.baseUrl + '/slides');
  }

  deleteSlide(id){
    return this.http.delete(this.baseUrl + '/slide/' + id)
  }
}
