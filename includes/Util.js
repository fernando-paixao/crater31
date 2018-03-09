

//correct values

function moneyCorrect( money )
{
  var strToReturn = money+'';

  if( strToReturn.substr(-3,1) == ',' )
  {
    strToReturn = strToReturn.replaceAll( '.', '' );
    strToReturn = strToReturn.replaceAll( ',', '.' );
  }
  else if( strToReturn.substr(-3,1) == '.' )
    strToReturn = strToReturn.replaceAll( ',', '' );
  else
    strToReturn += '.00';

  return strToReturn;
}

function horarioExceedCorrect( hora )
{
  var arrHora = hora.split(':');
  var arrHoraReturn = [ parseInt( arrHora[0] ), parseInt( arrHora[1] ) ];

  if( arrHoraReturn[0] == 24 && arrHoraReturn[1] == 0 )
    return '24:00';

  var horasToSum = 0;
  if( arrHoraReturn[1] > 60 - 1 )
  {
    horasToSum += parseInt( arrHoraReturn[1] / 60 );
    arrHoraReturn[1] = arrHoraReturn[1] % 60;
  }
  arrHoraReturn[0] += horasToSum;

  if( arrHoraReturn[0] > 24 - 1 )
    arrHoraReturn[0] = arrHoraReturn[0] % 24;

  return completaStr( arrHoraReturn[0], 2, '0' ) + ':' + completaStr( arrHoraReturn[1], 2, '0' );
}


//convert values

function strToInternationalPhone( phoneStr, defaultCountryCode, defaultLocalCode )
{
  var strToReturn = '';

  if( phoneStr == undefined || phoneStr == '' )
    return '';

  if( defaultCountryCode == undefined )
    defaultCountryCode = '55';
  if( defaultLocalCode == undefined )
    defaultLocalCode = '55';
  
  var numbers = getNumbers( phoneStr )+'';
  strToReturn += numbers;

  if( numbers.length < ( 9 + 2 ) )
    strToReturn = defaultLocalCode + strToReturn;
  if( numbers.length < ( 9 + 2 + 2 ) )
    strToReturn = defaultCountryCode + strToReturn;

  return strToReturn;
}

function strToPhone( phoneStr )
{
  var strToReturn = '';
  var numbers = getNumbers( phoneStr )+'';
  var numbersArr = numbers.split('');
  var prefix = '';
  var startPhoneNumber = 0;

  if( numbers.length > 9 )
  {
    var qtdInPrefix = 2;
    var startPosPrefix = 0;
    
    if( numbersArr[ 0 ] == '0' )
      startPosPrefix++;

    strToReturn += '('+numbers.substr( startPosPrefix, qtdInPrefix )+') ';
    startPhoneNumber += startPosPrefix + qtdInPrefix;
  }

  strToReturn += numbers.substr( startPhoneNumber, 4 );
  strToReturn += '-';
  strToReturn += numbers.substr( startPhoneNumber + 4 );

  return strToReturn;
}

function numberFormat( value )
{
    value = moneyCorrect( value );
    value = doubleToBrMoney( value );

    return "R$ "+value;
}

function doubleToMoney( double )
{
  var strToReturn = parseFloat( double ).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

  return strToReturn+'';
}

function doubleToBrMoney( double, cutZeros )
{
  var strToReturn = moneyToBrMoney( doubleToMoney( double ) );

  if( cutZeros && strToReturn.substr(-2, 2) == '00' )
    strToReturn = strToReturn.substr( 0, strToReturn.length - 3 )

  return strToReturn+'';
}

function moneyToDouble( money, returnFloat )
{
  if( money == undefined )
    return 0;
  if( returnFloat == undefined )
    returnFloat = false;

  var strToReturn = money;

  strToReturn = strToReturn.replaceAll( '_', '' );
  strToReturn = strToReturn.replaceAll( '.', '' );
  strToReturn = strToReturn.replaceAll( ',', '.' );

  if( returnFloat )
    parseFloat( strToReturn );

  return strToReturn;
}

function moneyToBrMoney( money )
{
  var moneyArr = money.split('.');

  moneyArr[0] = moneyArr[0].replaceAll( ',', '.' );
  //moneyArr[0] = moneyArr[0].replaceAll( ',', '.' );

  var strToReturn = moneyArr[0]+','+moneyArr[1];

  return strToReturn;
}

function duracaoToHours( duracao )
{
  var arrDuracao = duracao.split(' ');
  var unidadeTempo = arrDuracao[1];
  var qtdTempo = arrDuracao[0];

  var hoursToReturn = 0;
  switch( unidadeTempo )
  {
    case 'dias':
      hoursToReturn = qtdTempo * 24;
      break;
    case 'horas':
      hoursToReturn = qtdTempo * 1;
      break;
    case 'minutos':
      hoursToReturn = qtdTempo * 1/60;
      break;
    case 'segundos':
      hoursToReturn = qtdTempo * 1/60/60;
      break;
  }

  return hoursToReturn;
}

function hoursToHorario( hours )
{
  var horas = parseInt( hours );
  var minutos = ( hours - horas ) * 60;

  return horarioExceedCorrect( horas + ':' + minutos );
}

function hoursToDuracao( horas )
{
  var qtdDuracao = horas.toFixed(2);
  var strDuracao = 'horas';

  if( horas < 1 )
  {
    qtdDuracao = parseInt( horas * 60 );
    strDuracao = 'minutos';
  }

  return qtdDuracao + ' ' + strDuracao;
}

function getDuracaoHoras( strDuracao )
{
  var arrDuracao = strDuracao.split(' ');

  var qtd = parseFloat( arrDuracao[0] );
  var text = arrDuracao[1];

  var duracaoHoras = 0;
  var fator = 1;
  switch( text )
  {
    case 'minutos':
      fator = 1/60;
      break;
  }
  duracaoHoras = fator * qtd;

  return duracaoHoras;
}

function dateHourToMili( dateHour )
{
  var totalMiliseconds = 0;
  var dateHourArr = dateHour.split(':');

  var duration = { hour: 60*60*1000, minute:60*1000, second:1000  };

  for( var i = 0; i < dateHourArr.length; i++ )
  {
    switch( i )
    {
      case 0:
        totalMiliseconds += parseInt( dateHourArr[ i ] ) * duration['hour'];
        break;
      case 1:
        totalMiliseconds += parseInt( dateHourArr[ i ] ) * duration['minute'];
        break;
      case 2:
        totalMiliseconds += parseInt( dateHourArr[ i ] ) * duration['second'];
        break;
    }
  }

  return totalMiliseconds;
}

function secondsToLegibleTime( seconds )
{
  var strRetorno;

  var hours = 0;
  if( seconds >= 3600 )
  {
    hours = parseInt( seconds/3600 );
    seconds = seconds % 3600;
  }
  var minutes = 0;
  if( seconds >= 60 )
  {
    minutes = parseInt( seconds/60 );
    seconds = seconds % 60;
  }

  strRetorno = completaStr( hours, 2, '0' )+':'+completaStr( minutes, 2, '0' )+':'+completaStr( seconds, 2, '0' );

  //strRetorno = seconds.toHHMMSS();

  return strRetorno;
}

function legibleTimeToSeconds( time )
{
  if( time == '' )
    return 0;

  var arrTime = time.split(':');

  return parseInt( arrTime[0] )*3600 + parseInt( arrTime[1] )*60 + parseInt( arrTime[2] );
}

function toXlsDate( ano, mes, dia )
{
  ano = ano.substr(2,2);
  mes = parseInt( mes );
  dia = parseInt( dia );
  
  if( mes < 10 )
    mes = '0'+mes;
  if( dia < 10 )
    dia = '0'+dia;

  return mes+'-'+dia+'-'+ano;
}

function strDateToLegibleDate( dateStr )
{
  var characterDelimiter = '-';

  arrStrDate = dateStr.split( characterDelimiter );

  return arrStrDate[2]+'/'+arrStrDate[1]+'/'+arrStrDate[0];
}

