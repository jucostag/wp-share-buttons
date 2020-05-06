<?php

namespace WPSB;

/**
 * ShareButtons class
 *
 * Include share buttons on sidebar.
 *
 * @author Juliana Gonçalves <juliana.goncosta@gmail.com>
 * @package WPSB
 */

class ShareButtons extends \WP_Widget {

	function __construct(){
		parent::__construct(
		"sharebuttons",
		__("WP Share Buttons", "sharebuttons"),
		array( "description" => __( "Widget para inserir botões de compartilhamento", "wpsharebuttons" ), )
		);
	}

	public function widget($args, $instance){
		$title = apply_filters("widget_title", $instance["title"]);

		echo $args["before_widget"];

		if (!empty($title))
			echo $args["before_title"] . $title . $args["after_title"];

		echo do_shortcode("[share_buttons show_featured=\"{$instance["featured_networks"]}\" enable_toggle=\"{$instance["enable_toggle"]}\" show_on_toggle=\"{$instance["toggle_networks"]}\"]");

		echo $args["after_widget"];
	}

	public function form($instance){

		$title = __("New title", "wpb_widget_domain");
		
		if(isset($instance["title"]))
			$title = $instance["title"];

		$featured_networks = $instance["featured_networks"];
		$toggle_networks = $instance["toggle_networks"];
		$isEnabled = $instance["enable_toggle"];

		$fields = array(
				"title" => array(
					"type" 	=> "text",
					"title" => $this->get_field_id("title"),
					"label" => "Título",
					"name"	=> $this->get_field_name("title"),
					"value"	=> esc_attr($title)
				),
				"featured_networks" => array(
					"type" 	=> "text",
					"title" => $this->get_field_id("featured_networks"),
					"label" => "Redes sociais em destaque",
					"name"	=> $this->get_field_name("featured_networks"),
					"value"	=> esc_attr($featured_networks)
				),
				"enable_toggle" => array(
					"type" 	=> "checkbox",
					"title" => $this->get_field_id("enable_toggle"),
					"label" => "Toggle (esconder / mostrar redes sociais)",
					"name"	=> $this->get_field_name("enable_toggle"),
					"value" => "true",
					"checked" => ((esc_attr($isEnabled) == true) ? "checked" : "")
				),
				"toggle_networks" => array(
					"type" 	=> "text",
					"title" => $this->get_field_id("toggle_networks"),
					"label" => "Redes sociais secundárias (dentro do toggle)",
					"name"	=> $this->get_field_name("toggle_networks"),
					"value"	=> esc_attr($toggle_networks)
				)
			);

		require(__DIR__ . "/forms/shareButtonsForm.phtml");
	}

	public function update($new_instance, $old_instance){
		$instance = array();

		$instance["title"] = (!empty($new_instance["title"])) ? strip_tags($new_instance["title"]) : "";

		$instance["featured_networks"] = (!empty($new_instance["featured_networks"])) ? strip_tags($new_instance["featured_networks"]) : "";

		$instance["toggle_networks"] = (!empty($new_instance["toggle_networks"])) ? strip_tags($new_instance["toggle_networks"]) : "";

		$instance["enable_toggle"] = (!empty($new_instance["enable_toggle"])) ? strip_tags($new_instance["enable_toggle"]) : "";

		return $instance;
	}

}