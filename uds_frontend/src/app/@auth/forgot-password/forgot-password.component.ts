import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadService } from '../../@shared/services/head.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth-material/auth.service';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';
import { UserService } from 'src/app/@shared/services/user.service';
import { environment } from 'src/app/environments/environment';

interface Attendance {
  employee_id: string,
  punching_date: string,
  punching_time: string,
  punching_status: "IN"
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  // submitted: boolean = false;
  sendLinkForm: any;
  forgotPwdForm: any;
  isLogIn: boolean = false;
  loginData: any;
  loading: boolean = false;
  errorMessage: any;
  wrong: any;
  empMainId: any;
  showLoader: boolean = false;
  isSubmited: boolean = false;
  userId: any;
  baseUiUrl: any;

  constructor(
    private fb: FormBuilder,
    private head: HeadService,
    private _authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private $user: UserService,

  ) {
    this.baseUiUrl = environment.baseUiUrl;
    this.sendLinkForm = this.fb.group({
      employee_official_email: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
    });
    this.forgotPwdForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPwd: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.userId = params?.id;
    })
  }

  get login() { return this.sendLinkForm.controls };
  get forgotPwd() { return this.forgotPwdForm.controls };

  sendLinkFormSubmit() {
    try {
      debugger
      if (this.sendLinkForm.invalid) {
        this.toast.error('Enter an Valid Email', 'Something Went Wrong')
        return;
      }
      this.isSubmited = true;
      this.showLoader = true;
      let obj = this.sendLinkForm.value;
      obj.baseUiUrl = this.baseUiUrl;
      debugger
      this.$user.forgotSendOtp(obj).subscribe(
        (res) => {
          this.toast.success(res?.message);
          this.showLoader = false;
          this.isSubmited = false;
          this.route.navigateByUrl('auth/login');
        },
        (err) => {
          this.showLoader = false;
          this.isSubmited = false;
          this.toast.error(err?.error?.message);
        })
    } catch (error) {
      this.showLoader = false;
      this.isSubmited = false;
      console.log(error)
    }
  }

  forgotPassword() {
    try {
      debugger
      if (this.forgotPwdForm.invalid) {
        return this.toast.error("Required fields should not be empty", "Fields Error");
      }
      let obj = this.forgotPwdForm.value;
      if (obj?.password != obj?.confirmPwd) {
        return this.toast.error('Password or confirm password is not matching');
      }
      const password = CryptoJS.AES.encrypt(obj?.confirmPwd, 'password').toString();
      let req = {
        password: password,
        userId: this.userId,
      }
      debugger
      this.isSubmited = true;
      this.showLoader = true;
      this.$user.forgotPassword(req).subscribe(
        (res) => {
          this.toast.success(res?.message);
          this.showLoader = false;
          this.isSubmited = false;
          this.route.navigateByUrl('auth/login');
        },
        (err) => {
          this.showLoader = false;
          this.isSubmited = false;
          this.toast.error(err?.error?.message);
        })
    } catch (error) {
      this.showLoader = false;
      this.isSubmited = false;
      console.log(error)
    }
  }

}
