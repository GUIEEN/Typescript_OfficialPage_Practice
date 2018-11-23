import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import App from './App'
import Hello from './components/Hello'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  // <App />,
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  /*
    The reason for casting we need to do so in this case is that getElementById's return type is HTMLElement | null. Put simply, getElementById returns null when it can't find an element with a given id. We're assuming that getElementById will actually succeed, so we need to convince TypeScript of that using the as syntax.

    TypeScript also has a trailing "bang" syntax (!), which removes null and undefined from the prior expression. So we could have written document.getElementById('root')!, but in this case we wanted to be a bit more explicit.
  */
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
