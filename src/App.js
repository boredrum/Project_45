import React, { useState, useEffect } from "react";

function App () {
  const [products, setProducts] = useState({
    coffe: 0,
    sugar: 0,
  });

  const addCoffe = () => setProducts((prevState) => {
    return {
      ...prevState,
      coffe: ++prevState.coffe
    }
  });
  const addSugar = () => setProducts((prevState) => {
    return {
      ...prevState,
      sugar: ++prevState.sugar
    }
  });
  const removeCoffe = () => products.coffe == 0 ? false : setProducts((prevState) => {
    return {
      ...prevState,
      coffe: --prevState.coffe
    }
  });
  const removeSugar = () => products.sugar == 0 ? false : setProducts((prevState) => {
    return {
      ...prevState,
      sugar: --prevState.sugar
    }
  });

  const save = () => {
    localStorage.setItem('coffe', products.coffe);
    localStorage.setItem('sugar', products.sugar);
  }

  const clear = () => {
    localStorage.removeItem('coffe');
    localStorage.removeItem('sugar');
    setProducts((prevState) => {
      return {
        ...prevState,
        coffe: 0,
        sugar: 0
      }
    });
  }

  useEffect(()=>{
    if (localStorage.getItem('coffe')){
      setProducts((prevState) => {
        return {
          ...prevState,
          coffe: +localStorage.getItem('coffe'),
          sugar: +localStorage.getItem('sugar')
        }
      })
    }
  }, []);

  useEffect(()=>{
    if (products.coffe == 0){
      document.getElementById("rmCoffe").hidden = true
    }else{
      document.getElementById("rmCoffe").hidden = false
    }
    if (products.sugar == 0){
      document.getElementById("rmSugar").hidden = true
    }else{
      document.getElementById("rmSugar").hidden = false
    }
  })

  return (
    <div className="wrapper">
      <div className="list">
        <h1>Product list</h1>
        <div className='product'>
        <span>{`Coffe: ${products.coffe}`}</span>
        <button onClick={addCoffe}>Add</button>
        <button id="rmCoffe" onClick={removeCoffe}>Remove</button>
        </div>
        <div className='product'>
        <span>{`Sugar: ${products.sugar}`}</span>
          <button onClick={addSugar}>Add</button>
          <button id="rmSugar" onClick={removeSugar}>Remove</button>
        </div>
        <div className='save'>
            <button onClick={save}>SAVE</button>
            <button onClick={clear}>CLEAR</button>
          </div>
      </div>
    </div> 
  );
}

export default App;
