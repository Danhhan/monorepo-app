import { Button, EmptyPrompt, Icon, Spacer, Title } from '@antoree/ant-ui';

const ForBidden = () => {
  return (
    <div
      role="alert"
      className="flex flex-col justify-items-center items-center justify-center h-screen"
    >
      <EmptyPrompt
        // iconType="crossInACircleFilled"
        // iconColor="#ED0000"
        titleSize="s"
        title={
          <>
            <p>
              <Icon
                // color="#ED0000"
                style={{
                  height: '80px',
                  width: '80px',
                  color: '#ED0000',
                }}
                type="crossInACircleFilled"
              />
            </p>
            <Spacer />
            <Title>
              <h2>Hạn chế quyền truy cập :(</h2>
            </Title>
          </>
        }
        body={
          <>
            <p>Tài khoản của bạn hiện chưa được phép truy cập trang này.</p>
          </>
        }
        actions={
          <div>
            <a href="/">
              <Button
                style={{
                  background: '#343741',
                  color: 'white',
                  border: 'none',
                }}
                compressed
              >
                Trở về trang home
              </Button>
            </a>
          </div>
        }
      />
    </div>
  );
};

export default ForBidden;
