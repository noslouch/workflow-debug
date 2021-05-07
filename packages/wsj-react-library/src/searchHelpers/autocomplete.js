import wretch from 'wretch';

export const SEARCH_URL_PREFIX = {
  default: '/search/term.html',
  WSJProCB: '/search/pro/centralbanking',
  WSJProFR: '/search/pro/financialregulation',
};

const DOMAIN_MAP = {
  domain: 'https://www.wsj.com/',
  service: 'https://services.dowjones.com',
  quote: 'https://www.wsj.com/market-data/quotes/',
  topic: 'https://www.wsj.com/news/author/',
};

function determineCountryMarket(countryCode, exchangeCountry) {
  const multiExchangeCountries = 'CA,CN,DE,US,IN,XE,JP,KR';

  if (multiExchangeCountries.includes(countryCode.trim())) {
    return exchangeCountry;
  }
  if (exchangeCountry.includes(':')) {
    return exchangeCountry.substring(0, exchangeCountry.indexOf(':'));
  }
  return exchangeCountry;
}

export class Autocomplete {
  constructor(domainMap) {
    this.domainMap = domainMap || DOMAIN_MAP;

    this.dataStatus = {
      hasResults: 0,
      hasSymbolResults: false,
      hasKeywordResults: false,
      hasTopicResults: false,
      hasPrivateCompanies: false,
      hasSuggestedTerms: false,
      status: 0,
      foundTickers: false,
      submitURL: '',
      keyword: '',
    };

    this.apiResultsData = {
      suggestedTerms: '',
      symbols: '',
      privateCompanies: '',
      topics: '',
      keywords: '',
      searchTerm: '',
    };

    this.baseResultsObject = {
      searchResults: [
        {
          key: 'suggestedTerms',
          content: [],
        },
        {
          key: 'symbols',
          text: 'Companies & Quotes',
          content: [],
        },
        {
          key: 'privateCompanies',
          text: 'Private Companies',
          content: [],
        },
        {
          key: 'topics',
          text: 'Authors',
          content: [],
        },
        {
          key: 'recent',
          text: 'Recent Searches',
          content: [],
        },
      ],
    };
  }

  storeResults(keyword, data) {
    const localData = JSON.parse(data);
    this.hasResultsCheck(localData);
    if (this.dataStatus.status) {
      this.apiResultsData.searchTerm = localData.originalQuery;
      this.apiResultsData.suggestedTerms = localData.suggestedTerms;
      this.apiResultsData.symbols = localData.symbols;
      this.apiResultsData.privateCompanies = localData.privateCompanies;
      this.apiResultsData.topics = localData.topics;
      this.apiResultsData.keywords = localData.keywords;
      this.dataStatus.status = 2;
      this.dataStatus.keyword = keyword;
    }
  }

  getSearchResults(searchText, cb) {
    const self = this;
    this.fetchResults(searchText, (dataStatusCode, keyword) => {
      if (dataStatusCode === 2 && searchText === keyword) {
        self.hasResultsCheck(self.apiResultsData);
        cb(null, self.dataStatus.status);
      } else {
        cb('No Results Found');
      }
    });
  }

  hasResultsCheck(apiResults) {
    if (
      apiResults.suggestedTerms === null &&
      apiResults.symbols === null &&
      apiResults.privateCompanies === null &&
      apiResults.topics === null &&
      apiResults.keywords === null
    ) {
      this.dataStatus.status = 0;
    } else {
      this.dataStatus.status = 1;
      this.dataStatus.hasKeywordResults = apiResults.keywords !== null;
      this.dataStatus.hasPrivateCompanies =
        apiResults.privateCompanies !== null;
      this.dataStatus.hasSuggestedTerms = apiResults.suggestedTerms !== null;
      this.dataStatus.hasSymbolResults = apiResults.symbols !== null;
      this.dataStatus.hasTopicResults = apiResults.topics !== null;
    }
  }

  displayOnHeader(searchText, cb) {
    const self = this;

    this.getSearchResults(searchText, (err, status) => {
      if (err && status !== 2) {
        return cb(null);
      }
      const results = self.formatAllResults();
      return cb(results);
    });
  }

