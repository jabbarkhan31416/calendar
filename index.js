


window.addEventListener("DOMContentLoaded", e=>{
    const table = document.getElementsByTagName("tbody")[0]
    let tdArray = []
    let patternArray = []
    let selectedDate, selectedMonth, selectedYear

    document.getElementById("pre-year").addEventListener("click", e=>{
        selectedYear = selectedYear-1
        render(selectedDate,selectedMonth,selectedYear)
    })
    document.getElementById("nex-year").addEventListener("click", e=>{
        selectedYear = selectedYear+1
        render(selectedDate,selectedMonth,selectedYear)
    })
    document.getElementById("pre-month").addEventListener("click", e=>{
        [selectedMonth,selectedYear] = (
            selectedMonth==0 ? [11, selectedYear-1] :
            [selectedMonth-1, selectedYear]
        )
        render(selectedDate,selectedMonth,selectedYear)
    })
    document.getElementById("nex-month").addEventListener("click", e=>{
        [selectedMonth,selectedYear] = (
            selectedMonth==11 ? [0, selectedYear+1] :
            [selectedMonth+1, selectedYear]
        )
        render(selectedDate,selectedMonth,selectedYear)
    })
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

    const render = (date,month,year)=>{
        const datesArray0 = datesArray.map(x=>(
            x ? x :
            isLeapYear(year) ? 29 :
            28
        ))
        const realdate = (
            date<1 ? 1 :
            date>datesArray0[month] ? datesArray0[month] :
            date
        )
        const day = (new Date(year,month,date)).getDay()

        selectedDate = realdate
        selectedDay = day
        selectedMonth = month
        selectedYear = year

        const totalDates = datesArray0[month]
        const preTotalDates = datesArray0[month===0 ? 11 : month-1]
        const firstDay = (day-realdate+36) % 7
        const totalWeeks = Math.ceil((firstDay+totalDates) / 7)

        while(table.childElementCount>3) table.removeChild(table.lastChild)
        tdArray = []
        
        document.getElementById("year").textContent = year
        document.getElementById("pre-year").addEventListener
        
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
            return a.map(([x,m], j)=>{
                const td = document.createElement("td")
                td.setAttribute("id", "date-"+i+","+j)
                td.setAttribute(
                    "class",
                    (j==0 ? "sun" : "") +
                    ((i+j)%2 ? " odd" : " even") +
                    (!m ? " current" : "") /*+
                    (!m&&(x==realdate) ? " selected" : "")*/
                )
                td.textContent = x
                tr.appendChild(td)
                return td
            })
        })
    }
    render(
        (new Date()).getDate(),
        (new Date()).getMonth(),
        (new Date()).getFullYear()
    )
})