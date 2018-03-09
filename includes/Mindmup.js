
function SimpleMindmup( divSelector, styleSelector, linkEditSelector, mapContent, customHandlers )
{
  var self = this;

  this.divSelector = divSelector;
  this.styleSelector = styleSelector;
  this.linkEditSelector = linkEditSelector;

  this.mapContent = mapContent;
  this.customHandlers = customHandlers;

  this.mapModel = undefined;

  this.render = function()
  {
    //init

    //window.onerror = alert;
    var container = $( self.divSelector );
    var idea = MAPJS.content( self.mapContent );
    var themeProvider = MAPJS.Themes;

    self.mapModel = new MAPJS.MapModel(MAPJS.DOMRender.layoutCalculator, []);

    //imageInsertController
    var imageInsertController = new MAPJS.ImageInsertController("http://localhost:4999?u=");
    container.domMapWidget( console, self.mapModel, false, imageInsertController );
    imageInsertController.addEventListener('imageInsertError', self.imageInsertControllerErrorHandler );

    $( self.styleSelector ).themeCssWidget( themeProvider, new MAPJS.ThemeProcessor(), self.mapModel );
    $('body').mapToolbarWidget( self.mapModel );
    $('body').attachmentEditorWidget( self.mapModel );
    $( self.linkEditSelector ).linkEditWidget( self.mapModel );

    self.mapModel.setIdea(idea);

    self.attachEvents();
  }

  this.attachEvents = function()
  {
    var container = $( self.divSelector );

    //selfHandlers

    $('.arrow').click( self.arrowClickHandler );
    container.on('drop', self.dropHandler);
    

    //handlers

    if( self.customHandlers == undefined )
      return;

    for( var index in self.customHandlers )
    {
      self.mapModel[ index ] = self.customHandlers[ index ];
    }
  }


  //handlers

  this.dropHandler = function (e) 
  {
    var dataTransfer = e.originalEvent.dataTransfer;

    e.stopPropagation();
    e.preventDefault();

    if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) 
    {
      var fileInfo = dataTransfer.files[0];
      if (/\.mup$/.test(fileInfo.name)) 
      {
        var oFReader = new FileReader();
        oFReader.onload = function( oFREvent ) 
        {
          var strContent = oFREvent.target.result;
          self.mapModel.setIdea( MAPJS.content( JSON.parse( strContent ) ) );
        };
        oFReader.readAsText(fileInfo, 'UTF-8');
      }
    }
  }

  this.arrowClickHandler = function () 
  {
    //console.log( 'chegou' );
    $(this).toggleClass('active');
  }

  this.imageInsertControllerErrorHandler = function (reason) 
  {
    console.log('image insert error', reason);
  }


  //dataModels

  this.newMapDefault = function( arvoreGenealogica )
  {
    var map = {
      "title":"Novo Mapa",
      "id":1,
      "attr": {},
      "formatVersion":2
    };

    if( arvoreGenealogica )
      map['attr']["theme"] = "topdown";

    return map;
  }


  //extract

  this.extractData = function()
  {
    return self.mapModel.getIdea();
  }

}
