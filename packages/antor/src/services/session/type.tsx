/* eslint-disable camelcase */
export type SessionAbsent = {
  id: number;
  absentBy: number;
  absentReason: string;
  createdAt: string;
};
export type TypicalUser = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  type: number;
};

export type Session = {
  id: number;
  course_id: number;
  student: TypicalUser;
  teacher: {
    id: number;
  };
  occurredAt: number;
  shortDateOccurred_at: number;
  happenedStatus: number;
  videoUrl: string[];
  hasMore: number;
  type: number;
  shortTimeEndedAt: string;
  shortTimeStartedAt: string;
  shortRepresentingDuration: string;
  issues: {
    sessionAbsent: SessionAbsent;
  };
  issueTexts: string[];
  test: {
    url: string;
  };
  testDuration: number;
  testRequired: boolean;
  hasEvaluation: boolean;
  evaluation: boolean;
  teacherConfirmed: number;
  // session content!!
  vocabulary: string;
  grammar: string;
  studentNote: string;
  title: string;
};
