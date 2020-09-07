import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'http://54.37.204.5:8080/chagra/api';

  constructor(private http: HttpClient) {
  }

  addcategory(p: any) {
    return this.http.post(this.baseUrl + "/category", p)
  }

  getcategories() {
    return this.http.get(this.baseUrl + "/categories")
  }

  deletecategory(id: number) {
    return this.http.delete(this.baseUrl + "/category/" + id);
  }

  updateproduct(p: any) {
    return this.http.put(this.baseUrl + "/category", p)
  }
}
