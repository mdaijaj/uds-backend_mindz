import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GridApi, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'app-scheduled-installed',
  templateUrl: './scheduled-installed.component.html',
  styleUrls: ['./scheduled-installed.component.scss']
})
export class ScheduledInstalledComponent {
  clicked: boolean = false;
  suSupModule: any;
  private gridApi!: GridApi<any>;
  rowClass: any;
  isSelected: any;
  statusColumn : any = true;
  buttonClass: string = 'main-button selected';
  buttonClass2: string = 'main-button';
  constructor() {
    this.rowClass = 'rowClass'
    this.rowData = this?.rowData.map((element:any) => {
      element.mode = this?.statusColumn ? 'pending' : 'dispatched';
      return element
    });
  }
 
  ngOnInit(): void {
    this.select(true)
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  select(flag:any){
    this.statusColumn = flag
    if ( flag ) {
      this.buttonClass = "main-button"
      this.buttonClass2 = "main-button selected"
    }else {
      this.buttonClass = "main-button selected"
      this.buttonClass2 = "main-button"
    }
    this.columnDefs = this.initialColumnDefs.filter(column => {
      if (this.statusColumn === true) {
        return column.field !== 'status';
      } else {
        return true;
      }
    });
    this.rowData = this?.rowData.map((element:any) => {
      element.mode = this?.statusColumn ? 'pending' : 'dispatched';
      return element
    });
    // GridApi.setColumnDefs()
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

  public rowData:any = [
    {client_name:'test',installation_date:'test',head_crew_name:'test'}
  ]



  public initialColumnDefs = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: 'Client Name',
      field: 'client_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Installation Date',
      field: 'installation_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Head Crew Name',
      field: 'head_crew_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Action',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, 
      },
    },
  ]
  public columnDefs = this.initialColumnDefs;
}