  formatAllResults() {
    const self = this;
    const resultsObject = self.baseResultsObject.searchResults;
    const symbolDomain = self.domainMap.quote;
    let newContentSuggestedTerm = [];
    const newContentSymbols = [];
    const newContentTopic = [];
    const newContentCompanies = [];
    const newContentRecent = [];

    if (this.dataStatus.hasSuggestedTerms) {
      newContentSuggestedTerm = self.apiResultsData.suggestedTerms;
    }

    if (this.dataStatus.hasSymbolResults) {
      self.apiResultsData.symbols.forEach((value) => {
        const localValue = { ...value };
        const parsedTicker = localValue.ticker
          .substring(
            localValue.ticker.indexOf(':') + 1,
            localValue.ticker.length
          )
          .replace(/\./g, '');

        let prefix;

        switch (localValue.type) {
          case 'Currency':
            prefix = 'fx/';
            break;

          case 'CryptoCurrency':
            prefix = 'fx/';
            break;

          case 'Future':
            prefix = 'futures/';
            break;

          case 'Index':
            prefix = 'index/';
            break;

          case 'Bond':
            prefix = 'bond/';
            break;

          case 'Fund': {
            let fundType = '';
            let mutualfund = [];
            if (parsedTicker.length === 5) {
              mutualfund = parsedTicker.match(/[a-z][a-z][a-z][a-xyz]x/gi);
            }
            if (
              mutualfund !== null &&
              typeof mutualfund !== 'undefined' &&
              mutualfund.length === 1
            ) {
              fundType = 'mutualfund/';
            } else {
              fundType = 'etf/';
            }
            prefix = fundType;
            break;
          }

          default:
            prefix = '';
            break;
        }

        // generate link for symbol
        if (localValue.country === 'US') {
          localValue.url = `${symbolDomain}${prefix}${parsedTicker}`;
        } else if (localValue.type === 'Bond') {
          localValue.url = `${symbolDomain}${prefix}${localValue.country}/${parsedTicker}`;
        } else if (localValue.type === 'CryptoCurrency') {
          localValue.url = `${symbolDomain}${prefix}${parsedTicker}`;
        } else {
          localValue.url = `${symbolDomain}${prefix}${localValue.country}/${localValue.exchangeIsoCode}/${parsedTicker}`;
        }

        const nonExchangeTypes = ['Index', 'Currency', 'Future', 'Bond'];

        localValue.exchange =
          nonExchangeTypes.indexOf(localValue.type) !== -1
            ? localValue.type
            : determineCountryMarket(localValue.country, localValue.exchange);

        // ticker  - company - country + market
        const formattedSymbol = {
          href: `${localValue.url}?mod=searchresults_companyquotes`,
          ticker: localValue.ticker,
          text: localValue.company,
          countryMarket: localValue.exchange,
        };

        newContentSymbols.push(formattedSymbol);
      });
    }

    if (this.dataStatus.hasTopicResults) {
      self.apiResultsData.topics.forEach((value) => {
        const formattedTopic = {};
        const url = `${self.domainMap.topic}${value.code}?mod=searchresults_authors`;
        const topicName = value.name;

        formattedTopic.href = url;
        formattedTopic.text = topicName;
        newContentTopic.push(formattedTopic);
      });
    }

    if (this.dataStatus.hasPrivateCompanies) {
      self.apiResultsData.privateCompanies.forEach((value) => {
        const formattedPrivateCompany = {};

        const urlPrefix =
          SEARCH_URL_PREFIX[self.product] || SEARCH_URL_PREFIX.default;
        const modCode = '&mod=searchresults_privatecompanies';
        const url = `${urlPrefix}?keyword=${value.name}${modCode}`;

        formattedPrivateCompany.href = url;
        formattedPrivateCompany.text = value.name;
        newContentCompanies.push(formattedPrivateCompany);
      });
    }

    if (this.dataStatus.hasKeywordResults) {
      self.apiResultsData.keywords.forEach((value) => {
        const formattedKeyword = {};
        const cleanKeyword = decodeURIComponent(value.keyword);

        const urlPrefix =
          SEARCH_URL_PREFIX[self.product] || SEARCH_URL_PREFIX.default;
        const url = `${urlPrefix}?keyword=${cleanKeyword}&mod=`;

        formattedKeyword.text = cleanKeyword;
        formattedKeyword.href = url;
        newContentRecent.push(formattedKeyword);
      });
    }

    const contentMap = {
      suggestedTerms: newContentSuggestedTerm,
      symbols: newContentSymbols,
      topics: newContentTopic,
      privateCompanies: newContentCompanies,
      recent: newContentRecent,
    };

    self.baseResultsObject.searchResults = resultsObject.map((object) => ({
      ...object,
      content: contentMap[object.key],
    }));
    return self.baseResultsObject;
  }

  // eslint-disable-next-line consistent-return
  async fetchResults(searchText, cb) {
    if (!searchText || searchText.trim() === '') {
      return cb(null, { companies: [], industries: [], regions: [] });
    }

    const self = this;
    const queryPrefix = '/autocomplete/data?q=';
    const additionalParams =
      '&it=fund,exchangetradedfund,stock,Index,Currency,Benchmark,Future,Bond,CryptoCurrency&count=5&';
    const needConfig =
      searchText.length > 3
        ? 'need=symbol,private-company,person,suggested-search-term,topic,omniture-keyword'
        : 'need=symbol,private-company';

    const excludeParams =
      '&excludeexs=XBAH,XCNQ,XTNX,XCYS,XCAI,XSTU,XBER,XHAN,XTAE,XAMM,XKAZ,XKUW,XCAS,XMUS,XKAR,DSMD,XMIC,RTSX,XSAU,XBRA,XCOL,XADS,XDFM,XCAR,XMSTAR,XOSE';

    const url = `${self.domainMap.service}${queryPrefix}${encodeURIComponent(
      searchText
    )}${additionalParams}${needConfig}${excludeParams}`;

    try {
      const text = await wretch(url).accept('application/json').get().text();

      self.storeResults(searchText, text);
      return cb(self.dataStatus.status, self.dataStatus.keyword);
    } catch (err) {
      console.error(err);
    }
  }
}
