import  { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4500/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>User details</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user,index)=> (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;
