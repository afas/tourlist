Ext.BLANK_IMAGE_URL = 'Ext/resources/images/default/s.gif';

Ext.namespace('Details');

// create application
Details.app = function() {
 
    // private variables
    // private functions
     // public space
    return {
        // public methods
        init: function() {
            Ext.QuickTips.init();
            Ext.form.Field.prototype.msgTarget = 'side';
            
            var getParams = document.URL.split("?");
            // transforming the GET parameters into a dictionnary
            var params = Ext.urlDecode(getParams[getParams.length - 1]);
            
            
            var url = servicesURI + "Cruises/WS/Cruises.asmx/GetDescription?id="
             + params['id'] + "&encoding=" + responseEncoding;
            
            
            $.ajax({
                type: "GET"
                ,url: url
                ,dataType: "jsonp"
                ,success:     function(msg) {
                    var viewport = new Ext.Viewport({ 
                        id:'simplevp' 
                        ,layout:'accordion' 
                        ,animate:true

                        ,items:[{
                            title: 'Детальная информация о круизе'
                            ,id : 'detailsPanel'
                            ,buttonAlign : 'center'
                            ,autoScroll : true
                            ,items:[{
                                bodyStyle :'padding:10px'
                                ,html: msg.d.Description
                            }]
                            ,buttons:[{
                                xtype:'button'
                                ,text: ''
                                ,listeners:{
                                    click : {fn:function(btn, e) {
                                        Ext.getCmp('orderPanel').toggleCollapse(true);
                                    }} // of click
                                }
                                ,icon : 'js/basket_button.gif'
				,cls: 'mybutton-text-icon'
                            }]
                        },{ 
                            id : 'orderPanel'
                            ,title:'Заказ круиза'
                            ,items :[{
                                xtype: 'label'
                                ,text : 'Заказ круиза'
                                ,style: 'font-family:Arial;  font-size:16; font-weight:bold;'
                            },{
                                xtype: 'form'
                                ,bodyStyle:'padding:5px 5px 0'
                                ,labelWidth: 200
                                ,monitorValid : true
                                ,width : 530
                                ,frame:true
                                ,height : 200
                                ,defaults: {width: 270}
                                ,items:[{
                                    xtype: 'numberfield'
                                    ,id : 'touristCountField'
                                    ,fieldLabel : 'Количество туристов <span class="required"> *</span>'
                                    ,allowBlank : false
                                },{
                                    xtype: 'textfield'
                                    ,id : 'touristNameField'
                                    ,fieldLabel : 'Ваше имя <span class="required"> *</span>'
                                    ,allowBlank : false
                                },{
                                    xtype: 'textfield'
                                    ,id : 'cityNameField'
                                    ,fieldLabel : 'Ваше местоположение (город)'
                                },{
                                    xtype: 'textfield'
                                    ,id : 'emailField'
                                    ,fieldLabel : 'E-mail <span class="required"> *</span>'
                                    ,vtype : 'email'
                                    ,allowBlank: false
                                },{
                                    xtype: 'textfield'
                                    ,id : 'phoneField'
                                    ,fieldLabel : 'Телефон с кодом города <span class="required"> *</span>'
                                    ,allowBlank: false
                                },{
                                    xtype: 'textfield'
                                    ,id : 'additionalInfoField'
                                    ,height : 60
                                    ,fieldLabel : 'Дополнительная информация'
                                }]
                                ,buttons:[{
                                    text: 'Отправить заявку'
                                    ,formBind: true
                                    ,listeners:{
                                        click : {fn:function(btn, e) {
                                            var order = {
                                                TouristCount : Ext.getCmp('touristCountField').getValue()
                                                ,TouristName :  Ext.getCmp('touristNameField').getValue()
                                                ,CityName : Ext.getCmp('cityNameField').getValue()
                                                ,EmailAddress : Ext.getCmp('emailField').getValue()
                                                ,PhoneNumber : Ext.getCmp('phoneField').getValue()
                                                ,AdditionalInfo : Ext.getCmp('additionalInfoField').getValue()
                                                ,PriceID :  params['id']
                                                ,DestinationMail : orderEMail
                                                ,DetailsPageLocation : detailsPageLocation
                                            };
                        
                                            $.ajax({
                                                type: "GET"
                                                ,url:  servicesURI + "Cruises/WS/Cruises.asmx/CreateOrder?order=" + encodeURIComponent(Ext.util.JSON.encode(order))
                                                        + "&encoding=" + responseEncoding
                                                ,dataType: "jsonp"
                                                ,success:  function(msg) {
                                                    Ext.Msg.alert('...', 'Заявка отправлена успешно');
                                                    Ext.getCmp('detailsPanel').toggleCollapse(true);
                                                }
                                            });
                                        }} // of click
                                    }
                                }]
                            }]
                        }]
                    }); // of viewport
                } // of success
            }); // of $.ajax
        }// of init
    }; // of public
}(); // end of app
 

