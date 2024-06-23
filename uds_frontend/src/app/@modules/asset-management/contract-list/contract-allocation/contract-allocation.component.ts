import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ContractActionComponent } from './action/contract-action.component';
import { Location } from '@angular/common';
import { allocationService } from 'src/app/@shared/services/asset-management/allocation.service';

@Component({
  selector: 'app-contract-allocation',
  templateUrl: './contract-allocation.component.html',
  styleUrls: ['./contract-allocation.component.scss']
})
export class ContractAllocationComponent {
  cellValue: any;
  private gridApi!: GridApi<any>;
  rowClass: any;
  rowData: any = [];
  dataObj: any = {};
  contractId: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private $allocation: allocationService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.contractId = params?.id;
      if (this.contractId) {
        this.getContractDetails();
      }
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  goBack() {
    this.location.back();
  }


  public columnDefs = [
    {
      headerName: 'Sr No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 70,
    },
    {
      headerName: 'Asset/Item Category',
      field: 'asset_category_name',
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
      headerName: 'Asset/Item Name',
      field: 'item_name',
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
      headerName: 'Allocation Type',
      field: 'allocation_type',
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
      headerName: 'Location',
      field: 'location',
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
      headerName: 'Frequency',
      field: 'frequency',
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
      headerName: 'Qty',
      field: 'qty',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: 'Actions',
      field: 'vendor_management_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:110,
      cellRenderer: ContractActionComponent,
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

  getContractDetails() {
    try {
      this.$allocation.getContractDetails(this.contractId).subscribe((response: any) => {
        if (response) {
          this.dataObj = response.data;
          this.rowData = response?.data?.assetList;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error)
    }
  }

}
