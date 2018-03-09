
function SimpleDatatable( tableSelector, columnsInfo, matrix, functionHeaderCallback )
{
  var self = this;

  this.tableSelector = tableSelector;
  this.columnsInfo = columnsInfo;
  this.matrix = matrix;
  this.functionHeaderCallback = functionHeaderCallback;

  this.datatable = undefined;

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

  this.formatterDatatable = function( data, type, full, meta )
  {
    if( type != 'display' )
        return data;

    var value = data;
    var columnName = meta.col;

    //console.log( value );
    //console.log( columnName );

    if( value == undefined )
      value = "";

    return self.formatter( value, columnName );
  }

  this.getColumnsToDatatable = function ( columnsInfo )
  {
    //console.log( columnsInfo );

    var columns = [];

    for( var index in columnsInfo )
    {
      var className = '';
      var fieldInfo = columnsInfo[index];

      if( fieldInfo.Type == 'double' || fieldInfo.Type == 'int' )  //
        className = 'dt-body-right';

      var columnToPush = { 
          title: fieldInfo.Label, 
          data: fieldInfo.Name, 
          className: className,
          render: this.formatterDatatable
        };

      if( fieldInfo.Width != undefined && fieldInfo.Width != '' )
        columnToPush.Width = fieldInfo.Width;

      columns.push( columnToPush );
    }

    return columns;
  }

  this.getOptions = function()
  {
    var optionsDataTable = {
          autoWidth: false,
          lengthMenu: [[10, 25, 50, 100, -1 ], [10, 25, 50, 100, 'Todos']]
      }

    return optionsDataTable;
  }

  this.datatableRender = function ()
  {
    if( this.datatable != undefined )
    {
      //console.log( this.datatable );
      this.datatable.destroy();
      $( this.tableSelector ).html('');
    }

    var columns = this.getColumnsToDatatable( this.columnsInfo );
    var optionsDataTable = this.getOptions();

    optionsDataTable[ 'data' ] = this.matrix;
    optionsDataTable[ 'columns' ] = columns;

    if( this.functionHeaderCallback != undefined )
    {
      //console.log('here');
      optionsDataTable[ 'headerCallback' ] = this.functionHeaderCallback;
    }

    //console.log( 'hey there' );
    //console.log( this.datatable );

    this.datatable = $( this.tableSelector ).DataTable( optionsDataTable );

    //console.log( this.datatable );
    //console.log( optionsDataTable );
  }

  this.extractData = function()
  {
    return simpleDatatable.datatable.data().toArray();
  }

  //util

  this.checkColumnsWidthDefined = function ( columns )
  {
    for( index in columns )
    {
      if( columns[index].width != undefined )
        return true;
    }

    return false;
  }

}

/*function SimpleDatatableFilters( simpleDatatable )
{
  this.simpleDatatable = simpleDatatable;

  

}*/
