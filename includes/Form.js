
function SimpleForm( formSelector, columnsInfo, functionGetValuesFromDataSource )
{
  var self = this;

  this.formSelector = formSelector;
  this.columnsInfo = columnsInfo;
  this.functionGetValuesFromDataSource = functionGetValuesFromDataSource;

  this.formatter = function ( value, columnName )
  {
    var columnInfo = this.columnsInfo[columnName];

    //console.log( columnInfo );
    /*console.log( value );
    console.log( columnName );*/

    //new cell bug
    if( columnInfo == undefined )
      return value;

    switch( columnInfo.Type )
    {
      case 'date':
        if( value != '' )
          value = xlsDateToLegibleDate( value );
        break;
      case 'dateBase':
        if( value != '' )
          value = xlsDateToDate( value, true );
        break;
      case 'double':
        if( value != '' )
        {
          /**///console.log( value );
          value = moneyCorrect( value );
          //console.log( value );
          value = doubleToBrMoney( value );
        }
        break;
      case 'phone':
        value = strToPhone( value );
        break;
      case 'monthYear':
        value = monthYearToLegible( value );
        break;
    }

    //console.log( this.columnsInfo );   //search the name
    //console.log( value );
    return value;
  }

  this.getDefaultRegistro = function ( matrix )
  {
    var registro = {};

    for( var i = 0; i < this.columnsInfo.length; i++ )
    {
      var columnName = this.columnsInfo[i].Name;
      var columnDefaultValue = '';

      if( this.columnsInfo[i].DefaultValue != undefined && this.columnsInfo[i].DefaultValue != '' )
        columnDefaultValue = this.columnsInfo[i].DefaultValue;
      else if( this.columnsInfo[i].Type == "autoincrement" && matrix != undefined )
      {
        var max = getMax( matrix, columnName );
        columnDefaultValue = max + 1;
      }

      registro[ columnName ] = columnDefaultValue;
    }

    return registro;
  }

  this.preencheForm = function ( registro )
  {
    var column = 0;

    for( var index in registro )
    {
      var columnInfo = this.columnsInfo[ column ];

      //console.log( columnInfo );
      //console.log( registro[index] );
      //console.log( index );

      if( columnInfo.Type != 'radio' )
        $( this.formSelector + ' [name="'+index+'"]' ).val( registro[index] );

      switch( columnInfo.Type )
      {
        case 'select2':
          $( this.formSelector + ' [name="'+index+'"]' ).trigger('change.select2');
          break;
        case 'radio':
          if( registro[index] != '' )
            $( this.formSelector + ' [name="'+index+'"][value="'+registro[index]+'"]' ).attr('checked', true);
          break;
        case 'color':
          $( this.formSelector + ' [name="'+index+'"]' ).spectrum("set", registro[index]);
          break;
        case 'html':
        //console.log( registro[index] );
        //console.log( tinyMCE.activeEditor );
          if( tinyMCE.activeEditor != undefined && registro[index] != '' )
          {
            tinyMCE.activeEditor.setContent( registro[index] );
          }
          break;
      }
      //console.log( index );
      //console.log( columnInfo );

      column++;
    }
  }

  this.formRender = function ( separator, qtdColumns )
  {
    if( qtdColumns == undefined )
      qtdColumns = 1;

    var separatorStart = '';
    var separatorClose = '<p>';
    var innerSeparatorStart = '';
    var innerSeparatorClose = '';

    if( separator != undefined )
    {
      if( typeof( separator ) == "string" )
        separatorClose = separator;
      else
      {
        separatorStart = separator.start;
        separatorClose = separator.close;
        if( separator.innerStart )
          innerSeparatorStart = separator.innerStart;
        if( separator.innerClose )
          innerSeparatorClose = separator.innerClose;
      }
    }

    var returnStr = '';
    //returnStr += '<div class="w3-container">';

    var useFieldset = false;
    if( this.columnsInfo[0].Fieldset != undefined )
      useFieldset = true;

    for( var i = 0; i < this.columnsInfo.length; i++ )
    {
      var columnInfo = this.columnsInfo[i];

      var drawSeparator = 'no';
      if( i == 0 )
        drawSeparator = 'start';
      else if( i == this.columnsInfo.length - 1 )
        drawSeparator = 'end';
      else if( ( i ) % qtdColumns == 0 )
        drawSeparator = 'middle';

      if( useFieldset )
      {
        if( i == 0 || columnInfo.Fieldset != this.columnsInfo[i-1].Fieldset )
        {
          returnStr += '<fieldset><legend><strong>'+columnInfo.Fieldset+'</strong></legend>';
        }
      }

      if( drawSeparator == 'start' || drawSeparator == 'middle' )
      {
        if( drawSeparator == 'middle' )
        {
          returnStr += separatorClose;
          returnStr += separatorStart;
        }
        else
          returnStr += separatorStart;
      }
      
      returnStr += innerSeparatorStart;
      returnStr += this.inputRender( columnInfo );
      returnStr += innerSeparatorClose;
      
      if( drawSeparator == 'end' || drawSeparator == 'middle' )
      {
        if( drawSeparator == 'middle' )
          1;//returnStr += separatorStart;
        else
          returnStr += separatorClose;
      }

      if( useFieldset )
      {
        if( i == this.columnsInfo.length - 1 || columnInfo.Fieldset != this.columnsInfo[i+1].Fieldset )
        {
          returnStr += '</fieldset>';
        }
      }
    }
    //returnStr += '</div>';

    return returnStr;
  }

  this.inputRender = function ( columnInfo )
  {
    var returnStr = '';
    var style = '';

    if( columnInfo.Required == 1 )
      style = 'color: red;';

    //console.log( columnInfo );

    var label = columnInfo.Name;
    if( columnInfo.Label != '' )
      label = columnInfo.Label;

    var dataSourceTypes = 'select2,radio'.split(',');
    var dataSource = undefined;
    if( dataSourceTypes.indexOf( columnInfo.Type ) != -1 && this.functionGetValuesFromDataSource != undefined )
      dataSource = this.functionGetValuesFromDataSource( columnInfo );   //unica relacao ainda nao autossuficiente, talvez vire funcao

    //console.log( dataSource );

    returnStr += '<label class="w3-label w3-validate" style="'+style+'">'+label+':</label> ';

    //console.log( label );

    switch( columnInfo.Type )
    {
      case 'select2':
        returnStr += '<select class="select2 w3-select" style="width: 100%" name="'+columnInfo.Name+'">';
        returnStr += arrToOptions( dataSource );
        //for(  )
        returnStr += '</select>';
        break;
      case 'radio':   //w3-check e o do outro
        returnStr += '<span class="">';

        console.log( dataSource );

        for( var index in dataSource )
        {
          var value = dataSource[index];
          var radioToReturn = '<input class="w3-radio" type="radio" name="'+columnInfo.Name+'" value="'+ value +'"> ';
          
          returnStr += radioToReturn; // '+checked+'
        }

        returnStr += '</span>';
        break;
      case 'html':
        returnStr += '<input class="htmlEditor" name="'+columnInfo.Name+'">';
        break;
      case 'textarea':
        returnStr += '<textarea class="w3-input w3-border" name="'+columnInfo.Name+'"></textarea>';
        break;
      case 'date':
        returnStr += '<input class="datepicker w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
      case 'double':
        returnStr += '<input class="doubleMask w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
      case 'phone':
        returnStr += '<input class="phoneMask w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
      case 'hour':
        returnStr += '<input class="hourMask w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
      case 'color':
        returnStr += '<input class="colorpicker w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
      case 'password':
        returnStr += '<input type="password" class="w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
      /*case 'double':
        returnStr += '<input class="double" name="'+columnInfo.Name+'">';
        break;
      case 'int':
        returnStr += '<input class="int" name="'+columnInfo.Name+'">';
        break;*/
      case 'text':
      default:
        returnStr += '<input class="w3-input w3-border" name="'+columnInfo.Name+'">';
        break;
    }
    
    return returnStr;
  }

  this.applyJsInForm = function ()
  {
    //date editor
    $( ".datepicker" ).datepicker(
    {
        dateFormat: "mm-dd-y",
        showOn: "button",
        buttonImageOnly: true,
        buttonImage: "includesLibs/SlickGrid-2.3.0/images/calendar.gif",
        beforeShow: function () {
          calendarOpen = true
        },
        onClose: function () {
          calendarOpen = false
        }
    });

    //double editor
    $( ".doubleMask" ).inputmask("999.999.999,99", 
      { 
        numericInput: true,
        onKeyDown: function( event, buffer, caretPos, opts )
        {
          var element = event.target;

          if( event.key == ',' )
            $( element ).val( $( element ).val()+'00' );
          if( event.key == '.' )
            $( element ).val( $( element ).val()+'000' )
        }
      } 
    );

    //phone editor
    if( getIsMobile() )
      $('.phoneMask').mask('(00) 0000-00009');
    else
      $( ".phoneMask" ).inputmask( "(99) 9999-9999[9]" );

    //hour editor
    if( getIsMobile() )
      $('.hourMask').mask('00:00');
    else
      $( ".hourMask" ).inputmask( "99:99" );

    //color picker
    $( ".colorpicker" ).spectrum(
    {
        colorMask: true,
        preferredFormat: "hex",
        showPalette: true,
        showSelectionPalette: true,
        palette: [
          ["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"],
          ["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"],
          ["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d9ead3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"],
          ["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
          ["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"],
          ["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"],
          ["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"],
          ["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]
        ]
    });

    //html editor
    tinymce.init(
    {
      selector: '.htmlEditor',
      //height: 500,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      content_css: [
        //'//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ],
      init_instance_callback: function (editor) 
      {
        editor.on('blur', function (e) 
        {
          $( e.target.targetElm ).val( tinyMCE.activeEditor.getContent() );
        });
      }
    });

    //select2 editor
    $(".select2").select2({
      //allowClear: true,
      //minimumInputLength: 3
    });


    //abas fieldset

    if( $( self.formSelector + ' fieldset' ).length > 0 )
    {
      new SimpleAbasElements
      ( 
        $( self.formSelector + ' fieldset legend strong' ).toArray().map( function( el ){ return el.innerHTML; } ), 
        $( self.formSelector + ' fieldset' ).toArray(), 
        self.formSelector
      );
    }
  }

  this.extractFieldData = function( value, columnName )
  {
    var columnInfo = undefined;

    var result = filterMatrixPos( self.columnsInfo, { 'Name': columnName } );
    if( result.length > 0 )
      columnInfo = self.columnsInfo[ result[0] ];
    
    console.log( columnInfo, columnName );

    if( columnInfo == undefined )
      return value;

    switch( columnInfo.Type )
    {
      case 'double':
        if( value != '' )
          value = moneyToDouble( value );
        break;
    }

    return value;
  }

  this.extractData = function()
  {
    var formArr = $( self.formSelector ).serializeArray();
    
    var newRegistro = {};
    for( var index in formArr )
    {
      var formItem = formArr[index];
      newRegistro[ formItem.name ] = self.extractFieldData( formItem.value, formItem.name );
    }

    console.log( newRegistro );

    return newRegistro;
  }
}
