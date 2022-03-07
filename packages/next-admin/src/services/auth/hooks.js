import { useMutation } from 'react-query';
import * as authServices from 'services/auth';

export function useAuthMutation(options) {
  const signInMutation = useMutation(authServices.signIn, options);

  return signInMutation;
}
