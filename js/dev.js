var head  = document.getElementsByTagName('head')[0]
var link  = document.createElement('link')
link.rel  = 'stylesheet'
link.type = 'text/css'
link.href = '../scss/dev.css'
head.appendChild(link)

String.prototype.toArabicNumbers= function(){
  var id= ['٠', '١', '٢', '٣', '٤' ,'٥', '٦', '٧', '٨', '٩']
  return this.replace(/[0-9]/g, function(w){
    return id[+w]
  })
}

function reformatDate(lang, date) {
  const h = date.toString().split(':')[0]
  const m = date.toString().split(':')[1]

  var am, pm

  lang === 'ar' ? am = 'ص' : am = 'AM'
  lang === 'ar' ? pm = 'م' : pm = 'PM'

  return parseInt(h) > 12 ? `${parseInt(h) - 12}:${m} ${pm}` : `${parseInt(h)}:${m} ${am}`
}

async function fetchPrayers(today, lang){
  try {
    const res = await (await fetch(`https://api.aladhan.com/timingsByAddress/${today}?address=kuwait,al-asimah&method=9`)).json()
    if (res.code === 200) {
      const Fajr = res.data.timings.Fajr
      const Dhuhr = res.data.timings.Dhuhr
      const Asr = res.data.timings.Asr
      const Maghrib = res.data.timings.Maghrib
      const Isha = res.data.timings.Isha
      var prayers = {}
  
      if(lang === 'ar'){
        prayers = {
          Fajr: {
            name: 'الفجر',
            time: `${reformatDate(lang, Fajr).toArabicNumbers()}`
          },
          Dhuhr: {
            name: 'الظُهر',
            time: `${reformatDate(lang, Dhuhr).toArabicNumbers()}`
          },
          Asr: {
            name: 'العصر',
            time: `${reformatDate(lang, Asr).toArabicNumbers()}`
          },
          Maghrib: {
            name: 'المغرب',
            time: `${reformatDate(lang, Maghrib).toArabicNumbers()}`
          },
          Isha: {
            name: 'العِشاء',
            time: `${reformatDate(lang, Isha).toArabicNumbers()}`
          },
          Date: today.toArabicNumbers(),
          Title: 'أوقات الصلاة في الكويت'
        }
      }
      else{
        prayers = {
          Fajr: {
            name: 'Fajr',
            time: `${reformatDate(lang, Fajr)}`
          },
          Dhuhr: {
            name: 'Dhuhr',
            time: `${reformatDate(lang, Dhuhr)}`
          },
          Asr: {
            name: 'Asr',
            time: `${reformatDate(lang, Asr)}`
          },
          Maghrib: {
            name: 'Maghrib',
            time: `${reformatDate(lang, Maghrib)}`
          },
          Isha: {
            name: 'Isha',
            time: `${reformatDate(lang, Isha)}`
          },
          Date: today,
          Title: 'Kuwait Prayer Times'
        }
      }
      
      return prayers

    }else{
      var message = 'Please try again later'
      if(lang === 'ar') message = 'الرجاء المحاولة لاحقًا'
      return { error: true, message }
    }

  } catch (error) {
    console.error(error)
    var message = 'Please try again later'
    if(lang === 'ar') message = 'الرجاء المحاولة لاحقًا'
    return { error: true, message }
  }
}

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
      credits_a.setAttribute('href', 'https://q8prayers.vercel.app')
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
