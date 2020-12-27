String.prototype.toArabicNumbers= function(){
  var id= ['٠', '١', '٢', '٣', '٤' ,'٥', '٦', '٧', '٨', '٩']
  return this.replace(/[0-9]/g, function(w){
    return id[+w]
  })
}
