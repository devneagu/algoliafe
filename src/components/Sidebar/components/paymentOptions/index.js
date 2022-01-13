import { useState } from 'react';
import { helper } from '../../../../utils/algoliahelper';
import styles from './style.module.scss';   

export default function PaymentOptions(){
    const options = ['Diners Club','Carte Blanche','Discover'];
    const [state,setState] = useState(null);

    const event = (value) => {
        if(value === state){
            setState(null);
            helper.setQuery(helper.state.query).clearRefinements('payment_options').search();

        }else {
            setState(value);
            helper.setQuery(helper.state.query).clearRefinements('payment_options').addFacetRefinement("payment_options",value).search();

        }
    }
    return (
        <>
            <span className={styles['filterTitle']}>Payment Options</span>
            {
                options.map((el,index) => (
                    <p className={state === el ? styles['selectedFilter'] : styles['filter'] } 
                        onClick={() => event(el)} 
                        key={index}>
                            {el}
                    </p>
                ))
            }
        </>
    )
}