import { ResultList, SearchBar, Sidebar } from './components';
import Layout from './layout';
import styles from './style.module.scss';


function App() {
  return (
      <Layout>
        <SearchBar />
        <div className={styles['flex']}>
          <Sidebar />
          <ResultList />
        </div>
      </Layout>
  );
}

export default App;
