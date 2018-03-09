<?php

class Util
{
	public static $fileCryptPassword = '4$P!;aK~~4+R<G,3_%H)2/8q5';
	public static $locationIQKey = '7pu7cw666nz6ifviophuncs5z';

	public static $recaptchasSecret = array(
        'login' => 'valordachave',
    );

    public static $userByDomain = array(
    	"crater31.tk" => "crater",
    );

    public static $modRewriteUsers = array(
    	"crater"
    );

    public static $startFunctionByUser = array(
    	"crater" => "site",
    );

    public static $sslByUser = array(
    	"crater" => TRUE,
    );

    public static $defaultField = array(
      'Name' => 'default',
      'Label' => 'Default',
      'SheetName' => '',
      'FunctionName' => '',
      'Type' => 'text',
      'DataSourceSheet' => '',
      'DataSourceColumn' => '',
      'DataSourceCsv' => '',
      'Required' => '0',
      'DefaultValue' => ''
    );

	public static $daysWeek = array( "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" );

	public static function cmp($a, $b, $keyCompare)
	{
    	return strcmp($a[$keyCompare], $b[$keyCompare]);
	}

	public static function cmpNumber($a, $b, $keyCompare)
	{
		return intval( $a[$keyCompare] ) > intval( $b[$keyCompare] );
	}

	public static function cmpXlsDate($a, $b, $keyCompare)
	{
		return toDate( $a[$keyCompare] ) > toDate( $b[$keyCompare] );
	}
}


//string

function getNumbers( $str )
{
	$result = filter_var($str, FILTER_SANITIZE_NUMBER_INT);
	$result = str_replace('-','',$result);
	return $result;
}

function filepathToArrAssoc( $filepath )
{
	$dirSeparator = "/";
	if( strstr( $filepath, "\\" ) !== FALSE )
		$dirSeparator = "\\";

	$pathArr = explode( $dirSeparator, $filepath );

	$lastIndex = count( $pathArr ) - 1;
	$fileFullName = $pathArr[ $lastIndex ];

	$fileFullNameArr = explode( '.', $fileFullName );	//nao funciona para doubleExtension
	$fileName = $fileFullNameArr[ 0 ];
	$fileExtension = $fileFullNameArr[ 1 ];

	return array( 
		'path' => $pathArr,
		'fileFullName' => $fileFullName,
		'fileName' => $fileName,
		'fileExtension' => $fileExtension,
	);
}

function splitStringBySize( $str, $qtdChars )
{
	$arrToReturn = array();

	for( $i = 0; $i < strlen( $str ); $i += $qtdChars )
		$arrToReturn[] = substr( $str, $i, $qtdChars );

	return $arrToReturn;
}

function lwUcFirst($str)
{
	$str = mb_strtolower($str,'UTF-8');

	return ucfirst(strtolower($str));
}

function doisNomes($str)
{
	$arrStr = explode(' ', $str);
	return lwUcFirst($arrStr[0]).' '.lwUcFirst($arrStr[1]);
}

function echoBr( $str )
{
	echo $str.'<br>';
}

function tirarTracoEspaco( $str )
{
	$str = str_replace(' ', '', $str);
	return str_replace('-', '', $str);
}

function tirarAcentos($string)
{
    return preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/","/(ç)/","/(Ç)/"),explode(" ","a A e E i I o O u U n N c C"),$string);
}

function toSlug( $string )
{
	$string = tirarAcentos( $string );
	$string = preg_replace( array("/(\.| |\/|\_|,|:|;)/"), array('-'), $string );
	//·|/|_|,|:|;
	return $string;
}

function tirarAcentos2( $string )
{
	return iconv('UTF-8', 'ASCII//TRANSLIT', $string); 
}


//money

function moneyToDouble( $strMoney )
{
	$valueToReturn = $strMoney;

	if( substr($valueToReturn, -3, 1) == ',' )
    {
      $valueToReturn = str_replace( '.', '', $valueToReturn );
      $valueToReturn = str_replace( ',', '.', $valueToReturn );
    }
    else if( substr($valueToReturn, -3, 1) == '.' )
      $valueToReturn = str_replace( ',', '', $valueToReturn );
  	else if( $valueToReturn == '' )
  	  $valueToReturn = 0;

	return $valueToReturn;
}

