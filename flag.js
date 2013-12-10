drupalgap.services.flag = {
  'is_flagged':{
    'options':{
      'type':'POST',
      'path':'flag/is_flagged.json',
      'success':function(data){
         try {
          }
          catch (error) { drupalgap_error(error); }
        },
      },
   
    'call':function(options){
       try {
        var api_options = drupalgap_chain_callbacks(drupalgap.services.flag.is_flagged.options, options);
        drupalgap.api.call(api_options);
      }
      catch (error) {
        navigator.notification.alert(
          error,
          function(){},
          'flag is_flagged Error',
          'OK'
        );
      }
    },
  }, // <!-- is flagged -->
  'flag':{
    'options':{
      'type':'post',
      'path':'flag/flag.json',
      'success':function(data){
         try {
          }
          catch (error) { drupalgap_error(error); }
        },
      },
   
    'call':function(options){
       try {
        var api_options = drupalgap_chain_callbacks(drupalgap.services.flag.flag.options, options);
        drupalgap.api.call(api_options);
      }
      catch (error) {
        navigator.notification.alert(
          error,
          function(){},
          'flag flag/unflag Error',
          'OK'
        );
      }
    },
  }, // <!-- flag -->
  'countall':{
    'options':{
      'type':'POST',
      'path':'flag/countall.json',
      'success':function(data){
         try {
          }
          catch (error) { drupalgap_error(error); }
        },
      },
   
    'call':function(options){
       try {
        var api_options = drupalgap_chain_callbacks(drupalgap.services.flag.countall.options, options);
        drupalgap.api.call(api_options);
      }
      catch (error) {
        navigator.notification.alert(
          error,
          function(){},
          'flag countall Error',
          'OK'
        );
      }
    },
  }, // <!-- countall-->
};
