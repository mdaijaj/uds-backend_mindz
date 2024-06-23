import { Component, Inject, OnInit } from '@angular/core';
import { GrnServiceService } from '../grnService/grn-service.service';
import { PoListDetailsComponent } from '../po-list-details/po-list-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-po-action',
  templateUrl: './po-action.component.html',
  styleUrls: ['./po-action.component.scss']
})
export class PoActionComponent implements OnInit {
   batachSerialform:FormGroup
  constructor(private _GrnService:GrnServiceService,public dialog: MatDialogRef<PoListDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _fb:FormBuilder,private toasterService:ToastrService,private route:Router){
      this.batachSerialform=_fb.group({
        batchNo:new FormControl(),
        batchType:new FormControl(),
        expiryDate:new FormControl(),
        po_item_id:new FormControl(),
        serialNoData : new FormArray([
          new FormGroup({
            Item_name: new FormControl(this.data.formData.item_name),
            itemSerialNo: new FormControl(),
            itemStatus: new FormControl(),
            Item_Id: new FormControl(this.data.item_id.item_id),
            po_item_id: new FormControl(this.data.item_id.po_item_id),
          }),
        ]),
      })

  
    }
    get itemsFormArray() {
      return this.batachSerialform.get('serialNoData') as FormArray;
    }
  
 rcvd_qty:number=0;
ngOnInit(): void {
  this.rcvd_qty=+this.data.formData.rcvd_qty;
  for (let i = 0; i < this.rcvd_qty-1; i++) {
    let data= this._fb.group({
      Item_name: new FormControl(this.data.formData.item_name),
      itemSerialNo: new FormControl(),
      itemStatus: new FormControl(),
      Item_Id: new FormControl(this.data.item_id.item_id),
     po_item_id: new FormControl(this.data.item_id.po_item_id),
    });
    this.itemsFormArray.push(data); 
}


console.log(this.data,'itemdata');
console.log(this.data.formData,'formData');
  
if(this.data.item_id.po_item_id){
this._GrnService.createCode(this.data.item_id.po_item_id).subscribe((response:any)=>{
  // console.log(response,'response');
  this.batachSerialform.patchValue({
    batchNo:response.data.batchNo
  })
})

}
 
// for (let i = 0; i < this.rcvd_qty; i++) {
//   let data= this._fb.group({
//     Item_name: this.data.formData.item_name,
//     serailNo: '',
//     Status: '' 
//   });
//   this.serialNoformData.push(data);
// }

}

ngSubmitData(mydata:any){
  console.log(mydata.value,'value');
  if(this.data.item_id.ItemMaster.manage_by=='S.No. Only')
  {
    let data={
        receiveQty:this.data.formData.rcvd_qty, 
       rejectQty:this.data.formData.reject_qty,
      batchType:this.data.item_id.ItemMaster.manage_by,
      batchNo:mydata.value.batchNo,
      expiryDate:moment(mydata.value.expiryDate).format('YYYY-MM-DD'),
      po_item_id:this.data.item_id.po_item_id,
      item:mydata.value.serialNoData
    }
     
    this._GrnService.createGrnItem(data).subscribe((response:any)=>{
      if(response){
        this.toasterService.success(response.message)
        this.dialog.close()
        // this.getAllPoList()

      }
     },(err:any)=>{
      this.toasterService.error(err.error.message)
     }) 
  }
  else{
    let data={
      receiveQty:this.data.formData.rcvd_qty, 
      rejectQty:this.data.formData.reject_qty,
      batchType:this.data.item_id.ItemMaster.manage_by,
      batchNo:mydata.value.batchNo,
      expiryDate:moment(mydata.value.expiryDate).format('YYYY-MM-DD'),
      po_item_id:this.data.item_id.po_item_id
    }
     this._GrnService.createGrnItem(data).subscribe((response:any)=>{
      if(response){
        this.toasterService.success(response.message)
        this.dialog.close()
        // this.getAllPoList()
          
      }
     },(err:any)=>{
      this.toasterService.error(err.error.message)
     })  
       
  }
  
}
 reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });}

getAllPoList()
{
  this._GrnService.getAllPoList().subscribe((response:any)=>{
    return response;
  })
}

}


