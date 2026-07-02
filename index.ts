import type { TuiPlugin, TuiPluginModule } from "@opencode-ai/plugin/tui";

/** OpenCode command registered by this plugin for Ctrl+Enter force-submit. */
const FORCE_SUBMIT_COMMAND = "oc-ctrl-enter.force-submit";

/** Key sequences commonly emitted for Ctrl+Enter across OpenCode/OpenTUI environments. */
const CTRL_ENTER_BINDINGS = [
  { cmd: FORCE_SUBMIT_COMMAND, key: "ctrl+return" },
  { cmd: FORCE_SUBMIT_COMMAND, key: "ctrl+enter" },
] as const;

/**
 * Registers a high-priority Ctrl+Enter binding that interrupts the active
 * OpenCode session before submitting the current prompt.
 */
export const tui = ((api) => {
  const dispose = api.keymap.registerLayer({
    bindings: CTRL_ENTER_BINDINGS,
    commands: [
      {
        category: "Prompt",
        hidden: true,
        name: FORCE_SUBMIT_COMMAND,
        run: (context) => {
          // Run through OpenCode's native commands so the prompt lifecycle stays intact.
          api.keymap.dispatchCommand("session.interrupt", context);
          api.keymap.dispatchCommand("prompt.submit", context);
        },
        title: "Force submit prompt",
      },
    ],
    name: "oc-ctrl-enter",
    priority: 1000,
  });

  api.lifecycle.onDispose(dispose);
  return Promise.resolve();
}) satisfies TuiPlugin;

/** OpenCode plugin module entrypoint. */
export default { tui } satisfies TuiPluginModule;
