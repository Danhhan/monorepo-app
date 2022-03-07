import httpClient from 'utils/httpClient';

const RETRIEVE_ROOM_URL = '/admin/v2/init-vc-course';

export type RetrieveRoomUrlBody = {
  courseId: Number;
  whoami?: 'student' | 'teacher';
  source: string;
};

export type RetrieveRoomUrlResponse = {
  vcUrl: string;
};

export const retrieveRoomUrl = ({
  courseId,
  whoami = 'teacher',
  source = 'web',
}: RetrieveRoomUrlBody) => {
  const parsedBody = {
    'course-id': courseId,
    whoami,
    source,
  };

  return httpClient.post<RetrieveRoomUrlResponse>(
    RETRIEVE_ROOM_URL,
    parsedBody,
  );
};
