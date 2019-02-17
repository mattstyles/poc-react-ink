
import React, { useState, useEffect } from 'react'
import { render, Box, Color, Static } from 'ink'
import { random } from 'lodash'
import uuid from 'uuid/v1'

const toPerc = num => num * 100 | 0

const newItem = () => ({
  id: uuid(),
  completion: random(0, 1, true),
  isSuccess: random(0, 1, true) > 0.5
})

const startListGrow = (list, setList) => {
  return () => {
    if (list.length > 4) {
      list = list.splice(list.length - 4, list.length - 1)
    }
    const timeout = setTimeout(() => {
      setList([
        ...list,
        newItem()
      ])
    }, 100)
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }
}

const Indicator = ({ flag }) => {
  return flag
    ? <Color green> Success!</Color>
    : <Color red> Failure!</Color>
}

const Item = ({ completion, isSuccess }) => (
  <Box>
    <Color yellow>{toPerc(completion)}</Color>
    <Indicator flag={isSuccess} />
  </Box>
)

const App = () => {
  const [list, setList] = useState([])
  useEffect(startListGrow(list, setList))

  return (
    <Box flexDirection='column'>
      <Static>
        {
          list.map(item => (
            <Item
              key={item.id}
              completion={item.completion}
              isSuccess={item.isSuccess}
            />
          ))
        }
      </Static>
      <Box paddingTop={1} flexDirection='column'>
        <Box>List length: {list.length}</Box>
        <Color yellow>Windowed list, static does render out history correctly.</Color>
      </Box>
    </Box>
  )
}

render(<App />)