function trocarVirgulaPonto( $str )
{
	return str_replace(',', '.', $str);
}

function doubleToMoney( $double )
{
	return number_format($double, 2, ',', '.');
}


//arrays

function csvFileToArray( $filepath, $fields = NULL, $columnSeparator = ";", $lineSeparator = "\n" )
{
	$str = file_get_contents( $filepath );
	$csvRows = str_getcsv( $str, $lineSeparator );

	$csvData = array();
	foreach($csvRows as $row) 
		$csvData[] = str_getcsv( $row, $columnSeparator );

	if( $fields !== NULL )
	{
		$i = 0;
		if( !is_array( $fields ) )
			$fields = $csvData[ $i++ ];

		$arrToReturn = array();
		for( ; $i < count( $csvData ); $i++ )
			$arrToReturn[] = array_combine( $fields, $csvData[ $i ] );

		return $arrToReturn;
	}

	return $csvData;
}

function matchSubstringArrInStr( $subStrArr, $str )
{
	for( $i = 0; $i < count( $subStrArr ); $i++ )
	{
		$strToCompare = $subStrArr[$i];
		if( strstr( $str, $strToCompare ) !== FALSE )
			return $strToCompare;
	}

	return "";
}

function issetNotEmpty( $var )
{
	return !empty( $var );
}

function issetNotEmptyKeys( $arr, $keys )
{
	foreach( $keys as $key )
	{
		if( empty( $arr[ $key ] ) )
			return false;
	}

	return true;
}

function strFromArrByCsvKeys($keys, $arrAssoc)
{
    $strReturn = '';
 
    foreach ($keys as $key) 
    {
        $strReturn .= $arrAssoc[ $key ];
    }

    return $strReturn;
}

function arrReplaceKeys(array $array, array $replacements, $preserveOldKeys = false) 
{
    foreach ($replacements as $old => $new) 
    {
        if(array_key_exists($old, $array))
        {
            $array[$new] = $array[$old];
            if( $preserveOldKeys === false )
                unset($array[$old]);
        }
    }
    return $array;
}

function matrixReplaceKeys( array $matrix, array $replacements, $preserveOldKeys = false )
{
	$arrToReturn = array();

	foreach( $matrix as $array )
	{
		$arrToReturn[] = arrReplaceKeys( $array, $replacements, $preserveOldKeys );
	}

	return $arrToReturn;
}

function arrAssocCombineToArr( $arr1, $arr2 )
{
	$arrRetorno = array();
	
	for( $i = 0; $i < count( $arr1 ); $i++ )
	{
		$key = $arr1[ $i ];
		$value = $arr2[ $i ];
		$arrRetorno[ $i ][ $key ] = $value;
	}

	return $arrRetorno;
}

function matrixRegistroMerge( $matrix, $registro )
{
	return array_map( 
		function( $matrixItem ) use( $registro )
		{
			return array_merge( $matrixItem, $registro ); 
		},
		$matrix 
	);
}

function dictToMatrix( $dict, $keyName, $keyValue )
{
	$matrix = array();

	foreach( $dict as $key => $value )
	{
		$newRegistro = array();
		$newRegistro[ $keyName ] = $key;
		$newRegistro[ $keyValue ] = $value;
		$matrix[] = $newRegistro;
	}
	
	return $matrix;	
}

function arrAssocToDict( $arr, $key, $field = '', $unique = FALSE )
{
    $arrToReturn = array();
    
    foreach( $arr as $item )
    {
        if( !isset( $arrToReturn[ $item[$key] ] ) )
        {
        	if( !$unique )
            	$arrToReturn[ $item[$key] ] = array();
        }

        if( $field != '' )
            $valueToStore = $item[ $field ];
        else
            $valueToStore = $item;

        if( !$unique )
        	$arrToReturn[ $item[$key] ][] = $valueToStore;
        else
        	$arrToReturn[ $item[$key] ] = $valueToStore;
    }

    return $arrToReturn;
}

