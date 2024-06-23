import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoice-action.component.html',
  styleUrls: ['./invoice-action.component.scss']
})
export class InvoiceActionComponent implements OnInit, AfterViewInit{
    assignAction: any;
    constructor(
      private route: Router,
      public dialog: MatDialog,
      private router:Router,
      private _rbackService:RbacMasterService,
    ) { }
  
    ngOnInit(): void {}

    ngAfterViewInit(): void {
      setTimeout(()=>{
        this.assignAction = this._rbackService.accessAssignAction();
      },0);   
    }
    public cellValue: any;
  
    agInit(params: ICellRendererParams): void {
      this.cellValue = params
    }
    getValueToDisplay(params: ICellRendererParams) {
      return params
    }
    refresh(params: ICellRendererParams): boolean {
      this.cellValue = this.getValueToDisplay(params);
      return true;
    }
  
    navigateToPaymentCheck(e:any) {
      e.stopPropagation();
      this.router.navigate(['master/itticket/purchase-inventory/invoice/genrate-invoice'], { queryParams: { pr_id: this.cellValue.data.procurement_product_id}})
    }
  
}
