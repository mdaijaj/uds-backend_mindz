import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { EmailSendeComponent } from 'src/app/@shared/components/email-sende/email-sende.component';

@Component({
  selector: 'app-event-action',
  templateUrl: './event-action.component.html',
  styleUrls: ['./event-action.component.scss']
})
export class EventActionComponent {
  cellValue: any;
  constructor(private route: Router,public dialog: MatDialog,) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.event_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/event-management/create-event-management'],
      { queryParams: { id: this.cellValue}})
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


}
