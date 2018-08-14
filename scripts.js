exports.parseDate =  function (date){
  var regEx = /\D/g;
  if(regEx.test(date)){
    return date;
  }
  return parseInt(date);
}

