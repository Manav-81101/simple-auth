import React from "react";

function Card({ name, image, favorite, toggleFavorite }) {
  return (
    <div style={styles.cardStyles}>
      <h4 style={styles.textStyle}>
        {name}
        <button style={styles.buttonStyle} onClick={() => toggleFavorite()}>
          {favorite ? "❤" : "🤍"}
        </button>
      </h4>

      <img src={image} alt={name} width={100} height={100} />
    </div>
  );
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + "55";
}
const styles = {
  cardStyles: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    width: "150px",
    height: "150px",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: getRandomColor(),
    margin: 15,
  },
  buttonStyle: {
    background: "none",
    border: "none",
  },

  textStyle: {
    textTransform: "capitalize",
  },
};
export default Card;
