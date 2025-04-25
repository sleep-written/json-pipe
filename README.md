# json-pipe

`json-pipe` is a simple CLI for reading JSON from stdin, extracting nested keys, and printing the result to stdout. It supports robust error handling for empty pipes or unexpected TTY usage.

## Features

- Read JSON input from `stdin`.
- Extract one or more nested properties via `-k|--keys` flags.
- Clear error messages and distinct exit codes:
  - **666**: TTY input is not allowed (no pipe provided).
  - **999**: Pipe provided but no data received (empty input).
  - **111**: Other runtime or parsing errors.

## Installation

Install globally with npm:

```bash
npm install -g json-pipe
```

Or add to your project as a dependency:

```bash
npm install --save json-pipe
```

## CLI Usage

### Basic JSON parsing

Read JSON from a file or other command and pretty-print the entire object:

```bash
cat data.json | json-pipe
```

**Output:**
```text
Parsed JSON:
------------------------------------------------
{ "foo": { "bar": 123 }, "baz": true }
```


### Extract nested keys

Use `-k` or `--keys` followed by one or more property names to drill into the object:

```bash
echo '{"foo":{"bar":123}}' | json-pipe -k foo bar
```

**Output:**
```text
Parsed JSON value for json["foo"]["bar"]:
------------------------------------------------
123
```


### Help on missing pipe

If you run `json-pipe` without piping data, it will exit with code **666** and display a helpful message:

```bash
$ json-pipe
ERROR:
------------------------------------------------
TTY mode isn't allowed for this application
```

## Exit Codes

| Code | Condition                                    |
| ---- | -------------------------------------------- |
| 0    | Successful parsing and output                |
| 666  | No pipe provided (TTY input not allowed)     |
| 999  | Pipe provided but received no data           |
| 111  | JSON parsing error or other runtime failure  |
