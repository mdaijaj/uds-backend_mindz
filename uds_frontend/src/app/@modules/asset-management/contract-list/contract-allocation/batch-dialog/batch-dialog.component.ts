import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { BatchDialogActionComponent } from './batch-dialog-action/batch-dialog-action.component';

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss']
})
export class BatchDialogComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: Router,
    private toast: ToastrService,
   ) {
    
  }

  ngOnInit(): void {
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

  onChange(e:any){
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
    
  rowData = [
    {asset_name: "Sanitary Pads", batch_no: '1234', total_qty: 12, allocated_qty: 12 },
    {asset_name: "Liner", batch_no: '2134' , total_qty: 12, allocated_qty: 14 }
  ]
  
  public columnDefs = [
    {
      headerName: 'Asset/Item Name',
      field: 'asset_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Batch Number',
      field: 'serial_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Total Qty',
      field: 'total_qty',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:130,
    },
    {
      headerName: 'Allocate Qty',
      field: 'allocated_qty',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:130,
    },
    {
      headerName: 'Actions',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:70,
      cellRenderer: BatchDialogActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, 
      },
      cellClass: "grid-cell-centered",
    },
  ];
}