function legibleDateToXlsDate( dateStr, characterDelimiter )
{
  if( characterDelimiter == undefined )
    characterDelimiter = '/';

  arrDate = dateStr.split( characterDelimiter );
  
  return toXlsDate( arrDate[2], arrDate[1], arrDate[0] );
}

function completeLegibleDate( dateStr )
{
  var strToReturn = '';
  var arrNumbers = ( getNumbers( dateStr, false ) + '' ).split('');

  if( arrNumbers.length == 0 )
    return '';

  var actualDateNumbers = ( getNumbers( strDateToLegibleDate( getDateNow() ), false ) + '' ).split('');

  var arrToGet = arrNumbers;
  for( var i = 0; i < actualDateNumbers.length; i++ )
  {
    if( arrNumbers.length == i )
      arrToGet = actualDateNumbers;

    if( i == 2 || i == 4 )
      strToReturn += '/';
    
    strToReturn += arrToGet[ i ];
  }

  return strToReturn;
}

function legibleDatePartToXlsDate( dateStr )
{
  if( dateStr.length == 0 )
    return '';
  else
    return legibleDateToXlsDate( completeLegibleDate( dateStr ) );
}

function strToXlsDate( dateStr )
{
  arrDate = dateStr.split( '-' );
  
  return toXlsDate( arrDate[0], arrDate[1], arrDate[2] );
}

function xlsDateToDate( dateStr, addCentury, returnDateArr )
{
  if( typeof( dateStr ) == 'number' || !issetNotEmpty( dateStr ) )
    return "";

  if( returnDateArr == undefined )
    returnDateArr = false;
  if( addCentury == undefined )
    addCentury = false;

  arrDate = dateStr.split( '-' );
  if( arrDate.length != 3 )
    return '';

  if( addCentury && arrDate[2].length == 2 )
  {
    if( parseInt( arrDate[2] ) < 25 )
      arrDate[2] = "20"+arrDate[2];
    else
      arrDate[2] = "19"+arrDate[2];
  }

  if( returnDateArr )
    return [ arrDate[2], arrDate[0]-1, arrDate[1] ];
  else
    return arrDate[2]+'-'+arrDate[0]+'-'+arrDate[1];
}

function xlsDateToDateArr( dateStr, addCentury )
{
  return xlsDateToDate( dateStr, addCentury, true )
}

function xlsDateToLegibleDate( dateStr, separator )
{
  if( dateStr == '' )
    return '';

  if( separator == undefined )
    separator = '/';

  var dateArr = xlsDateToDate( dateStr, true, true );
  return ''+completaStr( dateArr[2], 2, '0' )+separator+completaStr( dateArr[1]+1, 2, '0' )+separator+dateArr[0];
}

function dateToExcelDate( date )
{
  var ano = (date.getFullYear()+'').substr(2,2);
  var mes = date.getMonth()+1;
  var dia = date.getDate();

  if( mes < 10 )
    mes = '0'+mes;
  if( dia < 10 )
    dia = '0'+dia;

  return mes+'-'+dia+'-'+ano;
}

function monthYearToLegible( monthYear )
{
  if( typeof( monthYear ) == 'number' || monthYear == '0' )
    return '';

  var arrMonthYear = monthYear.split('-');
  var strToReturn = arrMonthYear[1]+'/'+arrMonthYear[0];

  return strToReturn;
}

function somarMesXls( dateStr, numberOfMonths )
{
  return strToXlsDate( somarMes( xlsDateToDate( dateStr, true ), numberOfMonths ) );
}

function dateStrToDateArr( dateStr )
{
  var arrDate = dateStr.split( '-' );
  arrDate[1] = parseInt( arrDate[1] ) - 1;

  return arrDate;
}

function strDateToDate(dateStr)
{
  var dateArr = dateStrToDateArr( dateStr, true );
  var date = new Date( dateArr[0], dateArr[1], dateArr[2] );

  return date;
}

function somarMes(dateStr, numberOfMonths)
{
  var date = strDateToDate( dateStr );
  //detalhe ele retorna 0 para janeiro e 11 para dezembro
  var month = date.getMonth();
  //crio uma nova váriavel com a nova data, Date(ano, mes(soma da variavel enviada para o metodo + o mes atual, dia que eu coloquei padrão para 1
  var n_date = new Date( date.getFullYear(), eval(month+numberOfMonths), date.getDate() );

  return getDate( n_date );
}


//date

function daysDiff( date1, date2 ) 
{
  //Get 1 day in milliseconds
  //var one_day=1000*60*60*24;

  date1 = new Date( date1 );
  date2 = new Date( date2 );

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = ( date2_ms - date1_ms );// / 1000;
  //take out milliseconds
  //difference_ms = difference_ms/1000;
  /*var seconds = Math.floor(difference_ms % 60);
  difference_ms = difference_ms/60; 
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms/60; 
  var hours = Math.floor(difference_ms % 24);  */
  var days = Math.floor( difference_ms / (1000*60*60*24) );
  
  return days;// + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
}

function getDateTimeNow()
{
  return getDateNow()+' '+getTimeNow();
}

function getDateNow()
{
  return getDate( new Date() );
}

function getDate( date )
{
  var d = date;
  var month = d.getMonth()+1;
  var day = d.getDate();

      y = d.getFullYear(),
      m = (month<10?'0':'') + month;
      d = (day<10?'0':'') + day;
  return y + '-' + m + '-' + d;
}

function getTimeNow()
{
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      s = (d.getSeconds()<10?'0':'') + d.getSeconds();
  return h + ':' + m + ':' + s;
}

function addDays(date, days) 
{
    var result = new Date(date);
    result.setDate(result.getDate() + days + 1);
    return getDate( result );
}

function getTimestamp()
{
  return new Date().getTime();
}

function hoursOperation( horaInicio, horaFim, operation )
{
  var arrHoraInicio = horaInicio.split(':');
  var arrHoraFim = horaFim.split(':');

  var horasToReturn = 0;

  horasToReturn += eval( parseInt( arrHoraFim[0] ) +operation+ parseInt( arrHoraInicio[0] ) );
  horasToReturn += eval( parseInt( arrHoraFim[1] ) +operation+ parseInt( arrHoraInicio[1] ) ) * 1/60;

  return horasToReturn;
}

function hoursSum( horaInicio, horas )
{
  var horaFim = hoursToHorario( horas );
  return hoursToHorario( hoursOperation( horaInicio, horaFim, '+' ) );
}

function hoursDifference( horaFim, horaInicio )
{
  return hoursOperation( horaInicio, horaFim, '-' );
}


//string

function removeExistingStr( arrStr, arrStrAlreadyExists )
{
  var arrToReturn = [];

  for( var i = 0; i < arrStr.length; i++ )
  {
    var strToCheck = arrStr[i];
    if( arrStrAlreadyExists.indexOf( strToCheck ) == -1 )
      arrToReturn.push( strToCheck );
  }

  return arrToReturn;
}

function cutString( str, length, endStr )
{
  if( endStr == undefined )
    endStr = '...';

  var strToReturn;
  if( str.length > length + endStr.length )
    strToReturn = str.substr( 0, length )+endStr;
  else
    strToReturn = str;

  return strToReturn;
}

function trocarAspas( str, forceChar )
{
  if
  ( 
    forceChar != undefined &&
    (
      forceChar == "'" && str.search( "'" ) != -1 ||
      forceChar == '"' && str.search( '"' ) != -1
    )
  )
  {
      return str;
  }

  if( str.search( "'" ) != -1 )
    return str.replaceAll( "'", '"' );
  else
    return str.replaceAll( '"', "'" );
}

String.prototype.toSlug = function()
{
    str = this.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

    return str;
};

function strcmp( str1, str2 )
{
  return str1.toSlug().search( str2.toSlug() );
}

function toString( variable, separator )
{
  if( separator == undefined )
    separator = "\n";

  var strToReturn = variable;

  if( isObject( variable ) )
    strToReturn = objToStr( variable, separator );
  else if( isArray( variable ) )
    strToReturn = arrToStr( variable, separator );
  else
    strToReturn += separator;

  return strToReturn;
}

String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
    return this.split(needle).join(replacement);
};

