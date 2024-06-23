import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { ActionComponent } from './action/action.component';
// import { ActionComponent } from './action/ActionComponent';

@Component({
  selector: 'app-scheduling-installation',
  templateUrl: './scheduling-installation.component.html',
  styleUrls: ['./scheduling-installation.component.scss']
})
export class SchedulingInstallationComponent {
    rowClass: any;
    private gridApi!: GridApi<any>;
  
    constructor(
     private route: Router,
     public dialog: MatDialog,
     private vendorService: VendorManagementService
  
     ) {
     this.rowClass = 'rowClass'
   }
  
   ngOnInit(): void {
    this.getUnAppVendor();
   }
   
    public rowData:any;
    public columnDefs = [
      {
        headerName: 'Sr No.',
        valueGetter: 'node.rowIndex + 1',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'PO Number',
        field: 'vendor_name',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        valueFormatter: 'JSON.parse(value)',
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Client Name ',
        field: 'vendor_name',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        valueFormatter: 'JSON.parse(value)',
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Contract No',
        field: 'address',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        valueFormatter: 'JSON.parse(value)',
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Location',
        field: 'address',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        valueFormatter: 'JSON.parse(value)',
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Allocation By',
        field: 'address',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        valueFormatter: 'JSON.parse(value)',
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Branch',
        field: 'address',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        valueFormatter: 'JSON.parse(value)',
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Action',
        field: 'vendor_management_id', sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        flex:1,
        minWidth:150,
        cellRenderer: ActionComponent,
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

    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
    }

    onPageSizeChanged() {
      var value = (document.getElementById('page-size') as HTMLInputElement)
        .value;
      this.gridApi.paginationSetPageSize(Number(value));
    }
  
    onFilterTextBoxChanged() {
      this.gridApi.setQuickFilter(
        (document.getElementById('filter-text-box') as HTMLInputElement).value
      );
    }
  
    getUnAppVendor(){
      this.vendorService.getUnAppVendor().subscribe((res:any)=>{
       this.rowData =res.data;
       
      })
    }
  
    onCellClicked(e: any) {
      
      // const dialogRef = this.dialog.open(VendorDilogComponent, { width: '450px', data: { id: e.data.vendor_management_id} });
      // dialogRef.afterClosed().subscribe(result => {
        
      // })
    }
  
}
