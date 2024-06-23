import { Component } from '@angular/core';
import { EventDailogComponent } from '../event-management-list/event-dailog/event-dailog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { ComplainActionComponent } from '../../remote-office-facility/remote-office-complain-list/complain-action/complain-action.component';
import { EventActionComponent } from '../event-management-list/event-action/event-action.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { InwardDailogComponent } from '../../courier-inward/courier-inward-list/inward-dailog/inward-dailog.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-for-admin-event-management-list',
  templateUrl: './for-admin-event-management-list.component.html',
  styleUrls: ['./for-admin-event-management-list.component.scss']
})
export class ForAdminEventManagementListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData:any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'event_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: ' Request Initiation',
      field: 'requested_By',
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
      headerName: ' Requested Date',
      field: 'request_initiated_date',
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
      headerName: 'Designation of Person',
      field: 'designation_of_person',
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
      headerName: 'Program Name',
      field: 'program_name',
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
      headerName: 'Date of Program ',
      field: 'date_of_program',
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
      headerName: 'Budget Amount',
      field: 'budget_amount',
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
      headerName: 'Actual/Final Amount',
      field: 'final_amount',
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
      headerName: 'Program Location',
      field: 'program_location',
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
      headerName: 'Upload Document of Program',
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
        return `<a class="link" href=${params.data.upload_documents_copy}>${params.data.requested_By}.Pdf</a>`;
        
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
        return `<a class="link" href=${params.data.upload_vendor_copy}>${params.data.requested_By}.Pdf</a>`;
        
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
        return `<a class="link" href=${params.data.upload_comparative_copy}>${params.data.requested_By}.Pdf</a>`;
        
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
        return `<a class="link" href=${params.data.upload_sign_copy}>${params.data.requested_By}.Pdf</a>`;
        
    },

    cellStyle: (params: any) => {    
      if (params.value) {
        return { color: 'blue' };
      }
    },
    },

    {
      headerName: 'Agreement Signed Date',
      field: 'agreement_signed_date',
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
      headerName: 'Event Closed Date',
      field: 'event_close_date',
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
      headerName: 'Status',
      field: 'event_status',
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
      field: 'event_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: EventActionComponent,
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
  openCount: any;
  closeCount: any;
  RejectCount: any;
  regionData: any;
  InprogressCount: any;


  constructor(
     private route: Router,
     private adminService: AdminSupportService,
     private toast: ToastrService,
     public dialog: MatDialog,
     private _configurationalMasterService: ConfigurationalmasterService,


    ) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.getAll();
    this.adminService.Event_Status_Open().subscribe((res:any)=>{
      this.openCount =res.data;
      console.log('ss',this.openCount);
      
    })
    this.adminService.Event_Status_Close().subscribe((res:any)=>{
      this.closeCount =res.data
    })
    this.adminService.Event_Status_Reject().subscribe((res:any)=>{
      this.RejectCount =res.data
    })

    this.adminService.Event_Status_Inprogress().subscribe((res:any)=>{
      this.InprogressCount =res.data
    })

    this._configurationalMasterService.getRegion().subscribe((res: any) => {
      this.regionData = res.data;
  })
  }



  addInward(path:any) {
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

   getAll(){
     this.adminService.get_All_Event().subscribe((res:any)=>{
      this.rowData =res.data;
    })
  }

  onFilterTextBoxChanged1(e:any) {
    this.gridApi.setQuickFilter(e.value)
      
  }


  onCellClicked(e: any) {
    const dialogRef = this.dialog.open(EventDailogComponent, { width: '500px', data: { id: e.data.event_id} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
