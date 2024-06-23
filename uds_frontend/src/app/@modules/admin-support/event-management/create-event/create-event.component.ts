import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_remote_Form: FormGroup;
  inward_id: any;
  id: any;
  public status = [
    { id: 1, name: 'OPEN' },
    { id: 2, name: 'CLOSED' },
    { id: 3, name: 'REJECTED' },
    { id: 4, name: 'INPROGRESS' },
  ];
  t_date: boolean = false;
  imageToUpload: any;
  imagePath: any;
  singleData: any;
  curentIndex: any;
  FilePaths: any = [];
  termimagePath: any;
  imageTermToUpload: any;
  res_id: any;
  location: any;
  regionData: any;
  empdata: any;
  vendorimagePath: any;
  imageVendorToUpload: any;
  imageSignToUpload: any;
  signimagePath: any;
  cartimagePath: any;
  imageCartToUpload: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    private adminService: AdminSupportService,
    private _configurationalMasterService: ConfigurationalmasterService
  ) {
    this.rowClass = 'rowClass';

    this.create_remote_Form = this.fb.group({
      request_initiated_date: new FormControl(null, [Validators.required]),
      requested_By: new FormControl(null, [Validators.required]),
      designation_of_person: new FormControl(null, [Validators.required]),
      program_name: new FormControl(null),
      budget_amount: new FormControl(null, [Validators.required]),
      final_amount: new FormControl(null, [Validators.required]),
      program_location: new FormControl(null, [Validators.required]),
      date_of_program: new FormControl(null, [Validators.required]),
      upload_documents_copy: new FormControl(null, [Validators.required]),
      upload_vendor_copy: new FormControl(null, [Validators.required]),
      upload_comparative_copy: new FormControl(null, [Validators.required]),
      upload_sign_copy: new FormControl(null, [Validators.required]),
      event_close_date: new FormControl(null),
      agreement_signed_date: new FormControl(null),
      event_status: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.id;
    });

    this.adminService.get_ById_Event(this.id).subscribe((res: any) => {
      this.singleData = res.data;
      this.create_remote_Form.patchValue({
        request_initiated_date: this.singleData.request_initiated_date,
        requested_By: this.singleData.requested_By,
        designation_of_person: this.singleData.designation_of_person,
        program_name: this.singleData.program_name,
        budget_amount: this.singleData.budget_amount,
        final_amount: this.singleData.final_amount,
        program_location: this.singleData.program_location,
        date_of_program: this.singleData.date_of_program,
        event_close_date: this.singleData.event_close_date,
        agreement_signed_date: this.singleData.agreement_signed_date,
        event_status: this.singleData.event_status,
      });
    });

    // this._configurationalMasterService.listLocation().subscribe((params: any) => {
    //   this.location = params.data;

    // });
    this._configurationalMasterService.getRegion().subscribe((res: any) => {
      this.regionData = res.data;
    });

    this.adminService.getAllEmp().subscribe((res: any) => {
      this.empdata = res.data;
    });
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

  createEvent() {
    if (this.create_remote_Form.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }

    let val = this.create_remote_Form.value;
    console.log('val', val);
    var formData: any = new FormData();
    formData.append('request_initiated_date', val.request_initiated_date);
    formData.append('requested_By', val.requested_By);
    formData.append('designation_of_person', val.designation_of_person);
    formData.append('program_name', val.program_name);
    formData.append('budget_amount', val.budget_amount);
    formData.append('final_amount', val.final_amount);
    formData.append('program_location', val.program_location);
    formData.append('date_of_program', val.date_of_program);
    formData.append('upload_documents_copy', this.imageToUpload);
    formData.append('upload_vendor_copy', this.imageVendorToUpload);
    formData.append('upload_comparative_copy', this.imageVendorToUpload);
    formData.append('upload_sign_copy', this.imageSignToUpload);
    formData.append('event_status', val.event_status);
    if (val.agreement_signed_date) {
      formData.append('agreement_signed_date', val.agreement_signed_date);
    }
    if (val.event_close_date) {
      formData.append('event_close_date', val.event_close_date);
    }
    this.adminService.createEvent(formData).subscribe((res: any) => {
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate([
          '/master/admin-support/event-management/event-management-list',
        ]);
      }
    });
  }

  updateEvent() {
    let val = this.create_remote_Form.value;
    console.log('val', val);
    var formData: any = new FormData();
    formData.append('request_initiated_date', val.request_initiated_date);
    formData.append('requested_By', val.requested_By);
    formData.append('designation_of_person', val.designation_of_person);
    formData.append('program_name', val.program_name);
    formData.append('budget_amount', val.budget_amount);
    formData.append('final_amount', val.final_amount);
    formData.append('program_location', val.program_location);
    formData.append('date_of_program', val.date_of_program);
    formData.append('upload_documents_copy', this.imageToUpload);
    formData.append('upload_vendor_copy', this.imageVendorToUpload);
    formData.append('upload_comparative_copy', this.imageVendorToUpload);
    formData.append('upload_sign_copy', this.imageSignToUpload);
    formData.append('event_status', val.event_status);
    if (val.agreement_signed_date) {
      formData.append('agreement_signed_date', val.agreement_signed_date);
    }
    if (val.event_close_date) {
      formData.append('event_close_date', val.event_close_date);
    }
    this.adminService.update_Event(this.id, formData).subscribe((res: any) => {
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate([
          '/master/admin-support/event-management/event-management-list',
        ]);
      }
    });
  }

  changeStatus(e: any) {
    if (e.value == 'CLOSED' || e.value == 'INPROGRESS') {
      this.t_date = true;
    } else {
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
          confirmButtonColor: '#063178',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#063178',
        confirmButtonText: 'Ok',
      });
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
          confirmButtonColor: '#063178',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#063178',
        confirmButtonText: 'Ok',
      });
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
          confirmButtonColor: '#063178',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#063178',
        confirmButtonText: 'Ok',
      });
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
          confirmButtonColor: '#063178',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#063178',
        confirmButtonText: 'Ok',
      });
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
          confirmButtonColor: '#063178',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#063178',
        confirmButtonText: 'Ok',
      });
    }
  }
}
