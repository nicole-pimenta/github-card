import { useState, useEffect } from "react";
import Card from "../Card";
import { FaGithub } from "react-icons/fa";

const Dashboard = () => {
  const [userInput, setUserInput] = useState([]);
  const [card, setCard] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUserInput = () => {
    fetch(`https://api.github.com/repos/${userInput}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Not Found") {
          setErrorMsg("Erro na busca do repositório");
        }
        setCard([...card, response]);
      });
    setErrorMsg("");
    setUserInput("");
    if (userInput === "") {
      setErrorMsg("Erro na busca do repositório");
    }
  };

  return (
    <div>
      <h1>
        GitHub Card <FaGithub />
      </h1>
      <h2>Pesquise por repositórios públicos no Github </h2>

      <div className="container-input">
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
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
      {card.message === "Not Found" ? (
        <span className="error-msg">"Erro na busca do repositório"</span>
      ) : null}
      <span className="error-msg">{errorMsg}</span>
      <div className="container-card">
        {card
          .filter((ele) => ele.message !== "Not Found")
          .map((ele, index) => (
            <div key={index}>
              {" "}
              <Card card={ele} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
