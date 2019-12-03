/* Your Code Here */
function createEmployeeRecord(array) {
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrays) {
    const employees = arrays.map(array => createEmployeeRecord(array))
    return employees
}

let createTimeInEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(date) {
    let inEvent = this.timeInEvents.find(event => event.date === date)

    let outEvent = this.timeOutEvents.find(event => event.date === date)

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)

    return hours * this.payPerHour
}
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

let findEmployeeByFirstName = function(srcArray, firstName) {
    let employee = srcArray.find(employee => employee.firstName === firstName)
    return employee
}

let calculatePayroll = function(srcArray) {
    let total = srcArray.reduce(function(memo, employee) {
        return memo + allWagesFor.call(employee)
    }, 0)
    return total
}