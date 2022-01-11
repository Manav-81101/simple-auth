import React from "react";
import View from "./View";
import { navigate } from "@reach/router";
import { getCurrentUser, isLoggedIn, logout } from "../helpers/auth";
import { observer } from "mobx-react";
import { Context } from "../helpers/store";
import Card from "./Card";

const Pokemons = ({ type }) => {
  const pokemonStore = React.useContext(Context);
  switch (type) {
    case "all":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {pokemonStore.pokemon.map((pokemon) => (
            <Card
              key={pokemon.id}
              {...pokemon}
              toggleFavorite={() => pokemon.toggleFavorite()}
            />
          ))}
        </div>
      );
    case "favorites":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {pokemonStore.favoritePokemon.map((pokemon) => (
            <Card
              key={pokemon.id}
              {...pokemon}
              toggleFavorite={() => pokemon.toggleFavorite()}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

const Profile = observer((props) => {
  const [email] = getCurrentUser();
  const pokemonStore = React.useContext(Context);
  React.useEffect(() => {
    pokemonStore.loadPokemon();
  }, []);
  const [type, setType] = React.useState("all");

  const { favorite, notFavorite } = pokemonStore.pokemonType;

  const tabs = ["All", "Favorites"];

  return (
    <div style={{ padding: "0 50px" }}>
      <View title="Your Profile">
        <p>
          Welcome back to your profile, {email}! These are your Pokemons
          <button onClick={() => logout(() => navigate("/app/login"))}>
            Logout
          </button>
        </p>
        <p>FavoritePokemon : {favorite}</p>
        <p>NotFavoritePokemon : {notFavorite}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            height: 50,
            flexWrap: "nowrap",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setType(tab.toLowerCase())}
              style={{
                backgroundColor: type === tab.toLowerCase() ? "teal" : "white",
                flex: 1,
                margin: 5,
                border: "2px solid black",
                borderRadius: 5,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </View>

      {/* <button onClick={() => setType("all")}>All</button>
        <button onClick={() => setType("favorites")}>Favorites</button>
      </div> */}
      <Pokemons type={type} />
    </div>
  );
});

export default Profile;
