import React, { Fragment } from 'react';
// TODO: Figure out a way to dynamically import all these
// Native
import Paragraph from './components/Paragraph';
import Link from './components/Link';
import { OrderedList, UnorderedList } from './components/List';
import ListItem from './components/ListItem';
import { Strong, Italic } from './components/Emphasis';
import Subhed from './components/Subhed';
import Tagline from './components/Tagline';
import Image from './components/Image';
// Insets
import Pagebreak from './insets/Pagebreak';
import RichText from './insets/RichText';

/**
 * Generates hash from object to use as React key
 * @param {object} object
 * @param {number|string} index
 * @returns {string}
 */
export const hashFromObject = (object, index = '') => {
  const string = encodeURIComponent(index + JSON.stringify(object));
  return typeof window === 'undefined' ? Buffer.from(string).toString('base64') : btoa(string);
};

/**
 * @typedef CapiBlock Capi block json
 * @property {CapiBlock[]} [content]
 * @property {('BOLD'|'ITALIC')} [emphasis]
 * @property {boolean} [has_drop_cap]
 * @property {('subhed')} [hed_type]
 * @property {string} [inset_type]
 * @property {('EXTERNAL'|'INTRADOC')} [link_type]
 * @property {boolean} [ordered]
 * @property {{uri: string}[]} [targets]
 * @property {string} [text]
 * @property {string} [type]
 * @property {string} [uri]
 */

/**
 * @typedef {object} Options Rendering options
 * @property {boolean} [isAmp] Indicates whether rendering for Amp
 * @property {function(CapiBlock, number): React.ReactNode} [renderBlock] - Render prop function to render custom blocks
 */

/**
 * Renders React component tree from capi data
 * @param {CapiBlock[]} array Capi Array
 * @param {Options} [options] Rendering options
 * @returns {React.ReactNode} React Node
 */
const renderer = (array = [], options = {}) =>
  array.map((block, index) => {
    const { isAmp, renderBlock } = options;
    // Allows for overrides
    const renderedComponent = typeof renderBlock === 'function' ? renderBlock(block, index) : undefined;
    // If renderBlock renders something or returns null to skip rendering a specific type, return this instead
    if (renderedComponent || renderedComponent === null) return renderedComponent;

    // Default rendering
    const {
      content,
      emphasis,
      has_drop_cap: hasDropCap,
      hed_type: hedType,
      inset_type: insetType,
      link_type: linkType,
      ordered,
      targets: [{ uri: targetUri }] = [{}],
      text,
      type,
      uri,
    } = block || {};
    const contents = (content && renderer(content, options)) || text;
    // TODO: Investigate better/simpler way to generate hashes from objects. Unsure of performance of this method
    const key = hashFromObject(block, index);
    // Native
    if (type === 'paragraph')
      return (
        <Paragraph key={key} hasDropCap={hasDropCap}>
          {contents}
        </Paragraph>
      );
    // TODO: Intradoc links
    if (type === 'link')
      return (
        <Link key={key} href={uri} target="_blank" rel="noopener noreferer">
          {contents}
        </Link>
      );
    if (type === 'list')
      return ordered ? (
        <OrderedList key={key}>{contents}</OrderedList>
      ) : (
        <UnorderedList key={key}>{contents}</UnorderedList>
      );
    if (type === 'listitem') return <ListItem key={key}>{contents}</ListItem>;
    if (type === 'emphasis' && emphasis === 'BOLD') return <Strong key={key}>{contents}</Strong>;
    if (type === 'emphasis' && emphasis === 'ITALIC') return <Italic key={key}>{contents}</Italic>;
    if (type === 'hed' && hedType === 'subhed')
      return (
        <Subhed key={key} id={targetUri}>
          {contents}
        </Subhed>
      );
    if (type === 'tagline') return <Tagline key={key}>{contents}</Tagline>;
    if (type === 'image') return <Image key={key} data={block} isAmp={isAmp} />;
    // TODO: Phrase component with correct implementation
    if (type === 'phrase')
      return (
        <Link key={key} href="#">
          {contents}
        </Link>
      );
    if (type === 'Break') return <br key={key} />;
    // Insets
    if (type === 'inset' && insetType === 'pagebreak') return <Pagebreak key={key} $data={block} />;
    if (type === 'inset' && insetType === 'richtext') return <RichText key={key} data={block} />;
    // Plain text
    if (!type && text) return <Fragment key={key}>{text}</Fragment>;
    // If no available type fallback to null
    return null;
  });

export default renderer;
