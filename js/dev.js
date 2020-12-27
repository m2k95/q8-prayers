/**
 * q8-prayertimes v1.0.0
 * @link https://github.com/mymk95/q8-prayers
 *
 * Kuwait Prayer Times CDN
 * Written by Mohammad AlFailakawi <m.filkawi@gmail.com>
 */
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
          Date: today.toArabicNumbers()
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
          Date: today
        }
      }
      
      return prayers

    }else{
      var message = 'Please try again later.'
      if(lang === 'ar') message = 'الرجاء المحاولة لاحقًا.'
      return { error: true, message }
    }

  } catch (error) {
    console.error(error)
    var message = 'Please try again later.'
    if(lang === 'ar') message = 'الرجاء المحاولة لاحقًا.'
    return { error: true, message }
  }
}

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
today = dd + '-' + mm + '-' + yyyy

var lang, width

const prayerElement = document.querySelector('#q8prayers')
prayerElement.getAttribute('data-lang') === 'ar' ? lang = 'ar' : lang = 'en'
prayerElement.getAttribute('data-width') === null ? width = 150 : width = parseInt(prayerElement.getAttribute('data-width'))

fetchPrayers(today, lang).then(prayers =>{
  if (prayers.error) {
    prayerElement.innerHTML = `<p class="q8prayers-error">${prayers.message}</p>`

  }else{
    const table = document.createElement('table')
    if(lang === 'ar') table.setAttribute('dir', 'rtl')
  
    const date_tr = document.createElement('tr')
    const date_th = document.createElement('th')
  
    const fajr_tr = document.createElement('tr')
    const fajr_th = document.createElement('th')
    const fajr_td = document.createElement('td')
  
    const dhuher_tr = document.createElement('tr')
    const dhuher_th = document.createElement('th')
    const dhuher_td = document.createElement('td')
  
    const asr_tr = document.createElement('tr')
    const asr_th = document.createElement('th')
    const asr_td = document.createElement('td')
  
    const maghrib_tr = document.createElement('tr')
    const maghrib_th = document.createElement('th')
    const maghrib_td = document.createElement('td')
  
    const isha_tr = document.createElement('tr')
    const isha_th = document.createElement('th')
    const isha_td = document.createElement('td')
  
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
  
    table.appendChild(date_tr)
    table.appendChild(fajr_tr)
    table.appendChild(dhuher_tr)
    table.appendChild(asr_tr)
    table.appendChild(maghrib_tr)
    table.appendChild(isha_tr)
  
    table.style.width = width + 'px'
  
    prayerElement.appendChild(table)
  }
})
