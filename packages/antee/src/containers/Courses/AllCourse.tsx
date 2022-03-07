import {
  FlexGroup,
  FlexItem,
  PageContentBody,
  PageContentHeader,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useInfinityCourses } from 'services/course';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmpty } from 'lodash';
import { SearchBar } from './components';
import CoursesTable from './components/CourseTable/CourseTable';
import { COURSE_STATUS_ALL, COURSE_TYPE_ALL } from './constants';
import stys from './Course.module.scss';

export type AllCourseProps = {
  idSelected: number;
  courseType: number;
  setIdResource: any;
  showMobileModal: () => void;
  setShowSession: () => void;
  toggleChangeCourse: () => void;
  datatable: any[];
  handlegetTeacherInfo: (datateacher: []) => void;
  showSessionDetail: boolean;
  onSelectCourse: (id: number, type: number) => void;
  height: number;
};

const AllCourses: React.FC<AllCourseProps> = ({
  toggleChangeCourse,
  setIdResource,
  showMobileModal,
  handlegetTeacherInfo,
  idSelected,
}) => {
  const [status, setStatus] = useState<number>(COURSE_STATUS_ALL);
  const [type, setType] = useState<number>(COURSE_TYPE_ALL);

  const [term, setTerm] = useState('');
  const [activePage, setActivePage] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rowSize, setRowSize] = useState(6);
  const [idCourceSelect, setIdCourceSelect] = useState(0);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const closePopover = () => setIsPopoverOpen(false);

  const { data, isLoading, refetch } = useInfinityCourses({
    term,
    status,
    filterType: type > 0 ? type : 0,
    pageIndex: activePage + 1,
    totalItem: rowSize,
  });
  const arr: any[] = [];

  data?.pages?.map(item => {
    item?.data?.courses.map(i => {
      arr.push(i);
    });
  });
  const hanleRowSize = (rowNum: number) => {
    setRowSize(rowNum);
    setActivePage(0);
  };
  // eslint-disable-next-line radix
  const onFilterType = (typeValue: string) => {
    console.log(typeValue);
    setType(parseInt(typeValue, 10));
    setActivePage(0);
  };

  // eslint-disable-next-line no-shadow
  const goToPage = (activePage: number) => {
    setActivePage(activePage);
  };
  const handleSelectId = (idCource: number) => {
    setIdCourceSelect(idCource);
  };
  const onStatusChangeHandler = (statusValue: string) => {
    setStatus(parseInt(statusValue, 10));
    setActivePage(0);
  };

  const onTermChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
    setActivePage(0);
  };

  let currentpage = 0;
  let itemperpage = 0;
  let totalpage = 0;
  let totaltitem = 0;

  data?.pages?.map(item => {
    currentpage = item?.data?.pagination?.currentPage;
    itemperpage = item?.data?.pagination?.itemsPerPage;
    totalpage =
      rowSize < 10
        ? item?.data?.pagination?.totalPage
        : item?.data?.pagination?.totalPage;
    totaltitem = item?.data?.pagination?.totalItems;
  });
  // eslint-disable-next-line no-console

  return (
    <div className={rowSize > 10 ? stys.Mycources : ''}>
      <InfiniteScroll
        dataLength={50}
        next={() => {}}
        hasMore={false}
        height={0}
        loader
      >
        <PageContentHeader className={stys.coucseHeader}>
          <FlexGroup>
            <FlexItem>
              <Title>
                <h1 className="font-semibold">
                  <FormattedMessage defaultMessage="Khóa học của tôi" />
                </h1>
              </Title>
            </FlexItem>
          </FlexGroup>
        </PageContentHeader>
        <PageContentHeader style={{ marginBottom: '0px' }}>
          <FlexGroup>
            <FlexItem>
              <SearchBar
                idSelected={idCourceSelect}
                cource={arr}
                status={status}
                type={type}
                setType={setType}
                onStatusChange={onStatusChangeHandler}
                onTermChange={onTermChangeHandler}
                onFilterType={onFilterType}
              />
            </FlexItem>
          </FlexGroup>
        </PageContentHeader>
        <PageContentHeader style={{ marginBottom: '20px' }} />
        <PageContentBody className={stys.coucseBody}>
          <CoursesTable
            toggleChangeCourse={toggleChangeCourse}
            hanleRowSize={hanleRowSize}
            handleSelectId={handleSelectId}
            isLoading={isLoading}
            isPopoverOpen={isPopoverOpen}
            setIdResource={setIdResource}
            handlegetTeacherInfo={handlegetTeacherInfo}
            closePopover={closePopover}
            onButtonClick={onButtonClick}
            rowSize={rowSize}
            goToPage={goToPage}
            activePage={activePage}
            showMobileModal={showMobileModal}
            totalPage={totalpage}
            data={arr || []}
          />
        </PageContentBody>
        <Spacer />

        <PageContentBody />
      </InfiniteScroll>
    </div>
  );
};

export default AllCourses;
