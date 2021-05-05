import { useState, useEffect, useRef } from 'react';

const useCloseViaKeyboard = (isExpandedExternal, toggleFn) => {
  const menuRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function closeNavItemViaKeyboard(e) {
    /* accessibility feature - enables the menu to be closed via keyboard
     *  by checking for the ref; if the user tabs outside of the menu,
     *  if a toggle function is provided it will be invoked otherwise the expanded state
     *  will set to false, hiding the menu, and the event listener will be removed.
     */
    const toggle = toggleFn || (() => setIsExpanded(false));

    if (menuRef?.current?.contains(e.target)) return;

    toggle();
    removeNavItemListener();
  }

  const removeNavItemListener = () => {
    document.removeEventListener('focusin', closeNavItemViaKeyboard);
  };

  useEffect(() => {
    if (isExpandedExternal || isExpanded) {
      document.addEventListener('focusin', closeNavItemViaKeyboard);
    } else {
      removeNavItemListener();
    }
    return () => {
      removeNavItemListener();
    };
  }, [isExpandedExternal, isExpanded]);

  return { menuRef, isExpanded, setIsExpanded };
};

export default useCloseViaKeyboard;
