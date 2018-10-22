<?php
/**
 * Template Name: page-home
 **/

get_header();
$siteDescription = get_bloginfo('description', 'display');
?>
<div id="home-page">
    <section class="dark-bg hero">
        <div class="content-wrap">
            <h1 class="branding"><span>corey</span> trice</h1>
            <h2><?php echo $siteDescription; ?></h2>
        </div>
    </section>
    <section class="med-bg second">
        <div class="content-wrap">
            <h3 class="branding"><span>my</span> career</h3>
            <p>I am a full-stack web developer with years of experience building and maintaining web applications that reach millions of users a month. If you are looking for someone like that, then give me a call or shoot me an email.</p>
        </div>
    </section>
    <section class="light-bg">
        <div class="content-wrap what-i-do">
            <h4>Some of my favorite aspects of web development include backend development, APIs, and AJAX / JavaScript</h4>
            <div class="flex-wrap">
                <div class="flex-container">
                    <h5>Backend Development</h5>
                    <i class="material-icons">create</i>
                    <p>Dealing with the data input and output for a website is challenging and fun. Helping users take advantage of the content and features of a website is rewarding.</p>
                </div>
                <div class="flex-container">
                    <h5>APIs</h5>
                    <i class="material-icons">storage</i>
                    <p>Building internal APIs and ingesting external APIs make the web more interesting. I enjoy the challenge of creating custom APIs.</p>
                </div>
                <div class="flex-container">
                    <h5>AJAX / JavaScript</h5>
                    <i class="material-icons">all_inclusive</i>
                    <p>Building components and features that create, read, update, and delete content without having to reload a page adds to amazing user experiences.</p>
                </div>
            </div>
        </div>
    </section>
    <section class="med-bg">
        <div class="content-wrap project">
            <h3 class="branding"><span>latest</span> projects</h3>
            <p>Check out what I've been working on lately</p>
            <div class="flex-wrap project-wrap">
<?php
                $args = [
                    'post_type'         => ['project'],
                    'post_status'       => ['publish'],
                    'paged'             => 1,
                    'posts_per_page'    => 3,
                ];

                $projects = new WP_Query($args);

                if($projects->have_posts()) :
                    while($projects->have_posts()) : $projects->the_post();
                        get_template_part('template/page/project-home', 'page');
                    endwhile;
                endif;

                wp_reset_postdata();
?>
            </div>
        </div>
        <?php if($projects->found_posts > 3) : ?>
            <div class="cta">
                <a href="<?php echo get_post_type_archive_link('project'); ?>" class="more-projects branding"><span>see</span> more</span><i class="material-icons">arrow_right</i></a>
            </div>
        <?php endif; ?>
    </section>
</div> <!-- #home-page -->

<?php get_footer(); ?>
