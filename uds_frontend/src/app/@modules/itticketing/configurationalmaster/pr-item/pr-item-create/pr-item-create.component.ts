import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ProductionService } from 'src/app/@shared/services/production/production.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { environment } from 'src/app/environments/environment';
import Swal from 'sweetalert2';

function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-pr-item-create',
  templateUrl: './pr-item-create.component.html',
  styleUrls: ['./pr-item-create.component.scss']
})
export class PrItemCreateComponent {
  imageToUpload: any;
  imagePath: any;
  editDocData: any
  createPrItemForm: FormGroup;
  id: any;
  singleItem: any;
  createdata: any;
  getCat_data: any;
  getUom_data: any;
  all_item_data: any;
  filteredData: any;
  cat_id: any;

  constructor(private fb: FormBuilder, private prService: PurchaseRequestService, private _configurationalMasterService: ConfigurationalmasterService, private productionService: ProductionService, private activeroute: ActivatedRoute,
    private toaster: ToastrService,
    private route: Router
  ) {
    

    this.createPrItemForm = this.fb.group({
      item_name: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      description: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      threshold_stock: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      MVP: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      asset_id: new FormControl(null, [Validators.required]),
      asset_id_mapping: new FormControl(null),
      Bar_QR_Code: new FormControl(null, [Validators.required]),
      manage_by: new FormControl(null, [Validators.required]),
      uom_id: new FormControl(null, [Validators.required]),
      use_this_item: new FormControl(false),
      itemSpecification: new FormArray([
        new FormGroup({
          specificationType: new FormControl(null, [Validators.required, noLeadingSpaces()]),
          specificationDetails: new FormControl(null, [Validators.required, noLeadingSpaces()]),
        }),
      ]),
      itemMaping: new FormArray([]),
    })
  }
  get CF_1(): any { return this.createPrItemForm.controls };

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.item_id;
      console.log(params, "data data data this id");

    });
    if (this.id) {
      this.CF_1['image'].setErrors(null);
      while (this.CF_1.itemSpecification.length > 0) {
        this.CF_1.itemSpecification.removeAt(0);
      }
      this._configurationalMasterService.getByIdItemMaster(this.id).subscribe((res: any) => {
        this.singleItem = res.data;
        this.itemMappingList = this.singleItem?.itemNameList;
        this.CF_1['image'].setErrors(null);
        this.createPrItemForm.patchValue({
          item_name: this.singleItem?.item_name,
          MVP: this.singleItem?.MVP,
          asset_id: this.singleItem?.asset_id,
          uom_id: this.singleItem?.uom_id,
          description: this.singleItem?.description,
          threshold_stock: this.singleItem?.threshold_stock,
          Bar_QR_Code: this.singleItem?.Bar_QR_Code,
          manage_by: this.singleItem?.manage_by,
          itemSpecification: this.singleItem?.itemSpecifications,
          itemMaping: this.singleItem?.itemMapings,
          use_this_item: this.singleItem?.use_this_item,
          // image: this.singleItem?.image, 
        })
        const itemSpecArray = this.createPrItemForm.get('itemSpecification') as FormArray;
        this.singleItem?.itemSpecifications.forEach((itemSpec: any) => {
          const newRow = this.fb.group({
            specificationType: itemSpec.specificationType,
            specificationDetails: itemSpec.specificationDetails,
          });
          itemSpecArray.push(newRow);
        });
      })
    }
    this.prService.getAllProd().subscribe((res: any) => {
      this.all_item_data = res.data;
      console.log(this.all_item_data, "item data");
      // this.all_item_data.forEach((pro: any) => {
      //   pro['quantity'] = this.quantity
      // });
    })
    this._configurationalMasterService.getAssetMasterList().subscribe((res: any) => {
      this.getCat_data = res.data;

    })
    this._configurationalMasterService.getActiveUOMList().subscribe((res: any) => {
      this.getUom_data = res.data;
    })
  }

  onChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
    }

  }

  getAssetCateVal(e: any) {
    this.cat_id = e;
    if (this.cat_id !== null || undefined) {
      this.filteredData = this.all_item_data.filter((res: any) => res.asset_id == this.cat_id);
    }
  }

  generateImageUrl(uploadDoc: any): string {
    const servralUrl = environment.servralUrl;
    return `${servralUrl}/${uploadDoc}`;
  }

  isImage(uploadDoc: any): boolean {
    // Check if the file has an image extension

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = this.getFileExtension(uploadDoc);

    return imageExtensions.includes(extension.toLowerCase());
  }

  generateFileUrl(uploadDoc: any): string {
    const servralUrl = environment.servralUrl;
    return `${servralUrl}/${uploadDoc}`;
  }

  getFileName(uploadDoc: any): string {
    // Extract and return the file name from the path
    const pathParts = uploadDoc.split('/');
    return pathParts[pathParts.length - 1];
  }

  getFileExtension(filename: string): string {
    // Extract and return the file extension from the filename
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
  // seePreview(path: string) {
  //     if (path) {
  //       Swal.fire({
  //         imageUrl: environment.servralUrl+'/'+path,
  //         imageHeight: 250,
  //         imageAlt: 'Uploaded Document',
  //         confirmButtonColor: "#063178",
  //         confirmButtonText: 'Ok',
  //       })
  //     }
  // };
  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: environment.servralUrl + '/' + path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: "#063178",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#063178",
        confirmButtonText: 'Ok',
      })
    }
  };

  addrow() {
    const itemSpecificationArray = this.CF_1.itemSpecification as FormArray;
    const newRow = this.fb.group({
      specificationType: new FormControl(null, [Validators.required]),
      specificationDetails: new FormControl(null, [Validators.required]),
    });

    itemSpecificationArray.push(newRow);
  }

  deleteRow(i: any) {
    if (this.CF_1.itemSpecification.length >= 1) {
      this.CF_1.itemSpecification.removeAt(i);
    } else {
      this.toaster.error('must be one', "Can't Deleted!");
    }
  }
  deleteRow2(i: any) {
    if (this.CF_1.itemMaping.length >= 1) {
      this.CF_1.itemMaping.removeAt(i);
    } else {
      this.toaster.error('must be one', "Can't Deleted!");
    }
  }

  onSubmit() {
  console.log(this.createPrItemForm.value.manage_by,'manage_by');
  
    if (this.createPrItemForm.invalid) {
      this.toaster.error('Required fields should not be empty', 'Fields Error');
      return;
    }
    // let asset_category_name:any
    let val = this.createPrItemForm.value;
    if (val.use_this_item && !this.itemMappingList?.length) {
      return this.toaster.error('Add at least one item mapping', 'Fields Error');
    }
    // this.getCat_data.forEach((res:any) => {
    //   if(res.asset_id  == val.asset_id){
    //     asset_category_name = res.asset_category
    //   }
    // });
    console.log(val, "val for api");
    const formData = new FormData();
    formData.append('item_name', val.item_name);
    formData.append('MVP', val.MVP);
    formData.append('image', this.imageToUpload);
    formData.append('asset_id', val.asset_id);
    formData.append('uom_id', val.uom_id);
    formData.append(`Bar_QR_Code`, val.Bar_QR_Code);
    formData.append(`manage_by`, val.manage_by);
    formData.append(`description`, val.description);
    formData.append(`threshold_stock`, val.threshold_stock);
    formData.append('itemSpecification', JSON.stringify(val.itemSpecification));

    if (val.use_this_item && this.itemMappingList?.length) {
      formData.append('itemNameList', JSON.stringify(this.itemMappingList));
      formData.append('use_this_item', JSON.stringify(1));
    }
    if (!val.use_this_item) {
      formData.append('use_this_item', JSON.stringify(0));
    }
    if (this.id) {
      this._configurationalMasterService.updatItemMaster(this.id, formData).subscribe((res: any) => {

        this.toaster.success(res.message)
        this.route.navigate(['master/configurational-master/pr-item'])
      }, err => {
        this.toaster.error(err.error.message)
      })
    } else {
      console.log(formData, "data formData");

      this._configurationalMasterService.createItem(formData).subscribe((res: any) => {
        this.createdata = res.data
        this.toaster.success(res.message)
        this.route.navigate(['master/configurational-master/pr-item'])
      }, err => {
        this.toaster.error(err.error.message)
      })
    }
  }

  // Item mapping start
  itemMappingList: any = [];
  selectedItemList = new FormControl('');
  addItem() {
    let value = this.createPrItemForm?.value;
    if (!value?.asset_id_mapping) {
      return this.toaster.error('Asset Category is required', "Can't Deleted!");
    }
    if (!this.selectedItemList?.value?.length) {
      return this.toaster.error('Item Name is required', "Can't Deleted!");
    }
    let assetCategoryObj = this.getCat_data?.find((elem: any) => elem?.id == value?.asset_id_mapping);
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
    this.createPrItemForm.patchValue({ asset_id_mapping: '' });
    this.selectedItemList = new FormControl('');
  }

  deleteItemMapping(index: any) {
    this.itemMappingList?.splice(index, 1)
  }
  // Item mapping end

  handleItemMapping() {
    let use_this_item = this.createPrItemForm?.value?.use_this_item;
    if (!use_this_item) {
      this.itemMappingList = [];
      this.selectedItemList = new FormControl('');
      this.createPrItemForm.patchValue({ asset_id_mapping: '' });
    }
  }

}
