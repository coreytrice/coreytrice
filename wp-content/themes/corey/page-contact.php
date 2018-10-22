<?php
/**
 * Template Name: page-contact
 **/

get_header();
?>

<div id="contact">
    <section class="dark-bg hero">
        <div class="content-wrap">
            <h1 class="branding"><span>contact</span> me</h1>
            <p>Let's build something awesome!</p>
        </div>
    </section>
    <section class="med-bg">
        <div class="content-wrap contact-methods">
            <p>To get in contact with me please give me a call or message me directly from the form available here.</p>
            <div class="flex-wrap contact-wrap">
                <div class="flex-container light-bg">
                    <h5>Contact Info</h5>
                    <i class="material-icons">phone</i>
                    <p>Phone: <span class="hidden-personal-info phone branding-hover">click to view</span></p>
                </div>
                <div class="flex-container light-bg">
                    <h5>Email Me</h5>
                    <i class="material-icons">email</i>
                    <div class="cta message-me">
                        <a href="javascript:;" id="email-me">message me</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="dark-bg contact-map">
        <div class="content-wrap">
        </div>
    </section>

    <div class="js-modal contact-form-modal light-bg">
        <div class="js-modal-close contact-close branding-hover">X</div>
        <form action="#" id="contact-modal">
            <p class="required">* Required</p>
            <div class="contact-info">
                <label for="email-name">Name:<span>*</span></label>
                <input type="text" id="email-name" name="name" />
            </div>
            <div class="contact-info">
                <label for="email-address">From:<span>*</span></label>
                <input type="email" id="email-address" name="email" />
            </div>
            <div class="contact-info">
                <label for="email-subject">Subject:<span>*</span></label>
                <input type="text" id="email-subject" name="subject" />
            </div>
            <div>
                <textarea id="email-content" name="content"></textarea>
            </div>
            <div>
                <a href="javascript:;" class="js-modal-close contact-cancel branding-hover">cancel</a>
                <div class="cta">
                    <a href="javascript:;" class="js-send-email">send <i class="material-icons">send</i></a>
                </div>
            </div>
        </form>
    </div>
</div><!-- #contact -->

<?php get_footer(); ?>
