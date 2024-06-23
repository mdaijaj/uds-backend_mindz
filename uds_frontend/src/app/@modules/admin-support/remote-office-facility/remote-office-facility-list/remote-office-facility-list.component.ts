import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { OutwardActionComponent } from '../../courier-outward/courier-outward-list/outward-action/outward-action.component';
import { OutwardDailogComponent } from '../../courier-outward/courier-outward-list/outward-dailog/outward-dailog.component';
import { RemoteOfficeActionComponent } from './remote-office-action/remote-office-action.component';
import { RemoteOfficeDailogComponent } from './remote-office-dailog/remote-office-dailog.component';

@Component({
  selector: 'app-remote-office-facility-list',
  templateUrl: './remote-office-facility-list.component.html',
  styleUrls: ['./remote-office-facility-list.component.scss']
})
export class RemoteOfficeFacilityListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData:any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'facility_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Facility Type ',
      field: 'facility_type',
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
      headerName: 'Name of The Person',
      field: 'person_name',
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
      field: 'location',
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
      headerName: 'Requirement/Repair',
      field: 'type_of_request',
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
      headerName: 'Description',
      field: 'description',
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
      headerName: 'Upload Approval Document',
      field: 'upload_documents_copy',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      
      cellRenderer: (params:any) => {
          return `<a class="link" href=${params.data.upload_documents_copy}>See Doc</a>`;
          
      },

      cellStyle: (params: any) => {
        if (params.value) {
          return { color: 'blue' };
        }
      },
    },
    {
      headerName: 'Upload Vendor Quote',
      field: 'upload_vendor_copy',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        return `<a class="link" href=${params.data.upload_vendor_copy}>See Doc</a>`;
        
    },

    cellStyle: (params: any) => {
      if (params.value) {
        return { color: 'blue' };
      }
    },
    },
    {
      headerName: 'Upload Comparative Quote',
      field: 'upload_comparative_copy',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        return `<a class="link" href=${params.data.upload_comparative_copy}>See Doc</a>`;
        
    },

    cellStyle: (params: any) => {
      if (params.value) {
        return { color: 'blue' };
      }
    },
    },
    {
      headerName: 'Upload Final Sign Off',
      field: 'upload_sign_copy',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        return `<a class="link" href=${params.data.upload_sign_copy}>See Doc</a>`;
        
    },

    cellStyle: (params: any) => {
      if (params.value) {
        return { color: 'blue' };
      }
    },

    },
    {
      headerName: 'Status',
      field: 'remort_status',
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
      headerName: 'Actions',
      field: 'facility_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: RemoteOfficeActionComponent,
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


  constructor(
     private route: Router,
     private adminService: AdminSupportService,
     private toast: ToastrService,
     public dialog: MatDialog,

    ) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.getUnAppVendor();
  }



  addRemote(path:any) {
    this.route.navigate([path]);
  }


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
     this.adminService.get_All_Facility_Remote().subscribe((res:any)=>{
      this.rowData =res.data;
    })
  }

  onCellClicked(e: any) {  
    const dialogRef = this.dialog.open(RemoteOfficeDailogComponent, { width: '500px', data: { id: e.data.facility_id} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
