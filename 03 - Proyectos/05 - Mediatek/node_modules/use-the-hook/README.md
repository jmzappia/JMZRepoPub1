# use-the-hook
A simple set of react hooks which performs some operation that you have used in class Components.

# Usage Instructions

just add npm i --save use-the-hook, also 

[Have a look on my NPM Package](https://www.npmjs.com/package/use-the-hook)

# useComponentDidMount

Just a simple hook which activates as a wrapper or just a thing of abstracting the use of useEffect with an empty deps, which is something annoying to see :).
use it as simple as that below,

# Example

```
const [apiData, setApiData] = useState(null)
useComponentDidMount(() => {
  fetch('API_ENDPOINT').then(response => {
    setApiData(response)
  })
})
```

```
useComponentDidMount(() => {
  window.addEventListener('ANY_EVENTS', () => {})
})
```
# oh! Wait, 
Now How you are you going to remove the listener or unsubscribe any events that you have susbscribed on mounting side effect! Are you going to use that crazy useEffect again 
nah!.

# useComponentUnmount

Simple hook to unsubscribe the events that you have attached to your page as a side effect!

# Example

```
useComponentUnmount(() => { 
  window.removeEventListener('ANY_EVENTS',() => {}} 
  //any kind of unsubscription
})
```

# usePreviousProp

Another hook which can be useful to get the value of previous rendered prop value, at first render or at initially the value will be undefined.
lets have a look on a simple example

# Example
```
import React, { useState } from 'react'
import { usePreviousProp } from 'use-the-hook'

const Child = ({ count }) => {
  const previousPropValue = usePreviousProp(count)
  
  return (
    <div>
      <p> Previous Prop Value : {previousPropValue} </p> // on the first render this value will be undefined and the consecutive rerenders the value will 1 and above.
      <p> Current Prop Value: {count}</p> // this placeholder count holds the exact prop value count that has been sent by the parent component each time.
    </div>
  )
}


const Parent = () => {
  const [count, setCount] = useState(1)
  
  return (
    <div>
      <p>Previous Prop Example</p>
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>Click to increase</button>
    </div>
   )
}
```
