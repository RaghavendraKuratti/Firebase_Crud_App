import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: any;
  deletedMsg: boolean = false;
  constructor(public cs: CustomerService) { }

  ngOnInit(): void {
    this.cs.getCustomers().subscribe((list: any) => {
        this.customers = list.map((item: any) => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
      }
    );
  }
  onDelete($key: any){
    if (confirm("Are you sure to remove this record?")){
      this.cs.deleteCustomer($key);
      this.deletedMsg = true;
      setTimeout(() => {
        this.deletedMsg = false;
      }, 3000);
    }
  }
}
