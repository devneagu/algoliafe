import { roundNumber } from '../../utils/helpers';


import styles from './style.module.scss';
export default function Reviews({starCount}){
    const maxCount = 5;
    const starCounts = roundNumber(starCount);
    const halfStar = !Number.isInteger(starCounts);
    return (
        <span style={{position:'relative'}}>
            <span>
            {
                [...Array(maxCount).keys()].map((star,index) => (
                    <img className={styles['star']} key={index} src="/star-empty.png"/> 
                ))
            }
            </span>
            <span style={{position:'absolute', top:0,left:0}}>
            {
                [...Array(Math.ceil(Math.floor(starCounts))).keys()].map((star,index) => (
                    <img className={styles['star']} key={index*10} src="/stars-plain.png"/> 
                ))
            }
            {
                halfStar && 
                <img className={styles['star__half']} src="/stars-plain.png"/> 
            }
            </span>
        </span>
    )
}