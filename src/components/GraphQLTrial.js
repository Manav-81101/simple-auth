import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function GraphQLTrial() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
  });
  const [name, setName] = React.useState("Manav");
  const [phoneNumber, setPhoneNumber] = React.useState("8745007937");
  const [email, setEmail] = React.useState("abc@email.com");
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    client
      .query({
        query: gql`
          {
            users {
              name
              phoneNumber
              email
            }
          }
        `,
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  }, []);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={() => {
          client
            .mutate({
              mutation: gql`
                mutation {
                  addUser(
                    name: "${name}"
                    email: "${email}"
                    phoneNumber: "${phoneNumber}"
                  ) {
                    name
                    phoneNumber
                    email
                  }
                }
              `,
            })
            .then((res) => {
              client
                .query({
                  query: gql`
                    {
                      users {
                        name
                        phoneNumber
                        email
                      }
                    }
                  `,
                })
                .then((res) => {
                  setUsers(res.data.users);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Submit
      </button>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <p>
              {user.name} {user.phoneNumber} {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GraphQLTrial;
