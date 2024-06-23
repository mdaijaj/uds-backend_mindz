import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-serial-dialog-action',
  templateUrl: './serial-dialog-action.component.html',
  styleUrls: ['./serial-dialog-action.component.scss']
})
export class SerialDialogActionComponent {
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
  }
  set(e:any){
    console.log(e)
  }
}
