import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';


@Component({
  selector: 'app-allocation-form-dialogue',
  templateUrl: './allocation-form-dialogue.component.html',
  styleUrls: ['./allocation-form-dialogue.component.scss']
})
export class AllocationFormDialogueComponent {
  allocation_form: FormGroup
  selectedMode: string;
  constructor(
    private dialog: MatDialogRef<AllocationFormDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private route: Router,
    private toaster: ToastrService
  ) {
    this.allocation_form = _fb.group({
      radio: new FormControl("own"),
      Location: new FormControl(this.selectedMode),
      vehicle_number: new FormControl(null,),
      head_crew: new FormControl(null,),
      supporting_crew: new FormControl(null,),
      date: new FormControl(null, ),
      remarks: new FormControl(null,),
    })
  }
  
  toggleMode(mode: string) {
    this.selectedMode = mode;
    console.log(this.data,"this is the data")
  }

  ngOnInit() {
    this.selectedMode = "own"
  }


}
