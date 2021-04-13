import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  color: white;
  background: midnightblue;
  border: 1px solid black;
  padding: 7px 15px;
`;

export default function Example(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{props.title}</h1>
      <pre>the count is: {count}</pre>
      <Button onClick={() => setCount(count + 1)}>increase the count!</Button>
    </div>
  );
}
