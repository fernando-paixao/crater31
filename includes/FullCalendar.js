
function SimpleFullCalendar( divSelector, matrix, eventsToAttach, dontNeedConvert )
{
  var self = this;

  if( dontNeedConvert == undefined )
    dontNeedConvert = false;

  this.divSelector = divSelector;
  this.matrix = matrix;
  this.eventsToAttach = eventsToAttach;
  this.dontNeedConvert = dontNeedConvert;

  this.calendar = undefined;

  this.getOptions = function()
  {
    var optionsFullCalendar = {
          header: {
              left: 'prev,next today',
              center: 'title',
              right: 'listMonth,listWeek,listDay,listYear month,agendaWeek,agendaDay'
          },
          views: {
              listDay: { buttonText: 'Dia' },
              listWeek: { buttonText: 'Semana' },
              listMonth: { buttonText: 'Lista Mês' },
              listYear: { buttonText: 'Ano' },
              month: { buttonText: 'Calendário Mês' }
          },
          lang: 'pt-br',
          defaultDate: getDateNow(),   //'2016-06-12',
          editable: true,
          eventLimit: false, // allow "more" link when too many events
      }

    return optionsFullCalendar;
  }

  this.dataToEvents = function( matrix )
  {
    var events = [];

    for( var index in matrix )
    {
      var agendaItem = {};
      var itemAgenda = matrix[ index ];

      agendaItem[ 'id' ] = index;
      agendaItem['description'] = JSON.stringify( itemAgenda );
      agendaItem['title'] = itemAgenda['Descricao'];
      if( self.dontNeedConvert )
        agendaItem['start'] = itemAgenda['DataInicio'];
      else
        agendaItem['start'] = xlsDateToDate( itemAgenda['DataInicio'], true );

      if( issetNotEmpty( itemAgenda['Cor'] ) )
        agendaItem['backgroundColor'] = itemAgenda['Cor'];

      if( issetNotEmpty( itemAgenda['Horario'] ) )
      {          
          agendaItem['start'] += 'T'+itemAgenda['Horario'];
          if( itemAgenda['Horario'].length == 5 )
            agendaItem['start'] += ':00';
      }
      
      if( issetNotEmpty( itemAgenda['Duracao'] ) )
      {
          if( itemAgenda['Duracao'].search('dias') != -1 )
            agendaItem['end'] = addDays( agendaItem['start'], getNumbers( itemAgenda['Duracao'] ) );
          else
          {
            if( agendaItem['start'].search( 'T' ) != -1 )
            {
              var arrStart = agendaItem['start'].split('T');
              var horarioStart = arrStart[1];   //talvez necessario um substring(0,5);
              agendaItem['end'] = arrStart[0]+'T'+hoursSum( horarioStart, hoursToHorario( duracaoToHours( itemAgenda['Duracao'] ) ) );
            }
          }
      }

      events.push( agendaItem );
    }

    return events;
  }

  this.fullCalendarRender = function ()
  {
    var options = self.getOptions();
    console.log( options );

    if( self.eventsToAttach != undefined )
      options = objMerge( options, self.eventsToAttach );

    /*if( this.datatable != undefined )
    {
      //console.log( this.datatable );
      this.datatable.destroy();
      $( this.tableSelector ).html('');
    }*/

    options[ 'events' ] = self.dataToEvents( self.matrix );

    if( options[ 'events' ].length > 0 )
    {
      var dataToStart = options[ 'events' ][ options[ 'events' ].length - 1 ].start.substring(0,10);
      options[ 'defaultDate' ] = dataToStart;
    }

    if( self.calendar != undefined )
      self.calendar.fullCalendar( 'destroy' )

    self.calendar = $( this.divSelector ).fullCalendar( options );   //this.datatable = 


    //self.calendar.fullCalendar('changeView', 'month', );

    //console.log( this.datatable );
    //console.log( optionsDataTable );
  }

  this.extractData = function()
  {
    return self.matrix;
  }

}
