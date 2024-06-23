import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { InitiateRfpActionComponent } from './initiate-rfp-action/initiate-rfp-action.component';
import { AllPrDilogComponent } from '../../purchase-request/all-pr/all-pr-dilog/all-pr-dilog.component';

@Component({
  selector: 'app-initiate-rfp',
  templateUrl: './initiate-rfp.component.html',
  styleUrls: ['./initiate-rfp.component.scss']
})
export class InitiateRfpComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  quickFilter: string;
  depData: any;

  constructor(
   private route: Router,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   public dialog: MatDialog,
   private configService: ConfigurationalmasterService,
   private prService: PurchaseRequestService
   ) {
   this.rowClass = 'rowClass';
 }

 ngOnInit(): void {
  this.configService.getDepartment().subscribe((res:any)=>{
    this.depData = res.data;
  })
  this.getApprovePrList();
}

public rowData:any;

public columnDefs = [
  {
    headerName: 'Sr No.',
    valueGetter: "node.rowIndex + 1",
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    // flex:1,
    minWidth:150,
  },
  {
    headerName: 'PR NO',
    field: 'procurement_id',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    valueFormatter: function(params:any) {
      return 'PR-' + params.value;
    },
    // flex:1,
    minWidth:150,
  },
  {
    headerName: 'Department',
    field: 'department',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    valueFormatter: 'JSON.parse(value)',
    // flex:1,
    minWidth:150,
  },
  {
    headerName: 'Create Date',
    field: 'createdAt',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    // flex:1,
    minWidth:150,
    valueFormatter:(params:any)=>{
      return moment(new Date(params.value)).format('LL')
    },
  },
  {
    headerName: 'Type',
    field: 'PR_category',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    valueFormatter: 'JSON.parse(value)',
    // flex:1,
    minWidth:150,
  },
  {
    headerName: 'Amount',
    field: 'total_mvp',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    valueFormatter: 'JSON.parse(value)',
    // flex:1,
    minWidth:150,
  },
  {
    headerName: 'Status',
    field: 'approvel_status',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    valueFormatter: 'JSON.parse(value)',
    // flex:1,
    minWidth:150,
  },
  // {
  //   headerName: 'Priority',
  //   field: 'priority',
  //   sortable: true,
  //   resizable: true,
  //   wrapHeaderText: true,
  //   autoHeaderHeight: true,
  //   cellClass: "grid-cell-centered",
  //   valueFormatter: 'JSON.parse(value)',
  //   // flex:1,
  //   // minWidth:150,
  // },
  {
    headerName: 'Actions',
    field: 'procurement_product_id', sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    // flex:1,
    // minWidth:150,
    cellRenderer: InitiateRfpActionComponent,
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

   onFilterOptionBoxChanged() {
    this.gridApi.setQuickFilter(this.quickFilter);
  }


  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

  statusCellClicked(e:any){
    
    // const dialogRef = this.dialog.open(PrStatusDilogComponent, { width: '450px', data: { cellData: e.data} });
    // dialogRef.afterClosed().subscribe(result => {
    //   
    // })
  }

  getApprovePrList(){
  // let idEmp:any=localStorage.getItem('EmpMainId');

  //   this.prService.getApprovePrList(idEmp).subscribe((res:any)=>{
  //      this.rowData= res.data;
  //   })
  this.prService.getInitiateRfp().subscribe((res:any)=>{
         this.rowData= res.data;
         console.log(this.rowData,'this rowData');
         
      })
  }
  onCellClicked(event:any){
    console.log(event);
      
    // event.stopPropagation()
    const dialogRef = this.dialog.open(AllPrDilogComponent, { width: '500px', data: { cellData: event.data} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
      }
}
