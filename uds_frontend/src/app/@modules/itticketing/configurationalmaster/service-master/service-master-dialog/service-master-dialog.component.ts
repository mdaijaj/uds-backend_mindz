import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';

@Component({
  selector: 'app-service-master-dialog',
  templateUrl: './service-master-dialog.component.html',
  styleUrls: ['./service-master-dialog.component.scss']
})
export class ServiceMasterDialogComponent {

  serviceMasterId: any;
  listServiceMaster:any;
  singleServiceMasterData: any;

  constructor(public dialog: MatDialogRef<ServiceMasterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emp_master: EmpMasterService,
    private _configurationalMasterService: ConfigurationalmasterService,) 
    {
    this.listServiceMaster = data.id
    }
  ngOnInit(): void {
    {
      console.log("our id is",this.listServiceMaster)
      this.getByIdRole()
    }
  }
  getByIdRole() {
    this._configurationalMasterService.getByIdServiceMaster(this.listServiceMaster).subscribe((res: any) => {
      this.singleServiceMasterData = res.data
      console.log("this.singleServiceMasterData =====>", this.singleServiceMasterData )
    })
  }
}

