


window.addEventListener("DOMContentLoaded", e=>{
    const table = document.getElementsByTagName("tbody")[0]
    const datesArray =[
        31, null, 31,
        30, 31, 30,
        31, 31, 30,
        31, 30, 31
    ]
    const isLeapYear = y=>(
        year%4 !== 0 ? false :
        year%400 === 0 ? true :
        year%100 === 0 ? false :
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
        {
            while(table.childElementCount>3) table.removeChild(table.lastChild)
            let i = 0
            let j = (new Array(firstDay)).fill(0).map(
                (_,x) => x+1+preTotalDates-firstDay
            ).concat(
                (new Array(totalDates).fill(0).map((_,x) => x+1))
            ).concat(
                (new Array(totalWeeks*7 - totalDates - firstDay)).fill(0).map((_,x) => x+1)
            )
            console.log(j)
            while(i<totalWeeks){
                let k = 0
                const tr = document.createElement("tr")
                tr.setAttribute("class", "tr-w"+totalWeeks)
                table.appendChild(tr)
                /*while(k<7){
                    const td = document.createElement("td")
                    td.setAttribute("class", cssClass + ((i^k)%2 ? " odd" : " even"))
                    tr.appendChild(td)
                    k = k+1
                }*/
                i = i+1
            }
        }
    }
    render(new Date())
})