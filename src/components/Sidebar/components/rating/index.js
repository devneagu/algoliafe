import { useState,useEffect } from 'react';
import { Reviews } from '../../..';
import { helper } from '../../../../utils/algoliahelper';
import styles from './style.module.scss';



export default function Rating(){
    const [state,setState]=  useState(null);

    const addFilter = (number) => {
        if(number === state){
            setState(null);
            helper.setQuery(helper.state.query).clearRefinements('rounded_stars_count').search();
        }else{
            setState(number);
            helper.setQuery(helper.state.query).clearRefinements('rounded_stars_count').addFacetRefinement("rounded_stars_count",number).search();
        }
    }
    return (
        <>
            <span className={styles['filterTitle']}>Rating</span>
            {
                [...Array(5 + 1).keys()].map((_,index) => (
                    <div key={index} className={state === index ? styles['starsContainerSelected'] : styles['starsContainer']} onClick={() => addFilter(index)}>
                        <Reviews starCount={index}/>
                    </div> 
                ))
                
            }
        </>
    )
}