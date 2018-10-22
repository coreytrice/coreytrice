<div class="flex-container project-card">
    <h5><?php the_title(); ?></h5>
    <?php the_post_thumbnail('project-image', ['alt' => get_the_title(), 'class' => 'img-responsive']); ?>
    <p><?php the_excerpt(); ?></p>
</div>