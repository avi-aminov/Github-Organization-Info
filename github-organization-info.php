<?php
/**
 * Plugin Name: Github Organization Info
 * Plugin URI: https://www.linkedin.com/in/avi-aminov-developer/
 * Description: Wordpress plugin challenge, see basic information about Github organization repositories and contributors
 * Version: 1.0.0
 * Author: Avi Aminov
 * Author URI: https://www.linkedin.com/in/avi-aminov-developer/
 * Text Domain: github-organization-info
 * Domain Path: /languages/
 */

 // Constants
define( 'GOI_PATH', trailingslashit(plugin_dir_path(__FILE__)) );
define( 'GOI_URL', trailingslashit(plugins_url('/', __FILE__)) );
define( 'GOI_PREFIX', 'mino_options_' );


class GithubOrganizationInfo {

    /**
     * Hold the class instance.
     */
    private static $instance = null;

    /**
     * @return GithubOrganizationInfo|null
     * The object is created from within the class itself
     * only if the class has no instance.
     */
    public static function getInstance(): GithubOrganizationInfo {
        if (self::$instance == null) {
            self::$instance = new GithubOrganizationInfo();
        }
        return self::$instance;
    }

    /**
     * constructor
     */
    public function __construct(){

        // add scripts only on this plugin page
        if($this->isThisPage()){
            add_action( 'admin_enqueue_scripts', [ $this, 'goi_include_scripts' ]);
        }
        
        add_action( 'admin_menu', [ $this, 'goi_admin_menu' ]);
    }

    /**
     * add item to wp admin menu
     */
    public function goi_admin_menu() {
        add_menu_page(
            'Github Organization Info',
            'Github Info',
            'manage_options',
            'github-organization-info_admin-page.php',
            [ $this, 'goi_admin_page' ],
            'dashicons-tickets',
            2
        );
    }

    /**
     * Theme options React App Area
     */
    public function goi_admin_page(){
        ?>
        <div class="container-fluid">
            <div id="goi-app"></div>
        </div>
        <?php
    }

    /**
     * check if page of GOI 
     */
    public function isThisPage () {
        return isset($_GET["page"]) && $_GET["page"] == 'github-organization-info_admin-page.php';
    }

    /**
     * include assets
     */
    public function goi_include_scripts() {

        // JS
        wp_enqueue_script('mino-theme-options', GOI_URL . 'build/index.js', ['jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'], rand(), true);

        // CSS
        wp_enqueue_style('remixicon-style', 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css');
        wp_enqueue_style('goi-style', GOI_URL . 'build/index.css?v=1.0.1');

        // Localizer
        wp_localize_script('goi', 'appLocalizer', [ 'apiUrl' => home_url('/wp-json'), 'nonce' => wp_create_nonce( 'wp_rest' )]);
    }
}

$goi = GithubOrganizationInfo::getInstance();