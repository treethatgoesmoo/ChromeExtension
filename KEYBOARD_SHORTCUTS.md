# Keyboard Shortcuts Guide

Universal Media Controller supports two types of keyboard shortcuts:

## Global Shortcuts (Work Anywhere in Chrome)

These shortcuts work even when the extension popup is closed. They control all tabs with active media.

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Play/Pause | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Next Track | `Ctrl+Shift+N` | `Cmd+Shift+N` |
| Previous Track | `Ctrl+Shift+B` | `Cmd+Shift+B` |
| Volume Up | `Ctrl+Shift+Up` | `Cmd+Shift+Up` |
| Volume Down | `Ctrl+Shift+Down` | `Cmd+Shift+Down` |
| Mute/Unmute | `Ctrl+Shift+M` | `Cmd+Shift+M` |
| Seek Forward 10s | `Ctrl+Shift+Right` | `Cmd+Shift+Right` |
| Seek Backward 10s | `Ctrl+Shift+Left` | `Cmd+Shift+Left` |

### Customizing Global Shortcuts

You can customize these keyboard shortcuts:

1. Open Chrome and go to `chrome://extensions/shortcuts`
2. Find "Universal Media Controller" in the list
3. Click the edit icon (pencil) next to any command
4. Press your desired key combination
5. Click OK to save

**Note:** Some key combinations may conflict with Chrome or OS shortcuts. Choose combinations that don't interfere with your workflow.

## Popup Shortcuts (Only When Popup is Open)

These shortcuts work when you have the extension popup open:

| Action | Key |
|--------|-----|
| Play/Pause | `Space` or `K` |
| Next Track | `N` |
| Previous Track | `P` |
| Volume Up | `↑` (Up Arrow) |
| Volume Down | `↓` (Down Arrow) |
| Mute/Unmute | `M` |
| Seek Forward 10s | `→` (Right Arrow) |
| Seek Backward 10s | `←` (Left Arrow) |

## Tips

- **Global shortcuts** are ideal for controlling media without leaving your current tab
- **Popup shortcuts** are simpler and use common media player keys
- You can use both types of shortcuts depending on your preference
- If a shortcut doesn't work, check for conflicts in `chrome://extensions/shortcuts`

## Troubleshooting

### Shortcut Not Working

1. **Check for conflicts**: Go to `chrome://extensions/shortcuts` and verify no other extension is using the same shortcut
2. **Chrome limitations**: Some shortcuts like `Ctrl+N`, `Ctrl+T`, etc. are reserved by Chrome and cannot be overridden
3. **Focus issues**: Make sure Chrome has focus (is the active window)
4. **Media detection**: Ensure media is actually playing in at least one tab

### Shortcut Conflicts

If a shortcut conflicts with another Chrome extension or system shortcut:

1. Go to `chrome://extensions/shortcuts`
2. Find the conflicting extension
3. Change or remove the conflicting shortcut
4. Or customize the Universal Media Controller shortcut to use a different key combination

## Best Practices

- **Choose memorable combinations**: Use patterns that make sense (e.g., arrows for seeking)
- **Avoid OS shortcuts**: Don't use combinations reserved by your operating system
- **Test thoroughly**: After customizing, test all shortcuts to ensure they work
- **Document your changes**: If you customize extensively, keep a note of your preferred shortcuts

---

**Quick Reference Card**

Print or save this quick reference:

```
Universal Media Controller - Default Global Shortcuts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Play/Pause         Ctrl+Shift+P  (Cmd+Shift+P on Mac)
Next Track         Ctrl+Shift+N  (Cmd+Shift+N on Mac)
Previous Track     Ctrl+Shift+B  (Cmd+Shift+B on Mac)
Volume Up          Ctrl+Shift+↑  (Cmd+Shift+↑ on Mac)
Volume Down        Ctrl+Shift+↓  (Cmd+Shift+↓ on Mac)
Mute              Ctrl+Shift+M  (Cmd+Shift+M on Mac)
Seek Forward      Ctrl+Shift+→  (Cmd+Shift+→ on Mac)
Seek Backward     Ctrl+Shift+←  (Cmd+Shift+← on Mac)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Customize at: chrome://extensions/shortcuts
```
