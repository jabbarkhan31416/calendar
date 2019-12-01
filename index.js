


window.addEventListener("DOMContentLoaded", e=>{
    const table = document.getElementsByTagName("table")[0]
    const datesArray =[
        31, null, 31,
        30, 31, 30,
        31, 31, 30,
        31, 30, 31
    ]
    const render = time=>{
        const date = time.getDate()
        const day = time.getDay()
        const month = time.getMonth()
        const year = time.getYear()
        const febDates = (
            year%4 !== 0 ? 28 :
            year%400 === 0 ? 29 :
            year%100 === 0 ? 28 :
            29
        )
        const datesArray0 = datesArray.map(x => x?x:febDates)
        const totalDates = datesArray0[month]
        const preTotalDates = datesArray0[month===0 ? 11 : month-1]
        const firstDay = (day-date+36) % 7
        const totalWeeks = Math.ceil((firstDay+totalDates) / 7)
        {
            while(table.childElementCount>3) table.removeChild(table.lastChild)
            let i = 0
            let j = 0
            let k0 = preTotalDates-firstDay
            let k1 = 0
            let k2 = 0
            while(i<totalWeeks){
                i = i+1
                let l = 0
                const tr = document.createElement("tr")
                tr.setAttribute("class", "tr-w"+totalWeeks)
                table.appendChild(tr)
                while(l<7 && k0<preTotalDates){
                    l = l+1
                    j = j+1
                    k0 = k0+1
                    const td = document.createElement("td")
                    td.setAttribute("class", j%2 ? "odd" : "even")
                }
            }
        }
    }
    render(new Date())
})