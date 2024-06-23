import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const databaseKey: any = environment.servralUrl;

const routes = {
  roles: {
    roleCreate: () => `${databaseKey}/api/v1/createRoleMaster`,
    roleGet: (role: any) => `${databaseKey}/api/v1/getAllRoleMaster/${role}`,
    roleGetById: (role_id: any) => `${databaseKey}/api/v1/getByIdRoleMaster/${role_id}`,
    roleUpdate: (role_id: any) => `${databaseKey}/api/v1/editRoleMaster/${role_id}`,
    roleDelete: (id: any) => `${databaseKey}/api/v1/deleteRoleMaster/${id}`,
    assignAction: (id: any) => `${databaseKey}/api/v1/assignaction/${id}`,
    getAssignAction: (id: any) => `${databaseKey}/api/v1/getassignactionfucntion/${id}`,
  },
  roleAssign: {
    menuGet: () => `${databaseKey}/api/v1/getAllMenuMaster`,
    subMenu: () => `${databaseKey}/api/v1/getAllSubmenuMaster`,
    allMenuGte: () => `${databaseKey}/api/v1/getAllMenuMasterChild`,
    roleAssignGet: () => `${databaseKey}/api/v1/getAllRoleMaster`,
    createRole: () => `${databaseKey}/api/v1/createroleMenuAccess`,
    // roleGetById:(role_id:any)=>`${databaseKey}/api/v1/getByIdroleMenuAccess/${role_id}`
    roleGetById: (role_id: any) => `${databaseKey}/api/v1/getByIdroleMenuAccess/${role_id}`,
    updateRole: (role_id: any) => `${databaseKey}/api/v1/editroleMenuAccess/${role_id}`,
    employeGetById: (role_id: any) => `${databaseKey}/api/v1/get_all_employeeBy_User_role/${role_id}`,
  }
}


@Injectable({
  providedIn: 'root'
})
export class RbacMasterService {

  constructor(private http: HttpClient) { }

  createRole(data: any): Observable<any> {
    return this.http.post(routes.roles.roleCreate(), data)
  }
  getRole(role: any): Observable<any> {
    return this.http.get(routes.roles.roleGet(role))
  }

  getByIdRole(role_id: any): Observable<any> {
    return this.http.get(routes.roles.roleGetById(role_id))
  }

  updateRole(role_id: any, data: any): Observable<any> {
    return this.http.put(routes.roles.roleUpdate(role_id), data)
  }

  getMenu(): Observable<any> {
    return this.http.get(routes.roleAssign.menuGet())
  }

  getSubmenu(): Observable<any> {
    return this.http.get(routes.roleAssign.menuGet())
  }

  getAllMenu(): Observable<any> {
    return this.http.get(routes.roleAssign.allMenuGte())
  }

  getRoleAssign(): Observable<any> {
    return this.http.get(routes.roleAssign.roleAssignGet())
  }

  createRoleAssign(data: any): Observable<any> {
    return this.http.get(routes.roleAssign.createRole(), data)
  }

  roleGetById(role_id: any): Observable<any> {
    return this.http.get(routes.roleAssign.roleGetById(role_id))
  }

  employeGetByroleId(role_id: any): Observable<any> {
    return this.http.get(routes.roleAssign.employeGetById(role_id))
  }

  updateRoleAssign(role_id: any, data: any): Observable<any> {
    return this.http.put(routes.roleAssign.updateRole(role_id), data)
  }

  deleteRoleAssign(id: any): Observable<any> {
    return this.http.delete(routes.roles.roleDelete(id))
  };

  moduleAssignAction(id: any, data: any): Observable<any> {
    return this.http.post<any>(routes.roles.assignAction(id), data)
  };

  getAssignAction(id: any, data: any): Observable<any> {
    return this.http.post<any>(routes.roles.getAssignAction(id), data)
  };

  accessAssignAction() {
    let a: any = localStorage?.getItem('local');
    if (a) {
      let b: any = window?.atob(a);
      return JSON?.parse(b);
    }

  }
}
