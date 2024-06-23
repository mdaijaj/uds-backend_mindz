import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forex-currency-rate',
  templateUrl: './forex-currency-rate.component.html',
  styleUrls: ['./forex-currency-rate.component.scss']
})
export class ForexCurrencyRateComponent {
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

  status=[
    { value:"Open/Requested"},
    { value:"Approved"},
    { value:"Rejected"},
    { value:"Request InProgress"},
    { value:"Handover"},
    { value:"Returned"},
    { value:"Return Inprogress"},
    { value:"Closed"},
  ]
  reject: boolean;
  imagePath: any;
  imageToUpload: any;
  singleData:any;
  termimagePath: any;
  imageTermToUpload: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,private adminService: AdminSupportService,
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
      forex_status:new FormControl(null, [Validators.required]),
      reject_remarks:new FormControl(null, [Validators.required]),
      flight_details:new FormControl(null),
      date_of_departure:new FormControl(null),
      nature_of_business_visit:new FormControl(null),
      handover_amount:new FormControl(null),
      handover_date:new FormControl(null),
      currency_rate:new FormControl(null),
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
        flight_details: this.singleData?.flight_details,
        date_of_departure: this.singleData?.date_of_departure,
        nature_of_business_visit: this.singleData?.nature_of_business_visit,
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
    formData.append("handover_amount",val.handover_amount);
    formData.append("handover_date",val.handover_date);
    formData.append("currency_rate",val.currency_rate);
    formData.append("forex_status",val.forex_status);
    formData.append("upload_memo_copy",this.imageTermToUpload); 
    formData.append("lerms_letter",this.imageToUpload);
    formData.append("reject_remarks",val.reject_remarks);

   this.adminService.updateForexCurrency(this.id, formData).subscribe((res:any)=>{
    if(res.code ==200){
      this.toast.success(res.message)
      this.route.navigate(['master/admin-support/forex-currency/req-list-admin'])

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

  deleteRow(i: any, control: any,){
    if (this.CF_1.currency_name.length > 1) {
      
        this.CF_1.currency_name.removeAt(i);
    } else {
      this.toast.error("Can't Deleted", "must be one");
    }
  }

  changeStatus(e:any){
   if(e.value =='Rejected'){
     this.reject = true;
    }else{
    this.reject = false;
   }
  }

  onChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageToUpload);
    }
  }

  
  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: "#063178",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#063178",
        confirmButtonText: 'Ok',
      })
    }
  }

  onTermChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageTermToUpload = data.item(0) || null;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.termimagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageTermToUpload);
    }
    
  }

  
  seeTermPreview(path: string, imagePath: any) {
    if (!this.termimagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: "#063178",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#063178",
        confirmButtonText: 'Ok',
      })
    }
  }
}
