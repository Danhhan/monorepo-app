import {
  Button,
  ButtonIcon,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  Icon,
  notification,
  Outline,
  PageHeader,
} from '@antoree/ant-ui';
// eslint-disable-next-line import/order
import { yupResolver } from '@hookform/resolvers/yup';
import MenuIcon from '@mui/icons-material/Menu';
import logoAntoree from 'assets/images/logo-antoree.svg';
import { useState } from 'react';
import { isIPad13, isMobile } from 'react-device-detect';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useRetrieveRoomUrlByCourseId } from 'services/videoCall';
import { schema } from './formSchema';
import './MainLayout.scss';
import MenuMobile from './MenuMobile';
import styles from './Navbar/Navbar.module.scss';
import SearchMobile from './SearchMobile';
import UserPopoverV2 from './UserPopover';

// eslint-disable-next-line import/order
import { Helmet } from 'react-helmet';

export type HeaderProps = {
  background?: string;
  colorText?: string;
  logo?: any;
  isHideSearch?: boolean;
  isShowBarNav?: boolean;
  datahead?: any;
};
interface IFormData {
  courseId: string;
}

const HeaderMain: React.FC<HeaderProps> = ({}) => {
  const location = useLocation();
  const history = useHistory();
  const [openmenu, setOpenMenu] = useState(false);
  const urlRedirect = history ? history.location.pathname : '/today';
  const [navactive, setActive] = useState(urlRedirect);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openmenu);
  };

  const handleOpenSearch = () => {
    setOpenMenu(!isOpenSearch);
  };
  if (location.pathname === '/') {
    history.push('/overview');
  }

  const intl = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { courseId: undefined },
  });

  const { mutate, isLoading } = useRetrieveRoomUrlByCourseId({
    // eslint-disable-next-line no-shadow
    onSuccess: (data: any) => {
      window.open(data.data.vcUrl, '_blank');
    },
    onError: () => {
      // notification.error({
      //   title: <FormattedMessage defaultMessage="Session not found" />,
      // });
    },
  });

  const onSubmit = ({ courseId }: IFormData) => {
    mutate({
      courseId: parseInt(courseId, 10),
      whoami: 'student',
      source: 'web',
    });
  };

  const { ArrowRightIcon } = Outline;

  const linkTabs = [
    {
      id: 'today',
      label: <FormattedMessage defaultMessage="Hôm Nay" />,
      pathname: '/today',
      icon: 'DocumentTextIcon',
    },

    {
      id: 'courses',
      label: <FormattedMessage defaultMessage="Khóa học của tôi" />,
      pathname: '/courses',
      icon: 'CalendarIcon',
    },
    {
      id: 'testing',
      label: <FormattedMessage defaultMessage="Test tiếng anh miễn phí" />,
      pathname: '/testing',
      icon: 'CalendarIcon',
    },
  ];

  const { search } = useLocation();
  const utmSouce = new URLSearchParams(search).get('utm_source');

  return (
    <>
      <PageHeader
        paddingSize="m"
        style={{
          background: '#fff',
          margin: 'auto',
          zIndex: 100,
        }}
        responsive={false}
        className={styles.navbar}
        id={styles.menu}
      >
        <span className={styles.navbarBrand} style={{ cursor: 'pointer' }}>
          <Icon
            type={logoAntoree}
            style={{
              width: '125px',
              height: 'auto',
              marginRight: '24px',
              marginLeft: '24px',
            }}
          />
        </span>

        <button type="button" id={styles.menumobile} onClick={handleOpenMenu}>
          <MenuIcon style={{ fontSize: '30px' }} />
        </button>
        {isMobile || isIPad13 ? (
          <div className={styles.navbarmobile}>
            <MenuMobile open={openmenu} handelMenuOpen={handleOpenMenu} />
            <SearchMobile
              isOpenSearch={isOpenSearch}
              handleOpenSearch={handleOpenSearch}
            />
          </div>
        ) : null}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!isMobile ? (
              <div>
                <li className="nav-item active">
                  <Form
                    className="pl-4 md:m-auto ml-auto"
                    component="form"
                    id={styles.formsearch}
                    onSubmit={handleSubmit(onSubmit, () =>
                      notification.error({
                        title: errors.courseId?.message || '',
                      }),
                    )}
                  >
                    <FormRow className="w-60" isInvalid={!!errors.courseId}>
                      <Controller
                        name="courseId"
                        control={control}
                        render={({ field: { ref, ...fieldRest } }) => (
                          <FieldText
                            fullWidth
                            placeholder={intl.formatMessage({
                              defaultMessage: 'Tham gia với ID khóa học',
                            })}
                            inputRef={ref}
                            {...fieldRest}
                            append={
                              <ButtonIcon
                                size="m"
                                display="fill"
                                type="submit"
                                iconType={() => (
                                  <div className="flex justify-center items-center">
                                    <ArrowRightIcon className="h-6 w-6" />
                                  </div>
                                )}
                                color="primary"
                                style={{
                                  background: '#00c081',
                                  border: '#00c081',
                                  width: '40px',
                                  borderRadius: '0 5px 5px 0',
                                }}
                                isDisabled={isLoading}
                                aria-label="enter-test-btn"
                              />
                            }
                          />
                        )}
                      />
                    </FormRow>
                  </Form>
                </li>
                <div className={styles.tabitem}>
                  {linkTabs.map((item: any) => (
                    <li key={item.id}>
                      <Link
                        target={item.pathname === '/testing' ? '_blank' : ''}
                        onClick={() => {
                          setActive(item.pathname);
                        }}
                        className={
                          navactive === item.pathname
                            ? styles.navanteeActivate
                            : styles.navantee
                        }
                        to={
                          utmSouce
                            ? `${item.pathname}?utm_source=FBAsk&utm_medium=Post&utm_campaign=[CTV ĐÀO]_CHƯƠNG TRÌNH CTV`
                            : item.pathname
                        }
                      >
                        {item.label}
                      </Link>
                      {navactive === item.pathname ? (
                        <p className={styles.hr} />
                      ) : null}
                    </li>
                  ))}
                </div>
              </div>
            ) : null}
          </ul>
          {!isMobile ? (
            <form className="form-inline my-0" id={styles.btnsearch}>
              <FlexGroup>
                {/* <FlexItem>
                  <Notifi />
                </FlexItem> */}
                <FlexItem style={{ marginRight: '16px' }}>
                  <Link target="_blank" to="/tkhomepage">
                    <Button
                      type="button"
                      style={{
                        backgroundColor: 'rgba(52, 55, 65, 0.15)',
                        border: 'none',
                        outline: 'none',

                        color: 'black',
                        borderRadius: '8px',
                        textDecoration: 'none',
                      }}
                    >
                      Tìm giáo viên
                    </Button>
                  </Link>
                </FlexItem>
                <FlexItem>
                  <UserPopoverV2 />
                </FlexItem>
              </FlexGroup>
            </form>
          ) : null}
        </div>
      </PageHeader>
    </>
  );
};

export default HeaderMain;
