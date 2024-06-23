import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-new-role-dialog',
  templateUrl: './new-role-dialog.component.html',
  styleUrls: ['./new-role-dialog.component.scss']
})
export class NewRoleDialogComponent {
  role_id: any;
  roleGetByDataTemp: any;
  roleGetByData: any;
  constructor(private _rbacMasterService:RbacMasterService,
    private _configurationalMasterService: ConfigurationalmasterService,
     public dialog: MatDialogRef<NewRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
this.role_id=data.role_master_id;

}
  ngOnInit(){
   this.getByIdRole()
  }

  getByIdRole() {
    this._rbacMasterService.getByIdRole(this.role_id).subscribe((res: any) => {
      this.roleGetByDataTemp = res.data;
      this._configurationalMasterService.getListBranchSetup().subscribe((res: any) => {
        const aa = res.data
        res.data.forEach((value:any) => {
          if ( value.id == this.roleGetByDataTemp.branch_id) {
            this.roleGetByDataTemp['branch_name']= value.branch_name
          }
        })
        this.roleGetByData = this.roleGetByDataTemp 
      })
    })
  }
}
