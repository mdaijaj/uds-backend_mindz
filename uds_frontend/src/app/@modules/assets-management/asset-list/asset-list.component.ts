import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ActiveStatusComponent } from './active-status/active-status.component';
import { ActionComponent } from './action/action.component';
import { AssetDialogComponent } from './asset-dialog/asset-dialog.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { getUnixTime } from 'date-fns';
import { MatDatepicker } from '@angular/material/datepicker';
import { allocationService } from 'src/app/@shared/services/asset-management/allocation.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent {
  formObj: any = {};
  rowClass: any;
  assetCategories: any;
  items: any;
  selectedAssetCategory: any;
  selectedItem: any;
  selectedFromDate: Date | null = null;
  selectedToDate: Date | null = null;
  private gridApi!: GridApi<any>;
  inStatus = null;
  searchInput: any;
  body: any;
  modes: string[] = ['FirstIn', 'LastIn'];
  rowData: any;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    private _configurationalMasterService: ConfigurationalmasterService,
    private allocation: allocationService,
  ) {
    this.rowClass = 'rowClass'
  }

  checkState(event: any, el: any) {
    if (this.inStatus && this.inStatus === el.value) {
      el.checked = false;
      this.inStatus = null;
    } else {
      this.inStatus = el.value
      el.checked = true;
    }
    this.getAllPo()
  }

  ngOnInit(): void {
    this.getAllPo();
    this.getAssetList();
    this.selectedAssetCategory = null;
    this.selectedItem = null;
    this.selectedFromDate = null;
    this.selectedToDate = null;
    this.inStatus = null;
    this.getAssetList();
  }

  clearDate(e: any) {
    this.selectedFromDate = null;
    this.getAllPo()
  }

  clearDate2(e: any) {
    this.selectedToDate = null;
    this.getAllPo()
  }

  getAssetList() {
    this._configurationalMasterService.getAssetMasterList().subscribe((res: any) => {
      this.assetCategories = res.data;
      console.log(" asset categories is", this.assetCategories)
    })
  }

  getItemsListByAssetId() {
    this.allocation.getItemsByAsset(this.formObj?.asset_category_id).subscribe((response: any) => {
      if (response) {
        this.items = response.data;
        console.log("repsonse is", response)
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  onSelectedAssetCategory(e: any) {
    console.log("model value is", this.selectedAssetCategory)
    if (!this.selectedAssetCategory) this.selectedItem = null;
    this.getItemsListByAssetId()
    this.getAllPo()
  }

  onSelectedItem(e: any) {
    this.getAllPo()
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

  getAllPo() {
    this.body = {
      "asset_category": this.selectedAssetCategory,
      "item_id": this.selectedItem,
      "from_GRN_date": this.selectedFromDate,
      "to_GRN_date": this.selectedToDate,
      "in_status": this.inStatus
    }
    console.log("request body is", this.body)
    this.allocation.get_by_Id_grn().subscribe((response: any) => {
      if (response) {
        let list = response.data;
        list?.map((item: any) => {
          this.rowData = item?.po_item_details;
        })
        console.log(this.rowData);
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  public columnDefs = [
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
      headerName: 'Asset Category',
      field: 'asset_category_id',
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
      headerName: 'Asset Name',
      field: 'ItemMaster.item_name',
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
      headerName: 'Asset Code',
      field: 'ItemMaster.item_code',
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
      headerName: 'Serial No.',
      field: 'serial_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Status',
      field: 'vendor_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActiveStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
    },
    {
      headerName: 'Action',
      field: 'vendor_management_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:180,
      cellRenderer: ActionComponent,
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

  onCellClicked(e: any) {

  }

  onDateSelected(event: any) {
    this.getAllPo()
  }
  onDateSelected2(event: any) {
    this.getAllPo()
  }

  onChange(e: any) {
    console.log("in status is", this.inStatus)
  }
}
