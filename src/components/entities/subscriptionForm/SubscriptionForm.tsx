import { FormProvider, useForm } from 'react-hook-form';
import css from './subscriptionForm.module.scss';
import { Children } from 'react';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  rotateDeg?: number;
  submitHandler: (data: SubsForm) => void;
}
interface SubsForm {
  email: string;
}

export const SubscriptionForm = ({
  children,
  rotateDeg,
  submitHandler,
}: IProps) => {
  const [formHeadChild, descriptionChild] = Children.toArray(children);
  const form = useForm<SubsForm>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });
  return (
    <div
      className={`${css.formContainer} red-hover`}
      style={{ transform: `rotate(${rotateDeg ? rotateDeg : 0}deg)` }}
    >
      <FormProvider {...form}>
        <form
          className={css.form}
          onSubmit={form.handleSubmit(submitHandler)}
        >
          {/* <p className={css.formHead}>
            SIGN UP TO BE NOTIFIED WHEN OUR CROWDFUNDING CAMPAIGN GOES LIVE.
          </p> */}
          {formHeadChild}
          <div className={css.inputWrapper}>
            <div className={`${css.inputContainer} none-cursor`}>
              <input
                className={css.input}
                placeholder="Your email address"
                type="text"
                {...form.register('email', {
                  required: true,
                  pattern: {
                    message: 'Invalid email',
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                  minLength: {
                    value: 5,
                    message: 'Email must be at least 5 characters long.',
                  },
                })}
              />
              <button
                className={css.button}
                type="submit"
              >
                Subscribe
              </button>
            </div>
            <p className={css.error}>{form.formState.errors.email?.message}</p>
          </div>

          {/* <p className={css.description}>
            Subscribers get exclusive behind-the-scenes previews of our upcoming
            game and a huge early bird discount when we launch our campaign.
          </p> */}
          {descriptionChild}
          <div className={css.privacyContainer}>
            <p className={css.privacy}>
              You can review our
              <a
                className={css.privacyLink}
                href="#"
              >
                Privacy Policy here
              </a>
              .
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
