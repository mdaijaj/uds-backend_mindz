import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-scheduled-install-dialog',
  templateUrl: './scheduled-install-dialog.component.html',
  styleUrls: ['./scheduled-install-dialog.component.scss']
})
export class ScheduledInstallDialog {
  allocation_dialog_Form:FormGroup;
  constructor(
    public dialog: MatDialogRef<ScheduledInstallDialog>,
    private toast: ToastrService,
    private fb :FormBuilder
  ) {
    this.allocation_dialog_Form = this.fb.group({
      quantity: new FormControl(null),
      asset_item_name: new FormControl(null),
      serial_batch_no: new FormControl(null),
      block_no: new FormControl(null),
      bay_no: new FormControl(null),
      rack_no: new FormControl(null)
     })
  }
}
