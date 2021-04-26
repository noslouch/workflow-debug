import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LIVE_INTERVALS = {
  firstHour: {
    interval: 6e4, // Every 1 minute
    maxTime: 36e5, // during 1 hour
  },
  first24Hours: {
    interval: 36e5, // Every 1 hour
    maxTime: 864e5, // during 24 hours
  },
};

const LOCALE_OPTIONS = {
  'MMMM D, YYYY': 'en-US',
  YYYY年M月D日: 'zh-Hans-CN',
};

const TimeTag = styled.p`
  font-family: var(--font-family-retina);
  font-size: 12px;
  line-height: 15px;
  padding: 0px;
  margin: 0px;
  display: inline-block;
  font-weight: 300;
  color: var(--color-moon);

  ${(props) =>
    (props.redTimestamp || props.redHoursAgo) &&
    `
      color: var(--color-red);
      margin-left: 6px;
    `}

  &:after {
    content: '${({ redTimestamp }) => (redTimestamp ? '\\00a0' : null)}';
  }
`;

const getTimeElapsed = (timestamp) => Date.now() - timestamp;

function Timestamp({
  format,
  hideAfterThreshold,
  liveUpdate,
  relativeThresholdInHours,
  showRelativeTime,
  showRelativeTimeInDays,
  tag,
  timestamp,
  hardcodeTimeZone,
  relativeTimestampTextUnder60s,
}) {
  // State to force the update of the component
  const [, setTick] = useState(0);

  useEffect(() => {
    let liveUpdateTimer = null;
    const { first24Hours, firstHour } = LIVE_INTERVALS;

    if (liveUpdate && showRelativeTime && !liveUpdateTimer) {
      const startLiveUpdateTimer = (interval, maxTime) => {
        liveUpdateTimer = setInterval(() => {
          // force the update of the component
          setTick((tick) => tick + 1);

          if (getTimeElapsed(timestamp) >= maxTime) {
            clearInterval(liveUpdateTimer);
            if (maxTime === firstHour.maxTime) {
              startLiveUpdateTimer(first24Hours.interval, first24Hours.maxTime);
            }
          } else if (getTimeElapsed(timestamp) < 0) {
            clearInterval(liveUpdateTimer);
          }
        }, interval);
      };

      if (getTimeElapsed(timestamp) < firstHour.maxTime) {
        startLiveUpdateTimer(firstHour.interval, firstHour.maxTime);
      } else if (getTimeElapsed(timestamp) < first24Hours.maxTime) {
        startLiveUpdateTimer(first24Hours.interval, first24Hours.maxTime);
      }
    }

    return () => clearInterval(liveUpdateTimer);
  }, [liveUpdate, showRelativeTime, timestamp]);

  const tagProps = {};
  const relativeThresholdInMilliseconds = 36e5 * relativeThresholdInHours;

  const formatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  if (hardcodeTimeZone) {
    const [tz] = hardcodeTimeZone; // ex ['America/New_York', 'ET']
    formatOptions.timeZoneName = 'short';
    formatOptions.timeZone = tz;
  }
  const locale = LOCALE_OPTIONS[format];

  let datestamp = Intl.DateTimeFormat(locale, formatOptions).format(timestamp);

  const timeElapsed = getTimeElapsed(timestamp);
  if (showRelativeTime && timeElapsed < relativeThresholdInMilliseconds) {
    if (timeElapsed < 6e4) {
      // 60000 (60 sec)
      datestamp = relativeTimestampTextUnder60s;
      tagProps.redTimestamp = true;
    } else if (timeElapsed < 36e5) {
      // 3600000 (60 min)
      const minsAgo = Math.floor(timeElapsed / 6e4);
      const suffix = minsAgo === 1 ? 'minute ago' : 'minutes ago';
      datestamp = `${minsAgo.toString()} ${suffix}`;
      tagProps.redTimestamp = true;
    } else if (timeElapsed < relativeThresholdInMilliseconds) {
      // 86400000 (24 hours)
      const hoursAgo = Math.floor(timeElapsed / 36e5);
      if (hoursAgo === 1) {
        datestamp = `${hoursAgo} hour ago`;
        tagProps.redTimestamp = true;
      } else if (hoursAgo > 1) {
        datestamp = `${hoursAgo} hours ago`;
        tagProps.redHoursAgo = true;
      }
    }
  } else if (showRelativeTime && showRelativeTimeInDays) {
    const daysAgo = Math.floor(timeElapsed / relativeThresholdInMilliseconds);
    const days = ` day${daysAgo === 1 ? '' : 's'}`;
    datestamp = `${daysAgo}${days} ago`;
  } else if (
    showRelativeTime &&
    hideAfterThreshold &&
    timeElapsed > relativeThresholdInMilliseconds
  ) {
    return null;
  }

  return (
    <TimeTag as={tag} {...tagProps}>
      {datestamp}
    </TimeTag>
  );
}

Timestamp.propTypes = {
  format: PropTypes.string,
  hardcodeTimeZone: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  hideAfterThreshold: PropTypes.bool,
  relativeThresholdInHours: PropTypes.number,
  showRelativeTime: PropTypes.bool,
  showRelativeTimeInDays: PropTypes.bool,
  tag: PropTypes.oneOf(['p', 'span']),
  timestamp: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])
    .isRequired,
  liveUpdate: PropTypes.bool,
  relativeTimestampTextUnder60s: PropTypes.string,
};

Timestamp.defaultProps = {
  format: 'MMMM D, YYYY',
  hardcodeTimeZone: [],
  showRelativeTime: false,
  relativeThresholdInHours: 24,
  hideAfterThreshold: true,
  showRelativeTimeInDays: false,
  tag: 'p',
  liveUpdate: false,
  relativeTimestampTextUnder60s: 'Just In',
};

export default Timestamp;
