# Command stats

This program gives stats regarding a command output such as number of lines or throughput.
There is two different modes depending on the kind of command the user wants to execute, in the case of a command that streams data like ```bash tail -f``` or a regular command that sends back data and then stops.

## Streaming mode

Like explained above, the streaming mode has to be used for streaming commands. Here is an example of the usage:
```bash
tail -f temp | ./script.sh --streaming --bytes --time
```

The option ```bash --streaming``` needs to be specified, the other options will be explained below.

To test this mode, one can use the command above and append text to the temp file (included in this project) **in a separate terminal** with the following command:
```bash
base64 /dev/urandom | head -c 1000 | awk '{print $1}' >> temp
```

## Regular mode

When the command is a regular command with a finite output such as ```bash cat```, no need to specify an option to get this mode, it will be used by default.

The following command can be executed as a test:
```bash
cat temp | ./script.sh --bytes --time
```


## Options

There are a few options depending on what kind of information the user is interested in. Those options can be combined.

### Lines

To see how many lines the command outputted, use the option ```bash --lines```:
```bash
cat temp | ./script.sh --lines
```

### Bytes

To see how many bytes the command outputted, use the option ```bash --bytes```:
```bash
cat temp | ./script.sh --bytes
```

### Time

To see how much time the command took, use the option ```bash --time```:
```bash
cat temp | ./script.sh --time
```

### Throughput

To see the throughput of the command, use the option ```bash --throughput```:
```bash
cat temp | ./script.sh --throughput
```

### Altogether

```bash
cat temp | ./script.sh --lines --bytes --time --throughput
```