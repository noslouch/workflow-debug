import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useCloseViaKeyboard from '../../hooks/useCloseViaKeyboard';

const Item = styled.li`
  height: 34px;
  display: inline-block;
  list-style-type: none;
  color: var(--color-nickel);
  font-family: var(--font-family-retina);
  text-transform: capitalize;
  font-weight: var(--font-weight-regular);
  font-size: 14px;
  padding: 1px;
  &:focus {
    font-weight: var(--font-weight-bold);
    color: var(--color-jet);
  }

  &:hover {
    font-weight: var(--font-weight-bold);
  }
`;

const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--color-silver);
  padding: 20px;
  position: absolute;
  left: 0;
  top: 34px;
  background-color: #f9f9f9;
  text-align: left;
  ${({ isExpanded }) =>
    isExpanded ? 'visibility: visible;' : 'visibility: hidden;'};
  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    width: 1280px;
  }
`;

const StyledColumns = styled.div`
  display: flex;
  width: 750px;
  position: relative;
  justify-content: left;
  overflow: hidden;
`;

const Column = styled.div`
  flex-basis: 220px;
  padding-left: 20px;
  margin-right: 7.5px;
  text-align: left;

  &:not(:first-child) {
    border-left: 1px solid var(--color-silver);
  }

  & strong {
    padding: 0 5px;
    font-size: 13px;
    display: block;
    color: var(--color-coal);
  }

  & strong:not(:first-child) {
    margin-top: 35px;
  }
`;

const SubSection = styled.div`
  padding: 5px;
  font-size: 12px;
  line-height: 19px;
  font-weight: var(--font-weight-regular);
  color: var(--color-jet);
`;

const SectionLink = styled.a`
  color: var(--color-nickel);
  display: inline-block;
  text-decoration: none;
  &:hover {
    color: var(--color-jet);
    font-weight: var(--font-weight-bold);
  }

  ${({ isActive }) =>
    isActive &&
    `
      color: var(--color-jet);
      font-weight: var(--font-weight-bold);
    `}
`;

const NavWrapper = styled.div`
  display: block;
  padding: 3px 8.8px 0;
  height: 34px;
  border-bottom: none;

  ${({ isExpanded }) =>
    isExpanded &&
    `
      padding: 3px 7px;
      border: 1px solid var(--color-silver);
      padding-top: 2px;
      background-color: #f9f9f9;
    `}

  &:hover {
    color: var(--color-jet);
    cursor: pointer;
  }
`;

const SubSections = ({ subsections }) => {
  const existingSections = {};

  return subsections.map(({ label, url, category }) => {
    const subKey = `subsection-${category}-${label}`;
    const Subsection = (
      <SubSection>
        <SectionLink href={url} role="menuitem">
          {label}
        </SectionLink>
      </SubSection>
    );

    if (!existingSections[category]) {
      existingSections[category] = true;

      return (
        <React.Fragment key={subKey}>
          <strong>{category}</strong>
          {Subsection}
        </React.Fragment>
      );
    }

    return <React.Fragment key={subKey}>{Subsection}</React.Fragment>;
  });
};

SubSections.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      index: PropTypes.number,
      category: PropTypes.string,
      url: PropTypes.string,
      desktopUrl: PropTypes.string,
      mobileURL: PropTypes.string,
    })
  ),
};

SubSections.defaultProps = {
  SubSections: [],
};

const Columns = ({ columns }) => {
  return (
    <StyledColumns>
      {columns.map((subsections, idx) => {
        const columnKey = `col-${idx}`;
        return (
          <Column key={`column-${columnKey}`}>
            <SubSections subsections={subsections} />
          </Column>
        );
      })}
    </StyledColumns>
  );
};

Columns.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        index: PropTypes.number,
        category: PropTypes.string,
        url: PropTypes.string,
        desktopUrl: PropTypes.string,
        mobileURL: PropTypes.string,
      })
    )
  ),
};

Columns.defaultProps = {
  columns: [],
};

const categoriesToColumns = (categories, navLabel) => {
  const maxColumns = 3;
  const perColumn = Math.ceil(categories.length / maxColumns);
  let columnCount = 1;
  let columnItemCount = 0;

  return categories.reduce(
    (columns, category) => {
      const firstBusinessColumn = navLabel === 'Business' && columnCount === 1;

      columnItemCount += 1;
      if (
        columnItemCount > perColumn ||
        (firstBusinessColumn && columnItemCount === 3)
      ) {
        columns.push([]);
        columnCount += 1;
        columnItemCount = 1;
      }

      category.subsections.forEach((subsection) => {
        columns[columnCount - 1].push(subsection);
      });

      return columns;
    },
    [[]]
  );
};

const isAriaCurrentPage = (section, id, isActive) => {
  const lifeArtSectionNames = ['Life & Arts', 'Life', 'Arts'];
  const realEstateSectionName = 'Real Estate';

  if (isActive) return true;
  if (id === 'lifearts' && lifeArtSectionNames.includes(section)) return true;
  if (id === 'realestate' && section === realEstateSectionName) return true;

  return false;
};

function NavItem({ categories = [], children: label, url, id, section }) {
  const { menuRef: navRef, isExpanded, setIsExpanded } = useCloseViaKeyboard();

  const columns = categoriesToColumns(categories, label);
  const isActive = section.toLowerCase() === id;
  const canExpand = isExpanded && categories.length > 0;

  const onMouseEnterHandler = () => {
    document.activeElement.blur();
    setIsExpanded(true);
  };

  const onBlurHandler = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsExpanded(false);
  };

  const onKeyDownHandler = (e) => {
    const { keyCode } = e;

    const keyCodes = {
      Down: 40,
      Enter: 13,
      Esc: 27,
      Tab: 9,
      Up: 38,
      Space: 32,
    };
    const navKeys = [
      keyCodes.Down,
      keyCodes.Enter,
      keyCodes.Space,
      keyCodes.Esc,
      keyCodes.Up,
    ];
    if (navKeys.indexOf(keyCode) !== -1) {
      e.preventDefault();
      switch (keyCode) {
        case keyCodes.Down:
        case keyCodes.Enter:
        case keyCodes.Space:
          setIsExpanded(true);
          break;
        case keyCodes.Up:
        case keyCodes.Esc:
          setIsExpanded(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Item
      ref={navRef}
      role="none"
      onBlur={onBlurHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={() => setIsExpanded(false)}
      onKeyDown={onKeyDownHandler}
    >
      <SectionLink
        isActive={isActive}
        href={url}
        role="menuitem"
        aria-haspopup={categories && categories.length > 0}
        aria-expanded={isExpanded}
        aria-current={
          isAriaCurrentPage(section, id, isActive) ||
          (section === 'US Home Page' && id === 'home')
            ? 'page'
            : 'false'
        }
      >
        <NavWrapper isExpanded={canExpand}>
          <span>{label}</span>
        </NavWrapper>
      </SectionLink>
      {categories.length > 0 && (
        <ColumnWrapper
          isExpanded={isExpanded}
          onKeyDown={(e) =>
            e && e.keyCode === 13 ? null : onKeyDownHandler(e)
          }
        >
          <Columns columns={columns} />
        </ColumnWrapper>
      )}
    </Item>
  );
}

NavItem.propTypes = {
  url: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      subsections: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string,
          url: PropTypes.string,
          label: PropTypes.string,
        })
      ),
    })
  ),
  children: PropTypes.string,
  id: PropTypes.string,
  section: PropTypes.string,
};

NavItem.defaultProps = {
  children: '',
  section: '',
  url: '',
  categories: [],
  id: '',
};

export default NavItem;
