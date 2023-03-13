import React, { useState } from 'react'
import supabase from '../supbase';

const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
];

const NewFactForm = ({facts, setFacts, setShowForm}) => {

    const [text, setText] = useState('')
    const [source, setSource] = useState("http://example.com")
    const [category, setCategory] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const textLength = text.length


    const handleText = (e) => {
        e.preventDefault();
        setText(e.target.value)
    }
    const handleSource = (e) => {
        e.preventDefault();
        setSource(e.target.value)
    }
    const handleCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value)
    }

    function isValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSubmit = async (e) =>{
        //1.prevent browser reload
        e.preventDefault();
        console.log(text,source,category)

        //2.if data is valid, create a new fact
        if(text && isValidHttpUrl(source) && category && textLength<200){
            console.log('there is valid data')

            //3. create a new fact object
            // const newFact = {
            //     id: Math.round(Math.random() * 10000),
            //     text,
            //     source,
            //     category,
            //     votesInteresting: 0,
            //     votesMindblowing: 0,
            //     votesFalse: 0,
            //     createdIn:new Date().getFullYear()
            // }

            //3 Upload new fact to Supabase and receive the new fact object 
            setIsUploading(true);
            const {data: newFact, error} = await supabase
                .from('facts')
                .insert([{text,source,category}])
                .select();
            setIsUploading(false);

            //4. add new fact to the UI, add the fact to state
            // setFacts([newFact,...facts])
            if(!error){
                setFacts([newFact[0],...facts])
            }

            //5. reset input fields
            setText('')
            setSource("")
            setCategory('')

            //6. close the form
            setShowForm(false)
        }
    }

    return (
    <form className='fact-form' onSubmit={handleSubmit}>
        <input type="text" placeholder="Share a fact with the world..." value={text} onChange={handleText} disabled={isUploading}/>
        <span>{200-textLength}</span>
        <input type="text" placeholder="Trustworthy source..." value={source} onChange={handleSource} disabled={isUploading}/>
        <select value={category} onChange={handleCategory} disabled={isUploading}>
            <option value="">Choose category:</option>
            {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
        </select>
        <button type='submit' className="btn btn-large" disabled={isUploading}>Post</button>
    </form>
  )
}

export default NewFactForm