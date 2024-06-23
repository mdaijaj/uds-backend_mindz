import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ActionComponent } from '../forex-currency-list/fcr-requested-returnlist/action/action.component';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ForexActionComponent } from './forex-action/forex-action.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { RequestDailogComponent } from './request-dailog/request-dailog.component';


@Component({
  selector: 'app-requestedlist-forexcurrency',
  templateUrl: './requestedlist-forexcurrency.component.html',
  styleUrls: ['./requestedlist-forexcurrency.component.scss']
})
export class RequestedlistForexcurrencyComponent {
  private gridApi!: GridApi<any>;
  rowData:any;
  rowData2:any;
  rowData1:any;
  personalIdData:any;
  propertyManager:any
  text:any;
  firstLastName:any;
  rowClass: any;
  clicked: boolean = false;
  cellValue: any;
  rowDataNew: any;
  workData: any[] = [];
  newData: any[] = [];
  constructor(private emp_master:EmpMasterService,
    private route: Router,
    public dialog: MatDialog, private adminService: AdminSupportService) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
  this.adminService.getAllTaskOrder().subscribe((res:any) => {
    this.rowData = res.data;
  })  
  }

  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'forex_currency_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Ref.No',
      field: 'req_ref_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Request Initiated Date',
      field: 'request_initiated_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Name of the Traveler',
      field: 'name_of_the_traveler',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Passport Number',
      field: 'pass_port_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Client Name',
      field: 'client_name',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'T.O. Number',
      field: 't_o_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Country to Visit',
      field: 'country_to_visit',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'Duration From Date',
      field: 'duration_from_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Duration To Date',
      field: 'duration_to_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:158,
    },
    {
      headerName: 'Currency Name ',
      field: 'currency_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        for(let data of params.data.currency_name){
          return data.currency_name
        }
      },
    },
    {
      headerName: 'Purpose',
      field: 'currency_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        for(let data of params.data.currency_name){
          return data.purpose
        }
      },
      cellStyle: (params: any) => {
        return { color: 'green' };
    },
    },
    {
      headerName: 'Requested Amount',
      field: 'state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        for(let data of params.data.currency_name){
          return data.amount
        }
      },
    },
    {
      headerName: 'Status',
      field: 'forex_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Approved By',
      field: 'approved_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Approved Date',
      field: 'approved_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Action',
      field: 'forex_currency_id',
      flex:1,
      minWidth:260,
      cellRenderer: ForexActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
      cellClass: "grid-cell-centered"
    }
    

  ];

  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e:any){
    const dialogRef = this.dialog.open(RequestDailogComponent,{width:'500px',data:e.data});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
  navigate(){
    this.route.navigate(['/master/admin-support/forex-currency/forex-currency-list/task-order-list']);

  }//
  // requestFc(){
  //   this.route.navigate(['/master/admin-support/forex-currency/forex-currency-list/request-with-to']);

  // }
}