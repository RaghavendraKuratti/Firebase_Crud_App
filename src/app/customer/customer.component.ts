import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  submitted: boolean = false;
  successMsg: boolean = false;
  public formControlls = this.cs.form.controls;
  constructor(public cs: CustomerService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.submitted = true;
    if (this.cs.form.valid) {
      debugger;
      if (this.cs.form.get('$key')?.value == null) {
        this.cs.insertCustomer(this.cs.form.value);
      } else {
        this.cs.updateCustomer(this.cs.form.value);
      }
      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
      }, 3000);
      this.submitted = false;
      this.cs.form.reset();
    }
  }
}
