import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AddProductActionComponent } from './add-product-action/add-product-action.component';

@Component({
  selector: 'app-add-product-asset',
  templateUrl: './add-product-asset.component.html',
  styleUrls: ['./add-product-asset.component.scss']
})
export class AddProductAssetComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  docForm:FormGroup;
  file: File;id: number;
  vendor_id: any;
  editDocData: any;
  imageToUpload: any;
  imagePath: any;
  vendorName: any;

  constructor(
   private route: Router,
   private fb:FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   ) {
   this.rowClass = 'rowClass';

   this.docForm = this.fb.group({
     vendor_management_id: new FormControl(null),
     document_type: new FormControl(null, [Validators.required]),
     upload_document: new FormControl(null, [Validators.required]),
     expiry_date: new FormControl(null, [Validators.required]),
     remarks: new FormControl(null, [Validators.required]),
   })
  
 }

 ngOnInit(): void {
   this.activeroute.queryParams.subscribe((params: any) => {
     this.id = params;
     this.vendor_id = params.vandor_id || params.id;
     
   });
 }

  public rowData=[
    {
      id:1,
      asset_id:'DQS11',
      asset_description: 'Added asset product',
      serial_no: '35',
      purchased_cost:4500.00
    },
    {
      id:2,
      asset_id:'DQS12',
      asset_description: 'Added asset product',
      serial_no: '36',
      purchased_cost:4500.00
    },
    {
      id:3,
      asset_id:'DQS13',
      asset_description: 'Added asset product',
      serial_no: '37',
      purchased_cost:4500.00
    },
    {
      id:4,
      asset_id:'DQS14',
      asset_description: 'Added asset product',
      serial_no: '38',
      purchased_cost:4500.00
    },
    {
      id:5,
      asset_id:'DQS17',
      asset_description: 'Added asset product',
      serial_no: '39',
      purchased_cost:4500.00
    },
    {
      id:6,
      asset_id:'DQS19',
      asset_description: 'Added asset product',
      serial_no: '40',
      purchased_cost:4500.00
    },
  ];

  public columnDefs = [
    {
      headerName: 'Sl. No.',
      field: 'id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Asset ID',
      field: 'asset_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Asset Description',
      field: 'asset_description',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      //cellRenderer: UploadDocument,
      flex:1,
      minWidth:150,
      
    },
    {
      headerName: 'Serial Number',
      field: 'serial_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      //valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Purchased Cost',
      field: 'purchased_cost',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Action',
      field: 'remarks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: AddProductActionComponent,
      
    },
    
  ];
  bankData: any;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  }


  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  addDoc(path:any){
     this.route.navigate([path]);
  }

  onCancel(path:any){
    this.route.navigate([path])
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

 updateDocument(){
  var formData: any = new FormData();
  formData.append('document_type', this.docForm.value.document_type);
  formData.append('expiry_date', this.docForm.value.expiry_date);
  formData.append('remarks', this.docForm.value.remarks);
  formData.append('upload_document',  this.imageToUpload);
}

reloadCurrentRoute() {
  let currentUrl = this.route.url;
  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate([currentUrl]);
  });
}

addDocs(){
  if (this.docForm.invalid) {
    this.toast.error('Required fields should not be empty', 'Fields Error');
    
    return;
  }
  var formData: any = new FormData();
  formData.append('vendor_management_id', this.docForm.value.vendor_management_id);
  formData.append('document_type', this.docForm.value.document_type);
  formData.append('upload_document',  this.imageToUpload);
  formData.append('expiry_date', this.docForm.value.expiry_date);
  formData.append('remarks', this.docForm.value.remarks);
}

cellClicked(e:any){

}

}
