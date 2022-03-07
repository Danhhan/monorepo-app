import { Spacer, FilePicker } from '@antoree/ant-ui';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useState } from 'react';

interface ResultSessionDetailProps {
  setShowResultSession: () => void;

  homeworkData: any;
}

const ResultSessionDetail = ({
  setShowResultSession,

  homeworkData,
}: ResultSessionDetailProps) => {
  const [files, setFiles] = useState({});
  const onChange = (file: any) => {
    setFiles(file.length > 0 ? Array.from(file) : []);
  };

  return (
    <div style={{ marginTop: '8%' }}>
      <h1 style={{ fontWeight: 'bold', marginLeft: '0px' }}>
        <button
          type="button"
          onClick={() => {
            setShowResultSession();
          }}
          style={{ cursor: 'pointer', marginLeft: '24px' }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </button>{' '}
        <span style={{ fontSize: '22px' }}>Nội dung buổi học:</span> <Spacer />
      </h1>
      <div
        style={{
          fontSize: '15px',
          fontWeight: 500,
          textTransform: 'capitalize',
          cursor: 'pointer',
          marginLeft: '25px',
        }}
      />
      <div
        style={{
          marginTop: '10px',
          padding: '2px 0px 2px 0px',
          marginLeft: '25px',
          width: '650px',
        }}
      >
        <div
          style={{
            display: 'block',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Chủ đề buổi học :{' '}
          </h3>
          <p
            style={{
              marginTop: '16px',
            }}
          >
            {homeworkData?.title}
          </p>
        </div>

        <div
          style={{
            display: 'block',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '25px',
            }}
          >
            1 - Từ vựng :{' '}
          </h3>
          <p
            style={{
              marginTop: '16px',
            }}
          >
            {homeworkData?.vocabulary}
          </p>
        </div>
        <div
          style={{
            display: 'block',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '25px',
            }}
          >
            2 - Ngữ pháp :{' '}
          </h3>
          <p
            style={{
              marginTop: '16px',
            }}
          >
            {homeworkData?.grammar}
          </p>
        </div>
        <div
          style={{
            display: 'block',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '25px',
            }}
          >
            3 - Nghi chú cho học viên :{' '}
          </h3>
          <p
            style={{
              marginTop: '16px',
            }}
          >
            {homeworkData?.studentAttitude}
          </p>
        </div>
      </div>
      <div
        style={{
          marginTop: '10px',
          padding: '2px 0px 2px 0px',
          marginLeft: '25px',
          width: '650px',
        }}
      >
        <h3 style={{ fontSize: '22px', fontWeight: 600 }}>Bài tập về nhà : </h3>
        <p
          style={{
            marginTop: '16px',
          }}
        >
          {homeworkData?.homework}
        </p>
        <p>
          {homeworkData?.homeworkUrl
            ? homeworkData?.homeworkUrl?.map((item: any) => (
                <img src={item?.url} alt="bai tap" style={{ width: '50px' }} />
              ))
            : ''}
        </p>
        <FilePicker
          id=""
          multiple
          initialPromptText="Nộp bài tập về nhà"
          onChange={onChange}
          display="large"
          aria-label="Use aria labels when no actual label is in use"
        />
      </div>
    </div>
  );
};

export default ResultSessionDetail;
