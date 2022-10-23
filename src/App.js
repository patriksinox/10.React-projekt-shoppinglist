import React from "react";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";

const pamat = localStorage.getItem("list");
const data = JSON.parse(pamat);

function App() {
  const [nazov, setNazov] = useState("");
  const [zoznam, setZoznam] = useState(data ? data : []);
  const [uprava, setUprava] = useState(false);
  const [upravaId, setUpravaId] = useState(null);
  const [sprava, setSprava] = useState({ ukaz: false, msg: "", typ: "" });

  const formHandle = (e) => {
    e.preventDefault();
    if (!nazov) {
      return alert(true, "Zadaj názov produktu", "msg danger");
    }
    if (nazov && uprava) {
      setZoznam(
        zoznam.map((el) => {
          if (el.id === upravaId) {
            return { ...el, nazov: nazov };
          }
          return el;
        })
      );
      setNazov("");
      setUprava(false);
      alert(true, "Upravil si položku", "msg success");
    } else {
      setUprava(false);
      // Úspech, alert
      const nazovProduktu = {
        nazov: nazov,
        id: new Date().getTime().toString(),
      };
      alert(true, "Produkt pridaný do košíka", "msg success");
      //const dokopy = setZoznam([...zoznam, nazovProduktu]);
      setZoznam([...zoznam, nazovProduktu]);
      setNazov("");
    }
  };
  const vymazVec = (id) => {
    const novyZoznam = zoznam.filter((el) => el.id !== id);
    alert(true, "Položka vymazaná", "msg danger");

    setZoznam(novyZoznam);
  };

  const alert = (ukaz, msg, typ) => {
    setSprava({ ukaz, msg, typ });
  };

  const vycistiZoznam = () => {
    setZoznam([]);
    localStorage.clear("list");
    alert(true, "Nákupný zoznam vymazaný", "msg danger");
  };
  const upravVec = (id) => {
    setUprava(true);
    const uprava = zoznam.find((el) => el.id === id);
    setUpravaId(id);
    setNazov(uprava.nazov);
    alert(true, "Upravuješ položku!", "msg danger");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(zoznam));
  }, [zoznam]);
  return (
    <>
      <div className="container mb-5">
        <section>
          <form onSubmit={formHandle}>
            <h2>Nákupný zoznam</h2>
            {sprava && <Alert {...sprava} list={zoznam} alert={alert} />}
            <div className="forma">
              <input
                type="text"
                placeholder="položka"
                className="text-left"
                value={nazov}
                id="nazov"
                onChange={(e) => setNazov(e.target.value)}
              />
              <button>{!uprava ? "Pridaj" : "Uprav"}</button>
            </div>
          </form>
          {zoznam.map((el, index) => {
            return (
              <List key={index} {...el} vymaz={vymazVec} uprav={upravVec} />
            );
          })}
          {zoznam.length > 0 && (
            <button className="btn btn-danger" onClick={() => vycistiZoznam()}>
              Vyčisti zoznam
            </button>
          )}
        </section>
      </div>
    </>
  );
}

export default App;

// meno , list , upravaPravda , upravaID , alert(objekt!)
//onClick={()=> alert(true,"Nákupný zoznam vymazaný", "msg danger")}
