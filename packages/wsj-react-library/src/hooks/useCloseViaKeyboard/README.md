# useCloseViaKeyboard Hook

Is a React helper to handle closing or collapsing of elements when they lose focus while tabbing its inner elements. It can be used with external props or with internal state and every time that the `isExpanded` is set to `true` it will attach a `focusin` event to the document that will make the `menuRef` closes or collapse when focusing out from it or its inner elements.

### Examples

Using it with external props

```javascript
...
const { isExpanded, toggleExpandedfn } = props;
const { menuRef } = useCloseViaKeyboard(isExpanded, toggleExpandedfn);
return <Container ref="menuRef">...</Container>
...
```

Using it with internal state

```javascript
...
const { menuRef, isExpanded, setIsExpanded } = useCloseViaKeyboard();
return <Container ref="menuRef">...</Container>
...
```
