/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormRow,
  FieldText,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useToggle } from 'hooks';
// import ReactExport from 'react-export-excel';

// const { ExcelFile } = ReactExport;
// const { ExcelSheet } = ReactExport.ExcelFile;
// const { ExcelColumn } = ReactExport.ExcelFile;

// eslint-disable-next-line react/prop-types
const ExportModule = ({ toggleElement, dataToExtract, data, isAvailable }) => {
  const [fileName, setFileName] = useState('ExportFile');

  const { open, isVisiable, close } = useToggle();

  return (
    <>
      <Button
        disabled={!isAvailable}
        onClick={open}
        fill
        size="s"
        iconType="importAction"
      >
        <FormattedMessage defaultMessage="Export" />
      </Button>

      {isVisiable && (
        <Modal onClose={close}>
          <ModalHeader>
            <FormattedMessage defaultMessage="Export File Options" />
          </ModalHeader>
          <ModalBody>
            <FormRow label={<FormattedMessage defaultMessage="FileName" />}>
              <FieldText
                value={fileName}
                onChange={e => setFileName(e.target.value)}
              />
            </FormRow>
          </ModalBody>
          {/* <ModalFooter>
            <ExcelFile
              filename={fileName}
              element={
                <Button onClick={close} fill size="s" iconType="importAction">
                  <FormattedMessage defaultMessage="Export" />
                </Button>
              }
            >
              {dataToExtract?.map((sheet, index) => (
                <ExcelSheet
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  data={sheet.data}
                  name={sheet.sheetName}
                >
                  {sheet.config.map(item => (
                    <ExcelColumn label={item.label} value={item.value} />
                  ))}
                </ExcelSheet>
              ))}
            </ExcelFile>
          </ModalFooter> */}
        </Modal>
      )}
    </>
  );
};

ExportModule.defaultProps = {
  toggleElement: null,
};

ExportModule.propTypes = {
  toggleElement: PropTypes.element,
};

export default ExportModule;
