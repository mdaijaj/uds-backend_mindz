import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeadService } from 'src/app/@shared/services/head.service';
import { NavigationEnd, Router } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  styleUrls: ['./hrms.component.scss']
})
export class HrmsComponent implements OnInit, OnDestroy {
  clicked: boolean = false;
  suSupModule: any;

  constructor(private head: HeadService, private router: Router, private lead: LeadService, private _authservice: AuthService) {

  }
  leftMenuData:any = [
    {id:1, module:'HR Management' ,menuName:'Employee Master',menuLink:'employee-master',menuIcon:'person'},
    {id:2, module:'HR Management' ,menuName:'Recruitment Module',menuLink:'recuitment-module',menuIcon:'create_new_folder'},
    {id:3, module:'HR Management' ,menuName:'DMS',menuLink:'DMS',menuIcon:'next_week'},
    {id:4, module:'HR Management' ,menuName:'RBAC',menuLink:'rbacmaster',menuIcon:'meeting_room'},
    {id:5, module:'HR Management' ,menuName:'Report',menuLink:null,menuIcon:'report'},
    {id:6, module:'HR Management' ,menuName:'Asset',menuLink:null,menuIcon:'add_photo_alternate'},
    {id:7, module:'HR Management' ,menuName:'Email Creation Request',menuLink:"email-request",menuIcon:'alternate_email'},
    {id:8, module:'HR Management' ,menuName:'Leave Master',menuLink:'leave-master',menuIcon:'person'},
    {id:9, module:'HR Management' ,menuName:'Payroll',menuLink:'payroll',menuIcon:'payment'},
    // {id:10, module:'HR Management' ,menuName:'Performance Managment',menuLink:'performance-management',menuIcon:'timeline'},
  ]

  ngOnInit(): void {
    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })

    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })
    // if(this.router.url){
    //   this.lead.setModule(this.leftMenuData)
    // }

    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);

    let sub = this._authservice.getAllAccess_Modules(loginUser.role_id).subscribe(
      (res) => {
        // 
        console.log(res,'res hrms');
        
        this.suSupModule = this._authservice.getSubSuperModules().subscribe(
          (res: any) => {
            
            if (this.router?.url) {
              this.lead.setModule(res);
            };

            if (this.router.url === '/master/hrms') {
              if (res) {
                this.router.navigate([`master/hrms/${res[0]?.menuLink}`]);
              };
            };
    
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
              if (this.router.url === '/master/hrms') {
                if (res) {
                  this.router.navigate([`master/hrms/${res[0]?.menuLink}`]);
                };
              };
            });
      
          })
        sub.unsubscribe();
      });

  }

  ngOnDestroy(): void {
    this.suSupModule?.unsubscribe();
  };

}
