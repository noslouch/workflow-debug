import styled from 'styled-components';
import MediaLayout from '../components/MediaLayout';
import renderer, { hashFromObject } from '../renderer';

const Container = styled.div`
  color: #666;
  border-bottom: 1px solid #dadada;
  margin-bottom: 22px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: var(--font-weight-light);
  font-family: var(--font-family-retina);
  margin-bottom: 17px;
  word-wrap: break-word;
`;

const Subhed = styled.h4`
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  color: var(--color-jet);
  font-family: var(--font-family-retina);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  line-height: 18px;
  margin: 0 0 12px 0;
  padding: 12px 0 12px 4px;
  text-transform: uppercase;
`;

const List = styled.ul`
  margin: 0 0 32px 0;
  padding: 0;
  list-style-position: inside;
`;

const ListItem = styled.li`
  margin-bottom: 12px;
  line-height: 27px;
  font-size: 16px;
  font-family: var(--font-family-exchange);
  font-weight: var(--font-weight-regular);
`;

const renderBlock = (block, index) => {
  const { content, type, hed_type: hedType, text } = block || {};
  const contents = (content && renderer(content, { renderBlock })) || text;
  // TODO: Investigate better/simpler way to generate hashes from objects. Unsure of performance of this method
  const key = hashFromObject(block, index);
  if (type === 'paragraph') return <Paragraph key={key}>{contents}</Paragraph>;
  if (type === 'hed' && hedType === 'small-hed') return <Subhed key={key}>{contents}</Subhed>;
  if (type === 'list') return <List key={key}>{contents}</List>;
  if (type === 'listitem') return <ListItem key={key}>{contents}</ListItem>;
};

const RichText = ({ data }) => {
  const { content, properties: { responsive: { layout } = {} } = {} } = data || {};
  const contents = renderer(content, { renderBlock });
  return (
    <MediaLayout layout={layout}>
      <Container>{contents}</Container>
    </MediaLayout>
  );
};

export default RichText;
