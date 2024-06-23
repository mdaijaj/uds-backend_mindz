import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ContractLocationService } from 'src/app/@shared/services/crm/contract-location.service';


function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  };
}


@Component({
  selector: 'app-contract-location-dialog',
  templateUrl: './contract-location-dialog.component.html',
  styleUrls: ['./contract-location-dialog.component.scss']
})
export class ContractLocationDialogComponent {
  departmentForm: FormGroup;
  id: any;
  mainId: any;
  submitted: boolean | undefined;
  loginUser: any;
  loginUserID: any;
  departmentData: any;
  departmentId: any;
  view: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private contractLocation: ContractLocationService,
    private route: Router,
    private activeroute: ActivatedRoute,
    public dialog: MatDialogRef<ContractLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.departmentForm = this.fb.group({
      location: new FormControl(null, [Validators.required, noLeadingSpaces()]),
    });
    this.view = data?.view;
    this.departmentForm?.patchValue({ location: data?.data?.location })
  }
  ngOnInit() {
    this.mainId = localStorage.getItem('EmpMainId');
  }

  onSubmitForm() {
    Object.keys(this.departmentForm.controls).forEach(key => {
      this.departmentForm.controls[key].markAsTouched();
    });
    this.submitted = false;
    if (this.departmentForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.departmentForm.value;
    let data = {
      location: val.location,
      id: null,
    };
    if (this.data?.data?.id) {
      data.id = this.data?.data?.id;
    }
    this.contractLocation.createContractLocation(data).subscribe(
      (res: any) => {
        if (res) {
          this.toast.success('Contract Location Added Successfully');
          this.route.navigate([
            'master/itticket/configurational-master/contract-location',
          ]);
          this.confirmDialog();
          this.reloadCurrentRoute();
        }
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else if (err.status == 409) {
          this.toast.error(err?.error?.message);
        } else {
          this.toast.error('Error in submission!');
        }
      }
    );
  }

  confirmDialog() {
    this.dialog.close(this.departmentForm.value);
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

}
