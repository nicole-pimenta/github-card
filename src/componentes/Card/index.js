import "./styles.css";
const Card = ({ card }) => {
  console.log(card);
  const {
    full_name,
    description,
    owner: { avatar_url },
  } = card;

  return (
    <div className="cards">
      <div className="card">
        {avatar_url !== undefined ? (
          <img alt={full_name} src={avatar_url}></img>
        ) : (
          <img alt={full_name}></img>
        )}
        <div className>
          <h3>{full_name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
