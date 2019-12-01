/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees){
    return employees.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(date){
    let timeIn = date.split(" ")
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(timeIn[1]),
        date: timeIn[0]
    }
    this.timeInEvents.push(timeInObj)
    return this
}

let createTimeOutEvent= function(date){
    let timeOut = date.split(" ")
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(timeOut[1]),
        date: timeOut[0]
    }
    this.timeOutEvents.push(timeOutObj)
    return this
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(event => event.date === date).hour
    let timeOut = this.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn)/100
}

let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let calculatePayroll = function(employees){
    return employees.reduce((a, b) => a + allWagesFor.call(b), 0)
}

let findEmployeeByFirstName = function(array, name){
    return array.find(employee => employee.firstName === name)
}
