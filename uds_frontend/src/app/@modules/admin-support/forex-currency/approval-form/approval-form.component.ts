import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.scss'],
})
export class ApprovalFormComponent {
  forexForm: FormGroup;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  date = this.now.getDate();
  setInr: boolean = false;
  maxDate = moment({
    year: this.year + 100,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');

  status = [
    { value: 'Open/Requested' },
    { value: 'Approved' },
    { value: 'Rejected' },
    { value: 'Request InProgress' },
    { value: 'Handover' },
    { value: 'Returned' },
    { value: 'Return Inprogress' },
    { value: 'Closed' },
  ];
  reject: boolean;
  id: any;
  singleData: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private adminService: AdminSupportService
  ) {
    this.forexForm = this.fb.group({
      req_ref_no: new FormControl(null, [Validators.required]),
      froex_currency: new FormControl(null, [Validators.required]),
      request_initiated_date: new FormControl(null, [Validators.required]),
      client_name: new FormControl(null, [Validators.required]),
      t_o_number: new FormControl(null, [Validators.required]),
      name_of_the_traveler: new FormControl(null, [Validators.required]),
      residental_address: new FormControl(null, [Validators.required]),
      email_id: new FormControl(null, [Validators.required]),
      mobile_number: new FormControl(null, [Validators.required]),
      pass_port_number: new FormControl(null, [Validators.required]),
      pass_port_issued_date: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      duration_from_date: new FormControl(null, [Validators.required]),
      duration_to_date: new FormControl(null, [Validators.required]),
      country_to_visit: new FormControl(null, [Validators.required]),
      currency_name: new FormArray([
        // new FormGroup({
        //   currency_name: new FormControl(null),
        //   purpose: new FormControl(null),
        //   amount: new FormControl(null),
        //   remarks: new FormControl(null),
        // }),
      ]),
      forex_status: new FormControl(null, [Validators.required]),
      reject_remarks: new FormControl(null),
    });
  }

  get CF_1(): any {
    return this.forexForm.controls;
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.id;
    });
    this.adminService.getApproveById(this.id).subscribe((res: any) => {
      this.singleData = res.data;
      this.forexForm.patchValue({
        req_ref_no: this.singleData?.req_ref_no,
        froex_currency: this.singleData?.froex_currency,
        request_initiated_date: this.singleData?.request_initiated_date,
        client_name: this.singleData?.client_name,
        t_o_number: this.singleData?.t_o_number,
        name_of_the_traveler: this.singleData?.name_of_the_traveler,
        residental_address: this.singleData?.residental_address,
        email_id: this.singleData?.email_id,
        mobile_number: this.singleData?.mobile_number,
        pass_port_number: this.singleData?.pass_port_number,
        pass_port_issued_date: this.singleData?.pass_port_issued_date,
        nationality: this.singleData?.nationality,
        duration_from_date: this.singleData?.duration_from_date,
        duration_to_date: this.singleData?.duration_to_date,
        country_to_visit: this.singleData?.country_to_visit,
      });
      for (let i = 0; i < this.singleData.currency_name?.length; i++) {
        <FormArray>this.CF_1.currency_name.push(
          new FormGroup({
            currency_name: new FormControl(
              this.singleData?.currency_name[i]?.currency_name
            ),
            purpose: new FormControl(
              this.singleData?.currency_name[i]?.purpose
            ),
            amount: new FormControl(this.singleData?.currency_name[i]?.amount),
            remarks: new FormControl(
              this.singleData?.currency_name[i]?.remarks
            ),
          })
        );
      }
    });
  }

  submitForm() {}

  update() {
    let val= this.forexForm.value;
    let data={
      forex_status:val.forex_status,
      reject_remarks:val.reject_remarks,
    }
   this.adminService.updateApprove(this.id, data).subscribe((res:any)=>{
    if(res.code ==200){
      this.toast.success(res.message)
      this.route.navigate(['master/admin-support/forex-currency/req-list'])

    }
   })
  }

  add_items() {
    <FormArray>this.CF_1.currency_name.push(
      new FormGroup({
        currency_name: new FormControl(null),
        purpose: new FormControl(null),
        amount: new FormControl(null),
        remarks: new FormControl(null),
      })
    );
  }

  deleteRow(i: any, control: any) {
    if (this.CF_1.currency_name.length > 1) {
      this.CF_1.currency_name.removeAt(i);
    } else {
      this.toast.error("Can't Deleted", 'must be one');
    }
  }

  changeStatus(e: any) {
    if (e.value == 'Rejected') {
      this.reject = true;
    } else {
      this.reject = false;
    }
  }
}
