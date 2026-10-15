import { ROUTES } from '../../const';
import GoBack from '../components/GoBack';
import AuthoralReviewForm from './Form';

const WriteReviewPage = () => {
  return (
    <>
      <GoBack to={ROUTES.favorites} />
      <h2>Escrever</h2>
      <p>Escreva a resenha do filme.</p>
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
