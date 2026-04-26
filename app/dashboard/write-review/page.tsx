import { Link } from 'react-router-dom';

import AuthoralReviewForm from './Form';

const WriteReviewPage = () => {
  return (
    <>
      <Link to='/dashboard/favorites' style={{ color: 'blue', textDecoration: 'underline' }}>Voltar</Link>
      <h2>Escrever</h2>
      <p>Escreva a resenha do filme.</p>
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
