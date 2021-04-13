import styled from 'styled-components';

const Timestamp = styled.time`
  color: var(--color-nickel);
  font-family: var(--font-family-retina);
  font-size: var(--typography-timestamp-font-size-m);
  font-weight: var(--font-weight-light);
  line-height: 22px;
`;

const isValidDate = (timestamp) => {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date.valueOf());
};

const ArticleTimestamp = ({ published, updated }) => {
  if (!isValidDate(published)) return null;
  const shouldShowUpdated = updated && isValidDate(updated) && updated > published;
  const timestamp = shouldShowUpdated ? updated : published;
  const formatOptions = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  // Replace is used to remove the comma after the year, which is not possible using Intl.DateTimeFormat by itself
  const displayDate = new Intl.DateTimeFormat('en-US', formatOptions)
    .format(new Date(timestamp))
    .replace(/,(?!.*,)/, '');
  return <Timestamp dateTime={timestamp}>{`${shouldShowUpdated ? 'Updated ' : ''} ${displayDate} ET`}</Timestamp>;
};

export default ArticleTimestamp;
