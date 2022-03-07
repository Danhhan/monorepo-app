import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React from 'react';
import Header from '../../../components/Header/Header';
import styles from './HeaderAccount.module.scss';

const HeaderAccount = () => {
  return (
    <div>
      <Header />
      <div className={styles.Header}>
        <div className={styles.Avatar}>
          <span className={styles.Camera}>
            <CameraAltIcon />
          </span>
          <img
            alt="sjs"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
            }}
            src="https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&h=350"
          />
        </div>
        <div className={styles.FullName}>
          <h3>Hello world</h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderAccount;
