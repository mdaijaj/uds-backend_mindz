import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AssignUserService } from 'src/app/@shared/services/crm/assign-user.service';
import { ContractLocationService } from 'src/app/@shared/services/crm/contract-location.service';
import * as moment from 'moment';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { AssetManagementService } from 'src/app/@shared/services/asset-management/asset-management.service';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrls: ['./add-po.component.scss'],
})
export class AddPoComponent implements OnInit {
  @ViewChild('frequency', { static: false }) frequency: ElementRef;
  @ViewChild('qty', { static: false }) qty: ElementRef;
  private gridApi!: GridApi<any>;
  action_type: any;
  isDisabled: boolean = false;
  loading: boolean = false;
  userLoginId: any;

  addPoForm: FormGroup;
  singleData: any;
  rowClass: any;
  contractId: any;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private _rbackService: RbacMasterService,
    private $crm: CrmService,
    private $assetManagement: AssetManagementService,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    private contractLocation: ContractLocationService,
    private $proposal: ProposalService,
    private $common: CommonService,
  ) {
    this.rowClass = 'rowClass';
    this.addPoForm = this.fb.group({
      deal_close_id: new FormControl(null, [Validators.required]),
      contact_number: new FormControl(null, [Validators.required]),
      company_name: new FormControl(null, [Validators.required]),
      contact_person_name: new FormControl(null, [Validators.required]),
      branch_name: new FormControl(null, [Validators.required]),
      from_date: new FormControl(null, [Validators.required]),
      to_date: new FormControl(null, [Validators.required]),
      location_id: new FormControl(null, [Validators.required]),
      po_start_date: new FormControl(null, [Validators.required]),
      po_end_date: new FormControl(null, [Validators.required]),
      po_number: new FormControl(null, [Validators.required]),
      branch_id: new FormControl(null, [Validators.required]),
      document: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    this.activeroute.queryParams.subscribe((params: any) => {
      this.contractId = params?.id;
      if (this.contractId) {
        this.getSingle();
        this.getContractLocation();
        this.branchSetup_get();
      }
    });
  };

  // Get single start
  getSingle() {
    try {
      this.$proposal.getDealClosedById(this.contractId).subscribe((response: any) => {
        if (response) {
          this.singleData = response.data;
          this.singleData?.serviceList?.map((item: any) => {
            item.frequency = null;
            item.qty = null;
          })
          this.addPoForm.value.deal_close_id = response.data.deal_close_id
          this.addPoForm?.patchValue(this.singleData);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get single start
  locationList: any = [];
  getContractLocation() {
    try {
      this.contractLocation.getContractLocation().subscribe((response: any) => {
        if (response) {
          this.locationList = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get branch start
  branchList: any = [];
  branchSetup_get() {
    try {
      this.$crm.branchSetup_get().subscribe((response: any) => {
        if (response) {
          this.branchList = response.data?.filter((elem: any) => elem?.billing_status == 1);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Table action start
  serviceAllotAllot(data: any, index: any) {
    this.singleData.serviceList[index].isAllot = !data?.isAllot
  }
  assetAllotAllot(data: any, index: any) {
    this.singleData.assetList[index].isAllot = !data?.isAllot
  }
  itemAllot(data: any, index: any) {
    this.singleData.itemList[index].isAllot = !data?.isAllot
  }
  outCostAllot(data: any, index: any) {
    this.singleData.outVisitList[index].isAllot = !data?.isAllot
  }


  // Upload doc start
  imageUrl: any;
  handleViewImg: boolean = true;
  uploadDoc(evemt: any) {
    let isValidExtension = this.$common.checkForValidFile(evemt);
    if (!isValidExtension) return

    let data = "";
    if (evemt.target.files && evemt.target.files[0]) {
      data = evemt.target.files[0];
    }
    var formData: any = new FormData();
    formData.append('file', data);
    formData.append('type', '1');
    this.$crm.uploadDoc(formData).subscribe(
      (res: any) => {
        this.imageUrl = res?.backendUrl;
        this.handleViewImg = false;
      },
      (err) => {
        console.log(err)
        this.toast.error('Something went Wrong');
      }
    );
  }
  // Upload doc end

  // Form submit start
  saveForm() {
    try {
      // return console.log(this.addPoForm?.value)
      if (this.addPoForm?.status == 'INVALID') {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
      let req = { ...this.addPoForm?.value };
      if (this.singleData.serviceList?.length) {
        let tempList: any = [];
        this.singleData?.serviceList?.map((item: any) => {
          if (item?.isAllot) {
            tempList?.push({
              id: item?.id,
              frequency: this.frequency.nativeElement.value,
              qty: this.qty.nativeElement.value,
            })
          }
        })
        req.serviceList = tempList;
      }
      if (this.singleData.assetList?.length) {
        let tempList: any = [];
        this.singleData?.assetList?.map((item: any) => {
          if (item?.isAllot) tempList?.push({ id: item?.id })
        })
        req.assetList = tempList;
      }
      if (this.singleData.itemList?.length) {
        let tempList: any = [];
        this.singleData?.itemList?.map((item: any) => {
          if (item?.isAllot) tempList?.push({ id: item?.id })
        })
        req.itemList = tempList;
      }
      if (this.singleData.outVisitList?.length) {
        let tempList: any = [];
        this.singleData?.outVisitList?.map((item: any) => {
          if (item?.isAllot) tempList?.push({ id: item?.id })
        })
        req.outVisitList = tempList;
      }
      console.log(req, "payload request");
      req.upload_file = this.imageUrl;
      this.$assetManagement.createAddPo(req).subscribe((response: any) => {
        if (response) {
          this.toast.success('Assign User Created successfully..');
          this.goBack();
        }
      }, err => {
        this.toast.error(err?.error?.message);
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Form save and update end

  goBack() {
    this.location.back()
  }

  // from date and to date validation start
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  FromDate: string;
  toDate: string;
  noOfDay: any;
  todate: any;
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
    this.addPoForm.patchValue({ po_end_date: '' });
    // this.getLeadSummaryData();
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
    // this.getLeadSummaryData();
  }

  calculateDiff() {
    this.todate = this.addPoForm.value.po_end_date;
    if (this.addPoForm.value.po_start_date && this.addPoForm.value.po_end_date) {
      let currentDate = new Date(this.addPoForm.value.po_start_date);
      let dateSent = new Date(this.addPoForm.value.po_end_date);
      this.noOfDay = (Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / 86400000;

      this.addPoForm.controls['leaveCountDays'].patchValue(this.noOfDay + 1)
    }
  }
  // from date and to date validation end

  // to restrict user from entering strings
  keyPress(event: Event | any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}