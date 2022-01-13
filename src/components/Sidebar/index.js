import { useState,useEffect } from 'react';
import { helper } from '../../utils/algoliahelper';
import {Cuisine, PaymentOptions, Rating} from './components';
import styles from './style.module.scss';



export default function Sidebar(){
    return (
        <div className={styles['sidebar']}>
            <Cuisine />
            <Rating />
            <PaymentOptions />
        </div>
    )
}