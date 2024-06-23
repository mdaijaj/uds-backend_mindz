import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejectedDilogComponent } from '../../rejected-pr/rejected-dilog/rejected-dilog.component';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-to-be-app-dilog',
  templateUrl: './to-be-app-dilog.component.html',
  styleUrls: ['./to-be-app-dilog.component.scss']
})
export class ToBeAppDilogComponent {
  cellData: any;
  createDate: string;
  procurement_requests: any;
  constructor(public dialog: MatDialogRef<RejectedDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {

    
  }
  ngOnInit() {
    let data = {
      procurementId: this.data.cellData.procurement_id,
      PR_categories: this.data.cellData.PR_category
    }
    this.prService.getByIdPR(data).subscribe((res: any) => {

      this.cellData = res.data[0];
      this.procurement_requests = res.data[0]?.procurement_item_requests || res.data[0].procurement_service_requests || res.data[0].procurement_BomItem_requests;
      this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    });
  }
}
