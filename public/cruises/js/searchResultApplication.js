Ext.BLANK_IMAGE_URL = 'Ext/resources/images/default/s.gif';

Ext.namespace('SearchResult');

// create application
SearchResult.app = function() {
 
    // private variables
    // private functions
    function renderNights(value, metadata, record)
    {
        return String.format('c {0} по {1} <br/> <b>{2} дней / {3} ночей </b>', record.data.BeginDate.format('d.m.Y'), record.data.EndDate.format('d.m.Y'),record.data.Nights + 1 , record.data.Nights);
    }
    
    function renderName(value, metadata, record)
    {
        return String.format('{0} <br/> <a href="details.htm?id={1}" target="_blank"> {2} </a>', record.data.Region, record.data.Id, record.data.Name);
    }
    
    function renderShip(value, metadata, record)
    {
        return String.format('<b>{0}</b> <br/> ({1} : {2})', record.data.Ship, record.data.Company, record.data.Class);
    }
    
    function renderCost(value, metadata, record)
    {
    	if (record.data.Cost == 0)
	    {
	        return String.format('<b>Уточняйте у менеджеров</b>');
	    }
	    else if (record.data.Cost == record.data.RoubleCost) 
        {
            return String.format('<b>{0} {1}</b>', record.data.Cost, record.data.Currency);
        }
        else
        {
            return String.format('<b>{0} {1}</b> <br/> {{2} рублей}', record.data.Cost, record.data.Currency, record.data.RoubleCost);
        }
    }
     // public space
    return {
        // public methods
        init: function() {
            var getParams = document.URL.split("?");
            // transforming the GET parameters into a dictionnary
            var params = Ext.urlDecode(getParams[getParams.length - 1]);
            var searchFilter = 
            {
                regionId : params['region']
                ,companyId : params['company']
                ,classId : params['class']
                ,shipId : params['ship']
                ,dateFrom : params['dateFrom']
                ,dateTo : params['dateTo']
                ,costFrom : params['costFrom']
                ,costTo : params['costTo']
                ,duration : params['duration']
                ,currencyRangeId : params['currency']
            };
            
            var url = servicesURI + "Cruises/WS/Cruises.asmx/Search?filter=" + Ext.util.JSON.encode(searchFilter)
                + "&encoding=" + responseEncoding;
            
           
            var store = new Ext.data.JsonStore({
                            root: 'd.Items'
                            ,totalProperty: 'd.TotalItems'
                            ,fields: [
                                'Id'
                                ,'Name'
                                ,{name:'BeginDate', mapping:'BeginDateF', type:'date', dateFormat : 'Y-m-d'}
                                ,{name:'EndDate', mapping:'EndDateF', type:'date', dateFormat : 'Y-m-d'}
                                ,{name:'Nights', mapping:'Nights.Duration', type:'int'}
                                ,{name:'Region', mapping:'Region.Name'}
                                ,{name:'Ship', mapping:'Ship.Name'}
                                ,{name:'Company', mapping:'Company.Name'}
                                ,{name:'Class', mapping:'Class.Name'}
                                ,{name:'Cost'}
                                ,{name:'Currency', mapping:'Currency.Name'}
                                ,{name:'CurrencyId', mapping:'Currency.Name'}
                                ,{name:'RoubleCost', mapping:'RoubleCostF'}
                                
                             ]
                            ,proxy: new Ext.data.ScriptTagProxy({
                                url: url
                                
                            })
                        });
           
           store.load({params:{start: 0, limit: 30}});

           var vp = new Ext.Viewport({
           
           layout: 'fit'
           ,items: [{
            xtype: 'grid',
           store : store
           ,width: 1
           ,monitorResize: true

        ,columns:[{
            header: "Дата"
            ,renderer : renderNights

        },{
            id: 'regName',
            header: "Регион / программа"
            ,renderer : renderName

        },{
            header: "Лайнер (компания: класс)",
            renderer: renderShip

        },{
            header: "Стоимость",
            renderer: renderCost

        }],
    viewConfig: {
        forceFit: true
    },
    loadMask : {msg: 'Пожалуйста, подождите...'}
    ,sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
    frame:true,
    title:'Результаты поиска'
    ,bbar: new Ext.PagingToolbar({
			pageSize: 30,
			store: store,
			displayInfo: true,
			displayMsg: 'Результаты поиска {0} - {1} из {2}',
			emptyMsg: "Ничего не найдено"			
		})


}]});


        }// of init
    }; // of public
}(); // end of app
 

