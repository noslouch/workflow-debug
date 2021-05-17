import styled from 'styled-components';

const Pagebreak = styled.hr`
  background-color: var(--color-silver);
  border: 0;
  clear: both;
  height: 1px;
  margin: 32px 0;

  ${(props) =>
    props.$data?.properties?.responsive?.layout === 'smallrule' &&
    `
    margin-left: 90px;
    margin-right: 90px;

    @media (min-width: 640px) {
      margin-left: 160px;
      margin-right: 160px;
    }
  `}
`;

export default Pagebreak;
