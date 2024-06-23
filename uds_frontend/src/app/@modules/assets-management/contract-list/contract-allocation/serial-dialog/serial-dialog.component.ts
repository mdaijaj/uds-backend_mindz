import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SerialDialogActionComponent } from './serial-dialog-action/serial-dialog-action.component';
import { GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-serial-dialog',
  templateUrl: './serial-dialog.component.html',
  styleUrls: ['./serial-dialog.component.scss']
})
export class SerialDialogComponent {
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
    {asset_name: "PVM(COIN)", serial_no: '123456789321654987' },
    {asset_name: "FSD(COIN)", serial_no: '78978945612312456' }
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
      headerName: 'Serial Number',
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
      headerName: 'Actions',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:50,
      cellRenderer: SerialDialogActionComponent,
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
