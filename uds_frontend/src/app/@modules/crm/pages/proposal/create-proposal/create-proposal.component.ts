import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { Location } from '@angular/common';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { AssignUserService } from 'src/app/@shared/services/crm/assign-user.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';


@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss']
})
export class CreateProposalComponent {
  constructor(
    private location: Location,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private $crm: CrmService,
    private $proposal: ProposalService,
    private $assignUser: AssignUserService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private prService: PurchaseRequestService,
  ) { }

  @ViewChild('requiredForm', { static: true }) requiredForm: NgForm;

  userLoginId: any;
  leadId: any;
  proposalId: any;
  version_id: any;
  dealClosedId: any;
  actionType: any;
  status: any;

  proposalForm: any = {};
  allocationTypeList: any = ["One time sold", "Rental"];
  frequencyList: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  locationList: any = ["Janakpuri", "Delhi"];
  outVisitList: any = [
    {
      bin_service: 'Bin Service',
      out_visit_cost: null,
      no_of_visitor: null,
      gst: null,
      total: null,
    }
  ]
  serviceList: any = [
    {
      service_name: 'Bin Service',
      frequencyList: this.frequencyList,
      frequency: null,
      qty: null,
      price: null,
      gst: null,
      total: null,
    }
  ]
  assetAddList: any = [];
  itemAddList: any = [];

  ngOnInit() {
    this.userLoginId = localStorage.getItem('EmpMainId');
    this.route.queryParams.subscribe((params: any) => {
      this.leadId = params?.id;
      this.proposalId = params?.proposalId;
      this.version_id = params?.version_id;
      this.dealClosedId = params?.dealClosedId;
      this.actionType = params?.actionType;
      this.resetForm();
      if (this.version_id) {
        this.proposalVersionListById()
      }
      else if (this.dealClosedId) {
        this.dealClosedViewById();
      }
      else {
        if (this.leadId) {
          this.getLeadData();
        }
        if (this.proposalId) {
          this.getProposalList();
        }
      }
      this.getEmployee();

      this.getAllAsset();
      this.getAllItem();
    })
  }

  // Get all asset start
  getCat_data: any = []
  getAllAsset() {
    this._configurationalMasterService.getActiveAssetMasterList().subscribe((res: any) => {
      this.getCat_data = res.data;
      this.serviceList?.map((item: any) => item.getCat_data = this.getCat_data)
    })
  }

  // Get all item start
  all_item_data: any = [];
  getAllItem() {
    this.prService.getAllProd().subscribe((res: any) => {
      this.all_item_data = res.data;
      this.serviceList?.map((item: any) => item.all_item_data = this.all_item_data)
    })
  }

  // Filter item start
  filteredData: any = [];
  getAssetCateVal(event: any) {
    let assetId = event?.value;
    if (assetId !== null && assetId !== undefined) {
      this.filteredData = this.all_item_data.filter((res: any) => res.asset_id === assetId);
      let selectedData = this.getCat_data?.find((elem: any) => elem?.id === assetId);
      if (selectedData) {
        this.proposalForm = {
          ...this.proposalForm,
          outVisitList: [
            {
              asset_category_id: selectedData.id,
              asset_category_name: selectedData.asset_category_name,
              item_id: this.proposalForm?.outVisitList[0]?.item_id,
              item_name: this.proposalForm?.outVisitList[0]?.item_name,
            }
          ]
        };
      }
      this.proposalForm.serviceList[0].item_id = null;
      this.proposalForm.outVisitList[0].item_name = null;
      this.proposalForm.outVisitList[0].item_name = null;
    }
  }

  // Handle Service Item start
  handleServiceItem(event: any) {
    let itemId = event?.value;
    if (itemId) {
      let selectedData = this.all_item_data?.find((elem: any) => elem?.id === itemId);
      if (selectedData) {
        this.proposalForm = {
          ...this.proposalForm,
          outVisitList: [
            {
              item_id: selectedData.id,
              item_name: selectedData.item_name,
              asset_category_id: this.proposalForm?.outVisitList[0]?.asset_category_id,
              asset_category_name: this.proposalForm?.outVisitList[0]?.asset_category_name,
            }
          ]
        };
      }
    }
  }

