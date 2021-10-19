String.prototype.toArabicNumbers= function(){
  var id= ['٠', '١', '٢', '٣', '٤' ,'٥', '٦', '٧', '٨', '٩']
  return this.replace(/[0-9]/g, function(w){
    return id[+w]
  })
}

function reformatDate(lang, date) {
  const h = date.toString().split(':')[0]
  const m = date.toString().split(':')[1]

  var am, pm, ampm

  lang === 'ar' ? am = 'ص' : am = 'AM'
  lang === 'ar' ? pm = 'م' : pm = 'PM'
  ampm = parseInt(h) >= 12 ? pm : am

  return parseInt(h) > 12 ? `${parseInt(h) - 12}:${m} ${ampm}` : `${parseInt(h)}:${m} ${ampm}`
}

async function fetchPrayers(today){
  try {
    const res = await (await fetch(`https://api.aladhan.com/v1/timingsByAddress/${today}?address=kuwait,al-asimah&method=9`)).json()
    if (res.code === 200) {
      const Fajr = res.data.timings.Fajr
      const Dhuhr = res.data.timings.Dhuhr
      const Asr = res.data.timings.Asr
      const Maghrib = res.data.timings.Maghrib
      const Isha = res.data.timings.Isha
  
      const prayers = {
        Fajr: {
          en: {
            name: 'Fajr',
            time: `${reformatDate('en', Fajr)}`
          },
          ar: {
            name: 'الفجر',
            time: `${reformatDate('ar', Fajr).toArabicNumbers()}`
          }
        },
        Dhuhr: {
          en: {
            name: 'Dhuhr',
            time: `${reformatDate('en', Dhuhr)}`
          },
          ar: {
            name: 'الظُهر',
            time: `${reformatDate('ar', Dhuhr).toArabicNumbers()}`
          }
        },
        Asr: {
          en: {
            name: 'Asr',
            time: `${reformatDate('en', Asr)}`
          },
          ar: {
            name: 'العصر',
            time: `${reformatDate('ar', Asr).toArabicNumbers()}`
          }
        },
        Maghrib: {
          en: {
            name: 'Maghrib',
            time: `${reformatDate('en', Maghrib)}`
          },
          ar: {
            name: 'المغرب',
            time: `${reformatDate('ar', Maghrib).toArabicNumbers()}`
          }
        },
        Isha: {
          en: {
            name: 'Isha',
            time: `${reformatDate('en', Isha)}`
          },
          ar: {
            name: 'العِشاء',
            time: `${reformatDate('ar', Isha).toArabicNumbers()}`
          }
        },
        Date: {
          en: today,
          ar: today.toArabicNumbers()
        },
        Title: {
          en: 'Kuwait Prayer Times',
          ar: 'أوقات الصلاة في الكويت'
        }
      }
      
      return prayers

    }else{
      const message = {
        en: 'Please try again later',
        ar: 'الرجاء المحاولة لاحقًا'
      }
      return { error: true, message }
    }

  } catch (error) {
    console.error(error)
    const message = {
      en: 'Please try again later',
      ar: 'الرجاء المحاولة لاحقًا'
    }
    return { error: true, message }
  }
}

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
today = dd + '-' + mm + '-' + yyyy

const prayerElements = document.querySelectorAll('#q8prayers')

fetchPrayers(today).then(prayers => {

  prayerElements.forEach(prayerElement => {
    var lang, width, dark
  
    prayerElement.getAttribute('data-lang') === 'ar' ? lang = 'ar' : lang = 'en'
    prayerElement.getAttribute('data-width') === null ? width = 150 : width = parseInt(prayerElement.getAttribute('data-width'))
    prayerElement.getAttribute('data-theme') === 'dark' ? dark = true : dark = false

    if (prayers.error) {
      prayerElement.innerHTML = `<p class="q8prayers-error">${lang === 'ar' ? prayers.message.ar : prayers.message.en}</p>`
      
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
