import { Text, Title, Spacer } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

const Note: React.FC<{ note: string }> = ({ note }) => {
  return (
    <div>
      <Title>
        <h2>
          <FormattedMessage defaultMessage="Student Notes" />
        </h2>
      </Title>
      <Spacer size="s" />
      <div
        style={{ border: '1px solid rgba(15, 39, 118, 0.1)' }}
        className="p-2 rounded-md shadow-md"
      >
        <Text size="s">{note}</Text>
      </div>
      <Spacer />
    </div>
  );
};

export default Note;
