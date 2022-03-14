// @import styles
import styles from './index.module.scss'

const Loader = ({ isLoading = false }) => {

    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader} />
            </div>
        )
    }
    return null;
}

export default Loader;
