import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-email-dilog',
  templateUrl: './email-dilog.component.html',
  styleUrls: ['./email-dilog.component.scss']
})
export class EmailDilogComponent {
  approved_level_id: number;
  cellData:any;
  date: string;
  constructor(
    private dialog: MatDialogRef<EmailDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prService: PurchaseRequestService,

  ) {

    this.cellData = data;
    
    this.date = moment(new Date(this.cellData.createdAt)).format('LL')
    
  }
  ngOnInit() {
  }

}
