import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-product-master-create',
  templateUrl: './product-master-create.component.html',
  styleUrls: ['./product-master-create.component.scss']
})
export class ProductMasterCreateComponent {

  productMasterForm: any;
  id: any;
  parm: any;
  getData: any;
  propertyManager: any;
  personalIdData: any;
  wordCount: any;
  getUOM_data: any[] = [];
  @ViewChild("text") text: ElementRef;
  words: any;
  extraWords: boolean = false;
  asignData: any;
  asignvariables: any;
  asignvariable: any;
  uniqueId: any;
  uniquedata: any;
  nameSearch: any = '';
  variables: any = [];
  variable: any = [];
  checkData: any;
  showDropdown: boolean = false;
  productCtrl = new FormControl();
  filteredProducts: Observable<any[]>;
  products: any[] = [];

  all_item_data: any;
  getCat_data: any;
  filteredData: any;
  cat_id: any;
  type: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private emp_master: EmpMasterService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private locatin: Location,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private location: Location,
    private prService: PurchaseRequestService,
  ) {
    // productMasterForm
    this.productMasterForm = this.fb.group({
      service_name: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      service_code: new FormControl(null, [Validators.required]),
      service_description: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      asset_id: new FormControl(null),
    })
  }
  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params: any) => {
      this.parm = params;
      this.id = params.id;
      this.type = params?.type;
    })
    this.getAllProduct();
    this.getAssginSingle();
    if (this.id) {
      this.getByIdUse();
    }
    this.AutoGenerateRequestNo()
    this._empRegistration.grtEmployeeList().subscribe((res: any) => {
      this.personalIdData = res.data;
      this.propertyManager = Array.from(this.personalIdData, (a: any) => `${a.first_name} ${a.last_name}`)
    })
    this._empRegistration.getByUserId(localStorage.getItem('EmpMainId')).subscribe((res: any) => {
      this.getData = res.data.first_name;
      this.productMasterForm.controls['requester'].setValue(this.getData);
    })
    this._configurationalMasterService.getUOMList().subscribe((res: any) => {
      this.getUOM_data = res.data;
    })
    if (!this.id) {
      this.getuniqueNumber();
    }

    this._configurationalMasterService.getActiveAssetMasterList().subscribe((res: any) => {
      this.getCat_data = res.data;
    })
    this.prService.getAllProd().subscribe((res: any) => {
      this.all_item_data = res.data;
      console.log(this.all_item_data, "item data");
      // this.all_item_data.forEach((pro: any) => {
      //   pro['quantity'] = this.quantity
      // });
    })
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  getAllProduct() {
    this._configurationalMasterService.getProductMasterList().subscribe((res: any) => {
      const list = res.data
      const newArray = list?.map((item: any, index: any) => ({ ...item, index: index + 1 }));
      this.products = newArray
      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterProducts(value))
      );
      console.log(this.products, "rowdata");
    })
  }
  private _filterProducts(value: string): any[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue, "value filter");
    this.productMasterForm.get('service_name').setValue(filterValue);
    return this.products.filter(product => product.service_name.toLowerCase().includes(filterValue));
  }
  goBack() {
    this.location.back();
  }
  getAssginSingle() {
    this.recruitService.getSpocRecruipment().subscribe((res: any) => {
      this.asignData = res.data;
      this.asignvariables = this.asignData.map((res: any) => res.first_name)
      this.asignvariable = this.asignData

    });
  }
  asignFilter(e: any) {
    const aa = e
    let filteredVariable = this.asignvariable.filter((item: any) => aa.includes(item.first_name));
    this.asignData = filteredVariable
    console.log(this.asignData, "checkkkk")
  }
  changedText() {
    if (this.words >= 50) {
      this.extraWords = true;
      this.toast.warning('Please enter within the text limit..', 'Warning Message');
      return
    } else if (this.words < 50) {
      this.extraWords = false;
    }
  }
  back() {
    history.back()
  }
  getByIdUse() {
    this._configurationalMasterService.allProductServiceById(this.id).subscribe((res: any) => {
      this.getData = res.data;
      this.itemMappingList = this.getData?.itemNameList;
      this.basicFormPatch(this.getData)
    })
  }
  AutoGenerateRequestNo() {
    this.emp_master.AutoGenerateRequestNo().subscribe((response: any) => {
      console.log(response);
      const apiRequestNo = response.data;
    },
      (error) => {
      }
    )
  }
  basicFormPatch(getData: any) {
    this.productMasterForm.patchValue({
      service_name: getData?.service_name,
      service_code: getData?.service_code,
      service_description: getData?.service_description,
    })
  }
  updateForm(e: any) {
    e.stopPropagation();
    if (this.productMasterForm.invalid) {
      this.toast.error('required fields should not be blank', 'Required fields');
      return
    }
    let data = this.productMasterForm.value;
    data.id = this.id;

    if (!this.itemMappingList?.length) {
      return this.toast.error('Add item at least one in item mapping', 'Required fields');
    }
    data.itemNameList = this.itemMappingList;
    delete data?.asset_id;
    this._configurationalMasterService.updateProductServiceById(this.id, data).subscribe((res: any) => {
      this.toast.success("Product Master Updated successfully", "Updated successfully")
      this.router.navigate(['master/configurational-master/product-master']);
    }, (err) => {

      this.toast.error("Something went wron please try again", "Error Massage");
    }
    )
  }
  onSubmitForm() {
    let val = this.productMasterForm.value;
    if (this.productMasterForm.invalid) {
      this.toast.error('required fields should not be blank', 'Required fields');
      return
    }
    if (!this.itemMappingList?.length) {
      return this.toast.error('Add item at least one in item mapping', 'Required fields');
    }
    val.itemNameList = this.itemMappingList;
    delete val?.asset_id;
    this._configurationalMasterService.createProductService(val).subscribe((res: any) => {
      if(res.message === "Service Name Already Exists!"){
        this.toast.warning('Service Name Already Exists!');
        this.router.navigate(['master/configurational-master/product-master']);
      }
      if(res.message === "Service Code Already Exists!"){
        this.toast.warning('Service Code Already Exists!');
        this.router.navigate(['master/configurational-master/product-master']);
      }
      if ( res.message !== "Service Name Already Exists!" && res.message !== "Service Code Already Exists!") {
        this.toast.success("Product Master created successfully", "Created Successfully");
        this.router.navigate(['master/configurational-master/product-master']);
      }
    }, (err) => {

      if (err.error.code === 403) {
        this.toast.error(`${err.error.message}`, "Error Massage");
      } else {
        this.toast.error("Something went wron please try again", "Error Massage");
      }
    }
    )
  }
  getuniqueNumber() {
    this.emp_master.getUniqueNumber().subscribe((res: any) => {
      console.log(res, 'res');
      this.uniquedata = res.data;
      this.productMasterForm.patchValue({
        request_no: this.uniquedata
      });
      this.productMasterForm.controls['request_no'].disable();
    })
  }

  // Item mapping start
  itemMappingList: any = [];
  selectedItemList = new FormControl('');
  addItem() {
    let value = this.productMasterForm?.value;
    if (!value?.asset_id) {
      return this.toast.error('Asset Category is required', "Can't Deleted!");
    }
    if (!this.selectedItemList?.value?.length) {
      return this.toast.error('Item Name is required', "Can't Deleted!");
    }
    let assetCategoryObj = this.getCat_data?.find((elem: any) => elem?.id == value?.asset_id);
    let itemList: any = [];
    this.filteredData?.map((item: any) => {
      let list: any = this.selectedItemList?.value;
      list.map((subItem: any) => {
        if (item?.id == subItem) {
          item.item_id = item.id;
          itemList.push(item);
        }
      })
    })
    let obj = {
      asset_id: assetCategoryObj?.id,
      asset_category_name: assetCategoryObj?.asset_category_name,
      itemList: itemList,
    }
    this.itemMappingList.push(obj);
    this.productMasterForm.patchValue({ asset_id: '' });
    this.selectedItemList = new FormControl('');
  }

  deleteItemMapping(index: any) {
    this.itemMappingList?.splice(index, 1)
  }

  getAssetCateVal(e: any) {
    this.cat_id = e;
    if (this.cat_id !== null || undefined) {
      this.filteredData = this.all_item_data.filter((res: any) => res.asset_id == this.cat_id);
    }
  }
  // Item mapping end


}


