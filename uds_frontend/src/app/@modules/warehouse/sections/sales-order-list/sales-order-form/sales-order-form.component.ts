import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ColumnApi, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { SalesOrderFormActionComponent } from './sales-order-form-action/sales-order-form-action.component';

@Component({
  selector: 'app-sales-order-form',
  templateUrl: './sales-order-form.component.html',
  styleUrls: ['./sales-order-form.component.css']
})
export class salesOrderFormComponent implements OnInit {
  rowClass: any;
  sales_order_no:any;
  sales_order_date:any;
  sales_order_by:any;
  // private gridApi!: GridApi<any>;
  // private gridColumnApi: ColumnApi;
  
  constructor(
    private router: Router,
    private $warehouseList: warehouseListService,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {
  }

  // onGridReady(params: GridReadyEvent) {
  //   this.gridApi = params.api;
  //   // this.gridColumnApi = params.columnApi;
  // }

  rowData = [
    {product_code: 7, product_name: 'Block1', product_variant: '', opening_stock: 12,sales_order_quantity:12 }
  ]

  public columnDefs = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Code',
      field: 'product_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Service Name',
      field: 'product_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Variant',
      field: 'product_variant',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Opening Stock',
      field: 'opening_stock',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Sales Order Quantity',
      field: 'sales_order_quantity',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      // cellRenderer: SalesOrderActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
    {
      headerName: 'Actions',
      field: 'undecided',
      width:400,
      sortable: true,
      resizable: false,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: SalesOrderFormActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    }
  ];
}
