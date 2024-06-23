import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { HeadService } from 'src/app/@shared/services/head.service';
import { TaskActionComponent } from './task-action/task-action.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';


@Component({
  selector: 'app-task-order-list',
  templateUrl: './task-order-list.component.html',
  styleUrls: ['./task-order-list.component.scss']
})
export class TaskOrderListComponent {
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
  constructor(
    private head:HeadService,
    private route: Router,
    public dialog: MatDialog,
    private adminService: AdminSupportService,) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.adminService.getAllTaskOrder().subscribe((res:any) => {
    
    this.rowData = res.data;
    for (let item of res.data) {
      this.newData.push(item)
    }
    this.workData = this.newData;
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
      headerName: 'Name of the Traveler ',
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
      headerName: 'Client Name ',
      field: 'client_name',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'City/Country',
      field: 'country_to_visit',
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
      cellRenderer: TaskActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
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
    
    const dialogRef = this.dialog.open(TaskDialogComponent,{width:'500px',data:e.data});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
  navigate(){
    this.route.navigate(['/master/admin-support/forex-currency/forex-currency-list/fcr-request-return']);

  }
}


