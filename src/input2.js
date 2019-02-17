
import React, { useState, useEffect } from 'react'
import { render, Box, Color, StdinContext, StdoutContext } from 'ink'

const createInputHandler = ({ onChange, onSubmit, value }) => {
  return (data) => {
    var k = String(data)

    if (k === '\r') {
      onSubmit(value)
      return
    }

    onChange(value + String(data))
  }
}

const RawInput = ({ stdin, setRawMode, stdout, onChange, onSubmit, value }) => {
  const onInput = createInputHandler({ onChange, onSubmit, value })
  useEffect(() => {
    setRawMode(true)
    stdin.on('data', onInput)
    // cliCursor.show(stdout) // does not work as cursor is placed elsewhere within ink

    return () => {
      stdin.removeListener('data', onInput)
      setRawMode(false)
      // cliCursor.hide(stdout)
    }
  })

  return (
    <Color>{value}</Color>
  )
}

const Input = (props) => (
  <StdinContext.Consumer>
    {
      ({ stdin, setRawMode }) => (
        <StdoutContext.Consumer>{
          ({ stdout }) => (
            <RawInput {...props}
              stdin={stdin}
              setRawMode={setRawMode}
              stdout={stdout}
            />
          )
        }</StdoutContext.Consumer>
      )
    }
  </StdinContext.Consumer>
)

const onTextInput = setText => value => setText(value)

const App = () => {
  const [text, setText] = useState('')

  return (
    <Box flexDirection='column'>
      <Box>
        <Color yellow>{'> '}</Color>
        <Input
          value={text}
          onChange={onTextInput(setText)}
          onSubmit={() => process.exit(0)}
        />
      </Box>
      <Box>
        <Color magenta>ink-text-input</Color> swallows enter keys. This one does not.
      </Box>
    </Box>
  )
}

render(<App />)
