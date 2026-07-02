# oc-ctrl-enter-force-import

OpenCode TUI plugin that force-submits the current prompt with `Ctrl+Enter`.

It interrupts the active OpenCode run first, then submits the prompt so the message does not sit behind the current generation queue.

## Install

Clone the plugin somewhere stable:

```powershell
git clone https://github.com/mynameistito/oc-ctrl-enter-force-import.git
```

Add the plugin file path to your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["/path/to/oc-ctrl-enter-force-import/index.ts"]
}
```

Restart OpenCode after changing plugin config.

OpenCode's default `input_newline` binding includes `ctrl+return`, which can make Ctrl+Enter insert a newline before this plugin sees it. Remove `ctrl+return` from `input_newline` in your `tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "keybinds": {
    "input_newline": "shift+return,alt+return,ctrl+j"
  }
}
```

If this package is published to npm later, the config can use the package name directly:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["oc-ctrl-enter-force-import"]
}
```

## Behavior

The plugin registers high-priority TUI keybindings for `ctrl+return` and `ctrl+enter`, both mapped to a custom command that:

1. Dispatches OpenCode's built-in `session.interrupt` command.
2. Dispatches OpenCode's built-in `prompt.submit` command.

It does not change your `tui.json`, so any existing `input_submit` or `input_newline` preferences stay intact.

Because OpenCode's managed textarea keybinds run on the focused prompt, `ctrl+return` must not also be bound to `input_newline`.

## Windows Terminal

Many terminals send plain `Enter` for `Ctrl+Enter` unless configured. In Windows Terminal, add this action to the root-level `actions` array:

```json
{
  "command": {
    "action": "sendInput",
    "input": "\u001b[13;5u"
  },
  "id": "User.sendInput.CtrlEnterCustom"
}
```

Then add this keybinding to the root-level `keybindings` array:

```json
{
  "keys": "ctrl+enter",
  "id": "User.sendInput.CtrlEnterCustom"
}
```

Open a new Windows Terminal tab after saving the settings.

## Credits

Built on OpenCode's plugin and TUI keymap APIs:

- [OpenCode](https://opencode.ai/)
- [OpenCode plugins documentation](https://opencode.ai/docs/plugins/)
- [OpenCode keybinds documentation](https://opencode.ai/docs/keybinds/)
- [OpenTUI keymap](https://github.com/anomalyco/opentui)
