import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-forex-currency',
  templateUrl: './return-forex-currency.component.html',
  styleUrls: ['./return-forex-currency.component.scss']
})
export class ReturnForexCurrencyComponent {
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
  close: boolean;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private adminService: AdminSupportService,
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
        new FormGroup({
          currency_name: new FormControl(null),
          purpose: new FormControl(null),
          amount: new FormControl(null),
          remarks: new FormControl(null),
          return_amount: new FormControl(null),
          travellers_cheques: new FormControl(null),
          axis_card: new FormControl(null),
        }),
      ]),
      upload_Encashment_Letter:new FormControl(null),
      upload_Cash_Receipt:new FormControl(null),
      forex_status:new FormControl(null, [Validators.required]),
      reject_remarks:new FormControl(null, [Validators.required]),
      returned_date:new FormControl(null),
      flight_details:new FormControl(null),
      date_of_departure:new FormControl(null),
      nature_of_business_visit:new FormControl(null),
      closed_date:new FormControl(null),
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
    })
  }

  submitForm() {}

  update() {
    let val= this.forexForm.value;
    const formData = new FormData();
    formData.append("returned_date",val.returned_date);
    let alld = JSON.stringify(val.currency_name);
    formData.append("currency_name",alld);
    formData.append("forex_status",val.forex_status);
    formData.append("closed_date",val.closed_date);
   this.adminService.updateReturnForexCurrency(this.id, formData).subscribe((res:any)=>{
    if(res.code ==200){
      this.toast.success(res.message)
      this.route.navigate(['master/admin-support/forex-currency/return_letter'],
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
        return_amount: new FormControl(null),
        travellers_cheques: new FormControl(null),
        axis_card: new FormControl(null),
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

   if (e.value == 'Closed') {
    this.close =true;

  }else{
    this.close =false;
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
