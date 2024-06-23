import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { GridApi, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'app-scheduled-install-listing',
  templateUrl: './scheduled-install-listing.component.html',
  styleUrls: ['./scheduled-install-listing.scss']
})
export class ScheduleInstallListingComponent {
  rowClass: string;
  install_list_Form:FormGroup;
  private gridApi!: GridApi<any>;
  type:any;
  constructor(
    private router: Router,
    private fb :FormBuilder,
    private activeroute: ActivatedRoute,
  ) {
    this.rowClass = 'rowClass';

    this.activeroute.queryParams.subscribe((params: any) => {
      this.type = params.type;
    })

    this.install_list_Form = this.fb.group({
      client_name: new FormControl(null),
      installation_date: new FormControl(null),
      head_crew: new FormControl(null),
      transport_type: new FormControl(null),
      vehicle_number: new FormControl(null),
      crew_members: new FormControl(null),
      status: new FormControl(['Drop Off'],),
      service_date: new FormControl(null),
      remarks: new FormControl(null)
     })

     this.install_list_Form?.get('status')?.setValue('Drop Off');
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const value = event.value;
    console.log("value is",event.value)
    console.log(this.install_list_Form)
    this.install_list_Form?.get('status')?.setValue(event.value);
    // Do something with the value here
  }

 

  onGridReady(params: GridReadyEvent<any>) {
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

  public rowData = [
    {client_name:'test',item_name:'SPVM(coin)',location:'Location',quantity:2,serial_no:'1234232'}
  ]
  public columnDefs = [
    {
      headerName: 'Client Name',
      field: 'client_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Asset / Item Name',
      field: 'item_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Location',
      field: 'location',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Serial No',
      field: 'serial_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Action',
      field: 'not decided',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];
}


