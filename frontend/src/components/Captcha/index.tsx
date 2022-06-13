import { AxiosResponse } from 'axios';
import { createRef, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useQuery } from 'react-query';
import api from '../../util/api';
import { CaptchaResponse } from '../../util/types';

type CaptchaProps = {
  onComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Captcha({ onComplete }: CaptchaProps) {
  const [response, setResponse] = useState<string | null>(null);
  const sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '';
  const reCaptchaRef = createRef<ReCAPTCHA>();
  const onChange = (value: string | null) => {
    setResponse(value);
  };
  const onExpire = () => {
    setResponse(null);
    onComplete(false);
  };
  const { data, refetch } = useQuery<AxiosResponse<CaptchaResponse>>(
    ['verifyCaptcha', response],
    ({ queryKey }) => {
      const [, response] = queryKey;
      return api.get('/captcha/verify', {
        params: {
          response: response || '',
        },
      });
    },
    { enabled: false },
  );

  useEffect(() => {
    if (data?.data.success) {
      onComplete(true);
    }
  }, [data, onComplete]);

  useEffect(() => {
    refetch();
  }, [refetch, response]);

  return <ReCAPTCHA ref={reCaptchaRef} sitekey={sitekey} onChange={onChange} onExpired={onExpire} />;
}
