async function fetchPrayers(today){
  try {
    const res = await (await fetch(`https://api.aladhan.com/timingsByAddress/${today}?address=kuwait,al-asimah&method=9`)).json()
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
