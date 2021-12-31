const API_URL = 'https://api.q8prayers.com'
const prayerElements = document.querySelectorAll('#q8prayers')

if (prayerElements) {

  fetch(API_URL).then(res => res.json())
  .then(data => {
    if (data.status === 200) { 
      let lang, width, fontSize, table, tableTitle

      prayerElements.forEach(prayerElement => {
        prayerElement.getAttribute('data-lang') === 'ar' ? lang = 'ar' : lang = 'en'
        const tableSize = prayerElement.getAttribute('data-size')

        // detect table size
        if (tableSize !== null) {
          if (tableSize === 'sm'){
            fontSize = 10
            width = 150
          }
          if (tableSize === 'md'){
            fontSize = 15
            width = 175
          }
          if (tableSize === 'lg'){
            fontSize = 20
            width = 200
          }
          if (tableSize === 'xl'){
            fontSize = 25
            width = 250
          }
        } else {
          fontSize = 15
          width = 175
        }

        // prayers variables
        const FajrName = data.timings.Fajr[lang].name
        const FajrTime = data.timings.Fajr[lang].time
        const DhuhrName = data.timings.Dhuhr[lang].name
        const DhuhrTime = data.timings.Dhuhr[lang].time
        const AsrName = data.timings.Asr[lang].name
        const AsrTime = data.timings.Asr[lang].time
        const MaghribName = data.timings.Maghrib[lang].name
        const MaghribTime = data.timings.Maghrib[lang].time
        const IshaName = data.timings.Isha[lang].name
        const IshaTime = data.timings.Isha[lang].time
        const Gdate = data.date.gregorian[lang].date
        const Hdate = data.date.hijri[lang].date

        // main table configuration
        table = document.createElement('table')
        table.style.width = `${width}px`
        table.style.fontSize = `${fontSize}px`
        if(lang === 'ar') table.setAttribute('dir', 'rtl')
        lang === 'ar' ? tableTitle = 'أوقات الصلاة في الكويت' : tableTitle = 'Kuwait Prayer Times'
  
        // table data
        table.innerHTML = `
          <tr><th colspan="2"><small>${tableTitle}</small></th></tr>
          <tr><th colspan="2">${Gdate}</th></tr>
          <tr><th>${FajrName}</th><td>${FajrTime}</td></tr>
          <tr><th>${DhuhrName}</th><td>${DhuhrTime}</td></tr>
          <tr><th>${AsrName}</th><td>${AsrTime}</td></tr>
          <tr><th>${MaghribName}</th><td>${MaghribTime}</td></tr>
          <tr><th>${IshaName}</th><td>${IshaTime}</td></tr>
          <tr><th colspan="2"><small><a href="https://q8p.io" target="_blank">Q8 Prayers</a></small></th></tr>
        `
    
        // append table to DOM
        prayerElement.appendChild(table)
      })

    } else {
      prayerElements.forEach(prayerElement => {
        prayerElement.innerHTML = `<p class="q8prayers-error">Q8Prayers Internal Error</p>`
      })
    }
  })

  .catch(err => {
    console.log(err)
    prayerElements.forEach(prayerElement => {
      prayerElement.innerHTML = `<p class="q8prayers-error">Q8Prayers Internal Error</p>`
    })
  })
  
}
