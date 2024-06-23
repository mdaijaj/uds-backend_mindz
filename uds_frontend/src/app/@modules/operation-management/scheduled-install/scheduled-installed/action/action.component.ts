import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  cellValue: any;
  constructor(private route: Router,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.data;
  }


  

  redirect(e:any){
    e.stopPropagation();
    this.route.navigate(['master/operation-management/scheduled-install/scheduled-install-listing'],
      { queryParams: { type: this.cellValue.mode}})
  }
}
