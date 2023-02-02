import { useState } from "react";
import api from "./services/api.js";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function hendleSearch() {
    if (input === "") {
      alert("Digite algum cep");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Digite um endereço de CEP valido !");
      setInput("");
    }
  }

  return (
    <div className="container">
      <div className="intro">
        <h1 className="title">Busca</h1>
        <h1 className="cursive">CEP</h1>
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Digite um CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={hendleSearch}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <div className="box-content">
          <h2>CEP: {cep.cep} </h2>
          <h2>{cep.logradouro} </h2>
          <h2> {cep.bairro} </h2>

          <h2>DDD: {cep.ddd}</h2>
          <h2>
            {" "}
            {cep.localidade} - {cep.uf}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
