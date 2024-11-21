import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, EarnedLeave, Employee, LeaveRequest } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  loggedUserData : any;
  apiUrl : string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  constructor(private http : HttpClient) { 
    const localData = localStorage.getItem("leaveUser");
    if(localData){
      this.loggedUserData = JSON.parse(localData);
    }
  }

  getDepartment() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetParentDepartment");
  }

  getChildDepartmentByParentId(id : string) : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetChildDepartmentByParentId?deptId="+id);
  }

  createNewEmployee(obj : Employee) : Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee`, obj);
  }

  getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }

  getAllChildDepartment() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllChildDepartment");
  }

  deleteEmp(id: number) : Observable<Employee>{
    return this.http.delete<Employee>(this.apiUrl + "DeleteEmployee/"+id);
  }

  updateEmp(emp : Employee) : Observable<Employee>{
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee/"+emp.employeeId, emp);
  }

  addEarnedLeave(emp : EarnedLeave) : Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + "AddNewEarnedLeave", emp);
  }

  getAllEarnedLeaves() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllEarnedLeaves");
  }

  getLeaveType() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetLeaveTypes");
  }

  newRequest(emp : LeaveRequest) : Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + "CreateNewLeaveRequest", emp);
  }

  getAllLeaveRequestByEmpId(id:number) : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllLeaveRequestByEmpId?id="+id);
  }

  getAllLeaveRequest() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllLeaveRequest");
  }

  changeLeaveRequest(leaveId:number, status:string) : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "ChangeLeaveStatus?leaveId="+leaveId+"&status="+status);
  }
  
}
