import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const signIn: any = localStorage.getItem('signInUser');
    const singInUser = JSON.parse(signIn);
    if (singInUser) {
      // Fetch menu data only if user is signed in
      return new Observable<boolean | UrlTree>((observer) => {
        this._authService.getAllAccess_Modules(singInUser?.employee_id).subscribe(
          (res: any) => {
            let menuData = res?.data;
            // handle url start
            const urlParts = state?.url.split("/");
            const module_master_link = urlParts[2];
            const page_link = urlParts[urlParts?.length - 1];
            // handle url not access start
            if (!(state?.url.includes('dashboard') && state?.url.includes('send-rfp-link'))) {
              // let findModuelMasterLink = menuData?.find((elem: any) => elem?.module_master_link == module_master_link)
              // if (!findModuelMasterLink) {
              //   this.router.navigate(['']);
              // }
             
              let isModuleCheck = true;
              let isPageCheck = true;
              menuData?.map((item: any) => {
                if (item?.module_master_link == module_master_link) isModuleCheck = false;
                item?.menu_masters?.map((subItem: any) => {
                  if (!subItem?.submenu_masters?.length) {
                    if (subItem?.menu_master_link == page_link) isPageCheck = false;
                  }
                  else {
                    subItem?.submenu_masters?.map((subSubItem: any) => {
                      if (subSubItem?.submenu_masters_link == page_link) isPageCheck = false;
                    })
                  }
                })
              })
              if (isModuleCheck || isPageCheck) {
                this.router.navigate(['']);
              }
            }
            observer.next(true); // Signal that canActivate can proceed
            observer.complete(); // Complete the observable
          },
          (error) => {
            console.error('Error fetching menu data:', error);
            observer.next(false); // Signal canActivate to deny access
            observer.complete(); // Complete the observable
          }
        );
      });
    } else {
      // Navigate to login page if user is not signed in
      this.router.navigate(['']);
      return false;
    }
  }
}
