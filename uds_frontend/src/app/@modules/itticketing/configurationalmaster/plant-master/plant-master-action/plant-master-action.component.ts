import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-plant-master-action',
  templateUrl: './plant-master-action.component.html',
  styleUrls: ['./plant-master-action.component.scss']
})
export class PlantMasterActionComponent {
  assignAction: any;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router: Router,
    private toaster: ToastrService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private _rbackService: RbacMasterService,
  ) {}

  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
  }
  public cellValue: any;
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.data.id;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(ViewComponent, {
  //     width: '35%',
  //     // maxWidth: '100vw',
  //     // maxHeight: '100vh',
  //     // height: '100%',
  //     // panelClass: 'full-screen-modal',
  //     data: { id: this.cellValue },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {});
  // }

  edit(e: any) {
    e.stopPropagation();
    this.router.navigate(['master/configurational-master/plant-master/create'], {
      queryParams: { id: this.cellValue },
    });
  }
  view(e: any) {
    e.stopPropagation();
    this.router.navigate(['master/configurational-master/plant-master/view'], {
      queryParams: { id: this.cellValue },
    });
  }
  delete(e: any) {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure want to Remove?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._configurationalMasterService.deletePlantMaster(this.cellValue).subscribe(
          (res) => {
            
            this.toaster.success('Deleted successfully ');
            this.reloadCurrentRoute();
          },
          (err) => {
            this.toaster.error("Somthing went wrong Please try agin", "Error Message")
            
          }
        )
      }
    });
  } 
}
