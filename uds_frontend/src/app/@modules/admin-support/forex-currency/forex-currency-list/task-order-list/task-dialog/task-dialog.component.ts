import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  rowData: any;
  Id: any;
  singleData: any;

  constructor(
    private _empService: EmpRegistrationService,
    private recruitService: RecruitService,
    public dialog: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.singleData = this.data;
    console.log('this.data',this.data);
    
    
  }
  ngOnInit(): void {
  }
}

