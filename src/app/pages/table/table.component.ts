import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public show:boolean=false;
  public orders:any=[]
  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getall().subscribe(value => {
      this.orders = value;
      for(let i=0; i< this.orders.length; i++){
        this.orders[i].go=false;
      }
      console.log(this.orders)
    });
  }

  toggle(){
    this.show=!this.show
  }
}
