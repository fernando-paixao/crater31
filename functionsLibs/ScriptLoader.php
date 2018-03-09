<?php

require_once( 'functionsLibs/Util.php' );

class ScriptLoader
{
	public static function buildFileVersions()
	{
		$objToReturn = array(
			"includes/Util.js" => 5,
			'includes/UtilCrateris.js' => 2,
			"includes/MindmapUtil.js" => 1,
			"includes/Mindmup.js" => 1,
			"includes/Screenshot.js?" => 2,
			'includes/SlickGridEditors.js' => 1,

			'includesPages/site.min.js' => 5,
  			'includesPages/carrinho.min.js' => 6,

  			'includesPages/galeria.min.js' => 1,

			"includesPages/mindmap.min.js" => 1,
			'includesPages/categorize.js' => 1,
			'includesPages/categorize2.js' => 1,

			'includesPages/dionizioOperacoes.js' => 4,

			'includesLibs/galleria/themes/classic/galleria.classic.min.js' => 1,

			'includesLibs/sweetalert/dist/sweetalert.css' => 1,
		  	'includesLibs/sweetalert/dist/sweetalert.min.js' => 1
		);

		return $objToReturn;
	}	

	public static function buildNamespaces()
	{
		$scriptsLoaderFilesByNamespace = array();


		//components

		$scriptsLoaderFilesByNamespace['datepicker'] = array(
			'includesLibs/SlickGrid-2.3.0/lib/datepicker-pt-BR.js'
		);

		$scriptsLoaderFilesByNamespace['timerjs'] = array(
			'includesLibs/timer.js'
		);

		$scriptsLoaderFilesByNamespace['inputmask'] = array(
			'includesLibs/Inputmask-3/dist/min/jquery.inputmask.bundle.min.js'
		);

		$scriptsLoaderFilesByNamespace['jquerymask'] = array(
			'includesLibs/jQuery-Mask-Plugin/dist/jquery.mask.min.js'
		);

		$scriptsLoaderFilesByNamespace['select2'] = array(
			'includesLibs/select2-4.0.2/dist/css/select2.min.css',
			'includesLibs/select2-4.0.2/dist/js/select2.min.js'
		);		

		$scriptsLoaderFilesByNamespace['jquerycontextmenu'] = array(
			'includesLibs/jQuery-contextMenu/dist/jquery.ui.position.min.js',
			'includesLibs/jQuery-contextMenu/dist/jquery.contextMenu.min.js',

			'includesLibs/jQuery-contextMenu/dist/jquery.contextMenu.min.css'
		);

		$scriptsLoaderFilesByNamespace['jqueryui'] = array(
			"includesLibs/SlickGrid-2.3.0/lib/firebugx.js",
			"includesLibs/SlickGrid-2.3.0/lib/jquery-1.11.2.min.js",//maybe not necessary
			"includesLibs/SlickGrid-2.3.0/lib/jquery-ui-1.11.3.min.js",
			"includesLibs/SlickGrid-2.3.0/lib/jquery.event.drag-2.3.0.js",

			'includesLibs/SlickGrid-2.3.0/css/smoothness/jquery-ui-1.11.3.custom.css'
		);

		$scriptsLoaderFilesByNamespace['slickgrid'] = array(			
			'includesLibs/SlickGrid-2.3.0/slick.core.js',
			'includesLibs/SlickGrid-2.3.0/slick.editors.js',
			'includesLibs/SlickGrid-2.3.0/slick.grid.js',
			
			'includesLibs/SlickGrid-2.3.0/plugins/slick.autotooltips.js',
			'includesLibs/SlickGrid-2.3.0/plugins/slick.cellrangedecorator.js',
			'includesLibs/SlickGrid-2.3.0/plugins/slick.cellrangeselector.js',
			'includesLibs/SlickGrid-2.3.0/plugins/slick.cellcopymanager.js',
			'includesLibs/SlickGrid-2.3.0/plugins/slick.cellselectionmodel.js',

			'includesLibs/SlickGrid-2.3.0/slick.grid.css',
			'includesLibs/SlickGrid-2.3.0/examples/examples.css'
		);

		$scriptsLoaderFilesByNamespace['fullcalendar'] = array(
		  'includesLibs/fullcalendar-3.3.0/fullcalendar.css',
		  'includesLibs/fullcalendar-3.3.0/fullcalendar.print.css',
		  'includesLibs/fullcalendar-3.3.0/lib/moment.min.js',
		  'includesLibs/fullcalendar-3.3.0/lib/jquery.min.js',
		  'includesLibs/fullcalendar-3.3.0/fullcalendar.min.js',
		  'includesLibs/fullcalendar-3.3.0/locale/pt-br.js'
		);

		$scriptsLoaderFilesByNamespace['clipboardjs'] = array(
			"includesLibs/clipboard.min.js",
		);

		$scriptsLoaderFilesByNamespace['hammerjs'] = array(
		  'includesLibs/hammerJs/hammer.min.js'
		);

		$scriptsLoaderFilesByNamespace['fontawesome'] = array(
		  'includesLibs/font-awesome-4.7.0/css/font-awesome.min.css'
		);

		$scriptsLoaderFilesByNamespace['sweetalert'] = array(
		  'includesLibs/sweetalert/dist/sweetalert.css',
		  'includesLibs/sweetalert/dist/sweetalert.min.js'
		);

		$scriptsLoaderFilesByNamespace['spectrum'] = array(
		  "includesLibs/bgrins-spectrum/spectrum.js",
		  "includesLibs/bgrins-spectrum/i18n/jquery.spectrum-pt-br.js",
		  "includesLibs/bgrins-spectrum/spectrum.css"
		);

		$scriptsLoaderFilesByNamespace['tinymce'] = array(
		  "includesLibs/tinymce/js/tinymce/jquery.tinymce.min.js",
		  "includesLibs/tinymce/js/tinymce/tinymce.min.js",
		  "includesLibs/tinymce/js/tinymce/skins/lightgray/skin.min.css"
		);

		$scriptsLoaderFilesByNamespace['mapjs'] = array(
			"includesLibs/mapjs-master/lib/dependencies.js",
			"includesLibs/mapjs-master/src/observable.js",
			"includesLibs/mapjs-master/src/mapjs.js",
			"includesLibs/mapjs-master/src/content.js",
			"includesLibs/mapjs-master/src/clipboard.js",
			"includesLibs/mapjs-master/src/map-model.js",
			"includesLibs/mapjs-master/src/map-toolbar-widget.js",
			"includesLibs/mapjs-master/src/link-edit-widget.js",
			"includesLibs/mapjs-master/src/image-drop-widget.js",
			"includesLibs/mapjs-master/src/hammer-draggable.js",
			"includesLibs/mapjs-master/src/dom-map-view.js",
			"includesLibs/mapjs-master/src/dom-map-widget.js",
			"includesLibs/mapjs-master/src/theme-css-widget.js",
			"includesLibs/mapjs-master/test/roy-map.js",
			"includesLibs/mapjs-master/test/themes/compact.js",
			"includesLibs/mapjs-master/test/themes/top-down-simple.js",
			"includesLibs/mapjs-master/test/themes/argument-mapping.js",
			"includesLibs/mapjs-master/test/themes/v1.js",

			"includesLibs/mapjs-master/test/mapjs-default-styles.css"
		);

		$scriptsLoaderFilesByNamespace['jkanban'] = array(
		  'includes/Jkanban.js', 
		  'includesLibs/jkanban/dist/jkanban.min.css',
		  'includesLibs/jkanban/dist/jkanban.min.js'
		);

		$scriptsLoaderFilesByNamespace['jstree'] = array(
		  'includes/Jstree.js',
	      'includesLibs/vakata-jstree/dist/themes/default/style.min.css',
	      'includesLibs/vakata-jstree/dist/jstree.min.js'
		);

		$scriptsLoaderFilesByNamespace['galleria'] = array(
		  'includesLibs/galleria/galleria-1.5.7.min.js',
		  'includesLibs/galleria/themes/classic/galleria.classic.min.js'/**/
		  //'includesLibs/galleria/galleria-1.5.7.js',
		  //'includesLibs/galleria/themes/classic/galleria.classic.js'
		);


		//composicoes de componentes

		$scriptsLoaderFilesByNamespace['base'] = array(
		  'includesLibs/jquery.min.js',
		  'includesLibs/jquery.form.min.js',

		  'includesLibs/w3css/4/w3.css',
		  'includesLibs/w3css/w3-theme-teal.css'
		);

		$scriptsLoaderFilesByNamespace['baseForm'] = array_merge( 
			$scriptsLoaderFilesByNamespace['base'], 
			array(
		    	'includesLibs/jquery.form.min.js'
		  ) 
		);


		//functions

		$scriptsLoaderFilesByNamespace['galeria'] = array_merge( 
			$scriptsLoaderFilesByNamespace['base'], 
			$scriptsLoaderFilesByNamespace['galleria'], 
			$scriptsLoaderFilesByNamespace['sweetalert'],
			$scriptsLoaderFilesByNamespace['fontawesome'],
			array(
			  'includesLibs/w3data.js',
			  'includesLibs/base64.js',

			  'includes/Util.js',
			  'includes/UtilCrateris.js'
			) 
		);

		$scriptsLoaderFilesByNamespace['site'] = array_merge( 
			$scriptsLoaderFilesByNamespace['base'], 
			$scriptsLoaderFilesByNamespace['galleria'], 
			$scriptsLoaderFilesByNamespace['sweetalert'],
			$scriptsLoaderFilesByNamespace['fontawesome'],
			array(
			  'includesLibs/w3data.js',
			  'includesLibs/base64.js',

			  'includes/Util.js',
			  'includes/UtilCrateris.js'
			) 
		);

		$scriptsLoaderFilesByNamespace['categorize'] = array_merge( 
			$scriptsLoaderFilesByNamespace['base'],
			//$scriptsLoaderFilesByNamespace['sweetalert'],
			$scriptsLoaderFilesByNamespace['fontawesome'],
			array(
			  'includes/Input.css',

			  'includes/DataManager.js',
			  'includes/Util.js',
			  'includes/UtilCrateris.js',
			  'includes/Categorize.js'
			) 
		);

		$scriptsLoaderFilesByNamespace['mindmup'] = array_merge( 
			$scriptsLoaderFilesByNamespace['sweetalert'],
			$scriptsLoaderFilesByNamespace['fontawesome'],
			$scriptsLoaderFilesByNamespace['tinymce'],
			$scriptsLoaderFilesByNamespace['spectrum'],
			$scriptsLoaderFilesByNamespace['mapjs'],
			$scriptsLoaderFilesByNamespace['clipboardjs'],
			array(
				"includesLibs/dom-to-image/dist/dom-to-image.min.js",
				"includesLibs/base64.js",
				"includesLibs/Watch.js-master/watch.js",
				
				"includes/Util.js",
				"includes/MindmapUtil.js",
				"includes/Mindmup.js",
				"includes/Screenshot.js",
				//"includesPages/mindmap.min.js",
				//"includesPages/mindmap.new.js",
				"includesPages/mindmap.js"
			)
		);

		$scriptsLoaderFilesByNamespace['spreadsheet'] = array_merge( //organizar esses
			$scriptsLoaderFilesByNamespace['base'],
			$scriptsLoaderFilesByNamespace['jqueryui'],
			$scriptsLoaderFilesByNamespace['jquerycontextmenu'],
			$scriptsLoaderFilesByNamespace['fontawesome'],
			$scriptsLoaderFilesByNamespace['sweetalert'],
			$scriptsLoaderFilesByNamespace['hammerjs'],
			$scriptsLoaderFilesByNamespace['clipboardjs'],

			$scriptsLoaderFilesByNamespace['datepicker'],
			$scriptsLoaderFilesByNamespace['tinymce'],
			$scriptsLoaderFilesByNamespace['spectrum'],
			$scriptsLoaderFilesByNamespace['timerjs'],
			$scriptsLoaderFilesByNamespace['inputmask'],
			$scriptsLoaderFilesByNamespace['jquerymask'],
			$scriptsLoaderFilesByNamespace['slickgrid'],
			array(
		  		'includes/Input.css',
		  		'includes/DataManager.js',
		  		"includes/Util.js",
				'includes/UtilCrateris.js',
				
				'includes/SlickGridEditors.js',
				'includes/SlickGridUtil.js',
				'includesPages/spreadsheet.js',
				'includesPages/spreadsheet.css'
	  		)
		);

		$scriptsLoaderFilesByNamespace['dionizioOperacoes'] = array_merge( //organizar esses
			$scriptsLoaderFilesByNamespace['base'],
			$scriptsLoaderFilesByNamespace['jqueryui'],
			$scriptsLoaderFilesByNamespace['jquerycontextmenu'],
			$scriptsLoaderFilesByNamespace['fontawesome'],
			$scriptsLoaderFilesByNamespace['sweetalert'],
			$scriptsLoaderFilesByNamespace['hammerjs'],
			$scriptsLoaderFilesByNamespace['clipboardjs'],

			$scriptsLoaderFilesByNamespace['select2'],
			$scriptsLoaderFilesByNamespace['datepicker'],
			$scriptsLoaderFilesByNamespace['tinymce'],
			$scriptsLoaderFilesByNamespace['spectrum'],
			$scriptsLoaderFilesByNamespace['timerjs'],
			$scriptsLoaderFilesByNamespace['inputmask'],
			//$scriptsLoaderFilesByNamespace['jquerymask'],
			$scriptsLoaderFilesByNamespace['slickgrid'],
			array(
		  		'includes/Input.css',
		  		'includes/DataManager.js',
		  		"includes/Util.js",
				'includes/UtilCrateris.js',
				
				'includes/SlickGridEditors.js',
				'includes/SlickGridUtil.js',
				'includes/Form.js',
				'includesPages/spreadsheet.css',
				'includesPages/dionizioOperacoes.js'
	  		)
		);


		//composicoes de functions

		$scriptsLoaderFilesByNamespace['mindmupEditor'] = array_merge( 
			$scriptsLoaderFilesByNamespace['base'], 
			$scriptsLoaderFilesByNamespace['mindmup'] 
		);


		return $scriptsLoaderFilesByNamespace;
	}

