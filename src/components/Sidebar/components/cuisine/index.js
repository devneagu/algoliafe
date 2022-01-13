import { useState,useEffect } from 'react';
import { helper } from '../../../../utils/algoliahelper';
import styles from './style.module.scss';



export default function Cuisine(){
    const [facets,setFacets] = useState([]);
    const [state,setState]=  useState(null);

    const event = (v) => {
        console.log(v);
        if(v === state){
            setState(null);
            helper.setQuery(helper.state.query).clearRefinements('food_type').search();
        }else {
            setState(v);
            helper.setQuery(helper.state.query).clearRefinements('food_type').addFacetRefinement("food_type",v).search();
        }
    }

    useEffect(() => {
        //how can i get the sum of additional facetvalues?
        helper.searchForFacetValues('food_type',"",7).then(e => {
            setFacets(e.facetHits);
        })
    },[])

    return (
        <>
            <span className={styles['filterTitle']}>Cuisine/Food Type</span>
            {
                facets.map((el,index)=>(
                    <p style={{position:'relative'}} className={state === el.value ? styles['selectedFilter'] : styles['filter'] } onClick={() => event(el.value)} key={index}>
                        {el.value.length > 12 ? el.value.split('').slice(0,12).join('') + '...' : el.value}
                        <span className={styles['filterCount']} >{el.count}</span>
                    </p>
                ))
            }
        </>
    )
}