function getNumbers( str, convert )
{
  if( convert == undefined )
    convert = true;

  if( str == '' )
  {
    /*if( !convert )
      return '';
    else*/
      return 0;
  }

  var numberPattern = /\d+/g;
  var valueToReturn = str.match( numberPattern ).join('');

  if( convert )
    valueToReturn = parseInt( valueToReturn );

  return valueToReturn;
}

function completaStr( str, size, character )
{
  str = str+'';
  while( str.length < size )
    str = character+str;

  return str;
}

var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();


//dict

function dictToMatrix( dict, namesArr ) 
{
    var arrToReturn = [];
    for(var key in dict) 
    {
        var value = dict[key];
        var objToAdd = {};

        var i = 0;
        objToAdd[ namesArr[i++] ] = key;
        if( isObject( value ) )
        {
          for(var valueKey in value) 
            objToAdd[ namesArr[i++] ] = value[ valueKey ];
        }
        else
          objToAdd[ namesArr[i++] ] = value;

        arrToReturn.push(objToAdd);
    }
    return arrToReturn;
}

function expandDictionaryToObjArr( obj, keyName, valueName )
{
    var arrToReturn = [];
    
    for( var index in obj )
    {
      var objToAdd = {};
      
      objToAdd[ keyName ] = index;
      objToAdd[ valueName ] = obj[index];

      arrToReturn.push( objToAdd );
    }
    
    return arrToReturn;
}


//tree

//Bug: getKeyFromValueInTree( itemsTree, 'Desenvolvimento' );
function getKeyFromValueInTree( tree, value, key )
{
  var actualNode = tree;
  
  if( !isObject( actualNode ) || !isNaN( key ) )
    return '';

  var keys = Object.keys( actualNode );

  if( keys.indexOf( value ) != -1 )
    return key;
  else
  {
    for( var i = 0; i < keys.length; i++ )
    {
      var actualKey = keys[i];
      var childProcessedReturn = getKeyFromValueInTree( tree[ actualKey ], value, actualKey );
      if( childProcessedReturn != '' )
        return childProcessedReturn;
    }
  }

  return '';
}


//base 64

function objToJsonBase64( obj )
{
  var jsonStr = JSON.stringify( obj );
  var base64Str = Base64.encode( jsonStr );

  return base64Str;
}

function jsonBase64ToObj( base64Str )
{
  var jsonStr = Base64.decode( base64Str );
  var obj = JSON.parse( jsonStr );
  
  return obj;
}


//object

function setArrayIfUndefined( obj, key )
{
  if( obj[ key ] == undefined )
    obj[ key ] = [];
}

function setObjIfUndefined( obj, key )
{
  if( obj[ key ] == undefined )
    obj[ key ] = {};
}

function arrObjToDictTree( matrix, keys )
{
  if( typeof( keys ) == 'string' )
    keys = [ keys ];

  var treeToReturn = {};

  for( var level = 0; level < keys.length; level++ )
  {
    var actualLevelKey = keys[ level ];
    var actualItem = treeToReturn;

    for( var i = 0; i < matrix.length; i++ )
    {
      actualItem = treeToReturn;

      for( var subKey = 0; subKey < level; subKey++ )
      {
        var levelKey = keys[ subKey ];
        actualItem = actualItem[  matrix[i][ levelKey ] ];
      }

      if( level != keys.length - 1 )
        setObjIfUndefined( actualItem, matrix[i][ actualLevelKey ] );
      else
      {
        setArrayIfUndefined( actualItem, matrix[i][ actualLevelKey ] );
        actualItem[ matrix[i][ actualLevelKey ] ].push( matrix[i] );
      }
    }
  }

  return treeToReturn;
}

function objToStr( obj, separator, type )
{
  if( type == undefined )
    type = "( Obj )";
  if( separator == undefined )
    separator = "\n";

  var strToReturn = type+separator;
  
  for( var index in obj )
    strToReturn += index+' => '+JSON.stringify( obj[ index ] )+separator;

  return strToReturn;
}

function arrToObjectColumnsData( arr, dictConvert )
{
    if( arr.length == 0 )
        return { columns: [], data: [] };

    var columns = Object.keys(arr[0]);
    var data = clone( arr );

    for( var index in dictConvert )
    {
        if( isNaN( index ) )
            data = changeArrayKey( data, index, dictConvert[ index ] );
        else
            data = changeArrayKey( data, columns[ index ], dictConvert[ index ] );
    }

    return { columns: columns, data: data };
}

function objOrder( obj )
{
  var objToReturn = {};
  
  Object.keys( obj ).sort().forEach( function(key) 
  {
    objToReturn[key] = obj[key];
  });

  return objToReturn;
}

function cleanObjKeys( obj, keysToClean, keysToPreserve )
{
  if( keysToClean == undefined )
    keysToClean = Object.keys( obj );
  if( keysToPreserve != undefined )
    keysToClean = removeValues( keysToClean, keysToPreserve );
  
  for( var i = 0; i < keysToClean.length; i++ )
  {
    var keyToClean = keysToClean[ i ];
    obj[ keyToClean ] = '';
  }

  return obj;
}

function issetNotEmpty( param )
{
  if( param != undefined && param != '' )
    return true;

  return false;
}

