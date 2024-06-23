import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-remote-office',
  templateUrl: './create-remote-office.component.html',
  styleUrls: ['./create-remote-office.component.scss']
})
export class CreateRemoteOfficeComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_remote_Form:FormGroup;
  inward_id: any;
  id: any;
  public status=[
    {id:1, name:'OPEN'},
    {id:2, name:'CLOSED'},
    {id:3, name:'REJECTED'},
    {id:4, name:'INPROGRESS'},
  ]
  t_date: boolean= false;
  imageToUpload:any;
  imagePath: any;
  singleData:any;
  curentIndex: any;
  FilePaths: any = [];
  termimagePath: any;
  imageTermToUpload:any;
  res_id: any;
  location: any;
  regionData: any;
  imageVendorToUpload: any;
  vendorimagePath: any;
  imageSignToUpload: any;
  signimagePath: any;
  imageCartToUpload: any;
  cartimagePath: any;


  constructor(
   private route: Router,
   private fb :FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   private adminService: AdminSupportService,
   private _configurationalMasterService: ConfigurationalmasterService,
   ) {
   this.rowClass = 'rowClass';

   this.create_remote_Form = this.fb.group({
    facility_type: new FormControl(null,[Validators.required]),
    initiated_date :  new FormControl(null,[Validators.required]),
    person_name :  new FormControl(null,[Validators.required]),
    location:  new FormControl(null,[Validators.required]),
    repair:  new FormControl(null),
    type_of_request: new FormControl(null,[Validators.required]),
    description:  new FormControl(null,[Validators.required]),
    upload_documents_copy:  new FormControl(null,[Validators.required]),
    upload_vendor_copy:  new FormControl(null,[Validators.required]),
    upload_comparative_copy:  new FormControl(null,[Validators.required]),
    upload_sign_copy:  new FormControl(null,[Validators.required]),
    closed_date:  new FormControl(null),
    facility_status:  new FormControl(null),
    facility:  new FormControl(null),
    agreement_signed_date:  new FormControl(null),
    remort_status:  new FormControl(null,[Validators.required]),
   })

 }


 ngOnInit(): void {
  this.activeroute.queryParams.subscribe((params: any) => {
    this.id = params.id; 
  });

  this.adminService.getById_remote(this.id).subscribe((res:any)=>{
    this.singleData = res.data;
    this.create_remote_Form.patchValue({
    facility_type: this.singleData?.facility_type,
    initiated_date :   this.singleData.initiated_date,
    person_name :   this.singleData.person_name,
    location:   this.singleData.location,
    repair:   this.singleData.repair,
    type_of_request:  this.singleData.type_of_request,
    description:   this.singleData.description,
    closed_date:   this.singleData.closed_date,
    facility_status:   this.singleData.facility_status,
    facility:   this.singleData.facility,
    agreement_signed_date:   this.singleData.agreement_signed_date,
    remort_status:   this.singleData.remort_status,
    })
  })

  // this._configurationalMasterService.listLocation().subscribe((params: any) => {
  //   this.location = params.data;

  // });
  this._configurationalMasterService.getRegion().subscribe((res: any) => {
    this.regionData = res.data;
})

 }



  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  }


  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

  createRemote(){
    if (this.create_remote_Form.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }

    let val =this.create_remote_Form.value;
    console.log('val',val);
    var formData: any = new FormData();
    formData.append('facility_type', val.facility_type);
    formData.append('initiated_date', val.initiated_date);
    formData.append('person_name', val.person_name);

    formData.append('location',  val.location);
    formData.append('type_of_request',  val.type_of_request);
    formData.append('description', val.description);
    if(val.agreement_to_date){
    formData.append('agreement_to_date', val.agreement_to_date);
    }
    if(val.closed_date){
      formData.append('closed_date', val.closed_date); 
    }
    formData.append('upload_documents_copy', this.imageToUpload);
    formData.append('upload_vendor_copy', this.imageVendorToUpload); 
    formData.append('upload_comparative_copy', this.imageVendorToUpload);
    formData.append('upload_sign_copy', this.imageSignToUpload);

    formData.append('remort_status', val.remort_status);  

    this.adminService.createRemote(formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
        this.route.navigate(['/master/admin-support/remote-office-facility/remote-office-facility-list'])
      }
    })
  }

  updateRemote() {
    let val =this.create_remote_Form.value;
    console.log('val',val);
    var formData: any = new FormData();
    formData.append('facility_type', val.facility_type);
    formData.append('initiated_date', val.initiated_date);
    formData.append('person_name', val.person_name);

    formData.append('location',  val.location);
    formData.append('type_of_request',  val.type_of_request);
    formData.append('description', val.description);
    if(val.agreement_to_date){
    formData.append('agreement_to_date', val.agreement_to_date);
    }
    if(val.closed_date){
      formData.append('closed_date', val.closed_date); 
    }
    formData.append('upload_documents_copy', this.imageToUpload);
    formData.append('upload_vendor_copy', this.imageVendorToUpload); 
    formData.append('upload_comparative_copy', this.imageVendorToUpload);
    formData.append('upload_sign_copy', this.imageSignToUpload);

    formData.append('remort_status', val.remort_status);  

    this.adminService.edit_remote(this.id,formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
        this.route.navigate(['/master/admin-support/remote-office-facility/remote-office-facility-list'])
      }
    })

  };


  changeStatus(e:any){
    if(e.value == 'CLOSED' || e.value =='INPROGRESS'){
      this.t_date = true;
    }else{
      this.t_date = false;
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

  onVendorChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageVendorToUpload = data.item(0) || null;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vendorimagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageVendorToUpload);
    }
    
  }

  
  seeVendorPreview(path: string, imagePath: any) {
    if (!this.vendorimagePath) {
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

  onSignChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageSignToUpload = data.item(0) || null;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.signimagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageSignToUpload);
    }
    
  }

  
  seeSignPreview(path: string, imagePath: any) {
    if (!this.signimagePath) {
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

  onCartChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageCartToUpload = data.item(0) || null;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vendorimagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageCartToUpload);
    }
    
  }

  
  seeCartPreview(path: string, imagePath: any) {
    if (!this.cartimagePath) {
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

   get CF_1(): any {
  return this.create_remote_Form.controls;
}

addrow(){
  <FormArray>this.CF_1.upload_agreement.push(
    new FormGroup({
      upload_agreement_copy: new FormControl(null),
      file_name: new FormControl(null),
    })
  );
}

deleteRow(i: any, control: any,){
  if (this.CF_1.upload_agreement.length > 1) {
    
      this.CF_1.upload_agreement.removeAt(i);
  } else {
    this.toast.error("Can't Deleted", "must be one");
  }
}
}
