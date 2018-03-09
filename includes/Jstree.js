

function SimpleJsTree( divSelector, matrix, columnGroup, columnLabel, options, eventsToAttach, categories )
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
        'core' : {}
    };

    return options;
  }

  //render

  this.render = function ()
  {
    var options = self.getOptions();

    if( options != undefined )
        options = objMerge( options, self.options );

    var dictArr = arrObjToDictArr( self.matrix, columnGroup );
    if( self.categories != undefined )
        dictArr = objMerge( self.categories, dictArr );
    //dictArr = objOrder( dictArr );

    var treeData = SimpleJsTree.dictToJsTree( dictArr, columnLabel );

    options['core']['data'] = treeData;

    if( self.tree != undefined )
      $( self.divSelector ).jstree( 'destroy' );     //{ 'keep_html':true }

    //console.log( options );
    self.tree = $( self.divSelector ).jstree( options );   //this.datatable = 

    if( self.eventsToAttach == true )
      $( self.divSelector ).unbind( 'click' );
    else if( self.eventsToAttach != undefined )
    {
        for( var index in self.eventsToAttach )
            $( self.divSelector ).on( index+'.jstree', self.eventsToAttach[ index ] );
    }
  }

  //deprecated
  this.jsTreeRender = self.render;

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

  this.extractChecked = function( getNodes )
  {
    if( getNodes == undefined )
      getNodes = false;

    var nodesIdSelected = $( self.divSelector ).jstree( 'get_checked' );
    var nodesSelected = self.jsTreeIdsToNodes( nodesIdSelected );

    var arrToReturn = [];

    for( index in nodesSelected )
    {
      var node = nodesSelected[ index ];
      if( node.data != undefined )
      {
        if( getNodes )
          arrToReturn.push( node );
        else
          arrToReturn.push( node.data );
      }
    }

    return arrToReturn;
  }

  this.extractData = function()
  {
    var arrToReturn = [];

    var treeData = $( self.divSelector ).jstree('get_json' );

    for( index in treeData )
    {
        for( childIndex in treeData[ index ].children )
            arrToReturn.push( treeData[ index ].children[ childIndex ].data );
    }

    return arrToReturn;
  }
}


//util static methods

SimpleJsTree.dictToJsTree = function ( arrData, columnLabel )
{
  var arrToReturn = [];

  for( var index in arrData )
  {
    var objToAdd = { 'text' : index };
    var childArr = [];

    if( columnLabel == undefined )
        childArr = arrData[ index ];
    else
    {
        for( var childIndex in arrData[ index ] )
        {
            var child = {};
            child[ 'text' ] = arrData[ index ][ childIndex ][ columnLabel ];
            child[ 'data' ] = arrData[ index ][ childIndex ];    //JSON.stringify()
            child[ 'children' ] = [];
            child['type'] = 'default';

            childArr.push( child );
        }
    }
    objToAdd['children'] = childArr;
    objToAdd['type'] = 'root';

    arrToReturn.push( objToAdd );
  }

  return arrToReturn;
}


/*
//util

function dictToJsTree( arrData )
{
    var arrToReturn = [];

    for( var index in arrData )
    {
        var objToAdd = { 'text' : index, 'children' : arrData[ index ] }
        arrToReturn.push( objToAdd );
    }

    return arrToReturn;
}

function jsTreeIdsToNodes( nodesIds )
{
    var arrToReturn = [];

    //console.log( nodesIds );
    for( var i = 0; i < nodesIds.length; i++ )
    {
        var node = $('#contatos').jstree( 'get_node', nodesIds[i] );
        arrToReturn.push( node );
    }
    //console.log( arrToReturn );

    return arrToReturn;
}

*/
