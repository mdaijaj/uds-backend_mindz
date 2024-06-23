import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-action',
  templateUrl: './add-product-action.component.html',
  styleUrls: ['./add-product-action.component.scss']
})
export class AddProductActionComponent {
  cellValue: any;
  constructor(private route: Router, 
    private toster: ToastrService) {}
  ngOnInit(): void {
    
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.holiday_id;
  }

  // edit(e: any) {
  //   e.stopPropagation();
  //   this.route.navigate(['master/assest-management/assest-management-sub/'],
  //     { queryParams: { holiday_id: this.cellValue} })
  // }

}
