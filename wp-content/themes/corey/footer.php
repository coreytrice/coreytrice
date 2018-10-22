<?php
/**
 * The template for displaying the footer
 */

?>

        </div><!-- #content -->

        <footer class="site-footer dark-bg">
            <div class="wrap">
                <h3>Let's build an amazing web, together!</h3>
<?php
                if(has_nav_menu('social')) {
                    echo '<nav class="social-navigation navigation" role="navigation">';
                        wp_nav_menu([
                            'theme_location' => 'social',
                            'menu_class'     => 'social-links-menu',
                            'depth'          => 1,
                        ]);
                    echo '</nav><!-- .social-navigation -->';
                };

                if(has_nav_menu('bottom')) {
                    echo '<nav class="bottom-navigation navigation" role="navigation">';
                        wp_nav_menu([
                            'theme_location' => 'bottom',
                            'menu_class'     => 'bottom-menu',
                            'depth'          => 1,
                        ]);
                    echo '</nav><!-- .bottom-navigation -->';
                }
?>
                <div class="copyright">
                    &copy <?php echo date('Y'); ?>. All rights reserved. <a href="/">coreytrice.com<a>
                </div>
            </div><!-- .wrap -->
        </footer><!-- .site-footer -->
    </div><!-- .site-content -->
</div><!-- #main-wrapper -->

<div id="alert_wrapper"></div>

<div class="overlay"></div>
<?php wp_footer(); ?>
</body>
</html>
