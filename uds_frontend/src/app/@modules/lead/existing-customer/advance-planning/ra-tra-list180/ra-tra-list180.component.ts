import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { Router } from '@angular/router';
import { ActionComponent } from '../action/action.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ra-tra-list180',
  templateUrl: './ra-tra-list180.component.html',
  styleUrls: ['./ra-tra-list180.component.scss']
})
export class RATRALIST180Component 
{
  private gridApi!: GridApi<any>;
  rowData:any;
  rowClass: any;
  clicked: boolean = false;
  DateForm: any;
  fromDate: number;
  toDate: number;
  rowData12: any;
  constructor(private head:HeadService,
    private leadService: LeadService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass'
    this.DateForm = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.leadService.getVerifiedDqsData().subscribe((res:any)=>{
      // let modifyData=(res.result).filter((modi:any)=>modi.remaining_count==0);
      let modifyData=(res.result).filter((modi:any)=>modi.notification_status=="CSP & Planning");
      this.rowData=modifyData
      this.rowData12=this.rowData
  });
  
  }

  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'lead_genration_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'BR Number',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Company Name',
      field: 'associated_company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Service Name',
      field: 'product_request',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 155,
    },

    {
      headerName: 'Stage',
      field: 'stage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    
    {
      headerName: 'Audit Start Date',
      field: 'training_start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Audit End Date',
      field: 'training_end_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth:150,
    },
    {
      headerName: 'Remaining Count',
      field: 'remaining_count',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      minWidth: 150,
      cellRenderer: ActionComponent,
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
  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  navigate(){
    this.router.navigate(['master/lead/existing-customer/advance-planning/notify_planing_to_postAudit']);

  }//

  date1(e: any) {
    const myDate = new Date(e.value);
    const timestamp = myDate.getTime();
    this.fromDate = timestamp
  }
  date2(e: any) {
    const myDate = new Date(e.value);
    const timestamp = myDate.getTime();
    this.toDate = timestamp
    setTimeout(() => {
      console.log(this.fromDate, ' fromDate');
      console.log(this.toDate, ' toDate');
      let filterData: any = []
      this.rowData12.map((data: any) => {
        let a: any = new Date(data.training_end_date);
        let onDate = a.getTime();
        if (this.fromDate <= onDate && this.toDate >= onDate) {
          filterData.push(data)
        }
      })
      this.rowData = filterData
      console.log(filterData);
    }, 500);
  }
}
