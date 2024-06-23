import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ContractActionComponent } from './action/contract-action.component';
import { Location } from '@angular/common';
import { allocationService } from 'src/app/@shared/services/asset-management/allocation.service';
import { MatDialog } from '@angular/material/dialog';
import { BatchDialogComponent } from './batch-dialog/batch-dialog.component';

@Component({
  selector: 'app-contract-allocation',
  templateUrl: './contract-allocation.component.html',
  styleUrls: ['./contract-allocation.component.scss']
})
export class ContractAllocationComponent {
  cellValue: any;
  dataObj: any = {};
  contractId: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
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

  getContractDetails() {
    try {
      this.$allocation.getContractDetails(this.contractId).subscribe((response: any) => {
        if (response) {
          debugger
          this.dataObj = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error)
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(BatchDialogComponent, { width: '700px', data: 7 });
    console.log("dialog refrence is", dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  goBack() {
    this.location.back();
  }

}
