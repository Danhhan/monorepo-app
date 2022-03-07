import {
  ButtonIcon,
  FieldNumber,
  FieldText,
  FlexGroup,
  FlexItem,
  Text,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

const EditableText = ({ value, onEditCompleted, render, isNumber, append, iconType, }) => {
  const ref = useRef();

  const [text, setText] = useState(value);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = e => setText(e.target.value);

  const onCompleted = async event => {
    setIsLoading(true);
    await onEditCompleted(text);
    setIsLoading(false);
    setEditing(false);
  };

  const editingComponent = isNumber ? (
    <FieldNumber
      ref={ref}
      className="rounded-lg px-2 py-0"
      fullWidth
      autoFocus
      isLoading={isLoading}
      onChange={onChange}
      onKeyDown={event => handleKeyDown(event)}
      value={text}
      append={append}
    />
  ) : (
    <FieldText
      ref={ref}
      className="rounded-lg px-2 py-0"
      fullWidth
      autoFocus
      isLoading={isLoading}
      onChange={onChange}
      onKeyDown={event => handleKeyDown(event)}
      value={text}
      append={append}
    />
  );

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onCompleted(event);
    }
  };

  return (
    <FlexGroup gutterSize="none" alignItems="center">
      {/* text */}
      <FlexItem grow={false}>
        {editing ? editingComponent : render?.() ?? <Text>{text}</Text>}
      </FlexItem>

      {/* control */}
      {editing ? (
        <>
          <ButtonIcon
            flush="both"
            iconType="checkInCircleFilled"
            minWidth={0}
            aria-label={"Complete"}
            onClick={onCompleted}
            aria-label="checkInCircleFilled"
          />
          <ButtonIcon
            iconType="crossInACircleFilled"
            minWidth={0}
            flush="both"
            color="danger"
            aria-label={"Close"}
            onClick={() => {
              setEditing(false);
              setText(value);
            }}
            aria-label="crossInACircleFilled"
          />
        </>
      ) : (
        <FlexItem grow={false}>
          <div>
            <ButtonIcon
              color="#ffffff"
              size="s"
              fill
              minWidth={0}
              iconType={iconType ?? "documentEdit"}
              aria-label={"Edit"}
              onClick={() => setEditing(true)}
              aria-label="documentEdit"
            />
          </div>
        </FlexItem>
      )}
    </FlexGroup>
  );
};

EditableText.defaultProps = {
  value: '',
  isNumber: false,
  onEditCompleted: () => {},
  render: undefined,
  append: undefined,
  iconType: undefined,
};

EditableText.propTypes = {
  value: PropTypes.string,
  isNumber: PropTypes.bool,
  onEditCompleted: PropTypes.func,
  render: PropTypes.func,
  append: PropTypes.elementType,
  iconType: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string,]),
};

export default EditableText;
