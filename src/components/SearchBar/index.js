import { useEffect, useState } from 'react';
import { helper } from '../../utils/algoliahelper';
import { debounce } from '../../utils/helpers';
import styles from './style.module.scss';


export default function SearchBar(){
    const [value,setValue] = useState('');

    const processChange = debounce((value) => helper.setQuery(value).search());      
    const updateValue = (value) => {
        setValue(value);
        processChange(value);
    }
    useEffect(()=>{
        helper.setQuery("").search();
    },[])
    return (
        <div className={styles['searchContainer']}>
            <input className={ styles['searchContainer__input']} value={value} type="text" placeholder="Search for Restaurants by Name, Cuisine, Location" name="locationValue" onChange={(e) => updateValue(e.target.value)} />
        </div>
    )
}