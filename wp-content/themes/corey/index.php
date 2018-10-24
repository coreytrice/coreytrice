<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>


<div id="about">
<?php
    while(have_posts()) : the_post();
        get_template_part('template-parts/project/content', 'single');

        // If comments are open or we have at least one comment, load up the comment template.
        if(comments_open() || get_comments_number()) :
            comments_template();
        endif;

    endwhile; // End of the loop.
?>
</div>

<?php get_footer();
