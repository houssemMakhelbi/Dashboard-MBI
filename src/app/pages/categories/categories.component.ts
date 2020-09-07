import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ParentCategoryService} from "../../services/parent-category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  Parentcategories: any = [];
  categories: any = [];
  page = 1;
  pageSize = 10;
  updateform: any;
  deletemessage: string;
  iddelete: number;
  type: number;

  constructor(private toastr: ToastrService, private categoryService: CategoriesService, private parentCategory: ParentCategoryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllParentCategory()
    this.getAllCategory()
  }

  getAllParentCategory() {
    this.parentCategory.getparentcategories().subscribe(value => {
      this.Parentcategories = value;
    }, error => console.log(error))
  }

  getAllCategory() {
    this.categoryService.getcategories().subscribe(value => {
      this.categories = value;
      console.log(this.Parentcategories)
    }, error => console.log(error))
  }

  set() {
    if (this.type == 1){
    this.parentCategory.addparentcategory(this.updateform).subscribe(value => {
      console.log(value)
      this.modalService.dismissAll()
      this.getAllParentCategory()
    }, error => console.log(error))
    }else {
      let parentCategory = {"id" :""}
      parentCategory.id=this.updateform.parentCategory;
      this.updateform.parentCategory=parentCategory;
      console.log(this.updateform)
      this.categoryService.addcategory(this.updateform).subscribe(value => {
        console.log(value)
        this.modalService.dismissAll()
        this.getAllParentCategory()
      }, error => console.log(error))
    }
  }

  add(content,type) {
    this.type=type
    this.updateform = {"name": "", "description": ""}
    this.openXl(content)
  }

  update(type, content, cat) {
    this.type=type
    this.updateform = cat
    this.openXl(content)
  }

  openXl(content) {
    this.modalService.open(content, {size: 'xl'});
  }

  deleteCategory(type, id, name, content) {
    this.type = type
    this.deletemessage = name;
    this.iddelete = id;
    this.modalService.open(content, {size: 'lg'});
  }

  delete() {
    if(this.type == 1) {
      this.parentCategory.deleteparentcategory(this.iddelete).subscribe(value => {
        console.log(value)
        this.getAllParentCategory()
        this.modalService.dismissAll()
      }, error => console.log(error))
    }else{
      this.categoryService.deletecategory(this.iddelete).subscribe(value => {
        console.log(value)
        this.getAllCategory()
        this.modalService.dismissAll()
      }, error => console.log(error))
    }
  }

  onChangeSelectCategories(val) {
    console.log(val)
    if (val == 0) {
      this.getAllCategory()
    } else {
      this.Parentcategories.forEach(c => {
        if (c.id == val) {
          this.categories = c.categories
        }
      });
    }

  }
}
