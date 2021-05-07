import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Timestamp from '../Timestamp';

const ChinesePickerText = ({ region }) => {
  if (!region.includes('asia,cn')) return null;
  const text = region.includes('asia,cn_hant')
    ? ' 華爾街日報 '
    : ' 华尔街日报 ';
  return <span>{text}</span>;
};

ChinesePickerText.propTypes = {
  region: PropTypes.string,
};

ChinesePickerText.defaultProps = {
  region: '',
};

const HeaderDate = ({ displayDate, showDate, dateFormat }) => {
  if (!showDate) return null;
  // The date stamp as a temp solution for frontpage app
  const localDate = displayDate ? new Date(displayDate) : new Date();

  return (
    <DateTime>
      <Timestamp timestamp={localDate} format={dateFormat} />
    </DateTime>
  );
};

HeaderDate.propTypes = {
  displayDate: PropTypes.string,
  showDate: PropTypes.bool,
  dateFormat: PropTypes.string,
};

HeaderDate.defaultProps = {
  displayDate: '',
  showDate: false,
  dateFormat: 'MMMM D, YYYY',
};

const HeaderLink = ({ showLink, linkConfig, isHighlight }) => {
  if (!showLink) return null;
  const { link, text = '' } = linkConfig || {};
  return (
    <StrapLink isHighlight={isHighlight} href={link}>
      {text}
    </StrapLink>
  );
};

HeaderLink.propTypes = {
  showLink: PropTypes.bool,
  isHighlight: PropTypes.bool,
  linkConfig: PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
  }),
};

HeaderLink.defaultProps = {
  showLink: false,
  isHighlight: false,
  linkConfig: null,
};

const DateTime = styled.div`
  & > p {
    margin: 0px;
  }
`;

const StrapLink = styled.a`
  &&& {
    color: ${({ isHighlight }) => isHighlight && 'var(--color-blue)'};
  }
`;

const StrapWrapper = styled.div`
  height: 14px;
  margin-bottom: 7px;
  line-height: 14px;
  font-size: 12px;
  font-weight: 300;
  text-rendering: optimizeLegibility;
  display: flex;

  & > :not(:last-child) {
    padding-right: 9px;
    border-right: 1px solid #ccc;
    margin-right: 10px;
  }
`;

function MastHeadStrap(props) {
  const {
    region,
    headerConfig,
    renderEditionPicker,
    displayDate,
    renderChinesePicker,
  } = props;

  const showChinesePicker = renderChinesePicker && region.includes('asia,cn');

  return (
    <StrapWrapper>
      <ChinesePickerText region={region} />
      {renderEditionPicker && renderEditionPicker()}
      {showChinesePicker && renderChinesePicker()}
      <HeaderDate
        displayDate={displayDate}
        showDate={!!headerConfig.showDate}
        dateFormat={headerConfig.dateFormat}
      />
      <HeaderLink
        showLink={!!headerConfig.showTodaysPaper}
        linkConfig={headerConfig.todaysPaper}
      />
      <HeaderLink
        showLink={!!headerConfig.showVideo}
        linkConfig={headerConfig.video}
      />
      <HeaderLink
        showLink={!!headerConfig.showPodcasts}
        linkConfig={headerConfig.podcasts}
      />
      <HeaderLink
        showLink={!!headerConfig.showLatestHeadlines}
        linkConfig={headerConfig.latestHeadlines}
        isHighlight
      />
    </StrapWrapper>
  );
}

MastHeadStrap.propTypes = {
  displayDate: PropTypes.string,
  headerConfig: PropTypes.shape({
    autocomplete: PropTypes.shape({
      error: PropTypes.string,
      loadMore: PropTypes.string,
      privateCompanies: PropTypes.string,
      recent: PropTypes.string,
      symbols: PropTypes.string,
      topics: PropTypes.string,
      viewAll: PropTypes.string,
    }),
    dateFormat: PropTypes.string,
    loginText: PropTypes.string,
    logoutText: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    searchText: PropTypes.string,
    showLatestHeadlines: PropTypes.bool,
    showTodaysPaper: PropTypes.bool,
    slimlinePlaceholder: PropTypes.string,
    showVideo: PropTypes.bool,
    showPodcasts: PropTypes.bool,
    showDate: PropTypes.bool,
    subscribeText: PropTypes.string,
    title: PropTypes.string,
    latestHeadlines: PropTypes.shape({
      link: PropTypes.string,
      text: PropTypes.string,
    }),
    todaysPaper: PropTypes.shape({
      link: PropTypes.string,
      text: PropTypes.string,
    }),
    video: PropTypes.shape({
      link: PropTypes.string,
      text: PropTypes.string,
    }),
    podcasts: PropTypes.shape({
      link: PropTypes.string,
      text: PropTypes.string,
    }),
  }).isRequired,
  region: PropTypes.string,
  renderEditionPicker: PropTypes.func,
  renderChinesePicker: PropTypes.func,
};

MastHeadStrap.defaultProps = {
  displayDate: '',
  region: 'na,us',
  renderEditionPicker: null,
  renderChinesePicker: null,
};

export default MastHeadStrap;
