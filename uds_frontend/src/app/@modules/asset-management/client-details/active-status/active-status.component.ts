import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active-status',
  templateUrl: './active-status.component.html',
  styleUrls: ['./active-status.component.scss']
})
export class ActiveStatusComponent {
  cellValue: any;
  constructor(private route: Router,
    private toast: ToastrService) {}
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
  }

  activeTogle(e:any){
    e.stopPropagation();
  }
}
