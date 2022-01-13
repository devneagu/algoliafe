import { Reviews } from '..';
import styles from './style.module.scss';

export default function ResultListItem({item}) {
    return (
        <div className={styles["flex"]}>
            <img className={styles["resultItemImage"]} src={item.image_url} />
            <div>
                <p className={styles['header']}>{item.name}</p>
                <p className={styles['flex']} style={{gap:10}}>
                    <span className={styles['primary2']}>{item.stars_count}</span> 
                    <Reviews starCount={item.stars_count} />
                    <span className={styles['secondary']}>
                        ({item.reviews_count} reviews)
                    </span>    
                </p>
                <p className={styles['secondary']}>{item.food_type } | {item.neighborhood} | {item.price_range}</p>
            </div>
        </div>
    )
}