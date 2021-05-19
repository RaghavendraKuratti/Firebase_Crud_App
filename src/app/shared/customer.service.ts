import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: AngularFireList<any> | undefined;
  constructor( private fb: AngularFireDatabase) { }
  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('')
  })

  getCustomers() {
    this.customerList = this.fb.list('customers');
    return this.customerList.snapshotChanges();
  }

  insertCustomer(customer: { fullName: any; email: any; mobile: any; location: any; }) {
    this.customerList?.push({
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    })
  }
  updateCustomer(customer: any) {
    this.customerList?.update(customer.$key,{
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    })
  }
  populateForm(cust: any) {
    this.form.setValue(cust);
  }
  deleteCustomer($key: any) {
    this.customerList?.remove($key);
  }
}
