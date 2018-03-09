<?php

function getAllDirs( $excludingDirs, $dirs = array(''), $initialDirs = array() )
{
	if( count( $initialDirs ) == 0 )
		$initialDirs = $dirs;

	$newDirs = array();

	foreach( $dirs as $dir )
	{
		$prefix = '';
		if( $dir != '' )
			$prefix = $dir.'/';

		$newDirs = array_merge( $newDirs, array_filter(glob( $prefix.'*' ), 'is_dir') );
	}

	if( count( $newDirs ) == 0 )
	{
		$dirsReturn = array_merge( $newDirs, $initialDirs );
		return $dirsReturn;
	}
	else
	{
		$newDirs = excludeDirByPath( $excludingDirs, $newDirs );
		$dirsReturn = array_merge( $newDirs, $initialDirs );

		return getAllDirs( $excludingDirs, $newDirs, $dirsReturn );
	}
}

function getFilesFromDir( $dirname = '', $extension = '' )
{
	$prefix = '';
	if( $dirname != '' )
		$prefix = $dirname.'/';

	$prefix.'*';

	return array_filter(glob( $prefix.'*'.$extension ), 'is_file');
}

function getAllFilesFromPaths( $dirs )
{
	$files = array();
	
	foreach( $dirs as $dir )
	{
		$files = array_merge( $files, getFilesFromDir( $dir ) );
	}

	return $files;
}

function excludeDirByPath( $excludedPaths, $dirs )
{
	foreach( $excludedPaths as $excludedPath )
	{
		$arrKey = array_search( $excludedPath, $dirs );
		if( $arrKey )
			unset( $dirs[$arrKey] );
	}

	return $dirs;
}

function excludeFileByPath( $excludedFiles, $files )
{
	foreach( $excludedFiles as $excludedFile )
	{
		$arrKey = array_search( $excludedFile, $files );
		if( $arrKey )
			unset( $files[$arrKey] );
	}

	return $files;
}

function excludeFilesByExtension( $excludedExtensions, $files )
{
	$filesReturn = array();
	
	foreach( $excludedExtensions as $excludedExtension )
	{
		$filesReturn = array_merge( $filesReturn, preg_grep("/\.$excludedExtension$/", $files, PREG_GREP_INVERT) );
	}

	return $filesReturn;
}

function ziparFilepaths( $filename, $files, $maintainPath = TRUE )
{
	$retorno = false;
	$zip = new ZipArchive();

	if ($zip->open($filename, ZIPARCHIVE::CREATE)!==TRUE)
    	exit("cannot open <$filename>\n");

    foreach( $files as $file )
	{
		if( $maintainPath )
    		$zip->addFile( $file );
    	else
    		$zip->addFile( $file, basename( $file ) );
    }

    if( $zip->numFiles == count( $files ) )
    	$retorno = true;

    $zip->close();

    return $retorno;
}
