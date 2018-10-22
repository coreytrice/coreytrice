<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d24e2c">
    <meta name="msapplication-TileColor" content="#333333">
    <meta name="theme-color" content="#333333">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
    <link rel="stylesheet" href="https://s3.amazonaws.com/icomoon.io/114779/Socicon/style.css?9ukd8d">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="main-wrapper" class="site">
    <header id="menu-header" class="site-header dark-bg" role="banner">
        <?php if(has_nav_menu('top')) : ?>
            <div class="navigation-top navigation">
                <?php
                    wp_nav_menu([
                        'theme_location' => 'top',
                        'menu_id'        => 'top-menu',
                    ]);
                ?>
            </div><!-- .navigation-top -->
        <?php endif; ?>
    </header><!-- #masthead -->

    <?php

    /*
     * If a regular post or page, and not the front page, show the featured image.
     * Using get_queried_object_id() here since the $post global may not be set before a call to the_post().
     */
    if((
           is_single()
        || (is_page() && !(is_front_page() && !is_home())))
        && has_post_thumbnail(get_queried_object_id())
    ) :
        echo '<div class="single-featured-image-header">';
        echo get_the_post_thumbnail(get_queried_object_id(), 'featured-image');
        echo '</div><!-- .single-featured-image-header -->';
    endif;
    ?>

    <div class="site-content light-bg">
        <div id="content" class="site-content">
