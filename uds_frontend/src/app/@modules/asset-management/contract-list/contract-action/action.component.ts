import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  cellValue: any;
  constructor(private route: Router) { }
  ngOnInit(): void {

  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);

  }
  getValueToDisplay(params: ICellRendererParams) {

    return params.valueFormatted ? params.valueFormatted : params.data;
  }

  open(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/operation-management/asset-management/contract-list/contract-allocation'],
      { queryParams: { id: this.cellValue?.id } })
  }
}
