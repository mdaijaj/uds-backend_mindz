import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import domtoimage from 'dom-to-image';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';

@Component({
  selector: 'app-forex-admin-form',
  templateUrl: './forex-admin-form.component.html',
  styleUrls: ['./forex-admin-form.component.scss'],
})
export class ForexAdminFormComponent {
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
  getPDFdata: boolean;
  id: any;
  singleData: any;
  close: boolean;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,private adminService: AdminSupportService
  ) {
    this.forexForm = this.fb.group({
      req_ref_no: new FormControl(null, [Validators.required]),
      froex_currency: new FormControl(null, [Validators.required]),
      request_initiated_date: new FormControl(null, [Validators.required]),
      client_name: new FormControl(null, [Validators.required]),
      t_o_number: new FormControl(null, [Validators.required]),
      name_of_the_traveler: new FormControl(null, [Validators.required]),
      residental_address: new FormControl(null, [Validators.required]),
      email_id: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
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
      reject_remarks: new FormControl(null, [Validators.required]),
      flight_details: new FormControl(null),
      date_of_departure: new FormControl(null),
      nature_of_business_visit: new FormControl(null),
      closed_date: new FormControl(null),
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
    const formData = new FormData();
    formData.append("flight_details",val.flight_details);
    formData.append("date_of_departure",val.date_of_departure);
    formData.append("nature_of_business_visit",val.nature_of_business_visit);
    formData.append("forex_status",val.forex_status);
   this.adminService.updateForexCurrency(this.id, formData).subscribe((res:any)=>{
    if(res.code ==200){
      this.toast.success(res.message)
      this.route.navigate(['master/admin-support/forex-currency/request-forex_currency-latter'],
      { queryParams: { id: this.id}})

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
