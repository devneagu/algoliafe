import { useEffect, useReducer, useState } from "react"
import { ResultListItem } from ".."
import { helper } from "../../utils/algoliahelper"
import styles from "./style.module.scss";
const reducer = (state,action) => {
    switch(action.type){
        case "updateResult":
            return {
                ...state,
                hits: action.hits
            }
        case "updateResultMore":
            return {
                ...state,
                hits : [...state.hits,...action.hits] 
            }
        case "updateStats":
            return {
                ...state,
                stats : {
                    ...action.stats
                },
                error : ''
            }
        case "updateError":
            return {
                ...state,
                error : action.error
            }
        default:
            return state;
    }
}
export default function ResultList(){
    const [results,dispatch] = useReducer(reducer, {
        hits : helper.lastResults?.hits || [],
        stats : {
            processingTimeMS : helper.lastResults?.processingTimeMS || null,
            nbHits : helper.lastResults?.nbHits || null
        },
        error : ''
    });

    const [page,setPage] = useState(0);

    const showMore = () => {
        helper.setPage(page+1).search();
        setPage(page + 1)
    }

    useEffect(()=>{
        helper.on("result",(event) => {
            if(event.results.page === 0){
                dispatch({type:"updateResult", hits : event.results.hits})
            }else {
                dispatch({type:"updateResultMore", hits :event.results.hits })
            }
            dispatch({type:"updateStats", stats : { processingTimeMS : event.results?.processingTimeMS, nbHits : event.results?.nbHits}  })
        })
        helper.on("error",(event) => {
            console.log('error',event);
            dispatch({type:"updateError", error : 'Something went wrong...'})
        })
    },[])

    return (
        <div className={styles['container']}>
            {
                results.error.length === 0 && 
                results.stats.processingTimeMS !== null && 
                <span className={styles['resultMessage']}>
                    <span style={{fontWeight:600}}>{results.stats.nbHits} results</span> found in <span style={{fontSize:'0.95em'}}>{results.stats.processingTimeMS/1000}</span> seconds
                </span>
            }
            { results.error.length === 0 && 
                <>
                    {results.hits.map(el => (
                        <ResultListItem key={el.objectID} item={el} />
                    ))
                    }
                    {
                        results.hits.length < helper.lastResults?.nbHits  && 
                            <div style={{textAlign:'center'}}>
                                <p onClick={() => showMore()} className={styles['buttonShowMore']}>Show More</p>
                            </div>
                    }
                </>
            }
            {
                results.error.length > 0 &&
                <p>{results.error}</p>
            }
        </div>
    )
}