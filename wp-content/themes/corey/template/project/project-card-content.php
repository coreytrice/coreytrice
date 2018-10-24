<div class="flex-container project-card">
    <h5><?php the_title(); ?></h5>
    <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('project-image', ['alt' => get_the_title(), 'class' => 'img-responsive']); ?></a>
    <p><?php the_excerpt(); ?></p>
</div>