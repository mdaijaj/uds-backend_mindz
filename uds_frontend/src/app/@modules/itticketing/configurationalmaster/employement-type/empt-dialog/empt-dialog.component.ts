import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-empt-dialog',
  templateUrl: './empt-dialog.component.html',
  styleUrls: ['./empt-dialog.component.scss']
})
export class EmptDialogComponent {
  listEmpt: any;
  singleEmpt: any;
  employmentType: FormGroup
  constructor(
    private dialog: MatDialogRef<EmptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _configurationalmasterService: ConfigurationalmasterService, private _fb: FormBuilder, private route: Router, private toaster: ToastrService
  ) {
    this.listEmpt = data.id;
    this.employmentType = _fb.group({
      emptype_name: new FormControl(null, [Validators.required, noLeadingSpaces()])
    })
  }
  AddEmployment_type: any;
  editEmployment: any;
  visibility: any;
  ngOnInit() {
    this.editEmployment = this.data.edit;
    this.AddEmployment_type = this.data.add_emp;
    this.visibility = this.data.visible
    if (this.visibility === 'visible') {
      this.getByIdRole();
    }
    if (this.editEmployment == 'edit') {
      this.getByIdRole();
    }
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}
  reloadPage(){
      this.reloadCurrentRoute();
      this.dialog.close();
      this.employmentType.reset();
  }
  
  getByIdRole() {
    this._configurationalmasterService
      .getByIdEmployement(this.listEmpt)
      .subscribe((res: any) => {
        this.singleEmpt = res.data;
        if (this.listEmpt) {
          this.employmentType.patchValue({
            emptype_name: this.singleEmpt[0]?.emptype_name
          })
        }

      });
  }
  ngSubmitEmp(data: any) {
    if (this.employmentType.invalid) {
      return
    }
    if (this.listEmpt) {
      this._configurationalmasterService.editEmployement(this.listEmpt, data).subscribe(
        (res: any) => {
          if (res.message == "Employment Type is Already Exits!") {
            this.toaster.warning('Employment Name is Already Exits!');
            this.reloadPage()
          }
          else {
            this.toaster.success('Employment Update Successfully');
            this.reloadPage()
          }
        }, (err: any) => {
          if (err.status == 400) {
            this.toaster.error('Something went Wrong!');
          } else if (err.status == 409) {
            this.toaster.error('Employment Name is Already Exits!');
          } else {
            this.toaster.error('Error in submission!');
          }
          this.reloadPage()
        });

    }
    else {
      this._configurationalmasterService.createEmployement(data).subscribe(
        (res: any) => {
          if (res.message === "Employment Type is Already Exits!") {
            this.toaster.warning('Employment Type is Already Exits!');
            this.reloadPage()
          }
          else {
            this.toaster.success('Employment Added Successfully');
            this.reloadPage()
          }
        },
        (err: any) => {
          if (err.status == 400) {
            this.toaster.error('Something went Wrong!');
          } else if (err.status == 201) {
            this.toaster.error('Employment Name is Already Exits!');
          } else {
            this.toaster.error('Error in submission!');
          }
          this.reloadPage()
        }
      );
    }

  }


}
