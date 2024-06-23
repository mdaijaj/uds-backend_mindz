import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { LiveRfpActionComponent } from './live-rfp-action/live-rfp-action.component';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';
import { ExtendPrDateComponent } from './extend-pr-date/extend-pr-date.component';
import { AllPrDilogComponent } from '../../purchase-request/all-pr/all-pr-dilog/all-pr-dilog.component';

@Component({
  selector: 'app-live-rfp',
  templateUrl: './live-rfp.component.html',
  styleUrls: ['./live-rfp.component.scss']
})
export class LiveRfpComponent {
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
   private prService: PurchaseRequestService,
   private updateTableData:DataUpdateService
   ) {
   this.rowClass = 'rowClass';
 }

 ngOnInit(): void {
  this.configService.getDepartment().subscribe((res:any)=>{
    this.depData = res.data;
  })
  // this.getAllLiveRfp();
  this.setAllLiveRfpList();
  this.getAllLiveRfpList();
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
    flex:1,
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
    flex:1,
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
    flex:1,
    minWidth:150,
  },
  {
    headerName: 'Vendor Invited',
    field: 'vendors_invited_count',
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
    headerName: 'Vendor Responded',
    field: 'vendors_responded_count',
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
    headerName: 'End Date',
    field: 'end_date',
    sortable: true,
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
    headerName: 'Asset Category',
    field: 'item_name',
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
    headerName: 'Best Amount',
    field: 'mvp',
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
    headerName: 'Priority',
    field: 'priority',
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
    field: 'procurement_product_id', sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex:1,
    minWidth:150,
   cellRenderer: LiveRfpActionComponent,
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

  onCellClicked(e:any){
    console.log(e);
      
    // e?.stopPropagation()
    const dialogRef = this.dialog.open(AllPrDilogComponent, { width: '500px', data: { cellData: e.data} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
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

  // getAllLiveRfp(){
  //   this.prService.getAllLiveRfp().subscribe((res:any)=>{
  //   this.rowData= res.data;
  //   })
  // }


  getAllLiveRfpList(){
    this.updateTableData.getTabledata().subscribe((res:any)=>{
    this.rowData= res.data;
    console.log(this.rowData,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>rowdata");
    
    })
  }
  setAllLiveRfpList(){
    this.prService.getAllLiveRfp().subscribe((res:any)=>{
      const rowData = res;
      this.updateTableData.setTableData(rowData)
      })
  }
}
