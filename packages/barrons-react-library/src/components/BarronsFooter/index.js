import PropTypes from 'prop-types';

import FooterWrapper from './components/FooterWrapper';
import BarContainer from './components/BarContainer';
import Logo from './components/Logo';
import FloatingBar from './components/FloatingBar';
import Footer from './components/Footer';
import LegalBar from './components/LegalBar';
import PoliciesBar from './components/PoliciesBar';

import social from './data/social.json';
import policyLinks from './data/policyLinks.json';

export default function BarronsFooter(props) {
  const {
    breakpoint = '',
    ccpaApplies = false,
    GdprConsentLink = null,
    enableSourcepoint = false,
  } = props;

  return (
    <FooterWrapper breakpoint={breakpoint}>
      <FloatingBar content={social.barrons} />
      <Footer breakpoint={breakpoint}>
        <BarContainer>
          <PoliciesBar
            links={policyLinks.barrons}
            ccpaApplies={ccpaApplies}
            GdprConsentLink={GdprConsentLink}
            enableSourcepoint={enableSourcepoint}
            breakpoint={breakpoint}
          />
          <LegalBar />
        </BarContainer>
        <Logo breakpoint={breakpoint} />
      </Footer>
    </FooterWrapper>
  );
}

BarronsFooter.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  ccpaApplies: PropTypes.bool,
  GdprConsentLink: PropTypes.node,
  enableSourcepoint: PropTypes.bool,
};

BarronsFooter.defaultProps = {
  breakpoint: 'lg',
  ccpaApplies: false,
  GdprConsentLink: null,
  enableSourcepoint: false,
};
