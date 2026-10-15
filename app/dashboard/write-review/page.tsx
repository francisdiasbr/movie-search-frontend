import { ROUTES } from '../../const';
import PageHeader from '../../ui/PageHeader';
import GoBack from '../components/GoBack';
import AuthoralReviewForm from './Form';

const WriteReviewPage = () => (
  <>
    <PageHeader title='Escrever' description='Escreva a resenha do filme.'>
      <GoBack to={ROUTES.favorites} />
    </PageHeader>
    <AuthoralReviewForm />
  </>
);

export default WriteReviewPage;