function isObject(val) 
{
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

//outra implementacao da funcao acima
/*function isObject(obj) {
  return obj === Object(obj);
}*/

function clone( json )
{
    return (JSON.parse(JSON.stringify(json)));
}

function object_flip(o)
{
    var newObj = {} 
    Object.keys(o).forEach((el,i)=>{
        newObj[o[el]]=el;
    });
    return newObj;
}

function mapMatrixColumn( matrix, columnName, functionToApply )
{
  for( var i = 0; i < matrix.length; i++ )
    matrix[ i ][ columnName ] = functionToApply( matrix[ i ][ columnName ] );

  return matrix;
}

function changeArrayKeys( matrix, dictConvert )
{
  var columns = Object.keys(matrix[0]);
  var data = clone(matrix);

  for (var index in dictConvert) 
  {
      if (isNaN(index)) data = changeArrayKey(data, index, dictConvert[index]);
      else data = changeArrayKey(data, columns[index], dictConvert[index]);
  }

  return data;
}

function changeArrayKey( arrayObj, oldName, newName )
{
  if( oldName != newName )
  {
    for(var i = 0; i < arrayObj.length; i++)
    {
        arrayObj[i][newName] = arrayObj[i][oldName];
        delete arrayObj[i][oldName];
    }
  }

  return arrayObj;
}

function deleteArrayKey( arrayObj, oldName )
{
  if( oldName != '' )
  {
    for(var i = 0; i < arrayObj.length; i++)
        delete arrayObj[i][oldName];
  }

  return arrayObj;
}

function newArrayKey( arrayObj, newKeyName, value )
{
  if( value == undefined )
    value = '';

  var valueIsArr = isArray( value );
  var valueToSet = value;
  for(var i = 0; i < arrayObj.length; i++)
  {
      if( valueIsArr )
        valueToSet = value[ i ];

      arrayObj[i][newKeyName] = valueToSet;
  }

  return arrayObj;
}

function arrObjToArrObj( arr, keys )
{
    var arrToReturn = [];
    
    for( var i = 0; i < arr.length; i++ )
    {
        var row = arr[ i ];
        var objToInsert = {};
        
        for( var j = 0; j < keys.length; j++ )
        {
          var key = keys[ j ];
          objToInsert[ key ] = row[ key ];
        }

        arrToReturn.push( objToInsert );
    }
    
    return arrToReturn;
}

function arrObjToArr( arr, key )
{
  var arrToReturn = [];
    
  for( var i = 0; i < arr.length; i++ )
    arrToReturn.push( arr[ i ][ key ] );

  return arrToReturn;
}

function removeArrObjects( arr, objects )
{
  for( var i = 0; i < objects.length; i++ )
  {
    var result = filterMatrixPos( arr, objects[ i ] );
    if( result.length > 0 )
      arr.splice( result[ 0 ], 1 );
  }

  return arr;
}

function registroEmpty( registro, fields )
{
  if( fields == undefined )
    fields = Object.keys( registro );

  for( var i = 0; i < fields.length; i++ )
  {
    if( registro[ fields[ i ] ] == '' )
      return true;
  }

  return false;
}

function registroMatch( registro, registroSupposedToMatch, skip )
{
  var i = 0;
  for( var index in registro )
  {
    if( registro[ index ] != registroSupposedToMatch[i++] )
    {
      if( decodeEntities( registro[ index ] ) != decodeEntities( registroSupposedToMatch[i-1] ) )
        return false;
    }
  }

  return true;
}

function registroMatchObject( registro, registroSupposedToMatch, skip )
{
  var i = 0;
  for( var index in registro )
  {
    if( registro[ index ] != registroSupposedToMatch[ index ] )
    {
      if( decodeEntities( registro[ index ] ) != decodeEntities( registroSupposedToMatch[ index ] ) )
        return false;
    }
  }

  return true;
}

function someParamNotMatch( registro, registroToMatch )
{
  var returnValue = false;

  for( var index in registroToMatch )
  {
    if( registroToMatch[index] != registro[index] )
      return true;
  }

  return returnValue;
}

function allParamsMatch( registro, registroToMatch )    //igual a funcao acima, substituir todas e ficar soh com uma
{
  var returnValue = true;

  for( var index in registroToMatch )
  {
    if( registroToMatch[index] != registro[index] )
      return false;
  }

  return returnValue;
}

function newObjectByKeys( obj, keys, newKeysName )  //apagar AKIIII!!! aqui quando refatorar mudando este para o de baixo
{
  return objToDict( obj, keys, newKeysName );
}

function objToDict( obj, keys, newKeysName )
{
    var objToReturn = {};
    
    for( var i = 0; i < keys.length; i++ )
    {
        if( obj[ keys[i] ] != undefined && obj[ keys[i] ] != '' )
        {
            if( newKeysName == undefined )
                objToReturn[ keys[i] ] = obj[ keys[i] ];
            else
                objToReturn[ newKeysName[i] ] = obj[ keys[i] ];
        }
    }
    
    return objToReturn;
}

function arrObjToObj( arrObj, key )
{
  var objToReturn = {};

  for( var i = 0; i < arrObj.length; i++ )
    objToReturn[ arrObj[ i ][ key ] ] = arrObj[ i ];

  return objToReturn;
}

function arrObjToDict( arrObj, key, value )
{
  var objToReturn = {};

  for( var i = 0; i < arrObj.length; i++ )
    objToReturn[ arrObj[ i ][ key ] ] = arrObj[ i ][ value ];

  return objToReturn;
}

function arrObjToDictArr( arrObj, key, value )
{
  var objToReturn = {};

  for( var i = 0; i < arrObj.length; i++ )
  {
    var keyObjReturn = key;
    if( arrObj[ i ][ key ] != undefined )
      keyObjReturn = arrObj[ i ][ key ];

    if( objToReturn[ keyObjReturn ] == undefined )
      objToReturn[ keyObjReturn ] = [];

    if( value == undefined )
      objToReturn[ keyObjReturn ].push( arrObj[ i ] );
    else if( value != '' )
      objToReturn[ keyObjReturn ].push( arrObj[ i ][ value ] );
  }

  return objToReturn;
}

function arrCombine( arr1, arr2 )
{
  var objToReturn = {};

  for( var i = 0; i < arr1.length; i++ )
    objToReturn[ arr1[ i ] ] = arr2[ i ];

  return objToReturn;
}

function objMerge( obj1, obj2 )
{
  for (var attrname in obj2)
    obj1[attrname] = obj2[attrname];

  return obj1;
}

function objToCssAttr( obj )
{
  var strToReturn = '';

  for( var index in obj )
    strToReturn += index + ':' + obj[ index ] + '; ';

  return strToReturn;
}

function getMax( arrayObj, field )
{
  var max = 0;
  for( var i = 0; i < arrayObj.length; i++ )
  {
    var newValue = parseInt( arrayObj[i][ field ] );
    if( max < newValue )
     max = newValue;
  }

  return max;
}

function cmpKeys( a, b, keysCompareArr )
{
  var result = 0;
  
  for( var i = 0; i < keysCompareArr.length; i++ )
  {
    var keyCompare = keysCompareArr[ i ];
    result = cmp( a, b, keyCompare );
    if( result != 0 )
      break;
  }

  return result;
}

function cmp( a, b, keyCompare )
{
  if( a[keyCompare] == undefined || b[keyCompare] == undefined )
    return 0;

  return a[keyCompare].localeCompare( b[keyCompare] );
}

function cmpNumber( a, b, keyCompare )
{
  if( a[keyCompare] == undefined || b[keyCompare] == undefined )
    return 0;

  return parseFloat( a[keyCompare] ) - parseFloat( b[keyCompare] );
}

function cmpDate( a, b, keyCompare )
{
  if( a[keyCompare] == undefined || b[keyCompare] == undefined )
    return 0;
  
  var dateA = xlsDateToDate( a[keyCompare], true );
  var dateB = xlsDateToDate( b[keyCompare], true );

  var valueToReturn = dateA.localeCompare( dateB );

  return valueToReturn;
}


//array

function removeValues( arr, arrValuesToRemove )
{
  var arrToReturn = [];

  for( var i = 0; i < arr.length; i++ )
  {
    var value = arr[ i ];
    
    if( arrValuesToRemove.indexOf( value ) == -1 )
      arrToReturn.push( value );
  }

  return arrToReturn;
}

function functionMap( _function, arr )
{
  var arrToReturn = [];

  for( var i = 0; i < arr.length; i++ )
  {
    var parameter = arr[i];
    arrToReturn.push( _function( parameter ) );
  }

  return arrToReturn;
}

function matchSubstringArr( subStrValue, strArr )
{
  for( var i = 0; i < strArr.length; i++ )
  {
    var strToCompare = strArr[i];
    if( strToCompare.indexOf( subStrValue ) != -1 )
      return strToCompare;
  }

  return "";
}

function matchSubstringArrInStr( subStrValue, strArr )
{
  for( var i = 0; i < strArr.length; i++ )
  {
    var strToCompare = strArr[i];
    if( subStrValue.indexOf( strToCompare ) != -1 )
      return strToCompare;
  }

  return "";
}

function arrToStr( obj, separator )
{
  return objToStr( obj, separator, "( Arr )" );
}

function isArray( val )
{
  if( val == null )
    return false;

  return val.constructor === Array;
}

function arrPad( arr, desiredLength, padValue )
{
    arrToReturn = clone( arr );

    if( padValue == undefined )
        padValue = '';
    
    for( var i = arr.length - 1; i < desiredLength; i++ )
        arrToReturn[i] = padValue;
    
    return arrToReturn;
}

function arrToObject( arr, keys )
{
    var objToReturn = {};
    var valueArrToPad = [];

    if( arr == undefined || arr.length == 0 )
        return [];

    if( typeof( keys ) == 'string' )
        keys = arrPad( valueArrToPad, arr.length, keys );

    for( var i = 0; i < keys.length; i++ )
    {
        objToReturn[ keys[i] ] = arr[i];
    }

    return objToReturn;
}

function arrToArrObject( arr, keys )
{
    var arrToReturn = [];
    var valueArrToPad = [];

    if( arr == undefined || arr.length == 0 )
        return [];

    if( typeof( keys ) == 'string' )
        keys = arrPad( valueArrToPad, arr.length, keys );

    for( var i = 0; i < keys.length; i++ )
    {
        var newObj = {};
        newObj[ keys[i] ] = arr[i];
        arrToReturn.push( newObj );
    }

    return arrToReturn;
}

function vectorToMatrix( vector, numberOfColumns )
{
    var matrixToReturn = [];

    var lineToAdd = [];
    for( index in vector )
    {
        lineToAdd.push( vector[ index ] );

        if( lineToAdd.length == numberOfColumns )
        {
            matrixToReturn.push( lineToAdd );
            lineToAdd = [];
        }
    }
    if( lineToAdd.length > 0 )
        matrixToReturn.push( lineToAdd );

    return matrixToReturn;
}

function matrixToVector( matrix, columnName )
{
    var vectorToReturn = [];

    for( index in matrix )
        vectorToReturn.push( matrix[ index ][ columnName ] );

    return vectorToReturn;
}

function dictToTable( matrix )  //qtdColumns
{
    var tableToReturn = [];

    for( index in matrix )
    {
      var line = [];

      line.push( index );
      line.push( matrix[ index ] );

      tableToReturn.push( line );
    }

    return tableToReturn;
}

function filterMatrixCustom( matrix, registry, customFunction )
{
    var result = matrix.filter( function( actualRegistry ) { return customFunction( registry, actualRegistry ); } );

    return result;
}

function filterMatrixComplement( matrix, registry )
{
  return filterMatrixCustom( matrix, registry, function( registry, actualRegistry ){ return !registroMatchObject( registry, actualRegistry ); } );
}

function filterMatrix( matrix, registry )
{
    var result = matrix.filter( function( actualRegistry ) { return registroMatchObject( registry, actualRegistry ); } );

    return result;
}

function filterMatrixPos( matrix, registry )
{
    var positionsToReturn = [];

    var i = 0;
    matrix.filter( function( actualRegistry ) 
    {
      if( registroMatchObject( registry, actualRegistry ) )
        positionsToReturn.push( i );

      i++;
    } );

    return positionsToReturn;
}

function filterDictByValue( dictObj, value )
{
  var dictToReturn = {};

  for( var index in dictObj )
  {
    if( dictObj[ index ] == value )
      dictToReturn[ index ] = value;
  }

  return dictToReturn;
}


//geolocation

function paramsGeolocationToUrl( destLat, destLon, myLat, myLon )
{
    var geolocationUrlToOpen = 'https://www.google.com.br/maps/dir/';

    if( myLat == undefined )
        geolocationUrlToOpen += '/';
    else
        geolocationUrlToOpen += myLat+','+myLon+'/';

    geolocationUrlToOpen += destLat+','+destLon+'/';

    return geolocationUrlToOpen;
}

function handleGeolocation( successGeolocation, errorGeolocation, optionsGeolocation )
{
  if( optionsGeolocation == undefined )
  {
    optionsGeolocation = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
  }

  navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation, optionsGeolocation);
}

