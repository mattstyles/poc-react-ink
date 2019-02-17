
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
      <Box marginTop={1} flexDirection='column'>
        <Box>
          <Color green>{list.filter(i => i.isSuccess).length} </Color>
          successful
        </Box>
        <Box>
          <Color red>{list.filter(i => i.isSuccess !== true).length} </Color>
          failures
        </Box>
        <Color yellow>List, grows forever.</Color>
      </Box>
    </Box>
  )
}

render(<App />)
