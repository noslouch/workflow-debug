import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchCategory = styled.li`
  margin: 0 0 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c3c3c3;
  color: var(--color-moon);
  line-height: 12px;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
`;

const ViewAll = styled.li`
  border: 1px solid var(--color-black);
  border-radius: calc(var(--border-radius-s) * 1px);
`;

const ViewAllLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0;
  height: 45px;
  background-color: transparent;
  padding: 0;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  line-height: 45px;
  text-align: center;
  &&& {
    color: var(--color-jet);
  }
`;

const QuoteLink = styled.a`
  display: flex;
  margin-bottom: 4px;
  height: 40px;
  background-color: #eaeaea;
  padding: 8px;

  &:hover {
    background-color: #c2c2c2;
  }

  & > div {
    vertical-align: text-top;
    color: var(--color-coal);
  }
`;

const TickerWrapper = styled.div`
  margin: 0 10px 0 0;
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`;

const SymbolTextWrapper = styled.div`
  margin: 0 19px 0 0;
  width: 205px;
`;

const AutocompleteResults = styled.div`
  display: flex;
  overflow: visible;
  position: absolute;
  top: 200px;
  left: 50%;
  width: 900px;
  margin-left: -438px;
  font-family: var(--font-font-stack-retina);
  font-size: 10px;

  & a:active,
  a:link,
  a:visited {
    color: var(--color-nickel);
    text-decoration: none;
  }
`;

const SuggestionsList = styled.ul`
  margin-bottom: 20px;
  padding-right: 15px;
  padding-left: 0px;
  list-style: none;
  ${({ isQuotes }) =>
    isQuotes &&
    `
      width: 50%;
      align-self: flex-start;
    `}

  & li {
    font-size: 1.2em;
    line-height: 1.4em;
    text-align: left;
  }

  & li:not(${SearchCategory}):hover a {
    background-color: #c2c2c2;
    color: inherit;
  }

  & li a {
    font-size: 1.2em;
    line-height: 1.4em;
    ${({ isQuotes }) => !isQuotes && 'display: block;'}
  }

  & li a:not(${QuoteLink}) {
    padding: 3px 0;
  }
`;

const SecondaryResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const QuoteResult = styled.li`
  &:hover {
    background: transparent;
  }
`;

const BoldSearchText = styled.a`
  & mark {
    background: none;
    color: var(--color-coal);
    font-weight: bold;
  }
`;

const CompanyMarketWrapper = styled.div`
  width: 95px;
  font-weight: var(--font-weight-medium);
`;

const BoldSearch = ({ text, searchInput, tagName, ...otherProps }) => {
  const lowerCaseSearchInput = searchInput.toLowerCase();
  const lowerCaseText = text.toLowerCase();
  const index = lowerCaseText.indexOf(lowerCaseSearchInput);
  let firstSubString;
  let matchSubString;
  let lastSubString;

  // For suggestions that are recommended based on company ticker matches and for which
  // the company name does not match with the search input, no part of name will be bolded
  if (index === -1) {
    firstSubString = text;
  } else {
    firstSubString = text.substring(0, index);
    matchSubString = text.substring(index, index + searchInput.length);
    lastSubString = text.substring(index + searchInput.length);
  }

  return (
    <BoldSearchText as={tagName} {...otherProps}>
      {firstSubString}
      <mark>{matchSubString}</mark>
      {lastSubString}
    </BoldSearchText>
  );
};
BoldSearch.propTypes = {
  text: PropTypes.string,
  searchInput: PropTypes.string,
  tagName: PropTypes.string,
};
BoldSearch.defaultProps = {
  text: '',
  searchInput: '',
  tagName: 'a',
};

const QuoteSuggestions = ({
  title,
  searchInput,
  viewAllText,
  symbolsContent,
}) => {
  return (
    !!symbolsContent.length && (
      <SuggestionsList isQuotes role="listbox">
        <SearchCategory role="menuitem">{title}</SearchCategory>
        {symbolsContent.map((symbol) => (
          <QuoteResult key={symbol.ticker} role="menuitem">
            <QuoteLink href={symbol.href}>
              <TickerWrapper>{symbol.ticker}</TickerWrapper>
              <SymbolTextWrapper>
                <BoldSearch
                  text={symbol.text}
                  searchInput={searchInput}
                  tagName="div"
                />
              </SymbolTextWrapper>
              <CompanyMarketWrapper>
                {symbol.countryMarket}
              </CompanyMarketWrapper>
            </QuoteLink>
          </QuoteResult>
        ))}
        <ViewAll>
          <ViewAllLink href="/market-data/quotes/company-list?mod=searchresults_viewallcompanies">
            {viewAllText}
          </ViewAllLink>
        </ViewAll>
      </SuggestionsList>
    )
  );
};
QuoteSuggestions.propTypes = {
  title: PropTypes.string,
  viewAllText: PropTypes.string,
  searchInput: PropTypes.string,
  symbolsContent: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string,
      href: PropTypes.string,
      text: PropTypes.string,
      countryMarket: PropTypes.string,
    })
  ),
};
QuoteSuggestions.defaultProps = {
  title: '',
  viewAllText: '',
  searchInput: '',
  symbolsContent: [],
};

const CommonSuggestions = ({ title, searchInput, content }) => {
  return (
    !!content.length && (
      <SuggestionsList role="listbox">
        <SearchCategory role="menuitem">{title}</SearchCategory>
        {content.map(({ text, href }) => (
          <li key={text} role="menuitem">
            <BoldSearch text={text} searchInput={searchInput} href={href} />
          </li>
        ))}
      </SuggestionsList>
    )
  );
};
CommonSuggestions.propTypes = {
  title: PropTypes.string,
  searchInput: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};
CommonSuggestions.defaultProps = {
  title: '',
  searchInput: '',
  content: [],
};

const SearchSuggestions = ({
  autocompleteConfig,
  searchInput,
  searchResultData,
}) => {
  function getResultData(category) {
    const { searchResults = [] } = searchResultData || {};
    return searchResults?.find(({ key }) => key === category)?.content;
  }

  return (
    <AutocompleteResults>
      <QuoteSuggestions
        title={autocompleteConfig.symbols}
        searchInput={searchInput}
        viewAllText={autocompleteConfig.viewAll}
        symbolsContent={getResultData('symbols')}
      />
      <SecondaryResults>
        <CommonSuggestions
          title={autocompleteConfig.privateCompanies}
          searchInput={searchInput}
          content={getResultData('privateCompanies')}
        />
        <CommonSuggestions
          title={autocompleteConfig.topics}
          searchInput={searchInput}
          content={getResultData('topics')}
        />
        <CommonSuggestions
          title={autocompleteConfig.recent}
          searchInput={searchInput}
          content={getResultData('recent')}
        />
      </SecondaryResults>
    </AutocompleteResults>
  );
};

SearchSuggestions.propTypes = {
  autocompleteConfig: PropTypes.shape({
    error: PropTypes.string,
    loadMore: PropTypes.string,
    privateCompanies: PropTypes.string,
    recent: PropTypes.string,
    symbols: PropTypes.string,
    topics: PropTypes.string,
    viewAll: PropTypes.string,
  }),
  searchInput: PropTypes.string,
  searchResultData: PropTypes.shape({
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        content: PropTypes.arrayOf(
          PropTypes.shape({
            ticker: PropTypes.string,
            href: PropTypes.string,
            text: PropTypes.string,
            countryMarket: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

SearchSuggestions.defaultProps = {
  autocompleteConfig: {},
  searchInput: '',
  searchResultData: {},
};

export default SearchSuggestions;
