<?php
/**
 * Plugin Name: Gutencard
 * Plugin URI: https://github.com/khleomix/gutencard
 * Description: Gutencard — is a Custom Gutenberg Card Block Plugin
 * Author: JC Palmes
 * Author URI: https://khleomix.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @since   1.0.0
 * @package gutencard
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
