<?php
/**
 * The template for displaying 404 pages
 */

get_header(); ?>

<div id="404">
    <section class="dark-bg hero">
        <div class="content-wrap">
            <h1 class="branding"><span>404</span> not found</h1>
            <h2>We're sorry this happened...</h2>
        </div>
    </section>
    <section class="light-bg">
        <div class="content-wrap">
            <p>It looks like nothing was found at this location. Maybe try a search?</p>

            <?php get_search_form(); ?>

        </div><!-- .content-wrap -->
    </section>
</div><!-- #404 -->

<?php get_footer();
