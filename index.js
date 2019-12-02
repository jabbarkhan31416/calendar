


window.addEventListener("DOMContentLoaded", e=>{
    const table = document.getElementsByTagName("tbody")[0]
    let tdArray = []
    let patternArray = []
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
        const year = time.getFullYear()

        const datesArray0 = datesArray.map(x=>(
            x ? x :
            isLeapYear(year) ? 29 :
            28
        ))
        const totalDates = datesArray0[month]
        const preTotalDates = datesArray0[month===0 ? 11 : month-1]
        const firstDay = (day-date+36) % 7
        const totalWeeks = Math.ceil((firstDay+totalDates) / 7)

        while(table.childElementCount>3) table.removeChild(table.lastChild)
        tdArray = []
        
        document.getElementById("year").textContent = year
        
        document.getElementById("month").textContent = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ][month]
        
        patternArray = (new Array(totalWeeks)).fill(0).map((_,x)=>(
            (new Array(7)).fill(0).map((_,y)=>(
                7*x + y
            )).map(e=>(
                e<firstDay ? [1+e+preTotalDates-firstDay, -1] :
                e < firstDay+totalDates ? [1+e-firstDay, 0] :
                [1+e-firstDay-totalDates, 1]
            ))
        ))

        tdArray = patternArray.map((a,i)=>{
            const tr = document.createElement("tr")
            tr.setAttribute("class", "tr-w"+totalWeeks)
            table.appendChild(tr)
            return a.map(([x], j)=>{
                const td = document.createElement("td")
                const id = "date-"+i+","+j
                td.setAttribute("id", id)
                td.textContent = x
                tr.appendChild(td)
                return td
            })
        })

        console.log(patternArray)
    }
    render(new Date())
    console.log(tdArray)
})