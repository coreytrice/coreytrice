<?php



function corey_is_dev() {
    return defined('IS_DEV_INSTANCE') and constant('IS_DEV_INSTANCE');
}

function corey_is_prod() {
    return defined('IS_PROD_INSTANCE') and constant('IS_PROD_INSTANCE');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 **/
function corey_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('featured-image', 2000, 1200, true);
    add_image_size('project-image', 300, 300, true);
    add_image_size('thumbnail-avatar', 100, 100, true);

    register_nav_menus([
        'top'    => 'Top Menu',
        'bottom' => 'Bottom Menu',
        'social' => 'Social Links Menu',
    ]);

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     **/
    add_theme_support('html5', [
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ]);

    /*
     * Enable support for Post Formats.
     *
     * See: https://codex.wordpress.org/Post_Formats
     */
    add_theme_support('post-formats', [
        'aside',
        'image',
        'video',
        'quote',
        'link',
        'gallery',
        'audio',
    ]);

    add_action('wp_head', 'head_settings', 1);
}
add_action('after_setup_theme', 'corey_setup');

/**
 * Register widget areas
 */
function corey_widgets_init() {
    register_sidebar([
        'name'          => 'Main Sidebar',
        'id'            => 'sidebar-1',
        'description'   => 'Add widgets here to appear in your sidebar on blog posts and archive pages.',
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ]);

    register_sidebar([
        'name'          => 'Content Section Sidebar',
        'id'            => 'sidebar-2',
        'description'   => 'Add widgets here to appear in your content.',
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '',
        'after_title'   => '',
    ]);
}
add_action('widgets_init', 'corey_widgets_init');

/**
 * Replaces "[...]" with ... and a 'Keep reading' link.
 *
 * @param string $link Link to single post/page.
 * @return string 'Keep reading' link prepended with an ellipsis.
 */
function corey_excerpt_more($link) {
    if(is_admin()) {
        return $link;
    }

    $link = sprintf('<p class="link-more"><a href="%1$s" class="more-link">%2$s</a></p>',
        esc_url(get_permalink(get_the_ID())),
        'Keep reading<span class="screen-reader-text"> "%s"</span>',
        get_the_title(get_the_ID())
    );
    return ' &hellip; ' . $link;
}
add_filter('excerpt_more', 'corey_excerpt_more');


/**
 * Enqueue scripts and styles.
 */
function corey_scripts() {
    // Use random number as param to bust cache during development
    $script_version = corey_is_prod() ? null : rand(1,999999);

    // Use min scripts with asset version for Prod
    // Get asset_version from Gruntfile.js
    $script_path = corey_is_prod() ? '/assets/js/dist/scripts.' . (defined('ASSET_VERSION') ? constant('ASSET_VERSION') : 'min') . '.js' : '/assets/js/dev/scripts.js';

    // Main combined JS file for frontend
    wp_register_script('corey-all', get_template_directory_uri() . $script_path, [], $script_version);
    wp_enqueue_script('corey-all');

}
add_action('wp_enqueue_scripts', 'corey_scripts');

function conditional_styles() {
    // Assets Paths
    if(corey_is_prod()) {
        // Get asset_version from Gruntfile.js
        $asset_version      = defined('ASSET_VERSION') ? constant('ASSET_VERSION') : 'min';
        $main_style_path    = '/assets/css/dist/styles.' . $asset_version . '.css';
    }else{
        // Use random number as param to bust cache during development
        $style_version      = rand(1,999999);
        $main_style_path    = '/assets/css/dev/styles.css?ver=' . $style_version;
    }

    $link = get_template_directory_uri() . $main_style_path;

    echo "<link rel='stylesheet' href='{$link}' type='text/css' />";
}
add_action('wp_print_styles', 'conditional_styles');

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images.
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */
function content_image_sizes_attr($sizes, $size) {
    $width = $size[0];

    if(740 <= $width) {
        $sizes = '(max-width: 706px) 89vw, (max-width: 767px) 82vw, 740px';
    }

    if(
           is_active_sidebar('sidebar-1')
        || is_archive()
        || is_search()
        || is_home()
        || is_page()
    ) {
        if(!(is_page() && 'one-column' === get_theme_mod('page_options')) && 767 <= $width) {
             $sizes = '(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px';
        }
    }

    return $sizes;
}
add_filter('wp_calculate_image_sizes', 'content_image_sizes_attr', 10, 2);

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for post thumbnails.
 *
 * @param array $attr       Attributes for the image markup.
 * @param int   $attachment Image attachment ID.
 * @param array $size       Registered image size or flat array of height and width dimensions.
 * @return array The filtered attributes for the image markup.
 */
function post_thumbnail_sizes_attr($attr, $attachment, $size) {
    if(is_archive() || is_search() || is_home()) {
        $attr['sizes'] = '(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px';
    }else{
        $attr['sizes'] = '100vw';
    }

    return $attr;
}
add_filter('wp_get_attachment_image_attributes', 'post_thumbnail_sizes_attr', 10, 3);

function corey_post_type_project() {
    $labels = [
        'name'                  => 'Projects',
        'singular_name'         => 'Project',
        'add_new'               => 'Add New',
        'edit_item'             => 'Edit Project',
        'new_item'              => 'New Project',
        'view_item'             => 'View Project',
        'search_items'          => 'Search',
        'not_found'             => 'No Projects found',
        'not_found_in_trash'    => 'No Projects found in Trash',
        'all_items'             => 'All Projects',
        'archives'              => 'Project Archives',
        'insert_into_item'      => 'Insert into project',
        'uploaded_to_this_item' => 'Uploaded to this project',
        'menu_name'             => 'Project',
        'parent_item_colon'     => ''
    ];

    $args = [
        'labels'                => $labels,
        'public'                => true,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'query_var'             => true,
        'rewrite'               => ['with_front' => false],
        'capability_type'       => 'post',
        'has_archive'           => 'projects',
        'hierarchical'          => false,
        'menu_icon'             => 'dashicons-feedback',
        'menu_position'         => 7,
        'show_in_nav_menus'     => true,
        'supports'              => [
            'title',
            'editor',
            'author',
            'thumbnail',
            'excerpt',
            'comments',
            'revisions',
        ],
        'taxonomies'            => [],
    ];
    register_post_type('project', $args);
}
add_action('init', 'corey_post_type_project');


function head_settings() {
    $adminAJAX = json_encode(admin_url('admin-ajax.php'));
    echo <<<JS
    <script>
        window.corey     = window.corey || {};
        corey.ajaxUrl    = {$adminAJAX};
    </script>
JS;
    }

$grunt_constant_file = get_template_directory() . '/inc/grunt-constant.php';
if(corey_is_prod() && file_exists($grunt_constant_file)) {
    require $grunt_constant_file;
}

// Add email script
require get_template_directory() . '/inc/email.php';




