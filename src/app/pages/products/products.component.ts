import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ProductsService} from "../../services/products.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PicturesService} from "../../services/pictures.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: any;
  categories: any = [];
  products:any=[];
  category: any = {"id": ""};
  productImage: File[];
  ChoosenCategory: any = {};
  prodsChoosenLength:number=0;
  pictureURL: string = "http://localhost:8080/api/getfile/"
  deleteMessage: string = "";
  deleteidProd:number=0;
  page=1;
  pageSize=10;
  private updateform: any;
  private updateformOLD: any;
  constructor(private toastr: ToastrService, private productService: ProductsService, private pictureService: PicturesService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getproducts();
    this.getallproducts();
  }

  showNotification(from, align, result, message) {
    switch (result) {
      case 1:
        this.toastr.success(
          message,
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        this.getproducts()
        break;
      case 2:
        this.toastr.error(
          message,
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
  }

  add() {
    let messageSucc = '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Ton produit à été ajouté avec succès.</span>';
    let messageFail = '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Un erreur a ete prévenue lors d\'enregistrement de ton produit.</span>';
    this.productService.addproduct(this.product).subscribe(value => {
      this.showNotification('top', 'right', 1, messageSucc)
      this.onSubmit(value["id"])
      this.getproducts();
      this.getallproducts();
    }, error => {
      this.showNotification('top', 'right', 2, messageFail)
      console.log("error add")
    })

  }

  delete(){
    let messageSucc = '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Ton produit à été supprimé avec succès.</span>';
    let messageFail = '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Un erreur a ete prévenue lors de la suppression de ton produit.</span>';
    this.productService.deleteproduct(this.deleteidProd).subscribe(value => {
      this.modalService.dismissAll();
      this.showNotification('top', 'right', 1, messageSucc);
      this.getproducts();
      this.getallproducts();
    }, error => {
      this.showNotification('top', 'right', 2, messageFail);
    })
  }
  update(){
    this.productService.updateproduct(this.updateform).subscribe(value => {
      console.log(value)
      this.getproducts()
      this.getallproducts();
      this.modalService.dismissAll();
    })
    if (this.productImage != undefined){
      this.onSubmit(this.updateform.id)
    }
  }
  updateProduct(prod:any,contentUpdate,idcategory:number){
    this.updateform=prod
    this.updateformOLD=prod
    this.category.id=idcategory
    this.updateform.category=this.category
    console.log(this.updateform)
    this.openXl(contentUpdate)
  }
  deleteProduct(id:number,name: string, contentedelete) {
    this.deleteMessage = name;
    this.deleteidProd=id;
    this.deleteModal(contentedelete);
  }

  openXl(content) {
    this.modalService.open(content, {size: 'xl'});
  }

  register(form) {
    this.product = form.value;
    this.product.newPro=true;
    this.product.sale=true

     this.category.id = this.product.category
    this.product.categories = this.category
    console.log(this.product)
    /*this.product.pictureUrl = "null"
    console.log(this.product)*/
    this.modalService.dismissAll()
    this.add()
  }

  onFileChange(event) {
    let files = event.target.files;
    console.log(files)
    if (files.length > 0) {
      this.productImage = files;
    }
  }

  onSubmit(id: number) {
    const formData = new FormData();
    for (let file of this.productImage){
    formData.append('file', file);
    this.productService.upload(formData, id).subscribe(
      (res) => console.log("done"),
      (err) => console.log(err)
    );
  }
  }

  getproducts() {
    this.productService.getcategorieswithproducts().subscribe(value => {
      this.categories = value
      console.log(this.categories)
    }, error => console.log(error))
  }
  getallproducts(){
    this.productService.getAllProducts().subscribe(value => {
      this.products = value;
      console.log(this.products);
    },error => console.log(error))
  }
  onChangeSelectCategories(newValue) {
    console.log(newValue)
    this.categories.forEach(c => {
      if (c.id == newValue) {
        c.products=this.products;
        this.ChoosenCategory = c;
        this.prodsChoosenLength=c.length;
      }
    })
  }

  deleteModal(contentdelete) {
    this.modalService.open(contentdelete, {size: 'sm'});
  }
  CalculatePromoPrice(){
    this.updateform.price = this.updateform.salePrice - (this.updateform.salePrice*this.updateform.discount)/100
  }
  CalculatePromo(){
    this.updateform.discount = 100 - (this.updateform.price*100)/this.updateform.salePrice
  }
  closeupdateDialog(){
    this.getallproducts()
    this.onChangeSelectCategories(this.category.id)
    this.modalService.dismissAll()
  }
  deleteimage(id){
    this.pictureService.delete(id).subscribe(value => {
      console.log(value)
      this.getproducts();
      this.getallproducts();
    },error =>  console.log(error));

  }
}
