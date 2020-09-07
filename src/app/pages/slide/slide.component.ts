import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {SlideService} from "../../services/slide.service";

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  slideimg:any;
  constructor(private productService: ProductsService, private slideService: SlideService) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    let files = event.target.files;
    console.log(files)
    if (files.length > 0) {
      this.slideimg = files;
    }
  }

  onSubmit(id: number) {
    const formData = new FormData();
    for (let file of this.slideimg){
      formData.append('file', file);
      this.slideService.addslide(formData, id).subscribe(
        (res) => console.log("done"),
        (err) => console.log(err)
      );
    }
  }
}
