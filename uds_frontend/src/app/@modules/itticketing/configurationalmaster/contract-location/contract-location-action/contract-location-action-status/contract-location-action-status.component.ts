import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ContractLocationService } from 'src/app/@shared/services/crm/contract-location.service';

@Component({
  selector: 'app-contract-location-action-status',
  templateUrl: './contract-location-action-status.component.html',
  styleUrls: ['./contract-location-action-status.component.scss']
})
export class ContractLocationActionStatusComponent {
  assignAction: any;
  singleData: any = {};
  isChecked = false;
  checkBox: any;

  constructor(private route: Router,
    public dialog: MatDialog,
    private contractLocation: ContractLocationService,
    private toster: ToastrService,
    private $crm: CrmService,
    private _rbackService: RbacMasterService,
  ) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
  }
  public cellValue: any;
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.singleData = params?.data;

  }
  getValueToDisplay(params: ICellRendererParams) {
    this.checkBox = params.data.status;
    if (this.checkBox) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }


    return params.valueFormatted
      ? params.valueFormatted
      : params.data.dept_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  // Form update start
  toggle(e: any, isChecked: boolean) {
    try {
      e.stopPropagation();
      let body = {
        status: isChecked,
        id: this.singleData?.id
      }
      this.contractLocation.createContractLocation(body).subscribe((response: any) => {
        if (response) {
          this.toster.success("Status Changed Successfully..");
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Form update end

}
