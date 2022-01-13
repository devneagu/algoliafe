import styles from './style.module.scss';
export default function Layout({children}){
    return (
        <div className={styles['container']}>
            {children}
        </div>
    )
}