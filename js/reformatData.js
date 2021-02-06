function reformatDate(lang, date) {
  const h = date.toString().split(':')[0]
  const m = date.toString().split(':')[1]

  var am, pm, ampm

  lang === 'ar' ? am = 'ص' : am = 'AM'
  lang === 'ar' ? pm = 'م' : pm = 'PM'
  ampm = parseInt(h) >= 12 ? pm : am

  return parseInt(h) > 12 ? `${parseInt(h) - 12}:${m} ${ampm}` : `${parseInt(h)}:${m} ${ampm}`
}
