
import React, { useState, useEffect } from 'react'
import { render, Box, Color } from 'ink'

const startCounting = (count, setCount) => {
  return () => {
    const timeout = setTimeout(() => {
      setCount(count + 1)
    }, 100)
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }
}

const App = () => {
  const [count, setCount] = useState(0)
  useEffect(startCounting(count, setCount), [count])

  return (
    <Box>
      <Color yellow>{count}</Color>
      <Color green> tests passed</Color>
    </Box>
  )
}

render(<App />)
