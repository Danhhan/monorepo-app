import React from 'react';
import {
  FlexGroup,
  FlexItem,
  Button,
  FieldText,
  ButtonEmpty,
} from '@antoree/ant-ui';
import styles from './EditAccount.module.scss';

interface EditGenderProps {
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

const EditGender = ({ handleClose, textedit }: EditGenderProps) => {
  return (
    <div>
      <div className={styles.Edit}>
        <div className={styles.Label}>
          <h3>Giới tính</h3>
        </div>
        <div className={styles.EditContent}>
          <div className={styles.TextEdit}>
            <h3>Giới tính</h3>

            <FieldText
              type="text"
              placeholder="Nhập họ và tên đệm"
              defaultValue={textedit.firstName}
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

export default EditGender;
