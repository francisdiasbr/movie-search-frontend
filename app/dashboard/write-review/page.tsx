import AuthoralReviewForm from '../../ui/AuthoralReviewForm';
import GoBack from '../../ui/GoBack';

const WriteReviewPage = () => {
  return (
    <>
      <GoBack />
      <h2>Write Review</h2>
      <p>Escreva a review para o filme</p>
      <br />
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
