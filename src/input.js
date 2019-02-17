
import React, { useState } from 'react'
import { render, Box, Color } from 'ink'
import TextInput from 'ink-text-input'

const onTextInput = (setText) => {
  return (value) => {
    if (value === '\r') {
      setText('wooooh')
      return
    }
    setText(value)
  }
}

const App = () => {
  const [text, setText] = useState('')

  return (
    <Box flexDirection='column'>
      <Box>
        <Color yellow>{'> '}</Color>
        <TextInput
          value={text}
          showCursor
          onChange={onTextInput(setText)}
          onSubmit={() => process.exit(0)}
        />
      </Box>
      <Box>
        No idea how to respond to an enter key as <Color magenta>ink-text-input</Color> swallows it. ctrl-c to exit.
      </Box>
    </Box>
  )
}

render(<App />)