function handleGeolocationWatch( successGeolocation, errorGeolocation, optionsGeolocation )
{
  if( optionsGeolocation == undefined )
  {
    optionsGeolocation = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
  }

  return navigator.geolocation.watchPosition(successGeolocation, errorGeolocation, optionsGeolocation);
}

function errorGeolocationDefault(err) 
{
  var message = 'ERROR(' + err.code + '): ' + err.message;

  console.log( message );
  //alert( message );
}

function successGeolocationDefault(pos) 
{
  var crd = pos.coords;

  return crd;
};

function geolocationToFields( latitudeFieldSeletor, longitudeFielSeletor, precisaoFieldSeletor, precisaoMinima, precisaoAlmejada, onReceiveCallback )
{
  window.precisaoMinima = 150;
  window.precisaoAlmejada = 20;

  if( precisaoMinima != undefined )
    window.precisaoMinima = precisaoMinima;
  if( precisaoAlmejada != undefined )
    window.precisaoAlmejada = precisaoAlmejada;

  if( window.watchID != undefined )
    navigator.geolocation.clearWatch( window.watchID );

  window.watchID = handleGeolocationWatch
  ( 
    function( pos )
    {
      var finalize = false;
      var crd = successGeolocationDefault( pos );

      //console.log( crd );

      var precisaoAtual = undefined;
      if( precisaoFieldSeletor != undefined && $( precisaoFieldSeletor ).val() != '' )
      {
        precisaoAtual = parseFloat( $( precisaoFieldSeletor ).val() );

        if( precisaoAtual <= window.precisaoAlmejada ) 
          finalize = true;
      }

      if
      ( 
        ( !finalize ) &&
        ( 
          precisaoAtual != undefined && 
          crd.accuracy > precisaoAtual
        ) ||
        ( crd.accuracy > window.precisaoMinima )
      )
      {
        return;
      }

      if( !finalize )
      {
        if( onReceiveCallback != undefined )
          onReceiveCallback( crd.latitude, crd.longitude, crd.accuracy );

        $( latitudeFieldSeletor ).val( crd.latitude );
        $( longitudeFielSeletor ).val( crd.longitude );
        if( precisaoFieldSeletor != undefined )
          $( precisaoFieldSeletor ).val( crd.accuracy );

        if( crd.accuracy <= window.precisaoAlmejada )
          finalize = true;
      }

      if( finalize )
      {
        navigator.geolocation.clearWatch( window.watchID );
        delete( window.watchID );
        delete( window.precisaoAlmejada );
        delete( window.precisaoMinima );
      }
    }, 
    errorGeolocationDefault 
  );
}


//html

function objToCssProperties( objArr )
{
  var strToReturn = '';
  var separator = '; ';

  for( var propertie in objArr )
  {
    var value = objArr[ propertie ];

    if( strToReturn != "" )
      strToReturn += separator;

    strToReturn += propertie+':'+value;
  }

  return strToReturn;
}

function arrToOptions( arr )
{
  var strReturn = '';

  for( var index in arr )
    strReturn += '<option>'+arr[index]+'</option>';

  return strReturn;
}

function matrixToTableHtml( matrix, titleRow )
{
    var htmlToReturn = '';

    if( titleRow == true && matrix.length > 0 )
    {
      //var keys = Object.keys( matrix[ 0 ] );

      htmlToReturn += '<tr>';
      for( var index in matrix[ 0 ] )
      {
          htmlToReturn += '<th>';
          htmlToReturn += index;
          htmlToReturn += '</th>';
      }
      htmlToReturn += '</tr>';
    }

    for( var i in matrix )
    {
        htmlToReturn += '<tr>';
        for( var j in matrix[ i ] )
        {
            htmlToReturn += '<td>';
            htmlToReturn += matrix[ i ][ j ];
            htmlToReturn += '</td>';
        }
        htmlToReturn += '</tr>';
    }

    return htmlToReturn;
}

//select

function setSelectMultipleValues( selector, values )
{
  for( var i = 0; i < values.length; i++ )
    $( selector ).find("option[value='" + values[ i ] + "']").prop("selected", true);
}


//components

function SimpleSideBarToogle( size, sideBarId, containerId, buttonId, options )
{
  self = this;

  this.size = size;
  this.sideBarId = sideBarId;
  this.containerId = containerId;
  this.buttonId = buttonId;
  this.options = options;

  this.initialize = function()
  {
    if( $('#'+this.sideBarId+' [name="sideBarClose"]').length == 0 )
    {
      var buttonHtml = '<button name="sideBarClose" class="w3-right w3-button">';
        buttonHtml += '<i class="fa fa-remove"></i>';
      buttonHtml += '</button>';

      $( '#'+this.sideBarId ).prepend( buttonHtml );
    }


    $( '#'+this.sideBarId ).addClass( 'w3-border' );


    $('#'+this.sideBarId+' [name="sideBarClose"]').click( function(){ self.action( 'close' ); } );
    $('#'+buttonId).click( function(){ console.log( 'hey', self ); self.action( 'open' ); } );

    if( issetNotEmpty( self.options[ 'initialState' ] ) )
      self.action( self.options[ 'initialState' ] );
  }

  this.action = function( action )
  {
    if( action == 'open' )
    {
      if( size != undefined )
        document.getElementById( self.sideBarId ).style.width = size;

      if( self.options['type'] == 'over' )   //above
      {
        if( size != undefined )
          document.getElementById( self.containerId ).style.marginLeft = size;
        else
          $( '#'+this.sideBarId ).addClass( 'w3-left' );
      }
      else if( self.options['type'] == 'above' )
      {
        $( '#'+this.sideBarId )
          .css( 'position', 'absolute' )
          .css('z-index', '1');
        
        if( issetNotEmpty( self.options['BackgroundImage'] ) )
        {
          $( '#'+this.sideBarId )
          .css( 'background-color', 'white' )
          .css( 'background-image', "url('"+arrConfig['BackgroundImage']+"')" );

          $( '#'+this.sideBarId+' .w3-button' )
          .css( 'background-color', 'inherit' )
          .css( 'background-image', "inherit" );
        }
      }

      document.getElementById( self.sideBarId ).style.display = "block";
      document.getElementById( self.buttonId ).style.display = 'none';
    }
    else
    {
      document.getElementById( self.containerId ).style.marginLeft = "0%";
      document.getElementById( self.sideBarId ).style.display = "none";
      document.getElementById( self.buttonId ).style.display = "inline-block";
    }
  }

  this.initialize();
}

