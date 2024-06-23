import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from '../../../../@shared/services/recruitment.service';
import { Location } from '@angular/common';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { DynamicFormService } from 'src/app/@shared/services/crm/dynamic-form.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ViewLeadDescriptionDialogComponent } from '../dialogs/view-lead-description-dialog/view-lead-description-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/app/environments/environment';
import { CloseDealDialogComponent } from '../dialogs/close-deal-dialog/close-deal-dialog.component';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss'],
})
export class CreateLeadComponent {
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  dates = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.dates }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.dates }).format('YYYY-MM-DD');

  @ViewChild('editer') editer: any;
  fileUrl = environment?.fileUrl;

  createLeadForm: FormGroup;
  locatin: any;
  productList: any = [];
  maxInputLength: number = 100;
  imageUrl: any;
  leadId: any;
  loginUser: any;
  singleData: any;
  descriptionReq: boolean = false;
  handleViewImg: boolean = true;
  selectedClientNeed = new FormControl('');

  // Dynamic form start
  dynamicForm: FormGroup;
  formConfig: any = {
    fields: [],
  };
  // Dynamic form end

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private location: Location,
    private $crm: CrmService,
    private $proposal: ProposalService,
    private dynamicFormService: DynamicFormService,
    private $common: CommonService,
  ) {
    this.createLeadForm = this.fb.group({
      product_service_id: new FormControl(null, Validators.required),
      lead_owner: new FormControl(null, Validators.required),
      company_name: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null, Validators.required),
      contact_person_name: new FormControl(null, Validators.required),
      contact_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      upload_image: new FormControl('', Validators.required),
      lead_form_id: new FormControl(null, Validators.required),
      field_name_two: new FormControl(null, Validators.required),
      status_id: new FormControl(null, Validators.required),
      follow_up_date: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }

  ngOnInit() {
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    this.activeroute.queryParams.subscribe((params: any) => {
      this.leadId = params?.id;
    });

    this.getProductName();
    this.getEmployee();
    this.getFormDetails();
  }

  // Dynamic form start
  createDynamicForm() {
    this.dynamicForm = this.dynamicFormService.generateForm(this.formConfig);
    this.dynamicForm.patchValue({
      lead_owner: this.loginUser?.first_name,
      lead_created_date: new Date(),
    });
  }
  // Dynamic form end


  goBack() {
    this.location.back();
  }

  // Get product name start
  getProductName() {
    try {
      this.$crm.allActiveProductService().subscribe((response: any) => {
        if (response) {
          this.productList = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get product name end

  // Get employee start
  employeeList: any = [];
  getEmployee() {
    try {
      this.$crm.registrationall().subscribe((response: any) => {
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
  // Get employee end

  // Get single lead start
  getLeadData() {
    try {
      this.$crm.getLeadData({ id: this.leadId, query: 'id' }, this.loginUser?.employee_id).subscribe((response: any) => {
        if (response) {
          this.singleData = response?.data;
          console.log(this.productList)
          // client need data set start
          let leadServiceList: any = [];
          this.singleData?.leadServiceList?.map((item: any) => {
            leadServiceList?.push(Number(item?.product_service_id));
          })
          this.selectedClientNeed?.setValue(leadServiceList);
          // client need data set end

          // handle multi select start
          let tempList = Object.keys(this.singleData?.dynamic_fields);
          this.formConfig?.fields?.map((item: any) => {
            if (item?.type == "multiSelect") {
              tempList?.map((subItem: any) => {
                if (item?.name == subItem) {
                  item.selectedMultipalList.setValue(this.singleData?.dynamic_fields?.[subItem]);
                }
              })
            }
          })
          // handle multi select end

          if (this.singleData?.upload_image) {
            this.imageUrl = this.singleData?.upload_image;
          }
          this.dynamicForm.patchValue({
            ...this.singleData?.dynamic_fields,
          });
          this.dynamicForm.patchValue({
            address: this.singleData?.address,
            product_service_id: this.singleData?.product_service_id,
            user_id: this.singleData?.user_id,
            lead_owner: this.singleData?.lead_owner,
            company_name: this.singleData?.company_name,
            lead_created_date: this.singleData?.lead_created_date,
            contact_person_name: this.singleData?.contact_person_name,
            contact_number: this.singleData?.contact_number,
            mail_id: this.singleData?.mail_id,
            upload_image: this.singleData?.upload_image,
            follow_up_date: this.singleData?.follow_up_date,
            description: this.singleData?.description,
          });
          console.log(this.dynamicForm);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get single lead end

  // Create lead start
  onSubmitForm() {
    if (this.closedProposal) {
      this.createDealClosed();
    }
    else {
      this.descriptionReq = true;
      if (this.dynamicForm.invalid) {
        return this.toast.error("Required fields should not be empty", "Fields Error")
      }
      if (this.dynamicForm?.value?.description == null) {
        return this.toast.error("Required fields should not be empty", "Fields Error")
      }
      if (!this.selectedClientNeed?.value?.length) {
        return this.toast.error("Client need field is required", "Fields Error")
      }
      if (this.leadId) {
        this.updateLeadData();
      }
      else {
        this.createLead();
      }
    }

  }

  createLead() {
    let data = this.dynamicForm.value;
    data.upload_image = this.imageUrl;
    data.lead_created_date = moment(data?.lead_created_date).format('YYYY-MM-DD');
    data.follow_up_date = moment(data?.follow_up_date).format('YYYY-MM-DD');
    data.login_id = this.loginUser?.employee_id;

    // Client need req start
    let leadServiceList: any = this.selectedClientNeed?.value;
    let tempClientNeedList: any = [];
    leadServiceList?.map((item: any) => {
      tempClientNeedList?.push({ product_service_id: item })
    })
    data.leadServiceList = tempClientNeedList;
    // Client need req end

    this.$crm.createLead(data).subscribe((res: any) => {
      if (res) {
        this.toast.success(res.message);
        this.router.navigate([`master/crm/lead-summary`]);
      }
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else if (err.status == 403) {
          this.toast.error('Achievements Already Exits!');
        }
        else {
          this.toast.error('Something went Wrong');
        }
      }
    );
  }

  // Update lead start
  updateLeadData() {
    let data = {
      follow_up_date: moment(this.dynamicForm.value?.follow_up_date).format('YYYY-MM-DD'),
      description: this.dynamicForm.value?.description,
      user_id: this.dynamicForm?.value?.user_id,
      login_id: this.loginUser?.employee_id
    };
    this.$crm.updateLeadData(this.leadId, data).subscribe((res: any) => {
      if (res) {
        this.toast.success(res.message);
        this.router.navigate([`master/crm/lead-summary`]);
      }
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else if (err.status == 403) {
          this.toast.error('Achievements Already Exits!');
        }
        else {
          this.toast.error('Something went Wrong');
        }
      }
    );
  }

  // Close lead start
  createDealClosed() {
    let data = {
      proposal_id: this.closedProposal?.proposal_id,
      version_id: this.closedProposal?.version_id,
      lead_id: this.leadId,
      contract_no: this.generateRandomPropWithDate()
    };
    this.$proposal.createDealClosed(data).subscribe((res: any) => {
      if (res) {
        this.toast.success(res.message);
        this.router.navigate([`master/crm/closed-deals`]);
      }
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else if (err.status == 403) {
          this.toast.error('Achievements Already Exits!');
        }
        else {
          this.toast.error('Something went Wrong');
        }
      }
    );
  }

  // Contract number auto create start
  generateRandomPropWithDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return 'CONT' + formattedDate + randomNumber;
  }

  // Upload doc start
  uploadDoc(evemt: any) {
    let isValidExtension = this.$common.checkForValidFile(evemt);
    if (!isValidExtension) return

    let data = "";
    if (evemt.target.files && evemt.target.files[0]) {
      data = evemt.target.files[0];
    }

    var formData: any = new FormData();
    formData.append('file', data);
    this.$crm.uploadDoc(formData).subscribe(
      (res: any) => {
        this.imageUrl = res?.backendUrl;
        this.handleViewImg = false;
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else if (err.status == 403) {
          this.toast.error('Achievements Already Exits!');
        }
        else {
          this.toast.error('Something went Wrong');
        }
      }
    );
  }
  // Upload doc end

  cancelBtn() {
    this.createLeadForm.reset();
    history.back();
  }

  // to restrict user from entering strings
  keyPress(event: Event | any, fieldName: any) {
    if (fieldName == 'contact_number') {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
      this.maxInputLength = 10;
    }
    else {
      this.maxInputLength = 100;
    }
  }

  // Get form detail start
  getDynamicForm: any = [];
  getFormDetails() {
    try {
      this.formConfig.fields = [];
      this.$crm.getFormDetails().subscribe((response: any) => {
        if (response) {
          this.getDynamicForm = response.data;
          let list = response.data;
          list?.map((item: any) => {
            item.name = item?.field_name?.toLowerCase().replace(/\s+/g, '');
            item.label = item?.field_name;
            item.value = null;
            if (this.leadId && item?.field_name != 'Status') item.isDisabled = true;
            else item.isDisabled = false;
            if (item?.type == 'dropdown') {
              item.type = 'select';
              item?.options?.map((optionItem: any) => {
                optionItem.label = optionItem?.field_value;
                optionItem.value = optionItem?.field_value;
              })
            }
            if (item?.type == 'multi select') {
              item.type = 'multiSelect';
              item.selectedMultipalList = new FormControl('');
              item?.options?.map((optionItem: any) => {
                optionItem.label = optionItem?.field_value;
                optionItem.value = optionItem?.field_value;
              })
            }
            if ((item?.mandatory == 'ACTIVE' && !this.leadId)) item.required = true;
            else item.required = false;
          })

          // Static form configration start
          this.productList?.map((item: any) => {
            item.value = item?.id;
            item.label = item?.product_name;
          })
          this.employeeList?.map((item: any) => {
            item.value = item?.employee_id;
            item.label = item?.first_name + ' ' + item?.middle_name + ' ' + item?.last_name;
          })

          let staticList = [
            { name: 'product_service_id', label: 'Client Need', type: 'select', value: null, required: this.leadId ? false : false, isDisabled: this.leadId ? true : false, options: this.productList },
            { name: 'user_id', label: 'Lead Owner', type: 'select', value: null, required: true, isDisabled: this.leadId ? true : false, options: this.employeeList },
            { name: 'company_name', label: 'Client  Name', type: 'text', value: '', required: this.leadId ? false : true, isDisabled: this.leadId ? true : false },
            { name: 'lead_created_date', label: 'Lead Create Date', type: 'date', value: null, required: this.leadId ? false : false, isDisabled: true },
            { name: 'contact_person_name', label: 'Contact Person Name', type: 'text', value: '', required: this.leadId ? false : true, isDisabled: this.leadId ? true : false },
            { name: 'contact_number', label: 'Contact NO', type: 'text', value: '', required: this.leadId ? false : true, isDisabled: this.leadId ? true : false },
            { name: 'mail_id', label: 'Mail ID', type: 'text', value: '', required: this.leadId ? false : true, isDisabled: this.leadId ? true : false },
            { name: 'upload_image', label: 'Document', type: 'file', value: '', required: false, isDisabled: false },
            { name: 'follow_up_date', label: 'Follow-up Date', type: 'date', value: null, required: true, isDisabled: false },
            { name: 'description', label: 'Description', type: 'ckEditor', value: '', required: true, isDisabled: false },
            { name: 'address', label: 'Address', type: 'text', value: '', required: this.leadId ? false : true, isDisabled: this.leadId ? true : false },
          ];
          // Static form configration end
          this.formConfig.fields = staticList.concat(list);
          this.createDynamicForm();
          if (this.leadId) {
            this.getLeadData();
          }
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get form detail end

  viewDescription() {
    const dialogRef = this.dialog.open(ViewLeadDescriptionDialogComponent, {
      width: '90%',
      data: { id: this.singleData },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  viewImg() {
    window.open(environment.fileUrl + this.imageUrl, '_blank');
  }

  // Close proposal dialog start
  closedProposal: any;
  dynamicFormChange(fieldName: any) {
    if (fieldName == 'status' && this.dynamicForm?.value?.status == 'Deal Closed') {
      const dialogRef = this.dialog.open(CloseDealDialogComponent, {
        width: '1200px',
        data: { value: '' },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.closedProposal = result;
      });
    }
  }
  // Close proposal dialog end

  // View proposal start
  viewProposal(data: any) {
    const url = this.router.createUrlTree(["master/crm/create-proposal"], {
      queryParams: {
        version_id: data?.version_id,
        proposalId: data?.proposal_id,
        actionType: 'view'
      }
    });
    window.open(url.toString(), '_blank');
  }

  handleMultiSelect(data: any) {
    let key = data?.name;
    this.dynamicForm.patchValue({ [key]: data?.selectedMultipalList?.value })
    console.log(this.dynamicForm);
  }

}
