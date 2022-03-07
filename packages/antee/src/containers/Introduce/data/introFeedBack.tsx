import React, { FunctionComponent } from 'react';
import FeedbackAvt1 from '../../../assets/images/feedback-img-1.png';
import FeedbackAvt2 from '../../../assets/images/feedback-img-2.png';
import FeedbackAvt3 from '../../../assets/images/feedback-img-3.png';
import FeedbackAvt4 from '../../../assets/images/feedback-img-4.png';

interface OwnProps {}

type Props = OwnProps;

const introFeedBack = [
  {
    name: 'Phạm Thị Nhàn',
    description:
      'Quản lý tại Ngân hàng Thảo mộc Việt Nam \n Học IELTS với giáo viên Zinc',
    feedbackComment: `“Học với Antoree rất thích vì được mọi người hỗ trợ nhiệt tình. Các bạn tư vấn viên và Giáo viên đều làm việc rất hết mình và quan tâm đến hiệu quả học tập của học viên.
        Mình nghĩ đó là mô hình và xu hướng học mới, tiết kiệm thời gian và linh động hơn.”`,
    img: FeedbackAvt1,
  },
  {
    name: 'Nguyễn Đức Bình',
    description:
      'Giám đốc Trung tâm thẻ Ngân hàng Việt Nga VRB \n Học giao tiếp với giáo viên Quỳnh Anh',
    feedbackComment: `“Công việc của mình bận, thường xuyên phải đi công tác nên hình thức học của Antoree rất phù hợp với mình. Ngoài ra việc học cũng theo yêu cầu của mình nên thường mình học giao tiếp để chuẩn bị cho các chuyến công tác nước ngoài. \n
        Giáo viên Quỳnh Anh thì vui tính và nhiệt tình. Giọng cô cũng hay và ngữ pháp cô nắm chắc nên cô củng cố giúp mình được cả phát âm và ngữ pháp. Cô cũng tâm lý và cách giảng dạy dễ hiểu.“`,
    img: FeedbackAvt2,
  },
  {
    name: 'Chị Loan (Thái Nguyên) - Mẹ của bé Bảo Thy',
    description: 'Đã học khóa 120h cùng cô Chrisha - GV Philippines',
    feedbackComment: `“ Hôm nay tôi rất vui vì giờ đây con có thể tin nói về rất nhiều các chủ đề Tiếng Anh. Trước đây Thy rất nhút nhát, không tự tin giao tiếp với mọi người mặc dù vồn từ vựng và ngữ pháp của con rất khá. \n
        May mắn tôi tìm được khóa học tiếng anh 1 kèm 1 tại Antoree, đến nay con đã học được 2 khóa và con thay đổi rất nhiều. Các Thầy Cô trên trường đều khen con tiến bộ rất nhanh. Qua chương tình này, tôi xin gửi lời cảm ơn đến Thầy Cô & Trung tâm Antoree đã trao cho tôi niềm hạnh phúc này. “`,
    img: FeedbackAvt3,
  },
  {
    name: '	Nguyễn Lệ Bích Thủy - Mẹ của học viên Nhật Minh',
    description:
      'Giáo viên Tiếng Anh tại trường THCS Đặng Công Bỉnh \n Học giao tiếp với giáo viên Pearl',
    feedbackComment:
      'Hôm nay, buổi học cuối khoá của con trai với cô giáo Pearl. Tâm trạng con trai không thể hiện, nhưng mẹ thì cảm xúc đong đầy. Mẹ và con trai cùng cám ơn cô giáo. Cuộc đời là chuỗi ngày gặp rồi xa nhau. Chúc nhau sự bình an và niềm vui. Về ngữ pháp tiếng Anh thì chị đã dạy hết cho con rồi, nhưng để luyện giao tiếp thì con cần được học với giáo viên nước ngoài. Ngay cả học sinh của chị, chị cũng khuyên chúng nó như vậy.',
    img: FeedbackAvt4,
  },
  // {
  //   name: 'Phạm Thị Nhàn',
  //   description:
  //     'Quản lý tại Ngân hàng Thảo mộc Việt Nam Học IELTS với giáo viên Zinc',
  //   feedbackComment:
  //     'Công việc của mình bận, thường xuyên phải đi công tác nên hình thức học của Antoree rất phù hợp với mình. Ngoài ra việc học cũng theo yêu cầu của mình nên thường mình học giao tiếp để chuẩn bị cho các chuyến công tác nước ngoài. Giáo viên Quỳnh Anh thì vui tính và nhiệt tình. Giọng cô cũng hay và ngữ pháp cô nắm chắc nên cô củng cố giúp mình được cả phát âm và ngữ pháp. Cô cũng tâm lý và cách giảng dạy dễ hiểu.',
  // },
];
export default introFeedBack;
