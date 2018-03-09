
function SimpleMatrixToMindmup( matrix, keys, linksMatrix, columnTitle, columnImage, colors )
{
  var self = this;

  this.matrix = matrix;
  this.keys = keys;

  this.linksMatrix = linksMatrix;
  this.columnTitle = columnTitle;
  this.columnImage = columnImage;
  this.colors = colors;

  this.tree = undefined;
  this.id = undefined;

  this.mountTree = function()
  {
    self.tree = arrObjToDictTree( self.matrix, self.keys );
    return self.tree;
  }

  /*this.matrixToMindmup = function()
  {
    var strToReturn = '';

    //??? is it a good idea?

    return strToReturn;
  }*/

  this.newNode = function( title, contents, imageSrc )
  {
    var innerCount = 1;
    var nodeToReturn = { title: title, id: self.id++, ideas: {} };


    //image

    if( imageSrc != undefined )
    {
      nodeToReturn[ 'attr' ] = {};
      nodeToReturn[ 'attr' ][ 'icon' ] = { 
        url: imageSrc,
        width: 75,
        height: 100,
        position: 'top'
      };
    }


    //contents

    if( isArray( contents ) )
    {
      for( var i = 0; i < contents.length; i++ )
      {
        var content = contents[ i ];
        var contentImage = undefined;
        if( self.columnImage != undefined )
          contentImage = content[ self.columnImage ];

        var title = '';
        var colunas = self.columnTitle.split(',');
        for( var j = 0; j < colunas.length; j++ )
        {
          if( j != 0 )
            title += ' - ';

          title += content[ colunas[ j ] ];
        }

        nodeToReturn.ideas[ innerCount++ ] = self.newNode( title, undefined, contentImage );
      }
    }
    else if( isObject( contents ) )
    {
      var vertices = Object.keys( contents );
      for( var verticeIndex in vertices )
      {
        var verticeName = vertices[ verticeIndex ];
        var verticeNode = contents[ verticeName ];

        nodeToReturn.ideas[ innerCount++ ] = self.newNode( verticeName, verticeNode );
      }
    }
    /*else
    {
      if( self.columnImage )
    }*/


    return nodeToReturn;
  }

  this.treeToMindmup = function( title, returnString )
  {
    self.id = 1;
    var objToReturn = { 
      title: title, 
      id: self.id++, 
      attr: {},
      formatVersion: 2,
      ideas: {},
      links: {}
    };

    //colors by category or by centralNodeChilds (this! For a while)

    var innerCount = 1;
    var vertices = Object.keys( self.tree );
    for( var verticeIndex in vertices )
    {
      var verticeName = vertices[ verticeIndex ];
      var verticeNode = self.tree[ verticeName ];

      console.log( verticeIndex );
      console.log( verticeNode );
      objToReturn.ideas[ innerCount++ ] = self.newNode( verticeName, verticeNode );



      //percorrer vertice
      /*do
      {
        var key = self.keys[ i ];
        var isLast = ( i == self.keys.length - 1 );


      } while (  );*/
    }


    if( returnString == true )
      return JSON.stringify( objToReturn );

    return objToReturn;
  }


  this.mountTree();
}
