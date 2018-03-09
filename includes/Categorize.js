

//actions

function updateCategory( category, newCategory )
{
	simpleJsTree.matrix = simpleJsTree.extractData();

	for( var i = 0; i < simpleJsTree.matrix.length; i++ )
	{
		if( simpleJsTree.matrix[ i ][ colunaGrupo ] == category )
			simpleJsTree.matrix[ i ][ colunaGrupo ] = newCategory;
	}

	simpleJsTree.render();
}

function addNewCategory( newLabel )
{
    if( newLabel == null || newLabel == undefined )
        return;

    simpleJsTree.matrix = simpleJsTree.extractData();
    simpleJsTree.categories[ newLabel ] = [];

    simpleJsTree.render();
}

function getNewNode( newLabel )
{
    var newNode = clone( simpleJsTree.matrix[0] );
    newNode[ colunaLabel ] = newLabel;

    newNode = cleanObjKeys( newNode, undefined, [ colunaLabel, colunaGrupo ] );

    return newNode;
}

function addNewNode( newLabel, category )
{
    if( newLabel == null || newLabel == undefined )
        return;
    
    simpleJsTree.matrix = simpleJsTree.extractData();
    var newNode = getNewNode( newLabel );
    
    if( issetNotEmpty( category ) )
        newNode[ colunaGrupo ] = category;
    
    simpleJsTree.matrix.push( newNode );
    simpleJsTree.render();
}

function updateNode( category, label, newLabel )
{
	console.log( category, label, newLabel );

	simpleJsTree.matrix = simpleJsTree.extractData();

	var options = {};
	options[ colunaGrupo ] = category;
	options[ colunaLabel ] = label;

	var resultPos = filterMatrixPos( simpleJsTree.matrix, options )[0];
	simpleJsTree.matrix[ resultPos ][ colunaLabel ] = newLabel;
	simpleJsTree.render();
}
