import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { Router } from '@angular/router';
import { ActionAddPoComponent } from '../action-proposal/action-add-po/action-add-po.component';

@Component({
  selector: 'app-closed-deals',
  templateUrl: './closed-deals.component.html',
  styleUrls: ['./closed-deals.component.scss'],
})
export class ClosedDealsComponent implements OnInit {
  private gridApi!: GridApi<any>;
  rowData: any = [];
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
          this.rowData = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get all end

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
      headerName: 'Proposal No.',
      field: 'proposal_no', // Replace with your actual field name
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: this.customCellRenderer.bind(this), // Ensure correct 'this' context
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
      headerName: 'Lead Owner',
      field: 'full_name',
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
      headerName: 'Closed Date',
      field: 'createdAt',
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
      minWidth: 150,
      cellRenderer: ActionAddPoComponent,
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
