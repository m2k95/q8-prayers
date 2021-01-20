let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
today = dd + '-' + mm + '-' + yyyy

const prayerElements = document.querySelectorAll('#q8prayers')
prayerElements.forEach(prayerElement => {
  var lang, width, dark
  
  prayerElement.getAttribute('data-lang') === 'ar' ? lang = 'ar' : lang = 'en'
  prayerElement.getAttribute('data-width') === null ? width = 150 : width = parseInt(prayerElement.getAttribute('data-width'))
  prayerElement.getAttribute('data-theme') === 'dark' ? dark = true : dark = false
  
  fetchPrayers(today, lang).then(prayers => {
    if (prayers.error) {
      prayerElement.innerHTML = `<p class="q8prayers-error">${prayers.message}</p>`
      
    }else{
      if(dark){
        prayerElement.classList.add('dark')
      }
      
      let table = document.createElement('table')
      if(lang === 'ar') table.setAttribute('dir', 'rtl')
    
      let title_tr = document.createElement('tr')
      let title_th = document.createElement('th')
      let title_small = document.createElement('small')
  
      let credits_tr = document.createElement('tr')
      let credits_th = document.createElement('th')
      let credits_small = document.createElement('small')
      let credits_a = document.createElement('a')
  
      let date_tr = document.createElement('tr')
      let date_th = document.createElement('th')
    
      let fajr_tr = document.createElement('tr')
      let fajr_th = document.createElement('th')
      let fajr_td = document.createElement('td')
    
      let dhuher_tr = document.createElement('tr')
      let dhuher_th = document.createElement('th')
      let dhuher_td = document.createElement('td')
    
      let asr_tr = document.createElement('tr')
      let asr_th = document.createElement('th')
      let asr_td = document.createElement('td')
    
      let maghrib_tr = document.createElement('tr')
      let maghrib_th = document.createElement('th')
      let maghrib_td = document.createElement('td')
    
      let isha_tr = document.createElement('tr')
      let isha_th = document.createElement('th')
      let isha_td = document.createElement('td')
    
      title_th.setAttribute('colspan', '2')
      title_small.innerHTML = prayers.Title
      title_th.appendChild(title_small)
      title_tr.appendChild(title_th)
    
      credits_th.setAttribute('colspan', '2')
      credits_a.setAttribute('href', 'https://q8prayers.com')
      credits_a.setAttribute('target', '_blank')
      credits_a.innerHTML = 'Q8 Prayer Times'
      credits_small.appendChild(credits_a)
      credits_th.appendChild(credits_small)
      credits_tr.appendChild(credits_th)
  
      date_th.setAttribute('colspan', '2')
      date_th.innerHTML = prayers.Date
      date_tr.appendChild(date_th)
     
      fajr_th.innerHTML = prayers.Fajr.name
      fajr_td.innerHTML = prayers.Fajr.time
      fajr_tr.appendChild(fajr_th)
      fajr_tr.appendChild(fajr_td)
     
      dhuher_th.innerHTML = prayers.Dhuhr.name
      dhuher_td.innerHTML = prayers.Dhuhr.time
      dhuher_tr.appendChild(dhuher_th)
      dhuher_tr.appendChild(dhuher_td)
     
      asr_th.innerHTML = prayers.Asr.name
      asr_td.innerHTML = prayers.Asr.time
      asr_tr.appendChild(asr_th)
      asr_tr.appendChild(asr_td)
     
      maghrib_th.innerHTML = prayers.Maghrib.name
      maghrib_td.innerHTML = prayers.Maghrib.time
      maghrib_tr.appendChild(maghrib_th)
      maghrib_tr.appendChild(maghrib_td)
     
      isha_th.innerHTML = prayers.Isha.name
      isha_td.innerHTML = prayers.Isha.time
      isha_tr.appendChild(isha_th)
      isha_tr.appendChild(isha_td)
    
      table.appendChild(title_tr)
      table.appendChild(date_tr)
      table.appendChild(fajr_tr)
      table.appendChild(dhuher_tr)
      table.appendChild(asr_tr)
      table.appendChild(maghrib_tr)
      table.appendChild(isha_tr)
      table.appendChild(credits_tr)
    
      table.style.width = width + 'px'
    
      prayerElement.appendChild(table)
    }
  })

})