function arrAssocToTable( $arr, $numberOfColumns, $registroJoin = array(), $prefixColumns = 'c', $skipEmpty = FALSE )
{
	$tableToReturn = array();

	$i = 0;
	foreach( $arr as $field => $value )
	{
		if( is_array( $value ) )
		{
			$pair = each( $value );
			$field = $pair[ 'key' ];
			$value = $pair[ 'value' ];
		}

		if( $skipEmpty && $value == '' )
			continue;

		$linha = intval( $i / $numberOfColumns );

		//var_dump( $i );
		//var_dump( $numberOfColumns );
		
		if( !isset( $tableToReturn[ $linha ] ) )
		{
			$newRegistro = $registroJoin;
			for( $j = 0; $j < $numberOfColumns; $j++ )
				$newRegistro[ $prefixColumns.$j ] = '';
			$tableToReturn[] = $newRegistro;
		}

		$tableToReturn[ $linha ][ $prefixColumns.( $i++ % $numberOfColumns ) ] = $field.': '.$value;
	}
	
	return $tableToReturn;
}

function getColumnsValue( $columns, $keyValue )
{
	$arrRetorno = array();

	foreach( $columns as $column )
		$arrRetorno[] = $column[ $keyValue ];

	return $arrRetorno;
}

/**
	 * Returns an array containing all the entries from array1 whose keys are not present in any of the other arrays when using their values as keys.
	 * @param array $array1 The array to compare from
	 * @param array $array2 The array to compare against
	 * @return array $array2,... More arrays to compare against
 */

function array_blacklist_assoc(array $array1, array $array2) 
{
    if(func_num_args() > 2)
    {
        $args = func_get_args();
        array_shift($args);
        $array2 = call_user_func_array('array_merge', $args);
    } 
    return array_diff_key($array1, array_flip($array2));
}

function array_blacklist_assoc_clear(array $array1, array $array2) 
{
    $arrToReturn = $array1;
    foreach( $array1 as $key => $value )
    {
    	if( in_array( $key, $array2 ) )
    		$arrToReturn[ $key ] = '';
    }

    return $arrToReturn;
}

function addRowArrAssoc( $arr, $row = array() )
{
	$qtd = count( $arr );
	if( $qtd > 0 )
	{
		$keys = array_keys( $arr[ $qtd - 1 ] );
		$arr[] = array_combine( $keys, array_pad( $row, count( $keys ), '' ) );
	}
	
	return $arr;
}

function arrChosedKeys( $arr, $keys )
{
	$arrToReturn = array();

	foreach( $arr as $key => $value )
	{
		if( in_array( $key, $keys ) )
			$arrToReturn[ $key ] = $value;
	}

	return $arrToReturn;
}

//format arrays

function addTitleRowToArrAssoc( $arrAssoc )
{
	$keys = array_keys( $arrAssoc[0] );
	array_unshift( $arrAssoc, array_combine( $keys, $keys ) );

	return $arrAssoc;
}

function rowAssocToTabbedArr( $row )
{
	return implode("&#9;", array_values( $row ) );
}

function arrAssocToHtmlTable( $arrRetorno, $showTitle = false )
{
	$strToReturn = '';

	$strToReturn .= '<table>';

	$strToReturn .= '<tr><td>';

	//var_dump( $showTitle && count( $arrRetorno ) > 0 );

	if( $showTitle && count( $arrRetorno ) > 0 )
		$strToReturn .= implode("</td><td>", array_keys( $arrRetorno[0] ) );

	$strToReturn .= '</td></tr>';

	foreach ($arrRetorno as $dados) 
	{
		$strToReturn .= '<tr><td>';
		$strToReturn .= implode("</td><td>", array_values( $dados ) );		//tabulacao
		$strToReturn .= '</td></tr>';
	}

	$strToReturn .= '</table>';

	return $strToReturn;
}

function arrAssocToTabbedArr( $arrRetorno, $showTitle = false )
{
	$arrFormated = array();

	//var_dump( $showTitle && count( $arrRetorno ) > 0 );

	if( $showTitle && count( $arrRetorno ) > 0 )
		$arrFormated[] = implode("&#9;", array_keys( $arrRetorno[0] ) );

	foreach ($arrRetorno as $dados) 
	{
		$arrFormated[] = implode("&#9;", array_values( $dados ) );		//tabulacao
	}

	return $arrFormated;
}


//misc programming

function get_func_argNames($funcName) 
{
    $f = new ReflectionFunction($funcName);
    $result = array();
    foreach ($f->getParameters() as $param)
    	$result[] = $param->name;   

    return $result;
}


//filesystem

