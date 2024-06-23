import { Component, OnDestroy, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-extend-pr-date',
  templateUrl: './extend-pr-date.component.html',
  styleUrls: ['./extend-pr-date.component.scss']
})
export class ExtendPrDateComponent implements OnInit{

  extendDateForm:FormGroup;
  procurement_product_id:any;
  currentDate:Date = new Date()
  status: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  pr_id: any;
  pr_Liveid: any;
constructor( 
  private fb:FormBuilder,
  private route: Router,
  private toast: ToastrService,
  private prService: PurchaseRequestService,
  private updateTableData:DataUpdateService,
  public dialog: MatDialogRef<ExtendPrDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

    console.log(data,'data');
    this.status=data.status;
    this.pr_id=data.prId;
    this.pr_Liveid=data.pr_Liveid;
this.extendDateForm = this.fb.group({
  end_date:new FormControl(null),
  update_stop_date: new FormControl(null),
  remarks_stop:new FormControl(null)
});
}

ngOnInit(): void {
  this.extendDateForm.patchValue({
    update_stop_date:this.currentDate
  })
}

updateDate(){
  // if (this.extendDateForm.invalid) {
  //   this.toast.error('Required fields should not be empty', 'Fields Error');
  //   return;
  // }
  let val = this.extendDateForm.value
  const selectedDate = moment(val.end_date);
  const currentDate = moment(this.currentDate);
  
  // if(selectedDate.isAfter(currentDate)){
  //   console.log('Selected date is grater');
  // }else 
  if(selectedDate.isBefore(currentDate)){
    this.toast.error('Selected Date should not be smaller than current date','Valid Date Error');
    return;
  }
  var outDate = moment(val.end_date).format("YYYY-MM-DD");

  let dateData ={
    end_date:outDate
  }
   this.prService.procurementProductId.subscribe((res:any) =>{
    this.procurement_product_id = res;
  });

  
  
  if(this.procurement_product_id != null || this.procurement_product_id != undefined){
    this.prService.updateExtendDate(this.procurement_product_id,dateData).subscribe((res:any) =>{
      if(res && res.code == 200){
        this.toast.success('Date Updated successfully.');
        this.getAllLiveRfpData();
      }
   },err =>{
      this.toast.error('Something went wrong')
   })
  }
}

updateRfp(){
  let val=this.extendDateForm.value;
  console.log(val,'val');
  var stopDate = moment(val.update_stop_date).format("DD-MM-YYYY");
  const data={
  //  procurement_id :this.pr_id,
   rfp_status : "CLOSE RFP",
   stop_rfp_date :stopDate
  }
  this.prService.updateRfpStopDate(this.pr_id,data).subscribe((res:any)=>{
console.log(res,'ressss');
this.toast.success("Update Successfully..")
 
    },
   ((err:any)=>{
    this.toast.error("Something Went To Wrong")
   }) 
    )

}

getAllLiveRfpData(){
  this.prService.getAllLiveRfp().subscribe((res:any)=>{
    const rowData = res;
    this.updateTableData.setTableData(rowData)
    })
}


}
