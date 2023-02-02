<?php

if (!function_exists('write_log')) {

  function write_log($log) {
      if (true === WP_DEBUG) {
          if (is_array($log) || is_object($log)) {
              error_log(print_r($log, true));
          } else {
              error_log($log);
          }
      }
  }
}

// function add_sizes_options( $field ) {
//   if ($field['name'] === 'e-img') {
//     acf_render_field_setting( $field, array(
//       'label'        => __( 'Sizes', 'Robin Navas' ),
//       'instructions' => '',
//       'name'         => 'sizes',
//       'type'         => 'textarea',
//       'ui'           => 1,
//     ), true ); // If adding a setting globally, you MUST pass true as the third parameter!
//   }
// }
// add_action( 'acf/render_field_general_settings/type=image', 'add_sizes_options' );

function validate_and_generate_custom_sizes($value, $post_id, $field, $original ) {
  if ($field['name'] !== 'custom_img_sizes') return $value;
  
  $wantedSizes = [];
  foreach(explode("\n", $value) as $inputs) {
    $wantedSizes[] = explode(" ", $inputs);
  }
  
  if( is_string($value) ) {
    $post = get_post($post_id);
    $name = $post->post_name;

    // Get the img directory
    $dir = dirname(get_attached_file($post_id));
    $dirIterate = new DirectoryIterator($dir);

    $matches = [];
    $ExistingVersions = [];
    foreach ($dirIterate as $fileinfo) {
      if (!$fileinfo->isDot()) {
        $filename = $fileinfo->getFileName();
          
        if(preg_match('/pexels-matteo-badini-13368973/', $filename, $matches)) {
          $ExistingVersions[] = $filename;
        };
      }
    }

    // Check if the sizes of the img already exist
    foreach($ExistingVersions as $existingImg) {
      foreach ($wantedSizes as $wantedSize) {
        $pattern = '/' . trim($wantedSize[1]) . '/';
       if(preg_match($pattern, $existingImg)) {
        write_log('DO SOMETHING WITH THE SIZE');
       }
      }
    }

    // If not we generate it


    // Once it is done we valid it
  }

  return $value;
}


add_filter('acf/update_value/name=custom_img_sizes', 'validate_and_generate_custom_sizes', 10, 4);

// add_filter('acf/render_field/name=custom_img_sizes', function() {
//   return 'qwert';
// });

add_action('admin_menu', 'change_nav_menus_position');
function change_nav_menus_position() {

    // Remove old menu
    remove_submenu_page( 'themes.php', 'nav-menus.php' );

    //Add new menu page
     add_menu_page(
       'Menus',
       'Menus',
       'edit_theme_options',
       'nav-menus.php',
       '',
       'dashicons-list-view',
       68
    );
}


