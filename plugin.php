<?php
/**
 * Plugin Name: UniCard Block
 * Plugin URI: https://github.com/khleomix/unicard
 * Description: A block plugin that can be used to create a card block with featured image, title, description fields. All fields are optional.
 * Author: khleomix
 * Author URI: https://profiles.wordpress.org/khleomix/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @since   1.0.0
 * @package unicard
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 *
 * @author JC Palmes
 * @since 1.0.0
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