function carregarJsons( $arrJsonFilenames )
{
	$arrRetorno = array();

	for( $i=0; $i < count($arrJsonFilenames); $i++ )
	{
		$path = 'json';
		$filename = utf8_decode( $arrJsonFilenames[$i] ).'.json';

		if( !file_exists( $path.'/'.$filename ) )
			continue;

		$str = file_get_contents( $path.'/'.$filename );
		$matrix = json_decode($str,true);
		$arrRetorno = array_merge($arrRetorno, $matrix);
	}

	return $arrRetorno;
}

function createTempFilename( )
{
	$tempDir = sys_get_temp_dir();
	$tempFilepath = tempnam( $tempDir, 'plan');
	
	if( !$tempFilepath )
	{
		echo 'Erro interno na criacao de arquivo temporario';	//Nao conseguiu criar arquivo
		exit;
	}

	return $tempFilepath;
}


//date

function dateTimeNow()
{
	return date("Y-m-d H:i:s");
}

function formataData( $date, $dateFormat )
{
	return date($dateFormat, strtotime($date));
}

function formatedDateToDate( $str, $returnString = TRUE )
{
	if( strlen($str) == 8 )
	{
		$fimAno = substr($str, 6, 2);
		if( $fimAno < 20 )
			$ano = '20'.$fimAno;
		else
			$ano = '19'.$fimAno;
	}
	else
		$ano = substr($str, 6, 4);
	$mes = substr($str, 3, 2);
	$dia = substr($str, 0, 2);

	if( $returnString )
		return $ano.'-'.$mes.'-'.$dia;
	else
		return array( 'ano' => $ano, 'mes' => $mes, 'dia' => $dia );
}

function toDate( $str, $returnString = TRUE )
{
	if( strlen($str) == 8 )
	{
		$fimAno = substr($str, 6, 2);
		if( $fimAno < 20 )
			$ano = '20'.$fimAno;
		else
			$ano = '19'.$fimAno;
	}
	else
		$ano = substr($str, 6, 4);
	$mes = substr($str, 0, 2);
	$dia = substr($str, 3, 2);

	if( $returnString )
		return $ano.'-'.$mes.'-'.$dia;
	else
		return array( 'ano' => $ano, 'mes' => $mes, 'dia' => $dia );
}

function toXlsDate( $ano, $mes, $dia )
{
	$mes = intval( $mes );
	$dia = intval( $dia );

	if( strlen( $ano ) == 4 )
		$ano = substr($ano, 2, 2);
	if( $mes < 10 )
		$mes = '0'.$mes;
	if( $dia < 10 )
		$dia = '0'.$dia;

	return $mes.'-'.$dia.'-'.$ano;
}

function toFormatedDate( $ano, $mes, $dia )
{
	$mes = intval( $mes );
	$dia = intval( $dia );

	if( strlen( $ano ) != 4 )
	{
		if( $ano < 20 )
			$ano = '20'.$ano;
		else
			$ano = '19'.$ano;
	}
	if( $mes < 10 )
		$mes = '0'.$mes;
	if( $dia < 10 )
		$dia = '0'.$dia;

	return $dia.'/'.$mes.'/'.$ano;
}

function strToXlsDate( $dateStr )
{
	$arrDate = explode( '-', $dateStr );
	
	return toXlsDate( $arrDate[0], $arrDate[1], $arrDate[2] );
}

function xlsToFormatedDate( $dateStr )
{
	$arrDate = explode( '-', $dateStr );
	
	return toFormatedDate( $arrDate[2], $arrDate[0], $arrDate[1] );
}

function strToFormatedDate( $dateStr )
{
	$arrDate = explode( '-', $dateStr );
	
	return toFormatedDate( $arrDate[0], $arrDate[1], $arrDate[2] );
}

function qtdDaysMonth( $month, $year )
{
    return cal_days_in_month(CAL_GREGORIAN, $month, $year );
}

function dayOfWeek( $year, $month, $day )
{
    $date = new DateTime( $year.'-'.$month.'-'.$day );
    return $date->format("w");
}

function xlsDateToIdade( $dateStr )
{
	if( $dateStr == '' )
		return '';

	$formatedData = xlsToFormatedDate( $dateStr );
	$arrDate = explode( '/', $formatedData );
	
	return intval( date("Y") ) - intval( $arrDate[2] );
}

