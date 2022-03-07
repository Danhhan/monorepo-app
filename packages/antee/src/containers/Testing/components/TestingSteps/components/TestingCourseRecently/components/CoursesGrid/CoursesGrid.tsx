import { FlexItem, Text, FlexGrid, LoadingSpinner } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { Course } from 'services/course';

import CourseCard from '../CourseCard';

export type CoursesGridProps = {
  onReset: Function;
  isLoading?: boolean;
  courses?: Course[];
  idSelected: number;
  onSelectCourse: (id: number) => void;
};

const CoursesGrid: React.FC<CoursesGridProps> = ({
  onReset,
  isLoading = false,
  courses = [],
  idSelected,
  onSelectCourse,
}) => {
  // const [idSelected, setIdSelected] = useState<number | undefined>();

  // const onSelectCourse = (id?: number) => {
  //   setIdSelected(id);
  // };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center justify-items-center py-10">
        <LoadingSpinner size="xl" />
        <Text>
          <p>
            <FormattedMessage defaultMessage="Loading courses..." />
          </p>
        </Text>
      </div>
    );
  }

  return (
    <FlexGrid columns={1}>
      {courses.length !== 0
        ? courses.map(course => (
            <FlexItem key={course.id}>
              <CourseCard
                {...course}
                onReset={onReset}
                idSelected={idSelected}
                onSelectCourse={onSelectCourse}
              />
            </FlexItem>
          ))
        : null}
    </FlexGrid>
  );
};

export default CoursesGrid;