  // Get lead data start
  getLeadData() {
    try {
      this.$proposal.getProposalCompanyData(this.leadId).subscribe((response: any) => {
        if (response) {
          let obj = response.data;
          this.assetAddList = response?.asset;
          this.itemAddList = response?.item;
          if (obj?.assetList?.length) {
            obj?.assetList?.map((item: any) => {
              item.allocationTypeList = this.allocationTypeList;
              item.frequencyList = this.frequencyList;
              item.locationList = this.locationList;
            })
          }
          if (obj?.itemList?.length) {
            obj?.itemList?.map((item: any) => {
              item.locationList = this.locationList;
            })
          }
          this.proposalForm = {
            ...obj,
            proposal_no: this.proposalForm?.proposal_no,
          };
          this.handleServiceOutVisit()
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get proposal data start
  getProposalList() {
    try {
      this.$proposal.getProposalList(this.proposalId, 'proposal_no', this.userLoginId).subscribe((response: any) => {
        if (response) {
          let obj = response.data;
          this.status = obj?.proposal_status;
          this.assetAddList = response?.asset;
          this.itemAddList = response?.item;
          if (obj?.assetList?.length) {
            obj?.assetList?.map((item: any) => {
              item.allocationTypeList = this.allocationTypeList;
              item.frequencyList = this.frequencyList;
              item.locationList = this.locationList;
            })
          }
          if (obj?.itemList?.length) {
            obj?.itemList?.map((item: any) => {
              item.locationList = this.locationList;
            })
          }
          this.proposalForm = {
            ...obj,
            proposal_no: obj?.proposal_no,
          };
          this.handleServiceOutVisit()
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }


  // Get proposal data version wise start
  proposalVersionListById() {
    try {
      this.$proposal.proposalVersionListById(this.version_id, this.proposalId).subscribe((response: any) => {
        if (response) {
          let obj = response.data;
          this.status = obj?.proposal_status;
          this.assetAddList = response?.asset;
          this.itemAddList = response?.item;
          if (obj?.assetList?.length) {
            obj?.assetList?.map((item: any) => {
              item.allocationTypeList = this.allocationTypeList;
              item.frequencyList = this.frequencyList;
              item.locationList = this.locationList;
            })
          }
          if (obj?.itemList?.length) {
            obj?.itemList?.map((item: any) => {
              item.locationList = this.locationList;
            })
          }
          this.proposalForm = {
            ...obj,
            proposal_no: obj?.proposal_no,
          };
          this.handleServiceOutVisit()
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get proposal data deal closed wise start
  dealClosedViewById() {
    try {
      this.$proposal.getDealClosedById(this.dealClosedId).subscribe((response: any) => {
        if (response) {
          let obj = response.data;
          this.status = obj?.proposal_status;
          this.assetAddList = response?.asset;
          this.itemAddList = response?.item;
          if (obj?.assetList?.length) {
            obj?.assetList?.map((item: any) => {
              item.allocationTypeList = this.allocationTypeList;
              item.frequencyList = this.frequencyList;
              item.locationList = this.locationList;
            })
          }
          if (obj?.itemList?.length) {
            obj?.itemList?.map((item: any) => {
              item.locationList = this.locationList;
            })
          }
          this.proposalForm = {
            ...obj,
            proposal_no: obj?.proposal_no,
          };
          this.handleServiceOutVisit()
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleServiceOutVisit() {
    if (this.proposalForm?.serviceList?.length) {
      this.filteredData = this.all_item_data.filter((res: any) => res.asset_id === this.proposalForm?.serviceList[0]?.asset_category_id);
    }
    else {
      this.proposalForm.serviceList = this.serviceList;
    }
    if (!this.proposalForm?.outVisitList?.length) {
      this.proposalForm.outVisitList = this.outVisitList;
    }
  }

  // Submit proposal
  saveRecord() {
    try {
      this.$proposal.createProposal(this.proposalForm).subscribe((response: any) => {
        if (response) {
          this.toast.success(response.message);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Change status start
  changeStatus(data: any) {
    try {
      let req = {
        id: this.proposalId,
        proposal_status: data == "AP" ? "approved" : "rejected",
      }
      this.$proposal.updateProposalStatus(req).subscribe((response: any) => {
        if (response) {
          this.toast.success(response.message);
          this.goBack();
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  resetForm() {
    this.proposalForm = {
      assetList: [],
      itemList: [],
      proposal_no: this.generateRandomPropWithDate()
    }
  }

  deleteAssetRow(index: any) {
    this.proposalForm.assetList?.splice(index, 1);
    this.allocationTypeCalculation();
  }
  deleteItemRow(index: any) {
    this.proposalForm.itemList?.splice(index, 1)
  }

  // Asset calculation start
  assetCalculatoin(index: any, data: any) {
    if (data?.price) {
      let tempQty = Number(data?.qty);
      let tempPrice = Number(data?.price);
      data.total = tempQty * tempPrice;
      if (data?.gst) {
        let tempGst: any = (data?.gst?.length < 2 ? "1.0" : "1.") + Number(data?.gst);
        data.total = (data.total * tempGst)?.toFixed(2);
      }
      this.proposalForm.assetList[index] = data;
      this.allocationTypeCalculation();
    }
  }

  allocationTypeCalculation() {
    let tot_purchase = 0;
    let tot_gst: any = 0;
    let tot_total: any = 0;

    let tr_purchase = 0;
    let tr_gst: any = 0;
    let tr_total = 0;

    this.proposalForm.assetList?.map((item: any) => {
      let tempQty = Number(item?.qty);
      let tempPrice = Number(item?.price);
      let totalPrice = tempQty * tempPrice;
      if (item?.allocation_type == 'One time sold' && totalPrice) {
        tot_purchase = tot_purchase + totalPrice;
        tot_total = tot_purchase;
        if (item?.gst) {
          let tempGst: any = (item?.gst?.length < 2 ? "1.0" : "1.") + Number(item?.gst);
          tot_gst = tot_gst + ((totalPrice * tempGst) - totalPrice);
          tot_total = tot_purchase + tot_gst;
        }
      }
      if (item?.allocation_type == 'Rental' && item?.total) {
        tr_purchase = tr_purchase + totalPrice;
        tr_total = tr_purchase;
        if (item?.gst) {
          let tempGst: any = (item?.gst?.length < 2 ? "1.0" : "1.") + Number(item?.gst);
          tr_gst = tr_gst + ((totalPrice * tempGst) - totalPrice);
          tr_total = tr_purchase + tr_gst;
        }
      }
    })
    this.proposalForm.tot_purchase = tot_purchase;
    this.proposalForm.tot_gst = tot_gst;
    this.proposalForm.tot_total = tot_total;

    this.proposalForm.tr_purchase = tr_purchase;
    this.proposalForm.tr_gst = tr_gst;
    this.proposalForm.tr_total = tr_total;
  }

  // Item calculation start
  serviceCalculatoin(index: any, data: any) {
    if (data?.price) {
      let price = Number(data?.price);
      let qty = Number(data?.qty);
      data.total = (qty ? qty : 1) * price;
      if (data?.gst) {
        let tempGst: any = (data?.gst?.length < 2 ? "1.0" : "1.") + Number(data?.gst);
        data.total = (data.total * tempGst)?.toFixed(2);
      }
      this.proposalForm.serviceList[index] = data;
    }
  }

  // Item calculation start
  itemCalculatoin(index: any, data: any) {
    if (data?.price_per_unit) {
      let price_per_unit = Number(data?.price_per_unit);
      data.total = price_per_unit;
      if (data?.gst) {
        let tempGst: any = (data?.gst?.length < 2 ? "1.0" : "1.") + Number(data?.gst);
        data.total = (data.total * tempGst)?.toFixed(2);
      }
      this.proposalForm.itemList[index] = data;
    }
  }

  // Outside service cost calculation start
  outsideCalculation(index: any, data: any) {
    if (data?.out_visit_cost) {
      let tempos_cost = Number(data?.out_visit_cost);
      let tempno_of_visitor = data?.no_of_visitor ? Number(data?.no_of_visitor) : 1;
      this.proposalForm.outVisitList[index].total = tempos_cost * tempno_of_visitor;
      if (tempos_cost) {
        this.proposalForm.tos_charge = tempos_cost * (tempno_of_visitor ? tempno_of_visitor : 1);
        this.proposalForm.tos_total = tempos_cost * (tempno_of_visitor ? tempno_of_visitor : 1);
      }
      if (data?.gst) {
        let tempout_visit_cost_gst: any = (data?.gst?.length < 2 ? "1.0" : "1.") + Number(data?.gst);
        this.proposalForm.outVisitList[index].total = (this.proposalForm.outVisitList[index].total * tempout_visit_cost_gst)?.toFixed(2);
        this.proposalForm.tos_gst = this.proposalForm.outVisitList[index].total - this.proposalForm.tos_charge;
        this.proposalForm.tos_total = this.proposalForm.outVisitList[index].total;
      }
    }
  }

  // Proposal number auto create start
  generateRandomPropWithDate() {
    if (this.actionType == 'create') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      return 'PROP' + formattedDate + randomNumber;
    }
  }

  // Add a new assets row start
  addAssetRow() {
    if (!this.proposalForm?.itemList?.assetAddList) {
      return this.toast.error('Asset not available');
    }
    this.proposalForm?.assetList.push({
      assetName: "",
      allocation_type: "",
      allocationTypeList: ["One time sold", "Rental"],
      frequency: "",
      frequencyList: [1, 2, 3, 4, 5],
      qty: null,
      price: null,
      gst: null,
      total: 0,
      llocation: "",
      locationList: ["Janakpuri", "Delhi"],
      assetAddList: this.assetAddList,
    });
  }


  // Add a new items row start
  addItemRow() {
    if (!this.proposalForm?.itemList?.itemAddList) {
      return this.toast.error('Item not available');
    }
    this.proposalForm?.itemList.push({
      itemName: "",
      price_per_unit: null,
      gst: null,
      total: 0,
      location: "",
      locationList: ["Janakpuri", "Delhi"],
      itemAddList: this.itemAddList,
    });
  }

  // Get user start
  employeeList: any = [];
  getEmployee() {
    try {
      this.$assignUser.getSuperUserList().subscribe((response: any) => {
        if (response) {
          this.employeeList = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get user end

  // Select filter start
  filterControl = new FormControl();
  onPanelClose() {
    this.filterControl.setValue('');
  }

  // ***************************************************

  goBack() {
    this.location.back();
  }

  // to restrict user from entering strings
  keyPress(event: Event | any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
