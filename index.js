// Your code here
 function createEmployeeRecord([firstName, familyName, title, payPerHour ]){
  return{
     firstName: firstName,
     familyName: familyName,
     title: title,
     payPerHour: payPerHour,
     timeInEvents: [],
     timeOutEvents: []
  };
 }
 function createEmployeeRecords(employeerecord){
    return employeerecord.map(createEmployeeRecord);

 }
 
 function createTimeInEvent(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    empRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return empRecord;
  }
  function createTimeOutEvent(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    empRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return empRecord;
  }
  function hoursWorkedOnDate(empRecord, date) {
    let timeIn = empRecord.timeInEvents.find(e => e.date === date);
    let timeOut = empRecord.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(empRecord, date) {
    let hours = hoursWorkedOnDate(empRecord, date);
    return hours * empRecord.payPerHour;
  }

  function allWagesFor(empRecord) {
    return empRecord.timeInEvents.reduce((total, e) => {
      return total + wagesEarnedOnDate(empRecord, e.date);
    }, 0);
  }
  
  function calculatePayroll(empRecords) {
    return empRecords.reduce((total, emp) => total + allWagesFor(emp), 0);
  }