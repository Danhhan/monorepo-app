import { ButtonGroup } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

const ButtonsGroup = () => {
  const toggleButtons = [
    {
      id: `todayButton`,
      label: <FormattedMessage defaultMessage="Today" />,
      type: 'button',
    },
    {
      id: `weekButton`,
      label: <FormattedMessage defaultMessage="This Week" />,
      type: 'button',
    },
    {
      id: `monthButton`,
      label: <FormattedMessage defaultMessage="This Month" />,
      type: 'button',
    },
  ];

  const [toggleIdSelected, setToggleIdSelected] = useState(toggleButtons[0].id);

  const onChange = optionId => {
    setToggleIdSelected(optionId);
  };

  return (
    <ButtonGroup
      legend="This is a basic group"
      options={toggleButtons}
      idSelected={toggleIdSelected}
      onChange={id => onChange(id)}
      color="primary"
    />
  );
};

export default ButtonsGroup;
