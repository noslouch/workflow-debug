import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function PoliciesBar({
  links = [],
  ccpaApplies = false,
  enableSourcepoint = false,
  breakpoint = '',
  GdprConsentLink = null,
}) {
  return (
    <Wrapper breakpoint={breakpoint}>
      {links
        .filter((link) => {
          if (link.ccpaApplies) {
            return ccpaApplies;
          }
          return link.label;
        })
        .map((link) => {
          if (GdprConsentLink && link.gdprApplies) {
            return (
              <GdprConsentLink
                key={link.label}
                product="barrons"
                enableSourcepoint={enableSourcepoint}
                render={(linkElem) => <ManageCookies>{linkElem}</ManageCookies>}
              />
            );
          }

          return (
            <Policy key={link.label}>
              <a href={link.href}>
                <PolicyLabel bold={link.bold}>{link.label}</PolicyLabel>
              </a>
            </Policy>
          );
        })}
    </Wrapper>
  );
}

PoliciesBar.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
      gdprApplies: PropTypes.bool,
      ccpaApplies: PropTypes.bool,
    })
  ),
  ccpaApplies: PropTypes.bool,
  GdprConsentLink: PropTypes.node,
  enableSourcepoint: PropTypes.bool,
};

PoliciesBar.defaultProps = {
  breakpoint: 'lg',
  links: [],
  ccpaApplies: false,
  GdprConsentLink: null,
  enableSourcepoint: false,
};

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;

  ${(props) => {
    switch (props.breakpoint) {
      case 'xs':
        return css`
          margin: 23px 0 0 12px;
        `;
      case 'sm':
        return css`
          margin: 19px 0 0 12px;
        `;
      case 'md':
        return css`
          margin: 17px 0 0 12px;
        `;
      case 'lg':
        return css`
          margin: 53px 0 0 12px;

          @media screen and (min-width: 1700px) {
            margin: 12px 0 0 12px;
          }
        `;
      default:
        return css``;
    }
  }}
`;

const Policy = styled.div`
  cursor: pointer;
  display: inline-flex;
  position: relative;

  &::after {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 5px;
    content: '|';
    height: 2px;
    color: #fff;
    display: inline-flex;
  }

  &:last-child::after {
    content: '';
  }

  & a,
  & a:link,
  & a:visited,
  & a:active {
    display: inline-flex;
    font-family: Aileron, helvetica, sans-serif;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #fff;
    padding-top: 5px;
    text-decoration: none;
  }
`;

const PolicyLabel = styled.span`
  font-weight: ${(props) => (props.bold ? 'bold' : '100')};
`;

const ManageCookies = styled(Policy)`
  & > a,
  & > a:link,
  & > a:visited,
  & > a:active {
    font-weight: bold;
  }
`;
