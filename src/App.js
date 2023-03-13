import './style.css';
import { useEffect, useState } from 'react';
import Header from "./components/Header"
import CategoryFilter from './components/CategoryFilter';
import NewFactForm from './components/NewFactForm';
import FactList from './components/FactList';
import Loader from './components/Loader';
import supabase from './supbase';

function App() {
  const [showForm,setShowForm] = useState(false);
  const [facts,setFacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')
  
  //only when currentCategory changed reload data 
  useEffect(()=>{
    const getFacts = async () => {
      setIsLoading(true)

      //select all facts
      let query = supabase.from('facts').select('*');

      if(currentCategory !== 'all'){
        query = query.eq('category',currentCategory)
      }

      const { data: facts, error } = await query
      .order("votesInteresting", {ascending: false})
      .limit(100);

      if(!error) {
        setFacts(facts)
      }else {
        alert("there  wa a error getting data")
      }
      setIsLoading(false)
    }
    //call function
    getFacts()
  },[currentCategory])

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm}/>

      {showForm ? <NewFactForm facts={facts} setFacts={setFacts} setShowForm={setShowForm}/> : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory}/>
        {isLoading? <Loader /> : <FactList facts={facts} setFacts={setFacts} />} 
      </main>
    </>
  );
}

export default App;
