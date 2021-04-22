import React from 'react';
import PropTypes from 'prop-types';
import defaultPolicyLinks from './policyLinks.json';
import styled from 'styled-components';

const PolicyLinksWrapper = styled.div`
  font-family: var(--font-family-retina);

  a:link,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  a:focus {
    outline: #0080c3 solid 3px;
    outline-offset: 1px;
  }

  margin: 0 auto;
  width: 1280px;

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    margin: 0 auto;
    width: 980px;
  }
`;

const FootnoteLinks = styled.ul`
  margin: 5px 10px 0 10px;
  clear: both;
  box-sizing: border-box;
  height: 115px;
  font-size: 11px;
  text-align: center;
  padding: 0 0 50px 0;
`;

const PolicyItem = styled.li`
  line-height: 38px;
  display: inline-block;

  a {
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid #e9e9e9;
  }

  ${({ isLast }) =>
    isLast &&
    `
    a {
      border-right: none;
    }
  `}

  ${({ ccpaHighlight }) =>
    ccpaHighlight &&
    `
    color: var(--color-light-blue);
  `}
`;

const Copyright = styled.li`
  line-height: 12px;
  display: block;
`;

const PolicyDate = styled.span`
  padding-left: 2px;
  color: #fc5959;
`;

function PolicyLinks({
  policyLinks = defaultPolicyLinks,
  localizeTextContent,
  ccpaApplies,
}) {
  const copyrightYear = new Date().getFullYear();
  const localText = localizeTextContent ? (
    <Copyright>{localizeTextContent}</Copyright>
  ) : null;
  const policyBreakpoint = policyLinks.length - 1;

  return (
    <PolicyLinksWrapper>
      <FootnoteLinks aria-label="Legal">
        {policyLinks.map((link, i) => {
          const spanEle = link.lastupdated ? (
            <PolicyDate>{link.lastupdated}</PolicyDate>
          ) : null;
          const isLast = i === policyBreakpoint;
          const hideCcpaOnlyLink = link.ccpaOnly && !ccpaApplies;
          const ccpaHighlight = ccpaApplies && link.ccpaHighlighting;

          return !hideCcpaOnlyLink ? (
            <PolicyItem key={i} ccpaHighlight={ccpaHighlight} isLast={isLast}>
              <a href={link.url}>
                {link.label}
                {spanEle}
              </a>
            </PolicyItem>
          ) : null;
        })}
        {localText}
        <Copyright>
          Copyright &copy;{copyrightYear}{' '}
          <a href="https://www.dowjones.com">Dow Jones &amp; Company</a>, Inc.
          All Rights Reserved.
        </Copyright>
      </FootnoteLinks>
    </PolicyLinksWrapper>
  );
}

PolicyLinks.defaultProps = {
  ccpaApplies: false,
};

PolicyLinks.propTypes = {
  policyLinks: PropTypes.array,
  localizeTextContent: PropTypes.string,
  ccpaApplies: PropTypes.bool,
};

export default PolicyLinks;
