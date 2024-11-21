import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, Employee, LeaveRequest, LeaveType } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-leave',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {
  

  leaveForm : FormGroup = new FormGroup({});
  masterSrv = inject(MasterService);
  leaveTypeList = signal<LeaveType[]>([]); 
  employee$: Observable<Employee[]> = new Observable<Employee[]>();
  requestList : LeaveRequest [] = [];

  constructor(){
    this.initializeForm();
    this.employee$ = this.masterSrv.getAllEmployees();
  }

  initializeForm(){
    this.leaveForm = new FormGroup({
      leaveId : new FormControl(0),
      employeeId : new FormControl(this.masterSrv.loggedUserData.employeeId),
      leaveTypeId : new FormControl(0),
      startDate : new FormControl(""),
      endDate : new FormControl(""),
      status : new FormControl("New"),
      reason : new FormControl(""),
      requestDate : new FormControl(new Date()),
    })

    if(this.masterSrv.loggedUserData.role == 'Employee'){
      this.leaveForm.controls['employeeId'].disable();
    }
  }

  ngOnInit(): void {
    this.getLeaveType();
    this.getGridData();
  }

  getGridData(){
    if(this.masterSrv.loggedUserData.role == 'Employee'){
      this.getData();
    }else{
      this.getAllData();
    }
  }

  getData(){
    this.masterSrv.getAllLeaveRequestByEmpId(this.masterSrv.loggedUserData.employeeId).subscribe((res:APIResponse) => {
      this.requestList = res.data;
    });
  }

  getAllData(){
    this.masterSrv.getAllLeaveRequest().subscribe((res:APIResponse) => {
      this.requestList = res.data;
    });
  }

  getLeaveType(){
    this.masterSrv.getLeaveType().subscribe((res:APIResponse) => {
      this.leaveTypeList.set(res.data);
    })
  }

  onSave(){
    const formValue = this.leaveForm.getRawValue();
    this.masterSrv.newRequest(formValue).subscribe((res:APIResponse) => {
      if(res.result){
        alert("Request Raised");
        this.getGridData();
      }
      else{
        alert(res.message);
      }
    })
  }

  changeStatus(id:number){
    this.masterSrv.changeLeaveRequest(id, 'Approved').subscribe((res:APIResponse) => {
      this.leaveTypeList.set(res.data);
      this.getGridData();
    })
  }
}
