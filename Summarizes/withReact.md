# TypeScript + React Official.

- 2018/11/23
- `create-react-app my-app --scripts-version=react-scripts-ts`
- ref : https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter

## Creating a component

```ts
import * as React from 'react'

export interface IProps {
  name: string
  enthusiasmLevel?: number
}

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!')
}

function Hello({ name, enthusiasmLevel = 1 }: IProps) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D')
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  )
}

// when our component instances have some state or need to handle lifecycle hooks.
// React.Component<IProps, object>
// : passing the args which has a type of IProps and object to React.Component !!
// Here, Props is the type of our class's this.props, and object is the type of this.state.
class HelloClass extends React.Component<IProps, object> {
  public render() {
    const { name, enthusiasmLevel = 1 } = this.props

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D')
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    )
  }
}

export default Hello
```

```ts
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Hello from './components/Hello'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  /*
    The reason for casting we need to do so in this case is that getElementById's return type is HTMLElement | null. Put simply, getElementById returns null when it can't find an element with a given id. We're assuming that getElementById will actually succeed, so we need to convince TypeScript of that using the as syntax.

    TypeScript also has a trailing "bang" syntax (!), which removes null and undefined from the prior expression. So we could have written document.getElementById('root')!, but in this case we wanted to be a bit more explicit.
  */
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
```

## Stateful components

```ts
import * as React from 'react'

export interface IProps {
  name: string
  enthusiasmLevel?: number
}

export interface IState {
  currentEnthusiasm: number
}

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!')
}

class Hello extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentEnthusiasm: props.enthusiasmLevel || 1
    }
  }

  public onIncrement = () =>
    this.updateEnthusiasm(this.state.currentEnthusiasm + 1)
  public onDecrement = () =>
    this.updateEnthusiasm(this.state.currentEnthusiasm - 1)

  public updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm })
  }

  public render() {
    const { name } = this.props

    if (this.state.currentEnthusiasm <= 0) {
      throw new Error('You could be a little more enthusiastic. :D')
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
      </div>
    )
  }
}

export default Hello
```

Notice:

1. Much like with `Props`, we had to define a new type for our state: `State`.
2. To update state in React, we use `this.setState` - **we don't set it directly except in the constructor.** `setState` only takes the properties we're interested in updating and our component will re-render as appropriate.
3. We're using class property initializers with arrow functions (e.g. onIncrement = () => ...).

- **Declaring these as arrow functions avoids issues with orphaned uses of this.**
- **Setting them as instance properties creates them only once** - a common mistake is to initialize them in the `render` method which allocates closures one every call to `render`.

## Writing tests with Jest

- When we write something like <Hello name="Daniel" enthusiasmLevel={3} />, the component should render to something like <div>Hello Daniel!!!</div>.
- If enthusiasmLevel isn't specified, the component should default to showing one exclamation mark.
- If enthusiasmLevel is 0 or negative, it should throw an error.

We can use these requirements to write a few tests for our components.

But first, let's install Enzyme. Enzyme is a common tool in the React ecosystem that makes it easier to write tests for how components will behave.

```
npm install -D enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 react-test-renderer
```
