// TournamentLocal.jsx
import React, { useState } from "react";
import "./TournamentLocal.css";
// import { BiEditAlt } from "react-icons/bi";
// import { GiPingPongBat } from "react-icons/gi";
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function TournamentLocal() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");

  const [error, setError] = useState("");

    const navigate = useNavigate();

  // const [done, setDone] = useState(false);


  const handleChange = (e) =>{
    if(e.target.name === "n1")
      setName1(e.target.value);
    if(e.target.name === "n2")
      setName2(e.target.value);
    if(e.target.name === "n3")
      setName3(e.target.value);
    if(e.target.name === "n4")
      setName4(e.target.value);
  
};

  const handleSubmite = (e) => {
    e.preventDefault();
    if (name1 === name2 || name1 === name3 || name1=== name4 || 
      name2 === name3 || name2 === name4 ||
      name3 === name4)
        setError("Duplicate names!");
      else{
        setError("");
        navigate(`/game/Local/TournamentLocal/Tournament`, 
        {state:{ name1, name2, name3, name4 }});
    }
}

  return (
    <div className="TournamentLocal-background">
        {/* <div > */}
          <form className="TournamentLocal-container" onSubmit={handleSubmite}>
            <input type="text" placeholder="Enter a name" required value={name1} name="n1" onChange={handleChange}/>
            <input type="text" placeholder="Enter a name" required value={name2} name="n2" onChange={handleChange}/>
            <input type="text" placeholder="Enter a name" required value={name3} name="n3" onChange={handleChange}/>
            <input type="text" placeholder="Enter a name" required value={name4} name="n4" onChange={handleChange}/>
            { error && <p className="errorMessage">{error}</p>}
            <button type="submit" className="start-button">START</button>
        </form>
          {/* </div> */}
    </div>
  );
}

export default TournamentLocal;
