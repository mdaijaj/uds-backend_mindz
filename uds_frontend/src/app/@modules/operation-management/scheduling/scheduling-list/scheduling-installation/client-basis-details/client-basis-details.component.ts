import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Location } from '@angular/common';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { Router } from '@angular/router';
import { ClientBasisDetailsActionComponent } from './client-basis-details-action/client-basis-details-action.component';
// import { ActionViewProposalVersionComponent } from '../action-proposal/action-view-proposal-version/action-view-proposal-version.component';

@Component({
  selector: 'app-client-basis-details',
  templateUrl: './client-basis-details.component.html',
  styleUrls: ['./client-basis-details.component.scss']
})
export class ClientBasisDetailsComponent {
    private gridApi!: GridApi<any>;
    rowData: any = [];
    rowClass: any;
    userLoginId: any;
  
    constructor(
      private $proposal: ProposalService,
      private location: Location,
      private router: Router,
  
    ) {
      this.rowClass = 'rowClass';
    }
  
    ngOnInit(): void {
      this.userLoginId = localStorage.getItem('EmpMainId')
      if (this.userLoginId) {
        this.getProposalList();
      }
    }
  
    onPageSizeChanged() {
      var value = (document.getElementById('page-size') as HTMLInputElement)
        .value;
      this.gridApi.paginationSetPageSize(Number(value));
    }
 
    getProposalList() {
      try {
        this.$proposal.getProposalList('4', 'status', this.userLoginId).subscribe((response: any) => {
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
        headerName: 'Asset Category',
        field: 'branch_name',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: 'grid-cell-centered',
        flex: 1,
      },
      {
        headerName: 'Serial Number',
        field: 'proposal_no', 
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: 'grid-cell-centered',
        flex: 1,
      },
      {
        headerName: 'Location',
        field: 'branch_name',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: 'grid-cell-centered',
        flex: 1,
      },
      {
        headerName: 'Allocated QTY',
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
        cellRenderer: ClientBasisDetailsActionComponent,
        cellRendererParams: {
          className: 'mat-blue',
          hideRequestButton: true,
          hideDetailsButton: false,
          hideDownloadIcon: false,
          showCustomIcon: false,
        },
      },
    ];
  
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
