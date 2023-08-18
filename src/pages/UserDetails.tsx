import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { ComponentProps } from 'react';

const UserDetails = () => {
  const { id } = useParams();

  const handleSubmit: ComponentProps<typeof UserForm>['onSubmit'] = (user) => {
    console.log(user);
  };

  if (!id) return null;

  return <UserForm id={+id} onSubmit={handleSubmit} />;
};

export default UserDetails;