function SimpleTable( tableSelector, matrix, title, clickEventCallback )
{
    var self = this;

    this.tableSelector = tableSelector;
    this.matrix = matrix;
    this.title = title;
    this.clickEventCallback = clickEventCallback;

    this.render = function()
    {
        var tableHtml = '';
        
        if( this.title != '' )
          tableHtml += '<caption>'+ this.title +'</caption>';

        tableHtml += matrixToTableHtml( this.matrix );  

        $( self.tableSelector ).html( tableHtml );

        $( self.tableSelector ).unbind();
        if( clickEventCallback != undefined )
            $( self.tableSelector ).click( this.clickEventHandler );
    }

    this.clickEventHandler = function( e )
    {
        var elementCell = e.target;
        var elementRow = e.target.parentNode;
        var cellData = $( elementCell ).html();

        clickEventCallback( cellData, elementCell, elementRow );
    }
}

function SimpleToggleVisibilityElements( arrElements, changeEventCallback )
{
  var self = this;

  this.arrElements = arrElements;
  this.changeEventCallback = changeEventCallback;
  this.selectedIndex = -1;
  
  this.toggle = function( forceSelectedIndex )
  {
    if( forceSelectedIndex != undefined )
      this.selectedIndex = forceSelectedIndex;
    else
      this.selectedIndex++;

    if( this.selectedIndex == arrElements.length )
      this.selectedIndex = -1;

    if( self.changeEventCallback != undefined )
      self.changeEventCallback( this.selectedIndex );

    self.render();
  }

  this.render = function()
  {
    //elements

    for( var i = 0; i < arrElements.length; i++ )
    {
      var element = arrElements[ i ];
      
      if( self.selectedIndex == -1 || i == self.selectedIndex )
        $( element ).show();
      else
        $( element ).hide();
    }
  }
}

//var teste = new SimpleAbasElements( $('fieldset legend strong').toArray().map( function( a ){ return a.innerHTML; } ), $('fieldset').toArray(), '#myForm' );
function SimpleAbasElements( arrTabNames, arrElements, elementToPrependSelector, changeEventCallback )
{
    var self = this;

    this.elementToPrependSelector = elementToPrependSelector;
    this.arrTabNames = arrTabNames;
    this.arrElements = arrElements;
    this.changeEventCallback = changeEventCallback;
    this.selectedIndex = 0;

    this.initialize = function()
    {
        var htmlToReturn = self.getHtmlTabsMenu();
        $( self.elementToPrependSelector ).prepend( $( htmlToReturn ) );

        self.render();
    }

    this.getTabMenuDivId = function()
    {
      return 'tabMenu_'+elementToPrependSelector.toSlug();
    }

    this.getHtmlTabsMenu = function()
    {
        var htmlToReturn = '';
        var tabs = arrTabNames;
        var menuDivId = self.getTabMenuDivId();

        htmlToReturn += '<div class="w3-bar" id="'+menuDivId+'">';
        for( var i = 0; i < tabs.length; i++ )
          htmlToReturn += '<button class="w3-bar-item w3-button" name="'+tabs[i]+'">'+tabs[i]+'</button>';
        htmlToReturn += '</div>';

        return htmlToReturn;
    }

    this.render = function()
    {
        var tabs = arrTabNames;
        var menuDivId = self.getTabMenuDivId();
        var seletorMenuDiv = '#'+menuDivId;


        //menu

        for( var i = 0; i < tabs.length; i++ )
        {
          var tab = tabs[ i ];
          var tabMenuItem = $( seletorMenuDiv+' [name="'+tab+'"]' );

          if( i == self.selectedIndex )
            tabMenuItem.addClass( 'w3-red' );
          else
            tabMenuItem.removeClass( 'w3-red' );
        }


        //elements

        for( var i = 0; i < arrElements.length; i++ )
        {
          var element = arrElements[ i ];
          
          if( i == self.selectedIndex )
            $( element ).show();
          else
            $( element ).hide();
        }


        //events
        
        $( seletorMenuDiv ).unbind();
        $( seletorMenuDiv ).click( self.clickEventHandler );

        //if( clickEventCallback != undefined )
    }

    this.clickEventHandler = function( e )
    {
        stopEvent( e );

        var tabs = arrTabNames;
        var element = e.target;
        var name = $( element ).attr( 'name' );
        var newSelectIndex = tabs.indexOf( name );
        var oldSelectIndex = self.selectedIndex;

        if( newSelectIndex != -1 && newSelectIndex != oldSelectIndex )
        {
          self.selectedIndex = newSelectIndex;

          if( self.changeEventCallback != undefined )
            self.changeEventCallback( newSelectIndex, tabs[ newSelectIndex ], tabs[ oldSelectIndex ] );

          self.render();
        }
    }

    self.initialize();
}


function SimpleAbasForm( formSelector, baseInputsNames, objInputsByTab, changeEventCallback )
{
    var self = this;

    this.formSelector = formSelector;
    this.baseInputsNames = baseInputsNames;
    this.objInputsByTab = objInputsByTab;
    this.changeEventCallback = changeEventCallback;
    this.selectedIndex = 0;

    this.initialize = function()
    {
        var htmlToReturn = self.getHtmlTabsMenu();
        $( self.formSelector ).prepend( $( htmlToReturn ) );

        self.render();
    }

    this.getTabMenuDivId = function()
    {
      return 'tabMenu_'+formSelector.toSlug();
    }

    this.getHtmlTabsMenu = function()
    {
        var htmlToReturn = '';
        var tabs = Object.keys( self.objInputsByTab );
        var menuDivId = self.getTabMenuDivId();

        htmlToReturn += '<div class="w3-bar w3-black" id="'+menuDivId+'">';
        for( var i = 0; i < tabs.length; i++ )
          htmlToReturn += '<button class="w3-bar-item w3-button" name="'+tabs[i]+'">'+tabs[i]+'</button>';
        htmlToReturn += '</div>';

        return htmlToReturn;
    }

    this.render = function()
    {
        var tabs = Object.keys( objInputsByTab );
        var tabInputs = objInputsByTab[ tabs[ self.selectedIndex ] ];
        var inputsToShow = tabInputs.concat( self.baseInputsNames );
        var inputs = $( self.formSelector+' input' );
        var menuDivId = self.getTabMenuDivId();
        var seletorMenuDiv = '#'+menuDivId;


        //menu

        for( var i = 0; i < tabs.length; i++ )
        {
          var tab = tabs[ i ];
          var tabMenuItem = $( seletorMenuDiv+' [name="'+tab+'"]' );

          if( i == self.selectedIndex )
            tabMenuItem.addClass( 'w3-red' );
          else
            tabMenuItem.removeClass( 'w3-red' );
        }


        //inputs

        for( var i = 0; i < inputs.length; i++ )
        {
          var input = inputs[ i ];
          var inputName = $( input ).attr('name');

          if( inputsToShow.indexOf( inputName ) == -1 )
            $( input ).hide();
          else
            $( input ).show();
        }


        //events
        
        $( seletorMenuDiv ).unbind();
        $( seletorMenuDiv ).click( self.clickEventHandler );

        //if( clickEventCallback != undefined )
    }

    this.clickEventHandler = function( e )
    {
        stopEvent( e );

        var tabs = Object.keys( objInputsByTab );
        var element = e.target;
        var name = $( element ).attr( 'name' );
        var newSelectIndex = tabs.indexOf( name );
        var oldSelectIndex = self.selectedIndex;

        if( newSelectIndex != -1 && newSelectIndex != oldSelectIndex )
        {
          self.selectedIndex = newSelectIndex;

          if( self.changeEventCallback != undefined )
            self.changeEventCallback( newSelectIndex, tabs[ newSelectIndex ], tabs[ oldSelectIndex ] );

          self.render();
        }
    }

    self.initialize();
}

