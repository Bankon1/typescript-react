import React, { ReactElement, ReactNode, useState } from "react";
import "./App.css";

// CONVENTIONAL PROPS
function Heading({ title }: { title?: string }) {
  return <h1>{title}</h1>;
}

// PROPS WITH CHILDREN
function HeadingWithContent({
  children,
}: {
  children: ReactNode;
}): ReactElement | null {
  return <h1>{children}</h1>;
}

// DEFAULT PROPS
const defaultContainerProps = {
  heading: <strong>My Strong Default Heading</strong>,
};
type ContainerProps = {
  children: ReactNode;
} & typeof defaultContainerProps;

function Container({ heading, children }: ContainerProps): ReactElement | null {
  return (
    <>
      <h1>{heading}</h1>
      <h2>{children}</h2>
    </>
  );
}
Container.defaultProps = defaultContainerProps;

//Functional Props
// State is in the compoent
// You can can pass in funtions as children or as Props
// They can be optional with optional chainging and ? in the function parameters
function TextWithNumber({
  header,
  children,
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, setState] = useState(1);
  return (
    <div>
      {header && <div>{header?.(state)}</div>}
      <div>{children(state)}</div>
      <div>
        <button onClick={() => setState(state + 1)}>Count up</button>
      </div>
    </div>
  );
}

// Generics
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <Heading title="Your title Mr. Max"></Heading>
      {/* Will not work if the component does not accept Children that are ReactNode */}
      <HeadingWithContent>
        <strong>HI</strong>
      </HeadingWithContent>
      <Container>FOOOOOOO</Container>
      <TextWithNumber
        header={(num: number) => {
          return <div>Today's number is {num} in the header</div>;
        }}
      >
        {(num: number) => {
          return <div>Today's number is {num}</div>;
        }}
      </TextWithNumber>
      <List
        items={["Max", "Lukas", "George"]}
        render={(item) => <div>{item.toLocaleLowerCase()}</div>}
      />
    </div>
  );
}

export default App;
