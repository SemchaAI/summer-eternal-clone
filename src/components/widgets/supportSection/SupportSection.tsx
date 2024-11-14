import { SubscriptionForm } from '@/components/entities';
import css from './supportSection.module.scss';

interface SubsForm {
  email: string;
}

export const SupportSection = () => {
  const submitHandler = async (data: SubsForm) => {
    try {
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
      //toast.error('Auth error. Please try again.');
    }
  };
  return (
    <section className={css.supportSection}>
      <SubscriptionForm submitHandler={submitHandler}>
        <p className={css.formText}>
          <span className={css.formTextRed}>
            Looking for a way to support us?
          </span>{' '}
          Signing up for our mailing list is the best way to stay in touch.
          We'll try to only send you content written by BAFTA-winning writers.
        </p>
      </SubscriptionForm>
    </section>
  );
};
