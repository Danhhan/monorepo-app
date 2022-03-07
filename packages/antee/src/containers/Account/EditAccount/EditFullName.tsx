import React from 'react';
import {
  FlexGroup,
  FlexItem,
  Button,
  FieldText,
  ButtonEmpty,
} from '@antoree/ant-ui';
import styles from './EditAccount.module.scss';

interface EditAccountProps {
  handleClose: () => void;
  textedit: {
    birthday: string;
    displayName: string;
    firstName: string;
    gender: number;
    lastName: string;
    phone: string;
  };
}

const EditFullName = ({ handleClose, textedit }: EditAccountProps) => {
  return (
    <div>
      <div className={styles.Edit}>
        <div className={styles.Label}>
          <h3>Nhập họ và tên</h3>
        </div>
        <div className={styles.EditContent}>
          <div className={styles.TextEdit}>
            <h3>Họ và tên đệm</h3>

            <FieldText
              type="text"
              placeholder="Nhập họ và tên đệm"
              defaultValue={textedit?.firstName}
            />
          </div>
          <div className={styles.TextEdit}>
            <h3>Tên</h3>

            <FieldText
              type="text"
              placeholder="Nhập tên"
              defaultValue={textedit?.lastName}
            />
          </div>
        </div>
        <div className={styles.hr} />
        <div className={styles.EditContent}>
          <div className={styles.TextEdit}>
            <ButtonEmpty onClick={handleClose}> Hủy</ButtonEmpty>
          </div>
          <div className={styles.Btnsave}>
            <Button onClick={handleClose} fill>
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFullName;
