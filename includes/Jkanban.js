

function SimpleJKanban( divSelector, matrix, columnGroup, columnLabel, options, eventsToAttach, categories )
{
  var self = this;

  this.divSelector = divSelector;
  this.matrix = matrix;
  this.columnGroup = columnGroup;
  this.columnLabel = columnLabel;
  this.options = options;
  this.eventsToAttach = eventsToAttach;
  this.categories = categories;

  this.tree = undefined;

  this.getOptions = function()
  {
    var options = {
      element: self.divSelector//,
      //gutter: '10px',
      //widthBoard : '450px',
      /*click: function(el){
          console.log(el);
      },*/
      //boards: treeData
    };

    return options;
  }

  //render

  this.render = function ()
  {
    var options = self.getOptions();

    if( options != undefined )
        options = objMerge( options, self.options );

    var dictArr = arrObjToDictArr( self.matrix, self.columnGroup );
    if( self.categories != undefined )
    {
        //dictArr = objMerge( self.categories, dictArr );
        var keys = Object.keys( self.categories );
        for( var indexKey in keys )
        {
          var key = keys[ indexKey ];
          if( dictArr[ key ] == undefined )
            dictArr[ key ] = [];
        }
    }
    //dictArr = objOrder( dictArr );

    var treeData = SimpleJKanban.dictToKanbanBoards( dictArr, columnLabel );

    options['boards'] = treeData;

    if( self.eventsToAttach != undefined )
    {
        for( var index in self.eventsToAttach )
           options[ index ] = self.eventsToAttach[ index ];
    }

    if( self.tree != undefined )
      $( self.divSelector ).html( '' );     //{ 'keep_html':true }

    //console.log( options );
    self.tree = new jKanban( options ); //$( self.divSelector ).jstree( options );   //this.datatable = 
  }

  this.jsTreeIdsToNodes = function ( nodesIds )
  {
    var arrToReturn = [];

    //console.log( nodesIds );
    for( var i = 0; i < nodesIds.length; i++ )
    {
        var node = $( self.divSelector ).jstree( 'get_node', nodesIds[i] );
        arrToReturn.push( node );
    }
    //console.log( arrToReturn );

    return arrToReturn;
  }

  this.getNodeByText = function ( text )
  {
    var treeData = $( self.divSelector ).jstree('get_json' );

    for( index in treeData )
    {
        var parentNode = treeData[ index ];
        for( childIndex in parentNode.children )
        {
            var childNode = parentNode.children[ childIndex ];
            if( childNode.text == text )
              return childNode;
        }
    }

    return false;
  }


  //extract

  this.extractData = function()
  {
    var arrToReturn = [];

    var treeData = $( self.divSelector ).find( '.kanban-item' );

    for( var i = 0; i < treeData.length; i++ )
    {
        var element = treeData[ i ];
        var el = $( element );
        var childrenJsonStr = el.attr( 'data-eid' );
        //console.log( childrenJsonStr );
        var childrenObj = JSON.parse( childrenJsonStr );
        var category = el.parent().parent().find( '.kanban-title-board' ).text();
        childrenObj[ self.columnGroup ] = category;
        arrToReturn.push( childrenObj );
    }

    return arrToReturn;
  }
}


//util static methods

SimpleJKanban.dictToKanbanBoards = function( arrData, columnLabel )
{
  var arrToReturn = [];

  for( var index in arrData )
  {
    var objToAdd = { 'id': index, 'title': index };
    var childArr = [];

    if( columnLabel == undefined )
        childArr = arrData[ index ];
    else
    {
        for( var childIndex in arrData[ index ] )
        {
            var child = {};

            child[ 'title' ] = arrData[ index ][ childIndex ][ columnLabel ];
            child[ 'id' ] = JSON.stringify( arrData[ index ][ childIndex ] );    //JSON.stringify()

            childArr.push( child );
        }
    }
    objToAdd['item'] = childArr;
    
    arrToReturn.push( objToAdd );
  }

  console.log( arrToReturn );

  return arrToReturn;
}

//$( simpleJsTree.tree.container ).find( '.kanban-title-board' )
//$( simpleJsTree.tree.container ).find( '.kanban-item' )