function somarData( $date, $qtd, $timeTypeAdd = 'days' )
{
    $dateFormat = 'Y-m-d';
    if( strpos( $date, 'T' ) !== FALSE )
        $dateFormat .= '\TH:i:s';

	if( strstr($qtd, '.') ) //is_float($qtd) )
    {
    	//$intPart = intval( $qtd );
    	//$decimalPart = $qtd - $intPart;

	    switch ($timeTypeAdd) 
	    {
	    	case 'hours':
	    		$timeTypeAdd = 'minutes';
	    		$qtd = intval( $qtd * 60 );
	    		break;
	    	default:
	    		$qtd = intval( $qtd );
	    		break;
	    }
    }

    return date($dateFormat, strtotime( "+".$qtd." ".$timeTypeAdd,strtotime($date) ) );
}

function somarDataStr( $date, $qtdStr )
{
	$dict = array(
		'dias' => 'days',
		'horas' => 'hours',
		'mins' => 'minutes',
	);

	$qtdStrArr = explode( ' ', $qtdStr );
	$qtd = $qtdStrArr[0];
	$timeTypeAdd = $dict[ $qtdStrArr[1] ];
    
    return somarData( $date, $qtd, $timeTypeAdd );
}

function timestamp( $inMili = false )
{
	if( $inMili )
		return microtime();
	else
		return time();
}


//file

/*
function remote_filesize($url) 
{
  $remoteFile = $url;
  $ch = curl_init($remoteFile);
  curl_setopt($ch, CURLOPT_NOBODY, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, true);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); //not necessary unless the file redirects (like the PHP example we're using here)
  $data = curl_exec($ch);
  curl_close($ch);
  if ($data === false) {
    echo 'cURL failed';
    exit;
  }

  $contentLength = 'unknown';
  $status = 'unknown';
  if (preg_match('/^HTTP\/1\.[01] (\d\d\d)/', $data, $matches)) {
    $status = (int)$matches[1];
  }
  if (preg_match('/Content-Length: (\d+)/', $data, $matches)) {
    $contentLength = (int)$matches[1];
  }

  //echo 'HTTP Status: ' . $status . "\n";
  //echo 'Content-Length: ' . $contentLength;
  return $contentLength;
}
*/

function remote_filesize($url) {
    static $regex = '/^Content-Length: *+\K\d++$/im';
    if (!$fp = @fopen($url, 'rb')) {
        return false;
    }
    if (
        isset($http_response_header) &&
        preg_match($regex, implode("\n", $http_response_header), $matches)
    ) {
        return (int)$matches[0];
    }
    return strlen(stream_get_contents($fp));
}


//cript, hash... etc

function getRandomNumber( $max = NULL, $min = NULL )
{
	if( $min == NULL && $max == NULL )
		return mt_rand();
	else if( $min == NULL )
		return mt_rand( 0, $max );
	else
		return mt_rand( $min, $max );
}

function getRandomNumericCode( $size )
{
	$randomNumber = getRandomNumber( pow( 10, $size ) - 1 );
	return str_pad( $randomNumber, $size, "0", STR_PAD_LEFT );
}


//browser identification

function isIphone($user_agent=NULL) 
{
    if(!isset($user_agent)) {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    }
    $result = (strpos($user_agent, 'iPhone') !== FALSE) || (strstr($_SERVER['HTTP_USER_AGENT'],'iPod')!== FALSE) || (strstr($_SERVER['HTTP_USER_AGENT'],'iPad')!== FALSE);
    
    return $result;
}

function isiOS7($user_agent=NULL) 
{
    if(!isset($user_agent)) {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    }
    $result = (strpos($user_agent, 'OS 7') !== FALSE);
    
    return $result;
}

function isiOS8($user_agent=NULL) 
{
    if(!isset($user_agent)) {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    }
    $result = (strpos($user_agent, 'OS 8') !== FALSE);
    
    return $result;
}

