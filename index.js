


window.addEventListener("DOMContentLoaded", e=>{
    const table = document.getElementsByTagName("tbody")[0]
    let tdArray = []
    const datesArray =[
        31, null, 31,
        30, 31, 30,
        31, 31, 30,
        31, 30, 31
    ]
    const isLeapYear = y=>(
        y%4 !== 0 ? false :
        y%400 === 0 ? true :
        y%100 === 0 ? false :
        true
    )
    const render = time=>{
        const date = time.getDate()
        const day = time.getDay()
        const month = time.getMonth()
        const year = time.getYear()

        const febDates = isLeapYear(year)?29:28
        const datesArray0 = datesArray.map(x => x?x:febDates)
        const totalDates = datesArray0[month]
        const preTotalDates = datesArray0[month===0 ? 11 : month-1]
        const firstDay = (day-date+36) % 7
        const totalWeeks = Math.ceil((firstDay+totalDates) / 7)

        while(table.childElementCount>3) table.removeChild(table.lastChild)
        tdArray = []
        {
            const yearTr = document.getElementById("year")
            yearTr.textContent = 1900+year
        }
        {
            const monthTr = document.getElementById("month")
            monthTr.textContent = [
                "January", "February", "March",
                "April", "May", "June",
                "July", "August", "September",
                "October", "November", "December"
            ][month]
        }
        let i = 0
        let j = (new Array(firstDay)).fill(0).map(
            (_,x) => [x+1+preTotalDates-firstDay, 0]
        ).concat(
            (new Array(totalDates).fill(0).map((_,x) => [x+1,1]))
        ).concat(
            (new Array(totalWeeks*7 - totalDates - firstDay)).fill(0).map((_,x) => [x+1,0])
        )
        console.log(datesArray0)
        while(i<totalWeeks){
            let k = 0
            {
                const tr = document.createElement("tr")
                tr.setAttribute("class", "tr-w"+totalWeeks)
                while(k<7){
                    {
                        const td = document.createElement("td")
                        {
                            const text = document.createTextNode(j[0][0])
                            td.appendChild(text)
                        }
                        td.setAttribute("class", (j[0][1]?"current":"") + (k==0?" sun-":" ") + ((i^k)%2 ? "odd" : "even"))
                        tr.appendChild(td)
                        tdArray.push(td)
                    }
                        k = k+1
                    j.shift()
                }
                table.appendChild(tr)
            }
            i = i+1
        }
    }
    render(new Date())
    console.log(tdArray)
})