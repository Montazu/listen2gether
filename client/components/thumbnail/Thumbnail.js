import styles from './thumbnail.module.css'

export const Thumbnail = ({ src, alt }) => (
	<div className={styles.wrapper}>
		<img className={styles.image} src={src} alt={alt} />
	</div>
)