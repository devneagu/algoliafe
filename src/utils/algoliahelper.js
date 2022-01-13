import algoliasearchHelper from 'algoliasearch-helper';
import algoliasearch from 'algoliasearch';


var client = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
var helper = algoliasearchHelper(client, process.env.REACT_APP_ALGOLIA_INDEX_NAME, {
    facets: ['food_type','rounded_stars_count','payment_options']
});
helper.setQueryParameter('hitsPerPage', 3).search();


export {helper}