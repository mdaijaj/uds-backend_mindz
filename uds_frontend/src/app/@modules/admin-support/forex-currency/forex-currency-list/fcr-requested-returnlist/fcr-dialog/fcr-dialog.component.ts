import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-fcr-dialog',
  templateUrl: './fcr-dialog.component.html',
  styleUrls: ['./fcr-dialog.component.scss']
})
export class FcrDialogComponent {
  rowData: any;
  Id: any;
  singleData: any;

  constructor(
    private _empService: EmpRegistrationService,
    private recruitService: RecruitService,
    public dialog: MatDialogRef<FcrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.singleData = this.data;
    console.log('this.data',this.data);
    
    
  }
  ngOnInit(): void {
  }
}