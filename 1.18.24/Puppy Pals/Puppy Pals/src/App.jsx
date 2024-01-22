import { puppyList } from './data.js'
import { useState } from 'react'
import './App.css'
import './index.css'


//deleted all the old counter code and imports
//imported puppy list from the new data file i made
//
function App() {

  const [puppies, setPuppies] = useState(puppyList);// what i am pretty sure happened was i have made it so the puppy list array is now a constant state that I can now use through react across my whole project.
  const [featPupId, setFeatPupId] = useState(null);//I think I basically just made these all global insances i can call
  const featuredPup = puppies.find((pup) =>  pup.id === 
  featPupId );//this is the code that will find the puppy id that matches the one i clicked on and then set it to the featured pup id
 // console.log(featuredPup);


  return (
    <>
      <div className="App">
      { 
   puppies.map((puppy) => {
     return (
      <p onClick={()=>{setFeatPupId(puppy.id)}} key={puppy.id}>
        {puppy.name}
     </p>//basically generated the list onto my html page via js. Also generated each instances ids.
     );//added the code for the button click
   })
   }

      
        {featuredPup && (
      <div>
        <h2>{featuredPup.name}</h2>
        <ul>
          <li>Age: {featuredPup.age}</li>
          <li>Email: {featuredPup.email}</li>
        </ul>
      </div>
      )}

      </div>
    </>
  );
}

export default App
