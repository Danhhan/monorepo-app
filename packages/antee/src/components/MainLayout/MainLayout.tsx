/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// eslint-disable-next-line import/order
import SimpleBottomNavigation from '../BottomNav/SimpleBottomNavigation';
import HeaderMain from './HeaderMain';
import './MainLayout.scss';

interface IFormData {
  courseId: string;
}

const MainLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <HeaderMain />

      <div style={{ backgroundColor: 'white' }}>
        <main
          style={{
            marginLeft: '24px',
            marginRight: '24px',
            backgroundColor: 'white',
          }}
        >
          {children}
        </main>
      </div>
      <SimpleBottomNavigation hanleOpen={() => {}} timeSelected={null} />
    </>
  );
};

export default MainLayout;
