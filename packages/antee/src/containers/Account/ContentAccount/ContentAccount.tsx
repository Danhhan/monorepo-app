import { Button } from '@antoree/ant-ui';
import React, { useState } from 'react';
import EditFullName from '../EditAccount/EditFullName';
import styles from './ContentAccount.module.scss';
import EditGender from '../EditAccount/EditGender';

interface ContentAccountProps {
  datauser: {
    id: number;
    birthday: string;
    displayName: string;
    firstName: string;
    lastName: string;
    gender: number;
    phone: string;
  };
}

const ContentAccount = ({ datauser }: ContentAccountProps) => {
  const [editName, setEditName] = useState({
    isEdit: '',
    placholderedit: '',
  });

  const handleClose = () => {
    setEditName({
      isEdit: '',
      placholderedit: '',
    });
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.Labelh1}>Thông tin </h1>
      {editName.isEdit === 'fullname' ? (
        <EditFullName textedit={datauser} handleClose={handleClose} />
      ) : (
        <div className={styles.Bodyaccount}>
          <div>
            <p className={styles.Namelabel}> Tên đầy đủ</p>
            <p className={styles.Infotext}>{datauser.displayName}</p>
          </div>
          <div className={styles.ButtonChange}>
            <Button
              onClick={() => {
                setEditName({
                  isEdit: 'fullname',
                  placholderedit: '',
                });
              }}
              className={styles.btnchange}
            >
              Thay đổi
            </Button>
          </div>
        </div>
      )}

      <span className={styles.hr} />

      {editName.isEdit === 'gender' ? (
        <EditGender textedit={datauser} handleClose={handleClose} />
      ) : (
        <div className={styles.Bodyaccount}>
          <div>
            <p className={styles.Namelabel}>Giới tính</p>
            <p className={styles.Infotext}>
              {datauser.gender === 1 ? 'Nam' : 'Nữ'}
            </p>
          </div>
          <div className={styles.ButtonChange}>
            <Button
              onClick={() => {
                setEditName({
                  isEdit: 'gender',
                  placholderedit: '',
                });
              }}
              className={styles.btnchange}
            >
              Thay đổi
            </Button>
          </div>
        </div>
      )}
      <span className={styles.hr} />

      <div className={styles.Bodyaccount}>
        <div>
          <p className={styles.Namelabel}> Ngày sinh</p>
          <p className={styles.Infotext}>
            {datauser.birthday ? datauser.birthday : 'Chưa có'}
          </p>
        </div>
        <div className={styles.ButtonChange}>
          <Button className={styles.btnchange}>Thay đổi</Button>
        </div>
      </div>
      <span className={styles.hr} />

      <div className={styles.Bodyaccount}>
        <div>
          <p className={styles.Namelabel}> Số điện thoại</p>
          <p className={styles.Infotext}>{datauser.phone}</p>
        </div>
        {/* <div className={styles.ButtonChange}>
          <Button className={styles.btnchange}>Thay đổi</Button>
        </div> */}
      </div>
      <span className={styles.hr} />

      <div className={styles.Bodyaccount}>
        <div>
          <p className={styles.Namelabel}>Email</p>
          <p className={styles.Infotext}>Chưa có</p>
        </div>
        <div className={styles.ButtonChange}>
          <Button className={styles.btnchange}>Thêm</Button>
        </div>
      </div>
    </div>
  );
};

export default ContentAccount;
