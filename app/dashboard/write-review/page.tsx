'use client';

import AuthoralReviewForm from '../../ui/AuthoralReviewForm';
import GoBack from '../../ui/GoBack';

const WriteReviewPage = () => {
  return (
    <>
      <GoBack />
      <h2>Write Review</h2>
      <p>Write a review for the movie you watched</p>
      <br />
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
