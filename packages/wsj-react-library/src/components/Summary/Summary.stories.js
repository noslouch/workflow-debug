import React from 'react';
import Summary from './index';

export default {
  title: 'Summary',
  component: Summary,
};

export const SummaryM = () => <Summary>Default Summary M</Summary>;

export const SummaryMBullet = () => <Summary bullet>Summary M Bullet</Summary>;

export const SummaryS = () => <Summary size="s">Summary S</Summary>;

export const SummarySBullet = () => (
  <Summary size="s" bullet>
    Summary S Bullet
  </Summary>
);
