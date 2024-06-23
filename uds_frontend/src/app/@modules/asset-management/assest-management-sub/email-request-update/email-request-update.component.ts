import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetManagementService } from 'src/app/@shared/services/asset-management.service';

@Component({
  selector: 'app-email-request-update',
  templateUrl: './email-request-update.component.html',
  styleUrls: ['./email-request-update.component.scss']
})
export class EmailRequestUpdateComponent {
  EmailRequestUpdateForm: FormGroup;
  id: any;
  singleData: any;
  asset_detail: boolean =false;
  asetMasterdata: any;
  selectAsset: any;
  editData: any;
  selectAsset1: any;
  categoryData: any;

  constructor(private route: Router, private fb: FormBuilder,
    private toast: ToastrService,private activeroute: ActivatedRoute,
    private assetService: AssetManagementService,
    ) {
    this.EmailRequestUpdateForm = this.fb.group({
      first_name: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      type_of_employee : new FormControl(null, [Validators.required]),
      email_id: new FormControl(null, [Validators.required]),
      personal_mail_id: new FormControl(null, [Validators.required]),
      assign_asset_request_from__hr:new FormControl(null, [Validators.required]),
      asset: new FormArray([
        new FormGroup({
          asset_id: new FormControl(null),
          asset_details: new FormControl(null),
          assest_cat:new FormControl(null)
        })
      ]),
      
      accessorie: new FormArray([
        new FormGroup({
          accessories_asset_id: new FormControl(null),
          accessories_details: new FormControl(null),
        })
      ]),
      updatedStatus:new FormControl('true')
   })
  }

  ngOnInit(){
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.id;
    });

    this.assetService.getEmilById(this.id).subscribe((res:any)=>{
      this.singleData = res.data;
      console.log(this.singleData,'this.singleData');
      
      this.categoryData=res.data.hardwere_allocation;
      console.log(this.categoryData,'this.categoryData');
      
      this.EmailRequestUpdateForm.patchValue({
        first_name: this.singleData.first_name,
        email: this.singleData.email,
        role: this.singleData.role,
        type_of_employee: this.singleData.type_of_employee,
        email_id: this.singleData.recovery_email,
        personal_mail_id: this.singleData.email_id,
      })

      let data: any = [];
      for(let el of this.categoryData){
        data.push({
          asset_id: "",
          asset_details: '',
          assest_cat: el,
        })
      }
      this.CF_1.asset = this.patchData(data);
    })

    this.getAllAsset();
  }

  get CF_1(): any {
    return this.EmailRequestUpdateForm.controls;
  }

  addAssetRow() {
      <FormArray>this.CF_1.asset.push(
        new FormGroup({
          asset_id: new FormControl(null),
          asset_details: new FormControl(null),
          assest_cat:new FormControl(null)
        })
       );
  }

  addAccessoriesRow() {
    <FormArray>this.CF_1.accessorie.push(
      new FormGroup({
        accessories_asset_id: new FormControl(null),
        accessories_details: new FormControl(null),
      })
     );
}

patchData(e: any): FormArray {
  return new FormArray(
    e.map((x: any) => {
      const obj = new FormGroup({});
      Object.keys(x).forEach((k) => {
        console.log(k,'kkkkkkk');
        
        obj.addControl(k, new FormControl(x[k]));
      });
      return obj;
    })
  );
}
  deleteTableRows(i: number, d: any) {
    
    if(this.CF_1.asset.length > 1){
      <FormArray>this.CF_1.asset.removeAt(i);
    }
             
  }

  deleteAccessTableRows(i: number, d: any) {
    
    if(this.CF_1.accessorie.length > 1){
      <FormArray>this.CF_1.accessorie.removeAt(i);
    }
             
  }
  get getFormControls() {
    const control = this.EmailRequestUpdateForm.get('asset') as FormArray;
    return control;
  }
  onSubmit(){
    if (this.EmailRequestUpdateForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }
    let val = this.EmailRequestUpdateForm.value;
    this.assetService.upadteEmailRequest( this.id, val).subscribe((res:any) =>{
      this.editData = res.data;
      this.toast.success(res.message);
      this.route.navigate(['master/assest-management/assest-management-sub/email-creation-list'])
    })
  }

  onChange(e:any){
    
    if(e.value == 'yes'){
      this.asset_detail = true;
    }
    else{
      this.asset_detail = false;   
     }

  }

  getAllAsset(){
    this.assetService.getProductMaster().subscribe((res:any)=>{
      this.asetMasterdata = res.data;
      console.log(this.asetMasterdata,'this.asetMasterdata');
      
    })
  }

  selectAssetCat(e:any, control:any){
    
    this.assetService.getProductMasterById(e.value).subscribe((res:any)=>{
      this.selectAsset = res.data;
      control.controls['asset_details'].patchValue(this.selectAsset.asset_description);
    })
  }

  selectAssoserise(e:any, control:any){
    
    this.assetService.getProductMasterById(e.value).subscribe((res:any)=>{
      this.selectAsset1 = res.data;
      control.controls['accessories_details'].patchValue(this.selectAsset1.asset_description);
    })
  }
}
