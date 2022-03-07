import { useQuery } from 'react-query';
import OTAClient from '@crowdin/ota-client';

import { compileMessages } from 'helpers';
import {
  REACT_APP_CROWDIN_DISTRIBUTION_HASH,
  REACT_APP_CROWDIN_FILE,
} from 'configs/env.conf';
import { Messages } from 'helpers/compileMessages';

export type RetrieveTranslationMessagesParams = {
  locale: string;
};

export type RetrieveTranslationMessagesResponse = Messages;

export const retrieveTranslationMessages = async (
  params: RetrieveTranslationMessagesParams,
) => {
  const client = new OTAClient(REACT_APP_CROWDIN_DISTRIBUTION_HASH);
  const translation = await client.getFileTranslations(
    REACT_APP_CROWDIN_FILE,
    params.locale,
  );
  const result = await compileMessages(translation);
  return result;
};

export const useRetrieveTranslationMessages = (
  params: RetrieveTranslationMessagesParams,
) =>
  useQuery<RetrieveTranslationMessagesResponse, Error>(
    params.locale,
    () => retrieveTranslationMessages(params),
    {
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
