import AuthoralReviewForm from './Form';
import GoBack from '../components/GoBack';

const WriteReviewPage = () => {
  return (
    <>
      <GoBack />
      <h2>Escrever</h2>
      <p>Escreva a resenha do filme.</p>
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
