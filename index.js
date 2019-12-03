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

const createEmployeeRecord = employeeInfo => {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employees => {
    return employees.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(stamp) {
    let [date, hour] = stamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return this
}

const createTimeOutEvent = function(stamp){
    let [date, hour] = stamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return this
}

const hoursWorkedOnDate = function(date){
    let inEvent = this.timeInEvents.find(event => event.date === date)
    let outEvent = this.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(date){
    const hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
}

const calculatePayroll = function(employees){
    return employees.reduce(function(memo,record){
        return memo + allWagesFor.call(record)
    }, 0)
}

const findEmployeeByFirstName = (array,firstName) => array.find(employee => employee.firstName === firstName)