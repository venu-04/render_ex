import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4500/user', formData)
      .then(response => {
        console.log('User added successfully:', response.data);
        // Optionally, clear the form fields after successful submission
        setFormData({ name: '', email: '' });
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handleViewUsers = () => {
    navigate('/home'); // Navigate to the Home component
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleViewUsers}>View Users</button> {/* Button to navigate to Home */}
    </div>
  );
}

export default App;
