import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailSendeComponent } from 'src/app/@shared/components/email-sende/email-sende.component';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-forex-admin-action',
  templateUrl: './forex-admin-action.component.html',
  styleUrls: ['./forex-admin-action.component.scss']
})
export class ForexAdminActionComponent {
  id: any;

  constructor(private route: Router, private recruitservice : RecruitService ,
    public dialog: MatDialog, private toast: ToastrService, private recruitService: RecruitService) {
  }

  ngOnInit(): void {
    
    
  }
  public cellValue: any;


  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }

  getValueToDisplay(params: ICellRendererParams) {
    
    return params.data.forex_currency_id;
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  
  edit(e:any) {
    e.stopPropagation();
    // 
    this.route.navigate(['/master/admin-support/forex-currency/update-forex_currency'], { queryParams: { id: this.cellValue } })
  }

  emailSend(e:any){
    e.stopPropagation();

    const dialogRef = this.dialog.open(EmailSendeComponent, {
      width: '50%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      height: '90%',
      // position: {bottom: '10px', right:'10px'} ,
      panelClass: 'full-screen-modal',
      data: { ad_data:this.cellValue },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

  currencyRate(e:any){
    e.stopPropagation();
    // 
    this.route.navigate(['/master/admin-support/forex-currency/forex_currency-rate'], { queryParams: { id: this.cellValue } })
  }

  updateReturn(e:any){
      e.stopPropagation();
      // 
      this.route.navigate(['/master/admin-support/forex-currency/return-forex_currency'], { queryParams: { id: this.cellValue } })
  }
  
}
