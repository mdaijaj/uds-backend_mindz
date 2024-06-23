import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { MatDialog } from '@angular/material/dialog';
// import { ActionComponent } from '../action/action.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { PlantMasterCreateComponent } from '../plant-master-create/plant-master-create.component';
import { PlantMasterActionComponent } from '../plant-master-action/plant-master-action.component';
import { ActionStatusComponent } from './action-status/action-status.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-plant-master-list',
  templateUrl: './plant-master-list.component.html',
  styleUrls: ['./plant-master-list.component.scss']
})
export class PlantMasterListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  public gridOptions: any = { rowSelection: 'multiple', };
  isDeleteButtonVisible: boolean = false;
  selectedRows: any[] = [];
  queryParamss: any;
  id: any;
  collegeids: any;
  collegeIdCopy: any;
  loginUser: any;
  assignAction: any;


  constructor(
    public dialog: MatDialog,
    private _configurationalMasterService: ConfigurationalmasterService,
    private _rbackService: RbacMasterService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute
  ) {
    this.rowClass = 'rowClass';
  }
  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
    this.getAllPlantMaster();
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.collegeids = this.id.id;
    });
    // this._configurationalMasterService.messageSubject.subscribe((id: any) => {
    //   this.collegeIdCopy = id;
    // });
    let a: any = localStorage.getItem('signInUser');
    this.loginUser = JSON.parse(a);
  }

  getAllPlantMaster() {
    this._configurationalMasterService.getPlantMasterList().subscribe((res: any) => {
      this.rowData = res.data;
      console.log(this.rowData, "data data data");
      
    });
  }

  public columnDefs = [
    {
      headerName: 'S.No.',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150 ,
    },
    {
      headerName: 'Plant Code',
      field: 'plant_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Plant Name',
      field: 'plant_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Location',
      field: 'plant_location',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    // {
    //   headerName: 'Status',
    //   field: 'status',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   flex: 1,
    //   minWidth: 150,
    // },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: ActionStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 150,
      cellRenderer: PlantMasterActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];

  onSelectionChanged(event: any) {
    this.selectedRows = event.api.getSelectedRows();
    console.log(this.selectedRows,"showing the data");
    
    this.isDeleteButtonVisible = this.selectedRows.length > 0;
}

// onDelete(e: any) {
//   e.stopPropagation();
//   if (this.selectedRows.length === 0) {
//     // Show a message to select rows before attempting deletion
//     // For example:
//     this.toast.error('Please select rows to delete.');
//     return;
//   }

//   Swal.fire({
//     title: 'Are you sure to delete these Colleges?',
//     icon: 'question',
//     showCancelButton: true,
//     cancelButtonColor: "#f44336",
//     confirmButtonColor: "#3f51b5",
//     confirmButtonText: 'Yes',
//     cancelButtonText: 'Not Yet'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Iterate through selected rows and send deletion request for each item
//       for (const row of this.selectedRows) {
//         const idToDelete = row.id; // Assuming 'id' is the identifier property in your rowData
//         const nameToDelete = row.collegeName; 
//         // Perform deletion for each ID
//         this._configurationalMasterService.deleteCollege(idToDelete).subscribe(
//           (res: any) => {
//             this.toast.success(`Deleted College ${nameToDelete} successfully`);
//             // Remove the deleted row from rowData
//             this.rowData = this.rowData.filter((item: any) => item.id !== idToDelete);
//             this.gridApi.setRowData(this.rowData);
//           },
//           (err) => {
//             this.toast.error(`Error deleting College ${nameToDelete}`, 'Error Message');
//           }
//         );
//       }

//       // Clear the selection and hide the delete button after deletion
//       this.gridApi.deselectAll();
//       this.selectedRows = [];
//       this.isDeleteButtonVisible = false;

//       // Optional: Reload data or navigate to refresh the grid if needed
//       // this.getDesignation();
//       // this.reloadCurrentRoute();
//     }
//   });
// }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.addEventListener('selectionChanged', this.onSelectionChanged.bind(this));

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


  openDialog() {
    const dialogRef = this.dialog.open(PlantMasterCreateComponent, {
      // data: { id: this.queryParamss },

      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
