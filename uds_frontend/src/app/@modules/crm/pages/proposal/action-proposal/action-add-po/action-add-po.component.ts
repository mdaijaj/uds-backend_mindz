import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
@Component({
  selector: 'app-action-add-po',
  templateUrl: './action-add-po.component.html',
  styleUrls: ['./action-add-po.component.scss'],

})
export class ActionAddPoComponent implements OnInit {
  assignAction: any;
  singleData: any = {};
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private _rbackService: RbacMasterService,
  ) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService?.accessAssignAction();
  }

  // Ag grid start
  public cellValue: any;
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.singleData = params.data;

  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.data.employee_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  // Ag grid end


  openAddPo() {
    this.route.navigate(["master/crm/add-po"], { queryParams: { id: this.singleData?.id } })
  }

}
