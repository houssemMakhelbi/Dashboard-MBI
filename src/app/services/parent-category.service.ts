import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParentCategoryService {

  private baseUrl = 'http://54.37.204.5:8080/chagra/api';

  constructor(private http: HttpClient) {
  }

  addparentcategory(p: any) {
    return this.http.post(this.baseUrl + "/parentcategory", p)
  }

  getparentcategories() {
    return this.http.get(this.baseUrl + "/parentcategories")
  }

  deleteparentcategory(id: number) {
    return this.http.delete(this.baseUrl + "/parentcategory/" + id);
  }

  updateparentproduct(p: any) {
    return this.http.put(this.baseUrl + "/parentcategory", p)
  }
}