	public static function simpleScriptLoader( $arrFilepaths )
	{
	  $strToReturn = '';
	  $separator = "\n";
	  $versionsByFile = self::buildFileVersions();
	  //var_dump($versionsByFile);

	  $arrFilepaths = array_values( array_unique( $arrFilepaths ) );
	  //var_dump($arrFilepaths);
	  //exit;

	  for( $i = 0; $i < count( $arrFilepaths ); $i++ )
	  {
	    $filepath = $arrFilepaths[ $i ];

	    $versionStr = '';
	    if( isset( $versionsByFile[ $filepath ] ) )
	    	$versionStr = '?v='.$versionsByFile[ $filepath ];

	    $pathinfo = pathinfo( $filepath );
	    $fileType = $pathinfo['extension'];

	    $basepath = getBasepath();
	    $filepath = $basepath.$filepath;
	    
	    if( $fileType == 'css' )
	    {
	      $media = '';
	      if( strstr( $pathinfo['basename'], 'print' ) )
	      	$media = 'media="print"';
	      $strToReturn .= '<link type="text/css" rel="stylesheet" href="'.$filepath.$versionStr.'" '.$media.'>';
	    }
	    else if( $fileType == 'js' )
	      $strToReturn .= '<script src="'.$filepath.$versionStr.'"></script>';

	    $strToReturn .= $separator;
	  }

	  return $strToReturn;
	}

	public static function simpleNamespaceScriptLoader( $arrNamespaces, $arrFilepaths = array() )
	{
	  $arrFilepathsToCall = array();
	  $scriptsLoaderFilesByNamespace = self::buildNamespaces();
	  //var_dump($scriptsLoaderFilesByNamespace);
	  //exit;

	  for( $i = 0; $i < count( $arrNamespaces ); $i++ )
	  {
	    $namespace = $arrNamespaces[ $i ];
	    $arrNamespace = $scriptsLoaderFilesByNamespace[ $namespace ];
	    
	    //var_dump($arrFilepathsToCall);
	    $arrFilepathsToCall = array_merge( $arrFilepathsToCall, $arrNamespace );
	    //var_dump($arrNamespace);
	    //var_dump($arrFilepathsToCall);

	  }
	  $arrFilepathsToCall = array_merge( $arrFilepathsToCall, $arrFilepaths );

	  return self::simpleScriptLoader( $arrFilepathsToCall );
	}

}

?>
