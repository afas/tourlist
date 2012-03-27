Ext.BLANK_IMAGE_URL = 'Ext/resources/images/default/s.gif';

Ext.namespace('SearchForm');

// create application
SearchForm.app = function() {
 
    // private variables
    // private functions
    function  getValueNotAll(s)
    {
        if (Ext.getCmp(s).getValue() == 0)
            return '';
        return Ext.getCmp(s).getValue();
    } 
     // public space
    return {
        // public methods
        init: function() {

            var form = new Ext.FormPanel({
                
                renderTo:document.body
                ,collapsible : true
                ,monitorValid : true
                ,width: 500
                ,autoHeight: true
                ,style:'margin:15px'
                ,frame:true
                ,bodyStyle:'padding:10px'
                ,title:'Поиск круизов'
		,buttonAlign: 'center'
                ,items:[{
                    xtype:'fieldset'
                    ,bodyStyle:'padding:15px'
                    ,frame : true
                    ,autoHeight : true
                    ,labelWidth : 160
                    ,defaults: {
                        xtype:'combo'
                        ,width: 250
                        ,displayField:'Name'
                        ,valueField:'Id'
                        ,mode:'local'
                        ,editable : false
                        ,lastQuery:''
                        ,triggerAction:'all'
                        ,emptyText : 'Все'
                        ,resizable : true
                    }
                    ,items:[{
                        fieldLabel:'Регион'
                        ,title:'Выберите регион...'
                        ,id : "combo-region"
                        ,store: new Ext.data.JsonStore({
                            autoLoad : true
                            ,root: 'd'
                            ,fields: [
                                'Id'
                                ,'Name'
                             ]
                            ,proxy: new Ext.data.ScriptTagProxy({
                                url: servicesURI + "Cruises/WS/Cruises.asmx/GetRegions?encoding=" + responseEncoding
                            })
                        })
                    },{
                        fieldLabel:'Класс круизной компании'
                        ,title:'Выберите класс...'
                        ,id : "combo-class"
                        ,store: new Ext.data.JsonStore({
                            autoLoad : true
                            ,root: 'd'
                            ,fields: [
                                "Id",
                                'Name'
                            ]
                            ,proxy: new Ext.data.ScriptTagProxy({
                                url: servicesURI + "Cruises/WS/Cruises.asmx/GetClasses?encoding=" + responseEncoding
                            })
                        })
                        ,listeners:{
                            select : {fn:function(combo, value) {
                                if (combo.getValue() != 0)
                                {
                                var comboOperator = Ext.getCmp('combo-company');
                                comboOperator.clearValue();
                                comboOperator.store.filter('ClassId', combo.getValue());

                                var comboShip = Ext.getCmp('combo-ship');
                                comboShip.clearValue();
                                comboShip.store.filter('ClassId', combo.getValue());
                                }
                                else
                                {
                                var comboOperator = Ext.getCmp('combo-company');
                                comboOperator.clearValue();
                                comboOperator.store.clearFilter(false);

                                var comboShip = Ext.getCmp('combo-ship');
                                comboShip.clearValue();
                                comboShip.store.clearFilter(false);
                                    
                                }
                            }} // of select
                        }
                    },{
                        fieldLabel:'Круизная компания'
                        ,title:'Выберите компанию...'
                        ,id:'combo-company'
                        ,store: new Ext.data.JsonStore({
                            autoLoad : true
                            ,root: 'd'
                            ,fields: [
                                "Id"
                                ,'Name'
                                ,"ClassId"
                            ]
                            ,proxy: new Ext.data.ScriptTagProxy({
                                url: servicesURI + "Cruises/WS/Cruises.asmx/GetCompanies?encoding=" + responseEncoding
                            })
                        })
                        ,listeners:{
                            select : {fn:function(combo, value) {
                                if (combo.getValue() != 0)
                                {
                                var comboShip = Ext.getCmp('combo-ship');
                                comboShip.clearValue();
                                comboShip.store.filter('CompanyId', combo.getValue());
                                }
                                else
                                {
                                var comboShip = Ext.getCmp('combo-ship');
                                comboShip.clearValue();
                                comboShip.store.clearFilter();
                                }
                            }} // of select
                        }
                    },{
                        fieldLabel:'Лайнер'
                        ,title:'Выберите лайнер...'
                        ,id:'combo-ship'
                        ,store: new Ext.data.JsonStore({
                            autoLoad : true
                            ,root: 'd'
                            ,fields: [
                                "Id"
                                ,'Name'
                                ,"CompanyId"
                                ,"ClassId"
                            ]
                            ,proxy: new Ext.data.ScriptTagProxy({
                                url: servicesURI + "Cruises/WS/Cruises.asmx/GetShips?encoding=" + responseEncoding
                            })
                        })
                    },{
                        fieldLabel:'Длительность'
                        ,id:'combo-duration'
                        ,store: new Ext.data.SimpleStore({
                            fields: ['Id', 'Name']
                            ,data : [
                                [0, 'Все']
                                ,[1, '1-8 ночей']
                                ,[2, '9-14 ночей']
                                ,[3, 'более 15 ночей']
                            ]
                        })
                    }]
                },{
                    layout : 'column'
                    ,items : [{
                        xtype:'fieldset'
                        ,columnWidth: .45
                        ,layout: 'column'
                        ,title : 'Дата заезда'
                        ,frame:true
                        ,height : 80
                        ,items:[{
                            columnWidth : .5
                            ,items : [{
                                xtype : 'label'
                                ,text : 'С:'
                            },{
                                xtype : "datefield"
                                ,id : 'from-datefield'
                                ,allowBlank : false
                                ,value : new Date()
                            }]
                        },{
                            columnWidth : .5
                            ,items : [{
                                xtype : 'label'
                                ,text : 'По:'
                            },{
                                xtype : "datefield"
                                ,id : 'to-datefield'
                                ,allowBlank : false
                                ,value : new Date().add(Date.DAY, 5)
                            }]
                        }]
                    },{
                        columnWidth : .05
                        ,style : 'margin:1px'
                    },{
                        xtype : 'fieldset'
                        ,columnWidth : .5
                        ,layout: 'column'
                        ,title : 'Стоимость'
                        ,frame:true
                        ,height : 80
                        ,items : [{
                            layout : 'form'
                            ,columnWidth : .3
                            ,items :[{
                                xtype : 'label'
                                ,text : 'От:'
                            },{
                                xtype : "numberfield"
                                ,hideLabel : true
                                ,width : 50
                                ,id : 'costFrom-numberfield'
                                ,maxValue : 1000000
                            }]
                        },{
                            layout : 'form'
                            ,columnWidth : .3
                            ,items :[{
                                xtype : 'label'
                                ,text : 'До:'
                            },{
                                xtype : "numberfield"
                                ,hideLabel : true
                                ,width : 50
                                ,id : 'costTo-numberfield'
                                ,maxValue : 1000000
                            }]
                        },{
                            layout : 'form'
                            ,columnWidth : .4
                            ,items : [{
                                xtype : 'label'
                                ,text : 'Валюта'
                            },{
                                xtype : 'combo'
                                ,id : "combo-currency"
                                ,displayField:'Name'
                                ,hideLabel : true
                                ,valueField:'Id'
                                ,mode:'local'
                                ,width : 90
                                ,editable : false
                                ,lastQuery:''
                                ,triggerAction:'all'
                                ,emptyText : 'не важно'
                                ,resizable : true
                                ,store: new Ext.data.JsonStore({
                                    autoLoad : true
                                    ,root: 'd'
                                    ,fields: [
                                        "Id"
                                        ,'Name'
                                    ]
                                    ,proxy: new Ext.data.ScriptTagProxy({
                                        url: servicesURI + "Cruises/WS/Cruises.asmx/GetCurrencies?encoding=" + responseEncoding
                                    })
                                })
                            }]
                        }]
                    }]
                }]
                ,buttons: [{
                    text: 'Искать'
                    ,formBind : true
                    ,listeners:{
                        click : {fn:function(btn, e) {
                            var requestString = 'searchResult.htm' 
                            + '?region=' + getValueNotAll('combo-region')
                            + '&class=' + getValueNotAll('combo-class')
                            + '&company=' + getValueNotAll('combo-company')
                            + '&ship=' + getValueNotAll('combo-ship')
                            + '&dateFrom=' + Ext.getCmp('from-datefield').getValue().format('Y-m-d')
                            + '&dateTo=' + Ext.getCmp('to-datefield').getValue().format('Y-m-d')
                            + '&costFrom=' + Ext.getCmp('costFrom-numberfield').getValue()
                            + '&costTo=' + Ext.getCmp('costTo-numberfield').getValue()
                            + '&duration=' + Ext.getCmp('combo-duration').getValue()
                            + '&currency=' + Ext.getCmp('combo-currency').getValue()
                            window.open(requestString);
                        }} // of click
                    }
                }]
            }); // of formPanel
        }// of init
    }; // of public
}(); // end of app
 

