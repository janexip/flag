flag
====

The Flag module for DrupalGap.

Setup
=====

1. Download and install Flag Service on your drupal site.

  https://drupal.org/project/flag_service

2. On your drupal site, navigate to:

  admin/structure/services/list/drupalgap/resources 
  
   Then enable the 3 resources under the 'flag' service.

3. Add this module to your settings.js file in DrupalGap

|=================| | Example calls | |=================|

- is_flagged:

        var is_flagged = {
             "flag_name" : blah,
             "entity_id" : 123, 
              "uid" : 1,  //optional
        };
        drupalgap.services.flag.is_flagged.call({
            'data':is_flagged,
            'success':function(data) {
                //your success function
            },
        });
        
- flag/unflag:

        var flag = {
             "flag_name" : blah,
             "entity_id" : 123, 
              "uid" : 1, 
              "action" : "flag", //or unflag
              "skip_permission_check" : true,  //or flase
        };
        drupalgap.services.flag.flag.call({
            'data':flag,
            'success':function(data) {
                // your success function
            },
        });
        

- countall:


        var countall = {
             "flag_name" : blah,
             "entity_id" : 123, 
        };
        drupalgap.services.flag.countall.call({
            'data':countall,
            'success':function(data) {
                //your success function
            },
        });
