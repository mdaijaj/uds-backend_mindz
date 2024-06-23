import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererParams, } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AllocationFormDialogueComponent } from '../allocation-form-dialogue/allocation-form-dialogue.component';

@Component({
  selector: 'app-client-basis-details-action',
  templateUrl: './client-basis-details-action.component.html',
  styleUrls: ['./client-basis-details-action.component.scss']
})
export class ClientBasisDetailsActionComponent {
    parms: any;
    constructor(
      public dialog: MatDialog,
      private router: Router,
      private toaster: ToastrService,
    ) {}

    ngOnInit(): void { }

    agInit(params: ICellRendererParams): void {
      this.parms = params.data
    }


    openDialog() {
      const dialogRef = this.dialog.open(AllocationFormDialogueComponent, {
        data: { visible: 'visible', data:this.parms},
  
        width: '90%',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
  
      });
  
    }

}
