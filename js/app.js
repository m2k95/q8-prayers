let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
today = dd + '-' + mm + '-' + yyyy

const prayerElements = document.querySelectorAll('#q8prayers')

fetchPrayers(today).then(prayers => {

  prayerElements.forEach(prayerElement => {
    var lang, width
  
    prayerElement.getAttribute('data-lang') === 'ar' ? lang = 'ar' : lang = 'en'
    prayerElement.getAttribute('data-width') === null ? width = 150 : width = parseInt(prayerElement.getAttribute('data-width'))

    if (prayers.error) {
      prayerElement.innerHTML = `<p class="q8prayers-error">${lang === 'ar' ? prayers.message.ar : prayers.message.en}</p>`
      
    }else{
      
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
      title_small.innerHTML = lang === 'ar' ? prayers.Title.ar : prayers.Title.en
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
      date_th.innerHTML = lang === 'ar' ? prayers.Date.ar : prayers.Date.en
      date_tr.appendChild(date_th)
     
      fajr_th.innerHTML = lang === 'ar' ? prayers.Fajr.ar.name : prayers.Fajr.en.name
      fajr_td.innerHTML = lang === 'ar' ? prayers.Fajr.ar.time : prayers.Fajr.en.time
      fajr_tr.appendChild(fajr_th)
      fajr_tr.appendChild(fajr_td)
     
      dhuher_th.innerHTML = lang === 'ar' ? prayers.Dhuhr.ar.name : prayers.Dhuhr.en.name
      dhuher_td.innerHTML = lang === 'ar' ? prayers.Dhuhr.ar.time : prayers.Dhuhr.en.time
      dhuher_tr.appendChild(dhuher_th)
      dhuher_tr.appendChild(dhuher_td)
     
      asr_th.innerHTML = lang === 'ar' ? prayers.Asr.ar.name : prayers.Asr.en.name
      asr_td.innerHTML = lang === 'ar' ? prayers.Asr.ar.time : prayers.Asr.en.time
      asr_tr.appendChild(asr_th)
      asr_tr.appendChild(asr_td)
     
      maghrib_th.innerHTML = lang === 'ar' ? prayers.Maghrib.ar.name : prayers.Maghrib.en.name
      maghrib_td.innerHTML = lang === 'ar' ? prayers.Maghrib.ar.time : prayers.Maghrib.en.time
      maghrib_tr.appendChild(maghrib_th)
      maghrib_tr.appendChild(maghrib_td)
     
      isha_th.innerHTML = lang === 'ar' ? prayers.Isha.ar.name : prayers.Isha.en.name
      isha_td.innerHTML = lang === 'ar' ? prayers.Isha.ar.time : prayers.Isha.en.time
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
