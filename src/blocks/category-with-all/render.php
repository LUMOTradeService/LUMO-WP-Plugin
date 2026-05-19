<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$only_root = isset( $attributes['onlyRoot'] ) ? $attributes['onlyRoot'] : false;

$args = array(
    'taxonomy'   => 'category',
    'hide_empty' => true,
);

if ( $only_root ) {
    $args['parent'] = 0;
}

$categories = get_categories( $args );
$current_cat_id = is_category() ? get_queried_object_id() : 0;
$all_url = get_post_type_archive_link( 'post' ) ?: home_url('/');
$is_all_active = ( is_home() || is_front_page() ) && !is_category();

    if ( empty( $categories ) ) {
        return '<p ' . $wrapper_attributes . '>' . esc_html__( 'No categories found.', 'lumo-wp-plugin' ) . '</p>';
    }
?>

<ul class="wp-block-categories-list wp-block-categories">
    <li class="cat-item cat-item-all <?php echo $is_all_active ? 'current-cat' : ''; ?>">
        <a href="<?php echo esc_url( $all_url ); ?>">
            <?php echo esc_html__( 'All', 'lumo-wp-plugin' ); ?>
        </a>
    </li>	
    <?php foreach ( $categories as $category ) : 
		$is_active = ( $current_cat_id === $category->term_id );
        
        $is_ancestor = false;
        if ( $current_cat_id && ! $is_active ) {
            $ancestors = get_ancestors( $current_cat_id, 'category' );
            if ( in_array( $category->term_id, $ancestors ) ) {
                $is_ancestor = true;
            }
        }

        $active_class = $is_active ? 'current-cat' : ( $is_ancestor ? 'current-cat-ancestor' : '' );
	?>
    <li class="cat-item cat-item-<?php echo esc_attr( $category->term_id ); ?> <?php echo $active_class; ?>">
        <a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>">
            <?php echo esc_html( $category->name ); ?>
        </a>
    </li>
    <?php endforeach; ?>
</ul>