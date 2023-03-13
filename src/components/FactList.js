import React from 'react'
import Fact from './Fact';

const FactList = ({facts,setFacts}) => {

  if(facts.length === 0){
    return <p className='message'>No facts for this category yet! Create The First One!🤪</p>
  }

  return (
    <section>
        <ul className='facts-list'>
            {facts.map((fact) => <Fact key={fact.id} fact={fact} facts={facts} setFacts={setFacts}/>
            )}
        </ul>
        <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  )
}

export default FactList