function isMobileSafari($user_agent=NULL) 
{
    if(!isset($user_agent)) {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    }

    # Please note: Chrome for iPhone reports 'CriOS' instead of 'Version' in it's user agent string and as of Feb 2013 Chrome for iPhone
    # does not support either vCard (.vcf) or vCalendar (.ics) file types - that's even worse than Mobile Safari - shame on you Google!!!
    $result1 = strstr($user_agent, "AppleWebKit/");
    $result2 = strstr($user_agent, "Mobile/");
    $result3 = strstr($user_agent, "Safari/");
    $result4 = strstr($user_agent, "Version/");
    $result = $result1 && $result2 && $result3 && $result4;
    
    return $result;
}


//otherLibs

function isCelular( $str )
{
	$result = getNumbers($str);
	$firstDigit = substr($result,-8,1);
	if( $firstDigit > 7 )
		return TRUE;

	return FALSE;
}

function isTelefone( $str )
{
	$result = getNumbers($str);
	if( strlen( $result ) < 8 )
		return FALSE;

	return TRUE;
}

function processarTelefone( $strTelefone )
{
	$telefoneArr = explode(' (', $strTelefone);
	$arrToReturn = array( 'telefones' => array(), 'celulares' => array() );

	for( $i = 0; $i < count( $telefoneArr ); $i++ )
	{
		$telefone = $telefoneArr[ $i ];

		if( !isTelefone( $telefone ) )
			continue;

		if( isCelular( $telefone ) )
			$arrToReturn['celulares'][] = $telefone;
		else
			$arrToReturn['telefones'][] = $telefone;
	}

	return $arrToReturn;
}

function tryJsonConvert( $str, $forceArr = FALSE )
{
	$json = json_decode( $str );
	
	if( $json )
    	return $json;
    else if( $forceArr )
    	return array( $str );

    return $str;
}

function isMultiArray( $var )
{
	if( is_array( $var ) && is_array( $var[ 0 ] ) )
		return TRUE;

	return FALSE;
}

function forceArr( $var )
{
	if( !is_array( $var ) )
		return array( $var );

	return $var;
}

function paramsGeolocationToUrl( $destLat, $destLon, $myLat = '', $myLon = '' )
{
    $geolocationUrlToOpen = 'https://www.google.com.br/maps/dir/';

    if( $myLat == '' )
        $geolocationUrlToOpen .= '/';
    else
        $geolocationUrlToOpen .= $myLat.','.$myLon.'/';

    $geolocationUrlToOpen .= $destLat.','.$destLon.'/';

    return $geolocationUrlToOpen;
}

function isLocalhost()
{
	if( 
		strstr( "localhost", $_SERVER["HTTP_HOST"] ) || 
		strstr( $_SERVER["HTTP_HOST"], "192.168.0." ) || 
		strstr( $_SERVER["HTTP_HOST"], "10.0.0." )
	)
	{
		return true;
	}

	return false;
}

function isLocalhostAdress()
{
	if( 
		$_SERVER['SERVER_ADDR'] == '::1' || 
		strstr( $_SERVER["SERVER_ADDR"], "192.168.25." ) || 
		strstr( $_SERVER["SERVER_ADDR"], "192.168.0." ) || 
		strstr( $_SERVER["SERVER_ADDR"], "10.0.0." )
	)
	{
		return true;
	}

	return false;
}

function getBasepath()
{
	$strToReturn = '';

	//protocol
	$protocol = isset( $_SERVER['HTTPS'] )?'https://':'http://';
	$strToReturn .= $protocol;
	//host
	$strToReturn .= $_SERVER['SERVER_NAME'].'/';

	if( isLocalhost() )
		$strToReturn .= 'matrix/';

	return $strToReturn;
}

function checkCaptchaGoogle( $privatekey )
{
	//return $_SERVER['SERVER_ADDR'];		//::1	138.68.42.229
	if( isLocalhostAdress() )	//$_SERVER['SERVER_ADDR'] != '138.68.42.229' )
		return 0;

	//$recaptcha = new ReCaptcha($privatekey);
	//$resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER["REMOTE_ADDR"]);

	//var_dump( $resp );
	//var_dump( $resp->isSuccess() );

  if( $resp->isSuccess() ) 
  {
    return 0;
  } 
  else 
  {
    // What happens when the CAPTCHA was entered incorrectly
    return "O reCAPTCHA não foi preenchido corretamente. Tente novamente."; // ."(reCAPTCHA códigos de erro: " . implode( ', ', $resp->getErrorCodes() . ")";		//https://developers.google.com/recaptcha/docs/verify#error-code-reference
  }

}
