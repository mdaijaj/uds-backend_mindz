import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';

@Component({
  selector: 'app-event-dailog',
  templateUrl: './event-dailog.component.html',
  styleUrls: ['./event-dailog.component.scss']
})
export class EventDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  constructor(public dialog: MatDialogRef<EventDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService
   ) {
    this.id = this.data.id;
    
  }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
   this.adminService.get_ById_Event(this.id).subscribe((res:any)=>{
   this.singleData = res.data;
   })
  }
}
