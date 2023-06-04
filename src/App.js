import React, { useState, useEffect } from "react";

function App () {
  const [products, setProducts] = useState({
    coffe: 0,
    sugar: 0,
  });
  const [tooLow, setTooLow] = useState(false);

  const addCoffe = () => setProducts((prevState) => {
    return {
      ...prevState,
      coffe: prevState.coffe + 1
    }
  });
  const addSugar = () => setProducts((prevState) => {
    return {
      ...prevState,
      sugar: prevState.sugar + 1
    }
  });
  const removeCoffe = () => tooLow ? false : setProducts((prevState) => {
    return {
      ...prevState,
      coffe: prevState.coffe - 1
    }
  });
  const removeSugar = () => tooLow ? false : setProducts((prevState) => {
    return {
      ...prevState,
      sugar: prevState.sugar - 1
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

  useEffect(()=>{setTooLow(products.coffe == 0)}, [products.coffe]);
  useEffect(()=>{setTooLow(products.sugar == 0)}, [products.sugar]);

  return (
    <div className="wrapper">
      <div className="list">
        <h1>Product list</h1>
        <div className='product'>
        <span>{`Coffe: ${products.coffe}`}</span>
        <button onClick={addCoffe}>Add</button>
        <button onClick={removeCoffe}>Remove</button>
        </div>
        <div className='product'>
        <span>{`Sugar: ${products.sugar}`}</span>
          <button onClick={addSugar}>Add</button>
          <button onClick={removeSugar}>Remove</button>
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