function SimpleRadioGroup( containerSelector, name, options, changeEventCallback, valueDefault )
{
  var self = this;

  this.containerSelector = containerSelector;
  this.name = name;
  this.options = options;
  this.changeEventCallback = changeEventCallback;
  this.valueDefault = valueDefault;

  this.render = function()
  {
    if( self.valueDefault == undefined )
      self.valueDefault = options[ 0 ];

    var separator = ' ';
    var htmlToReturn = '';

    for( var i = 0; i < self.options.length; i++ )
    {
      var option = self.options[ i ];
      var value = option;
      var label = option;

      var checked = '';
      if( value == self.valueDefault )
        checked = 'checked="checked"';

      htmlToReturn += label+': <input class="w3-radio" type="radio" name="'+self.name+'" value="'+ value +'" '+checked+'>' + separator;
    }

    $( self.containerSelector ).html( htmlToReturn );

    //events
        
    $( self.containerSelector+' input' ).unbind();
    $( self.containerSelector+' input' ).click( self.clickEventHandler );
  }

  this.extractData = function()
  {
    var value = $( self.containerSelector+' [name="'+self.name+'"]:checked' ).val();
    return value;
  }

  this.clickEventHandler = function( e )
  {
      //stopEvent( e );

      //var element = e.target;
      var value = self.extractData();
      
      if( self.changeEventCallback != undefined )
        self.changeEventCallback( value );
  }
}

function SimpleTableInput( tableSelector, matrix, fields )
{
  var self = this;

  this.tableSelector = tableSelector;
  this.matrix = matrix;
  this.fields = fields;

  this.getMatrixToRender = function()
  {
    var matrixToRender = [];
    
    for( var index in self.matrix )
    {
      var registro = self.matrix[ index ];
      var lineToAdd = {};
      
      for( var indexField in self.fields )
      {
        var field = self.fields[ indexField ];

        if( typeof( field ) == 'string' )
          lineToAdd[ field ] = registro[ field ];
        else if( field[ 'type' ] == 'double' )
          lineToAdd[ field[ 'name' ] ] = doubleToBrMoney( moneyCorrect( registro[ field[ 'name' ] ] ) );
        else if( field[ 'type' ] == 'input' )
          lineToAdd[ field[ 'name' ] ] = '<input>';
      }

      matrixToRender.push( lineToAdd );
    }

    return matrixToRender;
  }

  this.render = function()
  {
    var tableHtml = '';
    var matrixToRender = self.getMatrixToRender();

    tableHtml += matrixToTableHtml( matrixToRender, true );
    $( self.tableSelector ).html( tableHtml );
  }
  
  this.setData = function( rowColumnName, rowColumnValue, tableColumnName, value )
  {
    var headerColumns = 1;
    var resultColumn = filterMatrixPos( self.fields, { 'name': tableColumnName } );
    if( resultColumn.length > 0 )
      var column = resultColumn[ 0 ];

    var optionsAux = {};
    optionsAux[ rowColumnName ] = rowColumnValue;
    var resultRow = filterMatrixPos( self.matrix, optionsAux );
    if( resultRow.length > 0 )
      var row = resultRow[ 0 ] + headerColumns;
    
    var htmlRow = $( tableSelector+' tr' )[ row ];
    var htmlColumn = $( htmlRow ).find('td')[ column ];

    console.log( column, row, htmlRow, htmlColumn );

    $( htmlColumn ).find( 'input' ).val( value );
  }


  //extract

  this.extractData = function()
  {
    var arrToReturn = [];
    var rows = $( self.tableSelector ).get( 0 ).rows;

    for( var i = 1; i < rows.length; i++ )
    {
      var row = rows[i];
      var lineToAdd = {};
      for( var j = 0; j < row.cells.length; j++ )
      {
        var cell = row.cells[ j ];
        var field = self.fields[ j ];

        if( typeof( field ) == 'string' )
          lineToAdd[ field ] = cell.innerHTML;
        else if( field[ 'type' ] == 'double' )
          lineToAdd[ field[ 'name' ] ] = parseFloat( moneyToDouble( cell.innerHTML ) );
        else if( field[ 'type' ] == 'input' )
          lineToAdd[ field[ 'name' ] ] = $( cell ).find('input').val();
      }
      arrToReturn.push( lineToAdd );
    }

    return arrToReturn;
  }
}


//actions

function OpenInNewTab(url) 
{
  var win = window.open(url, '_blank');
  if( win != null )
    win.focus();
}

function OpenSameTab(url) 
{
  var win = window.open(url, '_self');
  //win.focus();
}


//phone actions

function SaveVCard( info )
{
  OpenRequestInNewTab( 'POST', 'saveVCard.php', info );
}

function SendSms( arrNumbers, message )
{
  if( message == undefined )
    message = "";

  if( typeof( arrNumbers ) == 'string' )
    arrNumbers = [ arrNumbers ]
  
  var numbersSeparator = ',';
  window.open('sms:'+ arrNumbers.join( numbersSeparator ) +'?body='+message, '_self');
}

function SendWhatsApp( number, message )
{
  var params = [];
  
  if( number != '' && number != undefined )
  {
    var numberInIso = strToInternationalPhone( number );
    params.push( 'phone='+numberInIso );
  }

  if( message != '' && message != undefined )
  {
    var urlencodedtext = encodeURIComponent( message );
    params.push( 'text='+urlencodedtext );
  }

  var paramsStr = params.join( '&' );

  var target = '_self';
  if( !getIsMobile() )
    target = '_blank';

  window.open('https://api.whatsapp.com/send?'+paramsStr, target);
  //window.open('tel:'+number, '_self');
}

function CallPhone( number )
{
  window.open('tel:'+number, '_self');
}

function SendMail( email )
{
  window.open('mailto:'+email, '_self');
}


//effects

function nivelarPropriedade( selector, propriedade, operator )
{
  if( operator == undefined )
    operator = '>';

  var valueSelected = undefined;

  $( selector ).each( function( index, element )
  {
    var el = $( element );
    var value = eval( 'el.'+propriedade+'()' );

    console.log( element, propriedade, value )

    if( valueSelected == undefined || eval( value + operator + valueSelected ) )
      valueSelected = value;
  } );

  console.log( propriedade, valueSelected, '$( selector ).'+propriedade+'( '+valueSelected+' )' );
  eval( '$( selector ).'+propriedade+'( '+valueSelected+' )' );

}

function scrollToSeletor( seletor, scrollAnimationTime, callback, seletorToBeScrolled )
{
    var positionToScroll = $( seletor ).offset().top;

    if( seletorToBeScrolled == undefined )
      seletorToBeScrolled = 'html, body';
    else
      positionToScroll += $( seletorToBeScrolled ).scrollTop();

    if( scrollAnimationTime == undefined )
      scrollAnimationTime = 600;
    if( callback == undefined )
      callback = doNothing;

    $( seletorToBeScrolled ).animate(
    {
        scrollTop: positionToScroll
    }, 
    scrollAnimationTime,
    callback
    );
}

function scrollToSeletorHorizontal( seletor, scrollAnimationTime, callback, seletorToBeScrolled )
{
    var offset = $( seletor ).offset();
    var position = $( seletor ).position();

    var positionToScrollX = offset.left - position.left;

    if( seletorToBeScrolled == undefined )
      seletorToBeScrolled = 'html, body';
    else
      positionToScrollX += $( seletorToBeScrolled ).scrollLeft();

    //console.log( offset, position, positionToScrollX );

    if( scrollAnimationTime == undefined )
      scrollAnimationTime = 600;
    if( callback == undefined )
      callback = doNothing;

    $( seletorToBeScrolled ).animate(
    {
        scrollLeft: positionToScrollX
    }, 
    scrollAnimationTime,
    callback
    );
}

