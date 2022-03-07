import style from './CourseProgress.module.scss';

export type CourseProgressProps = {
  strokeWidth: number;
  sqSize: number;
  percentage: number;
  disable: boolean;
};
const CourseProgress: React.FC<CourseProgressProps> = ({
  strokeWidth,
  sqSize,
  percentage,
  disable,
}) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  return (
    <>
      {!disable ? (
        <div className="pt-4">
          <svg width={sqSize} height={sqSize}>
            <circle
              className={style.circleBackground}
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              className={style.circleProgress}
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              // Start progress marker at 12 O'Clock
              transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
              }}
            />
            <text
              className={style.circleText}
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle"
            >
              {`${percentage}%`}
            </text>
          </svg>
        </div>
      ) : (
        <div className="pt-4">
          <svg width={sqSize} height={sqSize}>
            <circle
              className={style.circleBackgroundFail}
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              className={style.circleProgressFail}
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              // Start progress marker at 12 O'Clock
              transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
              }}
            />
            <text
              className={style.circleTextFail}
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle"
            >
              --
            </text>
          </svg>
        </div>
      )}
    </>
  );
};
export default CourseProgress;
