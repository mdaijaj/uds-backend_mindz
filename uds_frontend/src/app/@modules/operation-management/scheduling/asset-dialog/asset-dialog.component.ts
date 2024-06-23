import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { allocationService } from 'src/app/@shared/services/operation-management/allocation.service';

@Component({
  selector: 'app-asset-dialog',
  templateUrl: './asset-dialog.component.html',
  styleUrls: ['./asset-dialog.component.scss']
})
export class AssetDialogComponent {
  @ViewChild('requiredForm', { static: true }) requiredForm: NgForm;
  formObj: any = {
    allocation_type: 'Location'
  };
  branches: any;
  selectedEmployeeBranch: any;
  roles: any;
  selectedRole: any;
  employees: any;
  selectedEmployee: any;
  locationRemark: any;
  employeeRemark: any;
  selectedLocationBranch: any;
  constructor(
    public dialog: MatDialogRef<AssetDialogComponent>,
    private _configurationalMasterService: ConfigurationalmasterService,
    private crmService: CrmService,
    private $allocation: allocationService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.getBranchList()
  }

  getBranchList() {
    this._configurationalMasterService.getAllBranch().subscribe((res: any) => {
      this.branches = res.data;
    })
  }

  getRolesByBranchId() {
    this.crmService.getRoleMasterByBranchId(this.formObj?.branch_id).subscribe((response: any) => {
      if (response) {
        this.roles = response.data;
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  getEmployeesByRoleId() {
    this.crmService.getEmployeesByRoleId(this.formObj?.role_id).subscribe((response: any) => {
      if (response) {
        this.employees = response.data;
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  saveRecord() {
    try {
      this.formObj.item_id = this.data?.id;
      this.$allocation.createAllocation(this.formObj).subscribe((response: any) => {
        if (response) {
          this.toast.success(response.message);
          this.dialog.close();
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error)
    }
  }

}
