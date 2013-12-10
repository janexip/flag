flag
====

flag module for drupalgap. This was for my personal project, please use at your own risk!
This module works with Drupal's Flag Service module. To use it:
|==============| | Drupal Setup | |==============|
1. Download and install Flag Service on your drupal site.
2. On your drupal site, navigate to admin/structure/services/list/drupalgap/resources and enable the actions you need under flag.

|=================| | DrupalGap Setup | |=================|

Download the DrupalGap flag module:
https://github.com/dontmcyn/flag

Extract the module into the www/app/modules folder, so it lives here:
www/app/modules/flag

Modify settings.js to include the flag module:
/* Contrib Modules / drupalgap.modules.contrib = { / ... / {"name":"flag"}, / ... */ };


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
                alert(JSON.stringify(data, null, 4));
            },
        });
        
- flag/unflag:
      var flag = {
             "flag_name" : blah,
             "entity_id" : 123,
              "uid" : 1,
              "action" : "flag", //or unflag
              "skip_permission_check" : true, //for debugging
        };
        drupalgap.services.flag.flag.call({
            'data':flag,
            'success':function(data) {
                alert(JSON.stringify(data, null, 4));
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
                alert(JSON.stringify(data, null, 4));
            },
        });
