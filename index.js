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

let createEmployeeRecord = function(r){
    return {
        firstName: r[0],
        familyName: r[1],
        title: r[2],
        payPerHour: r[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


let createEmployees = function(arr){
    return arr.map(function(r){
        return createEmployeeRecord(r)
    })
}

let createTimeInEvent = function(time){
    let [date, hour] = time.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this

}


let createTimeOutEvent = function(stamp){
    let [date, hour] = stamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(time){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === time
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === time
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(d){
    let wage = hoursWorkedOnDate.call(this, d)
        * this.payPerHour
    return parseFloat(wage.toString())
}

let createEmployeeRecords = function(k) {
    return k.map(function(r){
      return createEmployeeRecord(r)
    })
  }

  let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

  let calculatePayroll = function(array){
      return array.reduce(function(x, r){
          return x + allWagesFor.call(r)
      }, 0)
  }