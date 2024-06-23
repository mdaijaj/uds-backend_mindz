import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-remote-complain-action',
  templateUrl: './remote-complain-action.component.html',
  styleUrls: ['./remote-complain-action.component.scss']
})
export class RemoteComplainActionComponent {
  cellValue: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.amc_agreement_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate([''],
      { queryParams: { id: this.cellValue}})
  }
}
