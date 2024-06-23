import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-uom-dialog',
  templateUrl: './uom-dialog.component.html',
  styleUrls: ['./uom-dialog.component.scss']
})
export class UomDialogComponent {
  UOMForm: FormGroup;
  id: any;
  mainId: any;
  submitted: boolean | undefined;
  loginUser: any;
  loginUserID: any;
  uomData: any;
  uomId: any;
  view: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private route: Router,
    private activeroute: ActivatedRoute,
    public dialog: MatDialogRef<UomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.UOMForm = this.fb.group({
      uom_name: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      uom_description: new FormControl(null, [Validators.required, noLeadingSpaces()]),
    });
  }
  ngOnInit() {
    this.uomId = this.data.id
    this.view = this.data.view
    this.mainId = localStorage.getItem('EmpMainId');
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
    });
    let a: any = localStorage.getItem('signInUser');
    this.loginUser = JSON.parse(a)
    this.loginUserID = this.loginUser.id;
    console.log(this.loginUser.id, 'loginn');
    if (this.uomId) {
      this._configurationalMasterService.getByIdUOM(this.uomId).subscribe((res: any) => {
        this.uomData = res.data;
        this.UOMForm.patchValue({
          uom_name: this.uomData?.uom_name,
          uom_description: this.uomData?.uom_description,
        })
      });
    }
  }

  reloadPage(){
    this.reloadCurrentRoute();
    this.dialog.close();
    this.UOMForm.reset();
  }

  onSubmitForm() {
    Object.keys(this.UOMForm.controls).forEach(key => {
      this.UOMForm.controls[key].markAsTouched();
    });
    this.submitted = false;
    if (this.UOMForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.UOMForm.value;
    const data = {
      uom_name: val.uom_name,
      uom_description: val.uom_description,
    };
    this._configurationalMasterService.createUOM(data).subscribe(
      (res: any) => {
        if (res.message == "UOM Name Already Exists") {
          this.toast.warning('UOM Name is Already Exits!');
          this.reloadPage()
        }
        else if (res.message == "UOM Name Already Exists!Restored") {
          this.toast.warning('UOM Name Already Exists!Restored');
          this.reloadPage()
        }
        else {
          this.toast.success('UOM Added Successfully');
          this.route.navigate([
            'master/configurational-master/uom',
          ]);
          this.reloadPage()
        }
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else if (err.status == 201) {
          this.toast.error('UOM Name is Already Exits!');
        } else {
          this.toast.error('Error in submission!');
        }
        this.reloadPage()
      }
    );
  }

  onUpdateForm() {
    Object.keys(this.UOMForm.controls).forEach(key => {
      this.UOMForm.controls[key].markAsTouched();
    });
    this.submitted = false;
    if (this.UOMForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.UOMForm.value;
    const data = {
      uom_name: val.uom_name,
      uom_description: val.uom_description,
    };
    this._configurationalMasterService.updateUOM(this.data.id, data).subscribe(
      (res: any) => {
        if (res.message == "UOM Name is Already Exits!") {
          this.toast.warning('UOM Name is Already Exits!');
          this.reloadPage()
        }
        else {
          this.toast.success('UOM Update Successfully');
          this.route.navigate([
            'master/configurational-master/uom',
          ]);
          this.reloadPage()
        }
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else if (err.status == 409) {
          this.toast.error('UOM Name is Already Exits!');
        } else {
          this.toast.error('Error in submission!');
        }
        this.reloadPage()
      }
    );
  }
  confirmDialog() {
    this.dialog.close(this.UOMForm.value);
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

}
