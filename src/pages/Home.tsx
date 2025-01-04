import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container.tsx';
import { Title } from '../components/Text.tsx';
import TextField from '../components/TextField.tsx';
import classNames from 'classnames';
import { Card } from '../components/Card.tsx';
import { useNavigate } from 'react-router';
import { fetchUsers } from '../services/api.ts';
import Spinner from '../assets/icons/Spinner.tsx';
import { UserProps } from '../types/types.ts';
import { FaSearch } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>('All');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Fetch users when the component mounts
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === '') {
      setFilteredUsers(users); // Reset to full user list if search is cleared
    } else {
      const filtered = users.filter((user: UserProps) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </Container>
    );
  }

  console.log(users);

  const links = ['All', 'Female', 'Male'];

  return (
    <Container>
      <div className="space-y-8 mt-10">
        <Title>User List</Title>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-96">
            <TextField
              leftIcon={<FaSearch />}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>
          <div className="flex gap-6">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={classNames('rounded', {
                  'bg-purple-600 text-white px-4 py-2': activeLink === link, // Active link styles
                  'text-gray-800': activeLink !== link, // Inactive link styles
                })}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user: UserProps) => (
            <Card key={user.id} className="p-4 border rounded shadow-sm">
              <div className="flex justify-between sm:flex-col items-center">
                <Title className="text-lg font-medium mb-2">
                  {user.username}
                </Title>
                <button
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                  View Details
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
