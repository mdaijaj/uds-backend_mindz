import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { SerialDialogComponent } from '../serial-dialog/serial-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BatchDialogComponent } from '../batch-dialog/batch-dialog.component';

@Component({
  selector: 'app-contract-action',
  templateUrl: './contract-action.component.html',
  styleUrls: ['./contract-action.component.scss']
})
export class ContractActionComponent {
  cellValue: any;
  constructor(private route: Router,
    public dialog: MatDialog) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    console.log("cell value is", this.cellValue)
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data;
  }

  openDialog(e:any){
    // const dialogRef = this.dialog.open(SerialDialogComponent, { width: '700px', data: 7 });
    // console.log("dialog refrence is",dialogRef)
    // dialogRef.afterClosed().subscribe(result => {
    // })

    const dialogRef = this.dialog.open(BatchDialogComponent, { width: '700px', data: 7 });
    console.log("dialog refrence is",dialogRef)
    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
