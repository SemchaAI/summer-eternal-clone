//import { FormProvider, useForm } from 'react-hook-form';
import css from './subscriptionSection.module.scss';
import { useInView } from 'react-intersection-observer';
import { SubscriptionForm } from '@/components/entities';
interface SubsForm {
  email: string;
}

export const SubscriptionSection = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5,
  });

  const submitHandler = async (data: SubsForm) => {
    try {
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
      //toast.error('Auth error. Please try again.');
    }
  };

  return (
    <section className={css.subscriptionSection}>
      <div className={css.spacer}></div>
      <div
        ref={ref}
        className={css.subsTitles}
      >
        <div
          className={`${css.titleContainer} `} //${inView ? 'slideInLeft' : ''}
        >
          <h2
            style={{
              transform: `${inView ? 'translateX(0)' : 'translateX(-100%)'}`,
            }}
            className={css.title}
          >
            Artistically driven.
          </h2>
        </div>
        <div
          className={`${css.titleContainer}`} // ${inView ? 'slideInRight' : ''}
        >
          <h2
            style={{
              transform: `${inView ? 'translateX(0)' : 'translateX(100%)'}`,
            }}
            className={css.title}
          >
            Creative led.
          </h2>
        </div>
        <div className={css.titleContainer}>
          <div

          // className={` ${inView ? 'slideInLeft' : ''}`}
          >
            <h2
              style={{
                transform: `${inView ? 'translateX(0)' : 'translateX(-100%)'}`,
              }}
              className={css.title}
            >
              Worker
            </h2>
          </div>
          <div //className={` ${inView ? 'slideInRight' : ''}`}
          >
            <h2
              style={{
                transform: `${inView ? 'translateX(0)' : 'translateX(100%)'}`,
              }}
              className={css.title}
            >
              *and* player owned.
            </h2>
          </div>
        </div>
      </div>
      <SubscriptionForm
        submitHandler={submitHandler}
        rotateDeg={-10}
      >
        <p className={css.formHead}>
          sign up to be notified when our crowdfunding campaign goes live.
        </p>
        <p className={css.description}>
          Subscribers get exclusive behind-the-scenes previews of our upcoming
          game and a huge early bird discount when we launch our campaign.
        </p>
      </SubscriptionForm>
      <div className={css.spacer}></div>
    </section>
  );
};
