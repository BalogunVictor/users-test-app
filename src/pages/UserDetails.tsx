import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../components/Container.tsx';
import { Title } from '../components/Text.tsx';
import { fetchUser } from '../services/api.ts';
import Spinner from '../assets/icons/Spinner.tsx';
import { UserProps } from '../types/types.ts';

function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const fetchedUser = await fetchUser(Number(id));
        setUser(fetchedUser);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getUser();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container>
        <div className="space-y-4">
          <Title className="text-lg font-medium">
            {error || 'User Not Found'}
          </Title>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6 mt-8">
        <button
          onClick={handleBack}
          className="px-4 py-2 hover:bg-purple-600 text-black hover:text-white rounded"
        >
          Back
        </button>
        <Title className="text-2xl font-bold">{user.name}</Title>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Username:</span> {user.username}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {user.phone || 'N/A'}
          </div>
          <div>
            <span className="font-medium">Website:</span>{' '}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
              aria-label={`Visit ${user.website}`}
            >
              {user.website}
            </a>
          </div>
          <div>
            <span className="font-medium">Address:</span> {user.address?.street}
            , {user.address?.suite}, {user.address?.city},{' '}
            {user.address?.zipcode}
          </div>
          <div>
            <span className="font-medium">Company:</span> {user.company?.name} -{' '}
            {user.company?.catchPhrase}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default UserDetails;
