import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActionsComponent } from './actions/actions.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { StatemasterdialogComponent } from './statemasterdialog/statemasterdialog.component';
import { ToastrService } from 'ngx-toastr';
import { StateMasterStatusComponent } from './actions/state-master-status/state-master-status.component';
@Component({
  selector: 'app-statemaster',
  templateUrl: './statemaster.component.html',
  styleUrls: ['./statemaster.component.scss'],
})
export class StatemasterComponent {
  errorMessage: any;
  id: any;
  states_id: any;
  countryss_id: any;
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  count: any = 0;
  countryData: any = [];
  id1: any;
  id2: any;
  name: any;
  constructor(
    private _configurationalMasterService: ConfigurationalmasterService,
    public dialog: MatDialog,
    private route: Router,
    private activetRoute: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    this.getState();
    this.getCountry();
    this.activetRoute.queryParams.subscribe((params: any) => {
      this.id = params;


      this.states_id = this.id.states_id;

    });
  }
  public columnDefs: any = [
    {
      headerName: 'State ID',
      field: 'states_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Country',
      field: 'countryss_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.countryData,
      },
    },
    {
      headerName: 'State',
      field: 'states_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
      editable: true,
    },

    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: StateMasterStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },

    {
      headerName: 'Action',
      field: 'states_name',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];

  getCountry() {
    this._configurationalMasterService.getCountry().subscribe((response) => {


      response.data.forEach((element: any) => {
        this.countryData.push(element.countryss_name);
      });

      this.columnDefs[1].cellEditorParams.values = this.countryData;
    });
  }

  agInit(params: ICellRendererParams): void {

  }
  onCellValueChanged(event: CellValueChangedEvent) {
    this.id1 = event.data.countryss_id;
    this.id2 = event.data.states_id;
    (this.name = event.newValue);

    let sta = event.data;
    let sta1 = event.data.countryss_id;

    if (this.name == event.data.countryss_name == event.data.countryss_id) {
      this._configurationalMasterService
        .updateSingleCountry(this.id1, sta)
        .subscribe(
          (res: any) => {

            this.toaster.success('Country Updated Successfully');
          },
          (err: any) => {
            // this.toaster.error('Something went wrong please try again', 'Error Message');

          }
        );
    }

    if (this.name == event.data.status) {
      this._configurationalMasterService
        .updateSingleState(this.id2, sta)
        .subscribe(
          (res: any) => {

            this.toaster.success('Status Updated Successfully');
          },
          (err: any) => {
            // this.toaster.error('Something went wrong please try again', 'Error Message');

          }
        );
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(StatemasterdialogComponent, {
      width: '35%',
      data: { add: 'StateMaster' },
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  addRecordToGrid(data: any) {
    // if data missing or data has no it, do nothing
    if (!data || data.id == null) {
      return;
    }

    const api = this.gridApi;
    // do nothing if row is already in the grid, otherwise we would have duplicates
    const rowAlreadyInGrid = !!api.getRowNode(data.id);

    if (rowAlreadyInGrid) {

      return;
    }

    const transaction = {
      add: [data],
    };

    api.applyTransaction(transaction);
  }

  onFactoryButtonClick(e: any) {
    this.count++;
    if (this.count === 1) {
      var button = e.currentTarget,
        buttonColor = button.getAttribute('data-color'),
        side = button.getAttribute('data-side'),
        data = createDataItem(buttonColor);
      this.addRecordToGrid(data);
      this.gridApi.paginationGoToLastPage();
    } else {
      this.toaster.warning("can't add State");
    }
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
  getState() {
    this._configurationalMasterService.getState().subscribe((res: any) => {
      this.rowData = res.data;

    });
  }
}
let rowIdSequence = 100;

function createDataItem(color: string) {
  const obj = {
    id: rowIdSequence++,
    color: color,
    value1: Math.floor(Math.random() * 100),
    value2: Math.floor(Math.random() * 100),
  };

  return obj;
}
