<?php

/**
* Plugin Name: WP Share Buttons
* Plugin URI: https://github.com/jucostag/wp-share-buttons
* Description: This plugin adds social media share buttons to WordPress as a sidebar widget.
* Version: 1.0.0
* Author: Juliana Gonçalves
* License: GPL
* Author URI: https://github.com/jucostag
*/

require_once("src/WPSB/ShareButtons.php");

function wpsbRegisterWidgets(){
	register_widget("WPSB\ShareButtons");
}
add_action("widgets_init", "wpsbRegisterWidgets");

function wpsbShortcode($atts){
    ob_start();
    do_action("wpsb_include_assets");
	$template = require(__DIR__ . "/assets/phtml/share-buttons.phtml");
    return str_replace(array("\r","\n","\t"),"",trim(ob_get_clean()));
}
add_shortcode("share_buttons", "wpsbShortcode");

function wpsbAssets() {
	wp_enqueue_style("font-awesome", plugins_url("/assets/css/font-awesome.min.css", __FILE__));
	wp_enqueue_style("wpsb", plugins_url("/assets/css/wpsb.min.css", __FILE__));
	wp_enqueue_script("wpsb_vendor", plugins_url("/assets/js/wpsbVendor.min.js", __FILE__), "", "", true);
	wp_enqueue_script("wpsb", plugins_url("/assets/js/wpsb.min.js", __FILE__), "", "", true);
}
add_action("wpsb_include_assets", "wpsbAssets");