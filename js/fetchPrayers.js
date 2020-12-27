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
