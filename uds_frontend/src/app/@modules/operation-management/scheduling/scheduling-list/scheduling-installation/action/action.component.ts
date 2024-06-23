import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ICellRendererParams, Logger } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import Swal from 'sweetalert2';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
    allStateData: any;
    assignAction: any;
    constructor(
      private route: Router,
      public dialog: MatDialog,
      private router: Router,
      private _configurationalMasterService: ConfigurationalmasterService,
      private _rbackService: RbacMasterService,
      private toaster: ToastrService,
    ) {
      // this.data = localStorage.getItem("jobId");
      // 
  
    }
  
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
  
  
      return params.valueFormatted ? params.valueFormatted : params.data.quotation_currency_id
    }
    // refresh(params: ICellRendererParams): boolean {
  
      // wrirte code to modify cell 
  
      // if (params) {
      //   // const country = this.allStateData.find((e: any) => e.countryss_name.toUpperCase() === params.data.countryss_name.trim().toUpperCase())
      //   // 
      //   const data: any = {
      //     // countryss_id:country.countryss_id,
      //     quotation_currency_name: params.data.quotation_currency_name.trim(),
      //   }
      //   if (params.data.color === null && params.data.color !== "") {
  
  
      //     this.createQuotationcurrency(data);
      //   } else {
      //     const quotation_currency_id: number = Number(params.data.quotation_currency_id);
      //     this.updateSingleQuotationcurrency(quotation_currency_id, data);
  
      //   }
      // } else {
      //   this.toaster.error('Something went wrong please try again', 'Error Message');
      
  
      // this.cellValue = this.getValueToDisplay(params);
      // return true;
    // }
    clientBasisDetails(e:any){
      this.router.navigate(["/master/operation-management/scheduling/scheduling-list/scheduling-installation/client-basis-details"])
    }
    view(e:any){
      // this.router.navigate(["master/hrms/rbacmaster/Rbac-role-create"],{queryParams:{role_master_id:this.cellValue}})
    }
}
