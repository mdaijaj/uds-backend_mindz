import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent {
  clicked: boolean = false;
  suSupModule: any;
  constructor(private head: HeadService, private router: Router, private lead: LeadService, private _authservice: AuthService) {
  }

  leftMenuData: any = [
    { id: 1, module: 'Vendor', menuName: 'Vendor Management', menuLink: 'vendor-management', menuIcon: 'person'},
  ]
  ngOnInit(): void {
    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })

    // if (this.router.url) {
    //   this.lead.setModule(this.leftMenuData)
    // }


    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);

    let sub = this._authservice.getAllAccess_Modules(loginUser.role_id).subscribe(
      (res) => {
        // 
        this.suSupModule = this._authservice.getSubSuperModules().subscribe(
          (res: any) => {
            
            if (this.router?.url) {
              this.lead.setModule(res)
            }
            if (this.router.url === '/master/vendor') {
              if (res) {
                this.router.navigate([`master/vendor/${res[0]?.menuLink}`]);
              };
            };
    
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
              if (this.router.url === '/master/vendor') {
                if (res) {
                  this.router.navigate([`master/vendor/${res[0]?.menuLink}`]);
                };
              };
            });
          }
        )
        sub?.unsubscribe();
      }
    )

  }

  ngOnDestroy(): void {
    this.suSupModule?.unsubscribe();
  }
}
