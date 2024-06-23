import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { FcrDialogComponent } from '../../forex-currency-list/fcr-requested-returnlist/fcr-dialog/fcr-dialog.component';

@Component({
  selector: 'app-forex-admin-dailog',
  templateUrl: './forex-admin-dailog.component.html',
  styleUrls: ['./forex-admin-dailog.component.scss']
})
export class ForexAdminDailogComponent {
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
