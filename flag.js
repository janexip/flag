/**
 * Implements hook_services_success().
 */
function flag_services_postprocess(options, data) {
  try {
    // Extract the flag settings from the system connect result data.
    if (options.service == 'system' && options.resource == 'connect') {
      if (data.flag) {
        drupalgap.flag = data.flag;
      }
      else {
        console.log('flag_services_postprocess - failed to extract flag settings from system connect.');
      }
    }
  }
  catch (error) { console.log('flag_services_postprocess - ' + error); }
}

/**
 * Implements hook_entity_post_render_content().
 */
function flag_entity_post_render_content(entity, entity_type, bundle) {
  try {
    // Since flag isn't a field, we'll just prepend it to the entity content.
    if (entity_type == 'node') {
      var flags = flag_get_entity_flags(entity_type, bundle);
      if (!flags) { return; }
      var entity_id = entity[entity_primary_key(entity_type)];
      var html = '';
      var page_id = drupalgap_get_page_id();
      $.each(flags, function(fid, flag) {
          dpm(flag);
          var container_id = flag_container_id(flag.name, entity_id);
          html += '<div id="' + container_id + '"></div>' +
            drupalgap_jqm_page_event_script_code(
              {
                page_id: page_id,
                jqm_page_event: 'pageshow',
                jqm_page_event_callback: '_flag_pageshow',
                jqm_page_event_args: JSON.stringify({
                    fid: fid,
                    entity_id: entity_id
                })
              },
              flag.fid
            );
      });
      entity.content = html + entity.content;
    }
  }
  catch (error) {
    console.log('flag_entity_post_render_content - ' + error);
  }
}

/**
 *
 */
function _flag_pageshow(options) {
  try {
    var flag = flag_load(options.fid);
    flag_is_flagged(flag.name, options.entity_id, Drupal.user.uid, {
        success: function(result) {
          try {
            var html = '';
            var flagged = result[0];
            var path = null;
            var text = null;
            var action = null;
            if (flagged) {
              text = flag.options.unflag_short;
              action = 'unflag';
            }
            else {
              text = flag.options.flag_short;
              action = 'flag';
            }
            var attributes = {
              onclick: "_flag_onclick(" + flag.fid + ", " + options.entity_id + ", '" + action + "')"
            };
            html += theme('button_link', {
                path: path,
                text: text,
                attributes: attributes
            });
            var container_id = flag_container_id(flag.name, options.entity_id);
            $('#' + container_id).html(html).trigger('create');
          }
          catch (error) { console.log('_flag_pageshow - success - ' + error); }
        }
    });
  }
  catch (error) { console.log('_flag_pageshow - ' + error); }
}

/**
 *
 */
function _flag_onclick(fid, entity_id, action) {
  try {
    var flag = flag_load(fid);
    if (!flag) { return; }
    flag_flag(flag.name, entity_id, action, Drupal.user.uid, false, {
        success: function(result) {
          try {
            if (result[0]) {
              var msg = null;
              if (action == 'flag') { msg = flag.options.flag_message; }
              else { msg = flag.options.unflag_message; }
              drupalgap_alert(msg);
            }
          }
          catch (error) { console.log('_flag_onclick - success - ' + error); }
        }
    });
  }
  catch (error) { console.log('_flag_onclick - ' + error); }
}

/**
 *  
 */
function flag_get_entity_flags(entity_type, bundle) {
  try {
    var flags = null;
    $.each(drupalgap.flag, function(fid, flag) {
        if (flag.entity_type == entity_type) {
          $.each(flag.types, function(index, _bundle) {
              if (bundle == _bundle) {
                if (!flags) { flags = {}; }
                flags[fid] = flag;
                return false;
              }
          });
        }
    });
    return flags;
  }
  catch (error) { console.log('flag_get_entity_flags - ' + error); }
}

/**
 *
 */
function flag_container_id(flag_name, entity_id) {
  try {
    return 'flag_' + flag_name + '_' + entity_id;
  }
  catch (error) { console.log('flag_container_id - ' + error); }
}

/**
 *
 */
function flag_load(fid) {
  try {
    var flag = null;
    $.each(drupalgap.flag, function(_fid, _flag) {
        if (fid == _fid) {
          flag = _flag;
          return false;
        }
    });
    return flag;
  }
  catch (error) { console.log('flag_load - ' + error); }
}

/***********|
 * Services |
 ***********/

/**
 * Check if a entity was flagged by a user.
 * @param {String} flag_name
 * @param {Number} entity_id
 * @param {Number} uid (optional)
 * @param {Object} options
 */
function flag_is_flagged(flag_name, entity_id, uid, options) {
  try {
    options.method = 'POST';
    options.path = 'flag/is_flagged.json';
    options.service = 'flag';
    options.resource = 'is_flagged';
    var data = {
      flag_name: flag_name,
      entity_id: entity_id
    };
    if (uid) { data.uid = uid; }
    options.data = JSON.stringify(data);
    Drupal.services.call(options);
  }
  catch (error) { console.log('flag_is_flagged - ' + error); }
}

/**
 * Flags (or unflags) an entity.
 */
function flag_flag(flag_name, entity_id, action, uid, skip_permission_check, options) {
  try {
    options.method = 'POST';
    options.path = 'flag/flag.json';
    options.service = 'flag';
    options.resource = 'flag';
    if (typeof action === 'undefined') { action = 'flag'; }
    if (typeof skip_permission_check === 'undefined') { skip_permission_check = false; }
    var data = {
      flag_name: flag_name,
      entity_id: entity_id,
      action: action,
      skip_permission_check: skip_permission_check
    };
    if (uid) { data.uid = uid; }
    options.data = JSON.stringify(data);
    Drupal.services.call(options);
  }
  catch (error) { console.log('flag_flag - ' + error); }
}

/**
 *
 */
function flag_countall(options) {
  try {
    options.method = 'POST';
    options.path = 'flag/countall.json';
    options.service = 'flag';
    options.resource = 'countall';
    Drupal.services.call(options);
  }
  catch (error) { console.log('flag_countall - ' + error); }
}

