import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { Router } from '@angular/router';
import { ActionComponent } from './contract-action/action.component';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
  private gridApi!: GridApi<any>;
  candidate_id?: number;
  assignAction: any;
  rowClass: any;
  leadSummaryForm: FormGroup;
  userLoginId: any;

  constructor(
    private fb: FormBuilder,
    private $proposal: ProposalService,
    private location: Location,
    private router: Router,

  ) {
    this.rowClass = 'rowClass';
    this.leadSummaryForm = this.fb.group({
      branch_id: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    if (this.userLoginId) {
      this.getDealClosedList();
    }
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  // Get all start
  getDealClosedList() {
    try {
      this.$proposal.getDealClosedList(this.userLoginId).subscribe((response: any) => {
        if (response) {
          // this.rowData = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get all end

  public rowData = [
    {contract_no: 7, company_name: 'Block1', start_date: '', end_date: '', po_number:'',branch_name:'' }
  ]

  public columnDefs = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered ',
      flex: 1,
    },
    {
      headerName: 'Contract No.',
      field: 'contract_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Client Name',
      field: 'company_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'PO Number',
      field: 'po_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Start Date',
      field: 'start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'End Date',
      field: 'end_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Branch Name',
      field: 'branch_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 200,
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

  // Custome render start
  clickIt(params: any) {
    this.router.navigate(["master/crm/create-proposal"], { queryParams: { dealClosedId: params?.data?.id, actionType: 'dealClose' } })
  }

  customCellRenderer(params: any) {
    const cellValue = params.value;
    const clickableContent = document.createElement('div');
    clickableContent.style.cursor = 'pointer';
    clickableContent.style.textDecoration = 'underline';
    clickableContent.innerText = cellValue;
    clickableContent.addEventListener('click', () => {
      this.clickIt(params);
    });
    return clickableContent;
  }
  // Custome render end

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  goBack() {
    this.location.back();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

}
