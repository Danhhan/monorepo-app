/* eslint-disable camelcase */
import httpClient from 'utils/httpClient';
import { notification } from '@antoree/ant-ui';
import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import { useRetrieveCurrentUser } from '../user';

export const SIGN_IN_URL = '/v2/authentication';

export type signInBody = {
  userName: string;
  password: string;
};

export type signInResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export const signIn = ({ userName, password }: signInBody) => {
  const parsedBody = {
    username: userName,
    password,
    grant_type: 'password',
    client_id: 2,
    client_secret: '2scEIzVQFUFMuBBAaiZOEbOdglZ9utwPIwNQy0GI',
  };

  return httpClient.post<signInResponse>(SIGN_IN_URL, parsedBody);
};

export const useSignIn = (
  opts?: UseMutationOptions<
    AxiosResponse<signInResponse>,
    AxiosError<any>,
    signInBody
  >,
) => {
  const history = useHistory();

  const { mutate, isLoading, isSuccess } = useMutation<
    AxiosResponse<signInResponse>,
    AxiosError<any>,
    signInBody
  >(signIn, {
    onError: () => {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Invalid user name or password" />
        ),
      });
    },
    // eslint-disable-next-line camelcase
    onSuccess: ({ data: { access_token } }) => {
      localStorage.setItem('token', access_token);
    },
    ...opts,
  });

  const { isFetching } = useRetrieveCurrentUser({
    enabled: isSuccess,
    onSuccess: data => {
      // id = 5 is role teacher
      const isTeacher = data?.data.roles.find(({ id }) => id === 5);
      const isTester = data?.data.roles.find(({ id }) => id === 124);
      if (isTeacher || isTester) {
        history.push('/home');
      } else {
        localStorage.removeItem('token');
        notification.error({
          title: (
            <FormattedMessage defaultMessage="You don't have permission" />
          ),
        });
      }
    },
  });

  return { mutate, isLoading: isLoading || isFetching };
};
