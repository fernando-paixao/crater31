
//util

function handleIconDelete()
{
  simpleMindmup.mapModel.setIcon(  );
}

function isProportional( properties )
{
  if( properties.metaData.imageSize )
  {
    var realWidth = properties.metaData.imageSize[0];
    var realHeight = properties.metaData.imageSize[1];

    return properties.height * realWidth == properties.width * realHeight;
  }
  else
    return properties.height == properties.width;
}

function maintainProportion( properties )
{
  var userWidth = properties.width;
  var userHeight = properties.height;
  if( properties.metaData.userImageSize != undefined )
  {
    userWidth = properties.metaData.userImageSize[0];
    userHeight = properties.metaData.userImageSize[1];

    if( userWidth == null )
      userWidth = NaN;
    if( userHeight == null )
      userHeight = NaN;

    if( isNaN( userWidth ) && isNaN( userHeight ) )
    {
      if( properties.metaData.imageSize != undefined )
      {
        userWidth = properties.metaData.imageSize[0];
        userHeight = properties.metaData.imageSize[1];
      }
      else
      {
        userWidth = 50;
        userHeight = 50;
      }
    }
  }
  
  if( properties.metaData.imageSize != undefined )
  {
    var realWidth = properties.metaData.imageSize[0];
    var realHeight = properties.metaData.imageSize[1];

    if( !isNaN( userHeight ) && !isNaN( userWidth ) )
    {
      if( realWidth / userWidth > realHeight / userHeight ) 
        userHeight = NaN;
      else
        userWidth = NaN;
    }

    if( isNaN( userHeight ) ) 
    {
      properties.height = ( userWidth * realHeight ) / realWidth;
      properties.width = userWidth;
    }
    else
    {
      properties.width = ( userHeight * realWidth ) / realHeight;
      properties.height = userHeight;
    }
  }
  else
  {
    if( isNaN( userWidth ) )
    {
      properties.width = userHeight;
      properties.height = userHeight;
    }
    else if( isNaN( properties.height ) ) 
    {
      properties.height = userWidth;
      properties.width = userWidth;
    }
  }

  return properties;
}

function blobToDataURL(blob, callback) 
{
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}


//widgets

jQuery.fn.attachmentEditorWidget = function (mapModel) 
{
  'use strict';
  return this.each(function () 
  {
    var element = jQuery(this);
    mapModel.addEventListener('attachmentOpened', function (nodeId, attachment) 
    {
      mapModel.setAttachment(
        'attachmentEditorWidget',
        nodeId, {
          contentType: 'text/html',
          content: prompt('attachment', attachment && attachment.content)
        }
      );
    });
  });
};
