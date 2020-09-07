import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://54.37.204.5:8080/chagra/api';
  private upload1 = 'http://54.37.204.5:8080/chagra/api/upload/';

  constructor(private http: HttpClient) {
  }

  addproduct(p: any) {
    return this.http.post(this.baseUrl + "/product", p)
  }

  upload(data, idproduct: number) {
    let uploadURL = `${this.upload1}`+idproduct;
    return this.http.post<any>(uploadURL, data, {
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
  getAllProducts(){
    return this.http.get(this.baseUrl + '/products');
  }
  getcategorieswithproducts() {
    return this.http.get(this.baseUrl + "/categories")
  }

  deleteproduct(id: number) {
    return this.http.delete(this.baseUrl + "/product/" + id);
  }

  updateproduct(p: any){
    return this.http.put(this.baseUrl + "/product", p)
  }
}
