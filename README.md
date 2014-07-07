flag
====

The Flag module for DrupalGap.

Setup
=====

1. Download and enable the Flag Service module on your Drupal site:

     https://drupal.org/project/flag_service

2. Enable the DrupalGap Flag module on your Drupal site. This is a sub module
   included with the DrupalGap module:
   
     https://drupal.org/project/drupalgap

3. On your drupal site, navigate to:

     admin/structure/services/list/drupalgap/resources 
  
   Then enable the 3 resources under the 'flag' service.

4. Add this module to your settings.js file in DrupalGap:

     Drupal.modules.contrib['flag'] = {};

Example Code
============

Display Flag Count on a Node Page
http://pastebin.com/1r602H6A

