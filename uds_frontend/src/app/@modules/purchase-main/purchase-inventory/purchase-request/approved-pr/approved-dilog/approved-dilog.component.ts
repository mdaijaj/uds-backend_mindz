import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-approved-dilog',
  templateUrl: './approved-dilog.component.html',
  styleUrls: ['./approved-dilog.component.scss']
})
export class ApprovedDilogComponent {
  cellData: any;
  createDate: string;
  procurement_requests: any;
  constructor(public dialog: MatDialogRef<ApprovedDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {


  }
  ngOnInit() {
    let data = {
      procurementId: this.data.cellData.procurement_id,
      PR_categories: this.data.cellData.PR_category
    }
    this.prService.getByIdPR(data).subscribe((res: any) => {
      this.cellData = res.data[0];
      this.procurement_requests = res.data[0]?.procurement_item_requests ? res.data[0]?.procurement_item_requests : res.data[0]?.procurement_service_requests;
      this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    });
  }
}
