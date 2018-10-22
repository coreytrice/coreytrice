<?php
/**
 * Template Name: page-resume
 **/

get_header();
?>

<div id="resume">
    <section class="dark-bg hero">
        <div class="content-wrap">
            <h1 class="branding"><span>résumé</span></h1>
            <p>Check out my professional career</p>
            <div class="cta">
                <a href="/wp-content/themes/corey/assets/files/corey-trice-resume.pdf" download="Corey Trice resume">download résumé</a>
            </div>
        </div>
    </section>
    <section class="med-bg">
        <div class="light-bg resume-wrap">
            <div class="print-this branding-hover clearfix">
                <a href="#" id="print-button" class="right" onclick="window.print();return false;">print this</a>
            </div>
            <div class="resume-head">
                <div class="content-wrap resume-name-title">
                    <h2 class="branding"><span>corey</span> trice</h2>
                    <h4>WEB DEVELOPER</h4>
                </div>
                <div class="content-wrap resume-contact clearfix">
                    <p class="right resume-email"><a href="mailto:corey@coreytrice.com" class="branding-hover">corey@coreytrice.com</a></p>
                    <p class="left resume-phone"><strong>TELEPHONE</strong> <span class="hidden-personal-info phone branding-hover">click to view</span></p>
                </div>
            </div>
            <div class="resume-body">
                <div class="content-wrap resume-professional-experience">
                    <h4 class="branding"><span>professional</span> experience</h4>
                    <div class="job-card">
                        <p class="resume-header">SENIOR PRODUCT ENGINEER, THEBLAZE.COM (REMOTE) 2014 - CURRENT</p>
                        <p class="resume-detail">I work remotely writing code for TheBlaze.com, a news company that receives millions of unique viewers every month. My responsibilities include developing applications, tools, and features for use by employees and users, reviewing pull requests, product lifecycle management, communication with product stakeholders, and helping debug when issues arise. Some of the projects I have worked on over the years include a custom AJAX commenting system, comment moderation systems, login and authentication systems, site-wide advertising takeover systems, data reporting systems, custom APIs, and a user-facing self-publishing system.</p>
                    </div>
                    <div class="job-card">
                        <p class="resume-header">DEVELOPER, ZNGINE.COM (LAS COLINAS, TX) 2013</p>
                        <p class="resume-detail">I worked as a contractor for the social media music startup, Zngine.com. As a part of the seven-member team, I wrote code for the backend and the frontend tying together the data and the display. Some of the systems I worked on included the profile, comments, and scheduling. The project made it to an Alpha testing release before I moved on to my next adventure.</p>
                    </div>
                    <div class="job-card">
                        <p class="resume-header">FOUNDER/OWNER, ARROW DESIGN GROUP (SALISBURY, MD) 2004-2013</p>
                        <p class="resume-detail">I started the company to fill a void in the market. We were consistently praised for showing up to get the job done and surpassing our client’s expectations. I designed solutions that fulfilled customer’s needs and wants with interior and exterior designs, custom blue prints, and prepared material estimates. I was able to build relationships with clients and suppliers that led to repeat business over the years. I also estimated quotes for jobs large and small, supervised projects, employees and sub-contractors, and managed the company books.</p>
                    </div>
                </div>
                <div class="content-wrap resume-skills">
                    <h4 class="branding"><span>technical</span> skills</h4>
                    <div class="flex-wrap">
                        <div class="flex-container empty">
                            <!-- empty -->
                        </div>
                        <div class="flex-container">
                            <h5>USE REGULARLY</h5>
                            <ul>
                                <li>Mac OS / iOS</li>
                                <li>PHP / WordPress</li>
                                <li>MySQL / Sequel Pro</li>
                                <li>JavaScript / jQuery</li>
                                <li>APIs / AJAX / JSON</li>
                                <li>HTML5 / CSS3</li>
                                <li>Yii 2</li>
                                <li>Ruby on Rails</li>
                                <li>MAMP / LAMP</li>
                                <li>Version control (Git)</li>
                                <li>Slack / HipChat</li>
                                <li>Jira / Trello</li>
                                <li>Handlebars</li>
                                <li>Grunt</li>
                            </ul>
                        </div>
                        <div class="flex-container">
                            <h5>HAVE EXPERIENCE</h5>
                            <ul>
                                <li>SCSS / LESS</li>
                                <li>Backbone</li>
                                <li>Node JS</li>
                                <li>MongoDB</li>
                                <li>Google Analytics</li>
                                <li>Windows</li>
                                <li>Linux</li>
                                <li>VirtualBox</li>
                                <li>Photoshop / Fireworks</li>
                                <li>Illustrator</li>
                                <li>Subversion</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="content-wrap resume-education">
                    <h4 class="branding"><span>education</span></h4>
                    <p class="resume-header">MASTER'S OF SCIENCE, INTERNET MARKETING, FULL SAIL UNIVERSITY (WINTER PARK, FL) 2013</p>
                    <p class="resume-header">BACHELOR'S OF SCIENCE, WEB DESIGN &amp; DEVELOPMENT, FULL SAIL UNIVERSITY (WINTER PARK, FL) 2012</p>
                </div>
            </div>
        </div> <!-- .light-bg -->
    </section>
    <section class="light-bg">
        <div class="content-wrap">
            <h3 class="branding"><span>let's</span> chat</h3>
            <p>If you would like to work together, then give me a call or shoot me an email</p>
            <div class="cta">
                <a href="<?php echo esc_url(get_page_link(41)); ?>">contact me</a>
            </div>
        </div>
    </section>
</div><!-- #resume -->

<?php get_footer(); ?>
