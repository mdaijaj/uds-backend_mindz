import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';

@Component({
  selector: 'app-asset-dialog',
  templateUrl: './asset-dialog.component.html',
  styleUrls: ['./asset-dialog.component.scss']
})
export class AssetDialogComponent {
  formObj: any = {};
  mode: any;
  branches: any;
  selectedEmployeeBranch: any;
  roles: any;
  selectedRole: any;
  employees: any;
  selectedEmployee: any;
  locationRemark: any;
  employeeRemark: any;
  selectedLocationBranch: any;
  constructor(public dialog: MatDialogRef<AssetDialogComponent>,
    private _configurationalMasterService: ConfigurationalmasterService,
    private crmService: CrmService,
    @Inject(MAT_DIALOG_DATA) public data: any,
   ) {
  }

  ngOnInit(): void {
    this.getBranchList()
  }

  getBranchList(){
    this._configurationalMasterService.getAllBranch().subscribe((res: any) => {
      this.branches = res.data;
    })
  }

  onSelectedEmployeeBranch(e:any){
    this.getRolesByBranchId()
  }

  getRolesByBranchId() {
    this.crmService.getRoleMasterByBranchId(this.selectedEmployeeBranch).subscribe((response: any) => {
        if (response) {
          this.roles = response.data;
        }
      }, (err: any) => {
        console.log(err);
    })
  }

  onSelectedRole(e:any){
    this.getEmployeesByRoleId()
  }

  getEmployeesByRoleId(){
    this.crmService.getEmployeesByRoleId(this.selectedRole).subscribe((response: any) => {
      if (response) {
        this.employees = response.data;
      }
    }, (err: any) => {
      console.log(err);
  })
  }

  onChange(e:any){
    this.mode = e.value;
    if ( this.mode == "true" ) {
      this.mode = false;
    }
    if ( this.mode == "false" ){
      this.mode = true;
    }
  }

  allocate(){

  }
}
