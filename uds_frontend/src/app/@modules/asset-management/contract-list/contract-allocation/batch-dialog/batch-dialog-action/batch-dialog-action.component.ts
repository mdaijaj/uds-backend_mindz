import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-batch-dialog-action',
  templateUrl: './batch-dialog-action.component.html',
  styleUrls: ['./batch-dialog-action.component.scss']
})
export class BatchDialogActionComponent {
  cellValue: any;
  constructor(private route: Router,
    public dialog: MatDialog
 ) {}
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
  }
  set(e:any){
    console.log(e)
  }
}
