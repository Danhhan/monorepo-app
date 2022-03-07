import { useMutation, UseMutationOptions } from 'react-query';
import {
  retrieveRoomUrl,
  RetrieveRoomUrlBody,
  RetrieveRoomUrlResponse,
} from 'services/enterTest';
import { AxiosResponse, AxiosError } from 'axios';

const useRetrieveRoomUrl = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveRoomUrlResponse>,
    AxiosError<any>,
    RetrieveRoomUrlBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveRoomUrlResponse>,
    AxiosError<any>,
    RetrieveRoomUrlBody
  >(retrieveRoomUrl, opts);

export default useRetrieveRoomUrl;
