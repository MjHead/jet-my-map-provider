<?php
/**
 * Plugin Name: JetEngine - example of custom map provider
 * Plugin URI:  
 * Description: This example not creates custom provider, just override some existing one.
 * Version:     1.0.0
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com/
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

add_action( 'jet-engine/maps-listings/assets', function() {
	wp_enqueue_script( 'my-map-provider', plugins_url( 'provider.js', __FILE__ ), array(), '1.0.0', true );
}, 11 );
