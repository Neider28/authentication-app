import styles from '../css/loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading_container}>
      <div className={`${styles.loader_2} ${styles.center}`}><span></span></div>
    </div>
  )
};
