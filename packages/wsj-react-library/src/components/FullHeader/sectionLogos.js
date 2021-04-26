import styled from 'styled-components';

import wsjLogoDesktop from '../../assets/branding/sections-logo-desktop.svg';
// For SEO purposes SVG logos will be placed as background images for proper text-to-image replacement
import newsArchiveLogo from '../../assets/branding/wsj-news-archive.svg';
import printEditionLogo from '../../assets/branding/wsj-print-edition.svg';
import guidesLogo from '../../assets/branding/wsj-guides.svg';
import lifeArtsLogo from '../../assets/branding/wsj-life-arts.svg';
import techLogo from '../../assets/branding/wsj-tech.svg';
import marketsLogo from '../../assets/branding/wsj-markets.svg';
import politicsLogo from '../../assets/branding/wsj-politics.svg';
import realEstateLogo from '../../assets/branding/wsj-real-estate.svg';
import usLogo from '../../assets/branding/wsj-us.svg';
import magazineLogo from '../../assets/branding/wsj-magazine.svg';
import artsLogo from '../../assets/branding/wsj-arts.svg';
import lifeLogo from '../../assets/branding/wsj-life.svg';
import worldLogo from '../../assets/branding/wsj-world.svg';
import economyLogo from '../../assets/branding/wsj-economy.svg';
import businessLogo from '../../assets/branding/wsj-business.svg';
import opinionLogo from '../../assets/branding/wsj-opinion.svg';

const SectionLogo = styled.a`
  height: ${({ isSlim }) => (isSlim ? '37px' : '55px')};
  margin-left: 12px;
  display: flex;
  align-items: stretch;
  background-color: var(--color-white);
  width: 100%;
  background-image: url('${wsjLogoDesktop}');
  background-size: ${({ isSlim }) => (isSlim ? 'auto 27px' : 'auto 45px')};
  background-repeat: no-repeat;
  background-position: 0px 7px;
  text-indent: -9999px;
  cursor: pointer;

  & h1 {
    font-size: 0;
    width: 1px;
    height: 1px;
    margin: 0;
    padding: 0;
    display: inline-block;
  }
`;

const NewsArchiveLogo = styled(SectionLogo)`
  width: 300px;
  background-image: url('${newsArchiveLogo}');
`;

const PrintedEditionLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 170 : 275)}px;
  background-image: url('${printEditionLogo}');
`;

const GuidesLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 80 : 149)}px;
  background-image: url('${guidesLogo}');
`;

const LifeArtsLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 134 : 218)}px;
  background-image: url('${lifeArtsLogo}');
`;

const TechLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 60 : 98)}px;
  background-image: url('${techLogo}');
`;

const MarketsLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 108 : 178)}px;
  background-image: url('${marketsLogo}');
`;

const PoliticsLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 100 : 165)}px;
  background-image: url('${politicsLogo}');
`;

const RealEstateLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 142 : 236)}px;
  background-image: url('${realEstateLogo}');
`;

const UsLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 35 : 58)}px;
  background-image: url('${usLogo}');
`;

const MagazineLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 114 : 188)}px;
  background-image: url('${magazineLogo}');
`;

const ArtsLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 58 : 96)}px;
  background-image: url('${artsLogo}');
`;

const LifeLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 52 : 88)}px;
  background-image: url('${lifeLogo}');
`;

const WorldLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 82 : 134)}px;
  background-image: url('${worldLogo}');
`;

const EconomyLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 106 : 175)}px;
  background-image: url('${economyLogo}');
`;

const BusinessLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 105 : 174)}px;
  background-image: url('${businessLogo}');
`;

const OpinionLogo = styled(SectionLogo)`
  width: ${({ isSlim }) => (isSlim ? 90 : 150)}px;
  background-image: url('${opinionLogo}');
`;

export default {
  newsarchive: NewsArchiveLogo,
  todayspaper: PrintedEditionLogo,
  guides: GuidesLogo,
  lifearts: LifeArtsLogo,
  tech: TechLogo,
  markets: MarketsLogo,
  politics: PoliticsLogo,
  realestate: RealEstateLogo,
  us: UsLogo,
  magazine: MagazineLogo,
  arts: ArtsLogo,
  life: LifeLogo,
  world: WorldLogo,
  economy: EconomyLogo,
  business: BusinessLogo,
  opinion: OpinionLogo,
};
