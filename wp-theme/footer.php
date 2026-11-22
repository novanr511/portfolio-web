<?php
/**
 * Site footer.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
	</main>

	<footer class="site-footer">
		<section class="newsletter" aria-labelledby="newsletter-title">
			<div class="newsletter__inner">
				<div class="newsletter__copy" data-reveal>
					<p class="eyebrow"><?php esc_html_e( 'Stay in the loop', 'maison' ); ?></p>
					<h2 id="newsletter-title"><?php esc_html_e( 'Join the collective.', 'maison' ); ?></h2>
					<p><?php esc_html_e( 'Be first to know about new collections, stories, and considered essentials.', 'maison' ); ?></p>
				</div>

				<form class="newsletter__form" data-newsletter-form data-reveal data-reveal-delay="120ms">
					<label class="screen-reader-text" for="newsletter-email"><?php esc_html_e( 'Email address', 'maison' ); ?></label>
					<input
						id="newsletter-email"
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="<?php esc_attr_e( 'Your email address', 'maison' ); ?>"
					>
					<button type="submit">
						<?php esc_html_e( 'Subscribe', 'maison' ); ?>
						<?php echo maison_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
					<p class="newsletter__status" role="status" aria-live="polite"></p>
				</form>
			</div>
		</section>

		<div class="footer-bottom">
			<a class="footer-bottom__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php echo esc_html( maison_brand_name() ); ?>
			</a>

			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'menu_class'     => 'footer-bottom__nav',
					'fallback_cb'    => false,
					'depth'          => 1,
				)
			);
			?>

			<p class="footer-bottom__legal">
				&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( maison_brand_name() ); ?>.
				<?php esc_html_e( 'All rights reserved.', 'maison' ); ?>
			</p>
		</div>
	</footer>

	<button class="back-to-top" type="button" data-back-to-top aria-label="<?php esc_attr_e( 'Back to top', 'maison' ); ?>">
		<?php echo maison_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</button>

	<?php wp_footer(); ?>
</body>
</html>
