import { useState } from "react";
import Card from "../Card";
import { FaGithub } from "react-icons/fa";
import "./styles.css";

const Dashboard = () => {
  const [nameInput, setNameInput] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [card, setCard] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUserInput = () => {
    fetch(`https://api.github.com/repos/${nameInput}/${userInput}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Not Found") {
          setErrorMsg("Erro na busca do repositório");
        }
        setCard([...card, response]);
      });
    setErrorMsg("");
    setNameInput("");
    setUserInput("");
    if (userInput === "") {
      setErrorMsg("Erro na busca do repositório");
    }
  };

  const reset = () => {
    setCard([]);
  };

  console.log(card.length);

  return (
    <div className="container-dashboard">
      <h1>
        GitHub Card <FaGithub />
      </h1>
      <h2>Pesquise por repositórios públicos no Github </h2>

      <div className="container-input">
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Nome do usuário"
        />

        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Repositório"
        />
        <button onClick={() => handleUserInput()}>Search</button>
      </div>
      {card.message === "Not Found" && (
        <span className="error-msg">"Erro na busca do repositório"</span>
      )}
      <span className="error-msg">{errorMsg}</span>
      <div className="container-card">
        {card
          .filter((ele) => ele.message !== "Not Found")
          .map((ele, index) => (
            <div key={index}>
              <Card card={ele} />
            </div>
          ))}
      </div>

      {card.length !== 0 ? (
        <button onClick={reset} className="reset">
          Resetar
        </button>
      ) : null}
    </div>
  );
};

export default Dashboard;
