export class Employee{
    employeeId : number;
    employeeName : string;
    contactNo : string;
    emailId : string;
    deptId : number;
    password: string;
    gender: string;
    role: string;

    constructor(){
        this.contactNo = '';
        this.employeeId = 0;
        this.deptId = 0;
        this.employeeName = '';
        this.emailId = '';
        this.password = '';
        this.gender = '';
        this.role = 'Employee';
    }
}

export interface ParentDept{
    departmentId : number,
    departmentName : string,
    departmentLogo : string
}

export interface ChildDept{
    childDeptId : number,
    parentDeptId : number,
    departmentName : string,
}

export interface APIResponse {
    message : string,
    result : boolean,
    data : any
}

export interface LeaveType {
    leaveTypeId : number,
    typeName : string
}

export interface EarnedLeave {
    earnedLeaveId : number,
    employeeId : number,
    totalEarnedLeaves : number,
    totalSickEarnedLeave : number,
    lastUpdatedDate : string,
    employeeName : string
}

export interface LeaveRequest {
    leaveId : number,
    employeeId : number,
    leaveTypeId : number,
    startDate : string,
    endDate : string,
    status : string,
    reason : string,
    requestDate : string,
    employeeName : string,
    contactNo: string,
    typeName : string
}