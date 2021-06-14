/* eslint-disable react/no-danger */
import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Mustache from 'mustache';

export const hashToObject = (url) => {
  try {
    const Url = new URL(url);
    const keyValuePairs = Url.hash.substring(1).split('&');
    const result = {};
    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      if (key) result[key] = value || null;
    });
    return result;
  } catch (_) {
    return {};
  }
};

export const htmlFromData = (data, url) => {
  const template = data?.serverside?.template?.template;
  if (!template) return undefined;
  const hashData = hashToObject(url);
  const functionName = `insetData_${Math.floor(
    100000000 + Math.random() * 900000000
  )}`;
  const context = {
    ...data?.serverside?.data?.data,
    ...hashData,
    insetData: functionName,
  };

  let html = Mustache.render(template, context);

  if (context.includeData) {
    html = `<script>var ${functionName} = function() {return ${JSON.stringify(
      context
    )};};</script> ${html}`;
  }

  return html;
};

export const extractScripts = (html = '') => {
  const scripts = [];
  const newHtml = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    (match) => {
      scripts.push(match);
      return '';
    }
  );
  return [newHtml, scripts];
};

export const renderOnClient = (element, html) => {
  const fragment = document.createRange().createContextualFragment(html);
  if (element && element.current) element.current.appendChild(fragment);
};

const DynamicInset = ({ data, url }) => {
  const dynamicInsetRef = useRef(null);
  const renderedHtml = htmlFromData(data, url);
  const [insetHtml, scripts] = extractScripts(renderedHtml);
  useEffect(() => {
    // Scripts extracted from initial rendered html need to be manually added to the DOM for them to be evaluated
    if (scripts.length) {
      scripts.forEach((script) => {
        renderOnClient(dynamicInsetRef, script);
      });
    }
    // If data is not set, but url is, fetch and render manually
    if (!data && url) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const clientInsetHtml = htmlFromData(json, url);
          if (clientInsetHtml) renderOnClient(dynamicInsetRef, clientInsetHtml);
        })
        .catch((error) => console.error(error));
    }
  }, [data, scripts, url]);
  if (!data && !url) return null;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: insetHtml }}
      ref={dynamicInsetRef}
    />
  );
};

DynamicInset.propTypes = {
  data: PropTypes.shape({}),
  url: PropTypes.string,
};

DynamicInset.defaultProps = {
  data: undefined,
  url: undefined,
};

export default memo(DynamicInset);
