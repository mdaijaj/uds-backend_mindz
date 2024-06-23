import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionComponent } from './action/action.component';


@Component({
  selector: 'app-training-name',
  templateUrl: './training-name.component.html',
  styleUrls: ['./training-name.component.scss']
})
export class TrainingNameComponent {
  errorMessage: any;
  id: any;
  segment_id: any;
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  count:any = 0;
  subscription: Subscription;
  segmentData:any=[];
  arr: { status: string; }[];
  constructor(
    private _configurationalMasterService: ConfigurationalmasterService,
    public dialog: MatDialog, private route: Router, private activetRoute: ActivatedRoute,
    private toaster:ToastrService, private router:Router
  ) {
    this.rowClass = 'rowClass'
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {


      }
  });
  }

  ngOnInit(): void {
   this.getAllTrainingName();
    this.activetRoute.queryParams.subscribe((params: any) => {
      this.id = params;


      this.segment_id = this.id.segment_id

    })

  }

  public columnDefs:any = [
    {
      headerName: 'S. No',
      field: 'traning_name_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth:150
    },
    {
      headerName: 'Training Name',
      field: 'traning_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      editable: true,
      minWidth:150
    },

    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth:150,
      editable: true,
    },

    {
      headerName: 'Action',
      field: 'traning_name',
      flex: 1,
      minWidth:150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },

    }
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;


  }

  agInit(params: ICellRendererParams): void {

  }

  onCellValueChanged(event: CellValueChangedEvent) {
    let id1 = event.data.segment_id;
    let val = event.newValue;

    //  --------------- change on cell -------------------


    let sta = event.data;


    if(val == event.data.status){
      this._configurationalMasterService.updateSingleSegment(id1, sta).subscribe(
        (res: any) => {

          this.toaster.success('Status Updated Successfully')
        }, (err: any) => {

        });
    }
  }

  addRecordToGrid(data: any) {
    // if data missing or data has no it, do nothing
    if (!data || data.id == null) { return; }

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
    this.count++
    if (this.count === 1) {
      var button = e.currentTarget,
        buttonColor = button.getAttribute('data-color'),
        side = button.getAttribute('data-side'),
        data = createDataItem(buttonColor);
        this.addRecordToGrid(data);

        this.gridApi.paginationGoToLastPage();
    } else {
      this.toaster.warning("can't add without feel")
    }
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  getAllTrainingName() {
    this._configurationalMasterService.getTrainingName().subscribe((res: any) => {
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
    value2: Math.floor(Math.random() * 100)
  };

  return obj;
}