function scrollToSeletorXY( seletor, scrollAnimationTime, callback, seletorToBeScrolled )
{
    var offset = $( seletor ).offset();
    console.log( offset );
    var positionToScrollY = offset.top;
    var positionToScrollX = offset.left;

    if( seletorToBeScrolled == undefined )
      seletorToBeScrolled = 'html, body';
    else
    {
      positionToScrollY += $( seletorToBeScrolled ).scrollTop();
      positionToScrollX += $( seletorToBeScrolled ).scrollLeft();
    }

    if( scrollAnimationTime == undefined )
      scrollAnimationTime = 600;
    if( callback == undefined )
      callback = doNothing;

    $( seletorToBeScrolled ).animate(
    {
        scrollTop: positionToScrollY,
        scrollLeft: positionToScrollX
    }, 
    scrollAnimationTime,
    callback
    );
}

function applyElementBlur( selector, callback, restrictSelector )
{
  $("body").click(function(e) 
  {
      var x = e.target;

      if( $(x).closest( selector ).length <= 0 )
      {
        if( restrictSelector != undefined )
        {
          if( $(x).closest( restrictSelector ).length > 0 )
            return;
        }

        callback();
      }
  });
}

function spanInputClickHandler( selector )
{
  var element = $( selector ).find( 'input' );

  if( element.attr( 'type' ) == 'radio' )
    element.prop( 'checked', true ).trigger('change');
  else
    element.focus();
}


//form

// Arguments :
//  method : 'GET'|'POST'
//  target : an optional opening target (a name, or "_blank"), defaults to "_self"
function OpenRequestInNewTab(method, url, data, target) 
{
  var form = document.createElement("form");
  form.action = url;
  form.method = method;
  form.target = target || "_self";
  if (data) {
    for (var key in data) {
      var input = document.createElement("textarea");
      input.name = key;
      input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
      form.appendChild(input);
    }
  }
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();
};


//selection

function selectText( element ) 
{
    //var text = document.getElementById(element);
    var browser = getNavigator()[0];

    if( browser == 'Msie' )
    {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } 
    else if( browser == 'Firefox' || browser == 'opera' || browser == 'Chrome' ) 
    {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    } 
    else if ( browser == 'Safari' ) 
    {
        var selection = window.getSelection();
        selection.setBaseAndExtent(element, 0, element, 1);
    }
}


//copy

function createTextNode( str, parentNode, tagName )
{
    if( tagName == undefined )
      tagName = 'pre';
  
  newNode = document.createElement( tagName );
  newNode.appendChild(document.createTextNode( str ));

  if(parentNode != undefined)
    parentNode.append( newNode );
  
  return newNode;
}

function createTextRange( str, parentNode )
{
  var range = document.createRange();
  newNode = createTextNode( str, parentNode );
  newNode.appendChild(document.createTextNode( str ));
  range.selectNode( newNode );
  range.insertNode( newNode );
  
  return range;
}

function createElementRange( element )
{
  var range = document.createRange();
  range.selectNode( element );
  range.insertNode( element );
  
  return range;
}

function copyRangeToClipboard( range )
{
  window.getSelection().addRange(range);
  document.execCommand('Copy'); 
}

function textToClipboad( str )
{
  var el = createTextNode( str, document.body );
  var range = createElementRange( el );
  copyRangeToClipboard( range );
}

function textToElementSelected( str )
{
  var el = createTextNode( str, document.body );
  selectText( el );
}

function clearClipboardRanges( )
{
  clearClipboardRanges();
  
  window.getSelection().empty();
  //window.getSelection().removeAllRanges();
}


//jquery

function getAttributeArr( selector, attribute )
{
  var arrToReturn = [];

  $( selector ).each( function( index, element )
  {
    arrToReturn.push( element.getAttribute( attribute ) );
  });

  return arrToReturn;
}


//misc

function isCelular( strPhone )
{
  var numbersStr = getNumbers( strPhone, false );
  var firstDigit = numbersStr.substr(-8,1);
  if( firstDigit > 7 )
    return true

  return false;
}

function isNumeric( val )
{
  if( val == null )
    return false;
  else
    return !isNaN( val );
}

function measure(lat1, lon1, lat2, lon2)  // generally used geo measurement function
{
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d * 1000; // meters
}

function sizeLossCalc( size, proportion )
{
  var dimLoss = '';
  var lostedPixels = 0;
  var idealSize = 0;

  var actualProportion = size.width / size.height;

  if( actualProportion > proportion )
  {
    dimLoss = 'height';
    idealSize = size.width / proportion;
    lostedPixels = idealSize - size.height;
  }
  else
  {
    dimLoss = 'width';
    idealSize = size.height * proportion;
    lostedPixels = idealSize - size.width;
  } 

  return { dimLoss: dimLoss, lostedPixels: lostedPixels };
}

function getFileName( filepath )
{
  var arrFilePath = filepath.split('/');
  if( arrFilePath.length == '' )
    return '';

  var filename = arrFilePath.pop();

  return filename;
}

function getFileExtension( filepath )
{
  var arrFilePath = filepath.split('/');
  if( arrFilePath.length == '' )
    return '';

  var filename = arrFilePath.pop();

  var arrFilename = filename.split('.');
  if( arrFilename.length == '' )
    return '';
  
  var extension = arrFilename.pop();
  
  return extension;
}

function somarVersao( versao, add )
{
  var arrToReturn = [];
  var arrVersao = versao.split('.');
  var arrAdd = add.split('.');

  console.log(arrVersao);
  console.log(arrAdd);

  for( var i = 0; i < arrVersao.length; i++ )
  {
    if( i < arrAdd.length )
      arrToReturn.push( parseInt( arrVersao[i] ) + parseInt( arrAdd[i] ) );
    else
      arrToReturn.push( parseInt( arrVersao[i] ) );
  }

  console.log(arrToReturn);

  return arrToReturn.join('.');
}

function getNavigator()
{
  var N= navigator.appName, ua= navigator.userAgent, tem;

    // if IE11+
    if (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(ua) !== null) {
        var M= ["Internet Explorer"];
        if(M && (tem= ua.match(/rv:([0-9]{1,}[\.0-9]{0,})/))!= null) M[2]= tem[1];
        M= M? [M[0], M[2]]: [N, navigator.appVersion,'-?'];
        return M;
    }

    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
    return M;
}

function getWindowInnerSize() 
{    
  var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  return { 'height': height, 'width': width };
}

function getPageNameFromUrl( url )
{
  //var url = 'http://localhost/matrix/user.php';
  var pos = url.lastIndexOf( '/' );
  var strToReturn = url.substring( pos + 1 );

  return strToReturn;
}

function getIsOnline()
{
  return navigator.onLine;
}

function getIsLocalhost()
{
  var domain = location.host;
  if( domain.indexOf( '10.0.0.' ) == 0 || domain.indexOf( '192.168.0.' ) == 0 || domain.indexOf( 'localhost' ) == 0 )
    return true;

  return false;
}

function getBasepath()
{
  var strToReturn = '';

  strToReturn += location.protocol+'//';
  strToReturn += location.host+'/';
  if( getIsLocalhost() )
    strToReturn += 'matrix'+'/';

  return strToReturn;
}

function getIsMobile()
{
  var isMobile = false;
  if( screen.width <= 480 || screen.height <= 480 )
    isMobile = true;

  return isMobile;
}

function createDebug()
{
  $('body').append( '<div id="debug"></div>' );
}

function showConsoleDebug()
{
  var oldLog = console.log;
  console.log = function (message) 
  {
      var messageToDebug = toString( message, '<br>' );
      $('#debug').append( messageToDebug ); 
      //$('#debug').append( toString( arguments, '<br>' ) );

      oldLog.apply(console, arguments);
  };
}

function stopEvent(event)
{
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}

function wait()
{
    $("body").css("cursor", "progress");
}

function stopWait()
{
    $("body").css("cursor", "default");
}

function doNothing()
{
  
}

function getValueSimNaoToBool( value )
{
  if( value == '' )
    return value;

  if( value == 'Sim' || value == 'sim' )
    return true;
  else
    return false;
}

//disorder
