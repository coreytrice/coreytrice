<?php
/**
 * Template Name: page-about
 **/

get_header();
?>

<div id="about">
    <section class="dark-bg hero">
        <div class="content-wrap">
            <h1 class="branding"><span>who</span> am i?</h1>
            <p>Find out more about my personality and passions, beyond web development</p>
        </div>
    </section>
    <section class="light-bg second">
        <div class="content-wrap">
            <h3 class="branding"><span>about</span> me</h3>
            <p>I am a husband, father, son, grandson, and web developer. I built a library in my house, I have a large digital collection of movies and TV, I have a ton of working vintage video game consoles (and games), I enjoy doing construction projects (I even had a construction company for almost a decade), I walk to pick up my daughter from school most days, I have fun playing with home automation, I listen to vinyl, and I wear shorts and flip-flops all year long.</p>
        </div>
    </section>
    <section class="dark-bg">
        <div class="content-wrap">
            <h3>how i got to this point</h3>
            <p>I started a construction company back in the mid 2000s and everything was going well until the 2008 housing crisis made most people a little leary about spending money on big construction projects. I had just gotten married and a few months later we found out we were going to have a baby.</p>
            <p>I realized that I wanted to do something that could provide a little more stability for our growing family, so I decided to go to college to get my degree in web design and development. I had been building websites as a hobby since the late 90s and really loved the challenges/excitement of building something from scratch and seeing the final product.</p>
            <p>Once I finished my Bachelor's degree, I went on to get my Master's degree and started working full-time as a web developer. I loved it! I was working in an agency on a site for a new start-up while I finished my Master's. Then I moved into the corporate development world on small team that managed the site for a news organization reaching millions of unique users every month.</p>
            <p>I have been fortunate to get to work with amazing teams filled with talented developers, and I have been able to learn from people that I consider mentors and friends. I have worked very hard to get to this point in my life where I get to wear shorts and flip-flops every day instead of work boots or suits and ties. I love what I do!</p>
        </div>
    </section>
    <section class="light-bg">
        <div class="content-wrap">
            <h3 class="branding"><span>family</span> life</h3>
            <p>I have a wife and two children, a girl and a boy. We live on a quiet culdesac, and our kids play in the street with the neighbor kids. We have a mutt named Harley, and she is one of the smartest dogs I have ever owned. We have family movie night on Friday and go to our local church on Sunday.</p>
        </div>
    </section>
    <section class="med-bg instagram-wrap">
        <h3 class="branding"><span>my</span> Instagram</h3>
        <div class="instagram-feed">
            <?php dynamic_sidebar('sidebar-2'); ?>
        </div>
    </section>
    <section class="light-bg">
        <div class="content-wrap">
            <h3 class="branding"><span>professional</span> history</h3>
            <p>Check out what I've done over the years, and see if we could work together on your site. I am a dedicated developer, a problem solver, and a quick study, so even if I don't have experience with the technology you use I can always learn.</p>
            <div class="cta">
                <a href="<?php echo esc_url(get_page_link(RESUME_PAGE_ID)); ?>">view résumé</a>
            </div>
        </div>
    </section>
</div>

<?php get_footer(); ?>
