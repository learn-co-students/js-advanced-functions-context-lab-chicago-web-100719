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

let createEmployeeRecord = function(info) {
    return ({
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

let createEmployeeRecords = function(employeesArr) {
    let allEmployees = employeesArr.map(function(e){
        return createEmployeeRecord(e)
    })
    return allEmployees
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour)
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour)
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let inEvent = this.timeInEvents.find(function(e) {
       return e.date === date
    })
    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return (hours * this.payPerHour)
}

let calculatePayroll = function(employeesArr) {
    return employeesArr.reduce(function (memo, emp) {
       return memo + allWagesFor.call(emp)
    },0)
}

let findEmployeeByFirstName = function(collection, name) {
    return collection.find(function(e) {
      return  e.firstName === name
    })
}