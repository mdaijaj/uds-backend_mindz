import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-request-dailog',
  templateUrl: './request-dailog.component.html',
  styleUrls: ['./request-dailog.component.scss']
})
export class RequestDailogComponent {
  rowData: any;
  Id: any;
  singleData: any;

  constructor(
    private recruitService: RecruitService,
    public dialog: MatDialogRef<RequestDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.singleData = this.data;
    console.log('this.data',this.data);
    
    
  }
  ngOnInit(): void {
  }
}
