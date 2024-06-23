import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { EmailRequestActionComponent } from './email-request-action/email-request-action.component';
import { EmailDilogComponent } from './email-dilog/email-dilog.component';
import { AssetManagementService } from 'src/app/@shared/services/asset-management.service';

@Component({
  selector: 'app-email-list-request',
  templateUrl: './email-list-request.component.html',
  styleUrls: ['./email-list-request.component.scss']
})
export class EmailListRequestComponent {
  rowClass: any;
  filter:boolean=false;
  private gridApi!: GridApi<any>;
  public rowData:any;

  constructor(private route: Router,
    public dialog: MatDialog, private assetService: AssetManagementService) {
    this.rowClass = 'rowClass'
  }

  ngOnInit (){
    this.getEmailList();
  }

  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'email_Request_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Employee Name ',
      field: 'first_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:160,
    },
    {
      headerName: 'Type of Account Creation',
      field: 'please_Choose', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:250,
    },
    {
      headerName: 'Requested By',
      field: 'requestedBy', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Approved By',
      field: 'approved_by', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Requested Date',
      field: 'createdAt', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      valueFormatter:(params:any)=>{
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'Created Date ',
      field: 'createdAt', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      valueFormatter:(params:any)=>{
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'Status',
      field: 'status', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Actions',
      field: 'holiday_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: EmailRequestActionComponent,
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



  goToHolidayCreate(path:any) {
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

  openFIlterMenu(){
   this.filter = !this.filter;
  } 

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(EmailDilogComponent, { width: '400px', data: e.data});
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  getEmailList(){
    this.assetService.getAllEmailList().subscribe((res:any)=>{
      this.rowData =res.data;

    })
  }
}
