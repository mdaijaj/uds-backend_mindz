import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/@shared/services/user.service';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('requiredForm', { static: true }) requiredForm: NgForm;

  constructor(
    private location: Location,
    private router: Router,
    private toast: ToastrService,
    private $user: UserService,
  ) { }

  formData: any = {};
  userLoginId: any;

  ngOnInit() {
    this.userLoginId = localStorage.getItem('EmpMainId');
  }

  saveRecord() {
    try {
      if (this.formData?.newPassword != this.formData?.confirmPassword) {
        return this.toast.error('Password or confirm password is not matching');
      }
      const password = CryptoJS.AES.encrypt(this.formData?.confirmPassword, 'password').toString();
      let req = {
        employee_id: this.userLoginId,
        password: password,
        oldPassword: this.formData?.oldPassword,
      }
      debugger
      this.$user.changePassword(req).subscribe((response: any) => {
        if (response) {
          this.toast.success(response?.message);
          this.router.navigateByUrl('master/hrms/employee-master/dashboard');
        }
      }, err => {
        console.log(err);
        this.toast.error(err?.error?.message);
      })
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this.location.back();
  }

}
