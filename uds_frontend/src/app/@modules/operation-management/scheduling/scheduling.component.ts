import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {
  formObj: any = {};
  rowClass: any;
  assetCategories: any;
  items: any;
  selectedAssetCategory: any;
  selectedItem: any;
  selectedFromDate: Date | null = null;
  selectedToDate: Date | null = null;
  private gridApi!: GridApi<any>;
  inStatus = null;
  searchInput: any;
  body: any;
  modes: string[] = ['FirstIn', 'LastIn'];
  rowData: any;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    private _configurationalMasterService: ConfigurationalmasterService,
  ) {
    this.rowClass = 'rowClass'
  }


  ngOnInit(): void {
  }

}
