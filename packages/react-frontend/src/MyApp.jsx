import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);


  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) { // successful delete request
        // const updated = characters.filter((_, i) => i != id);
        // setCharacters(updated);
        const updatedCharacters = characters.filter(character => character.id !== id);
        setCharacters(updatedCharacters);
      } else if (response.status === 404) {
        console.error("User not found. Nothing as deleted.");
      } else {
        console.error("Error deleting user.");
      }
    })
    .catch(error => {
      console.error("Error", error);
    });
  }
  

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status == 201) {
          response.json() // parse response body as JSON
            .then((data) => {
              setCharacters([...characters, data]) // update state
            }); 
        } else {
          console.error("User not created, status code: ", response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json()) // parses JSON response to Javascript object
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

// allows component to be imported to other components/files
export default MyApp;