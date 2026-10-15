import { Link } from 'react-router-dom';

import { ROUTES } from '../../const';
import AuthoralReviewForm from './Form';

const WriteReviewPage = () => {
  return (
    <>
      <Link to={ROUTES.favorites} style={{ color: 'blue', textDecoration: 'underline' }}>Voltar</Link>
      <h2>Escrever</h2>
      <p>Escreva a resenha do filme.</p>
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
