import {
  FlexItem,
  Text,
  FlexGrid,
  LoadingSpinner,
  Spacer,
  FlexGroup,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import allCourseNotFound from 'assets/images/allCourseNotFound.svg';

import CourseCard from '../CourseCard';
import { CourseCardProps } from '../CourseCard/CourseCard';

export type CoursesGridProps = {
  onReset?: Function;
  isLoading?: boolean;
  isFetching?: boolean;
  courses?: CourseCardProps[];
  idSelected: number;
  onSelectCourse: (id: number, type: number) => void;
};

const CoursesGrid: React.FC<CoursesGridProps> = ({
  onReset,
  isLoading = false,
  isFetching = false,
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

  if (courses.length === 0 && !isFetching) {
    return (
      <FlexGroup>
        <FlexItem>
          <Text size="m" color="text" className="m-auto">
            <p>
              <FormattedMessage defaultMessage="There is no course yet." />
            </p>
            <Spacer />
          </Text>
          <div style={{ textAlign: 'center' }}>
            <img src={allCourseNotFound} alt="" />
          </div>
        </FlexItem>
      </FlexGroup>
    );
  }

  return (
    <FlexGrid columns={1} gutterSize="none">
      {courses.length !== 0
        ? courses.map(course => (
            <FlexItem key={course.id}>
              <CourseCard
                {...course}
                onReset={onReset}
                idSelected={idSelected}
                onSelectCourse={onSelectCourse}
              />
              <Spacer />
            </FlexItem>
          ))
        : null}
    </FlexGrid>
  );
};

export default CoursesGrid;
