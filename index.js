


window.addEventListener("DOMContentLoaded", e=>{
    const table = document.getElementsByTagName("table")[0]
    const render = time=>{
        const date = time.getDate()
        const day = time.getDay()
        const month = time.getMonth()
        const year = time.getYear()
        const febDays = (
            year%4 !== 0 ? 28 :
            year%400 === 0 ? 29 :
            year%100 === 0 ? 28 :
            29
        )
        const totalDays = [
            31, febDays, 31,
            30, 31, 30,
            31, 31, 30,
            31, 30, 31
        ][month]
        
    }
})