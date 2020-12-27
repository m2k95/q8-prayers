function reformatDate(lang, date) {
  const h = date.toString().split(':')[0]
  const m = date.toString().split(':')[1]

  var am, pm

  lang === 'ar' ? am = 'ص' : am = 'AM'
  lang === 'ar' ? pm = 'م' : pm = 'PM'

  return parseInt(h) > 12 ? `${parseInt(h) - 12}:${m} ${pm}` : `${parseInt(h)}:${m} ${am}`
}
