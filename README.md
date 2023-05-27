# Ignite Frontend Takehome Submission

## Scripts

In the project directory, you can run:

### `npm install`

Installs dependencies.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Writeup

### Design Decisions

- Strong typing with discriminated unions, template literals, utility types.
  - TypeScript strict mode enabled.
- Polymorphic `NodeCollapsible` component for consolidated rendering of both files and folders.
- Normalized state tree.
  - Performant batch operations (no accumulation of recursive stacks for expand-all/collapse-all)
  - Supports multiple top-level nodes.
  - B+ tree-like structure: pointers to children, parent.
- Global state management with redux.
  - Dispatches actions across multiple nested subtrees and nodes.
  - Handles complex state updates involving multiple subtrees/nodes.
- Monorepo project structure
  - Simple code sharing (types, constants, modules, stores/slices) between cross-platform frontend clients (mobile, electron) and backend services.
- `webpack` build system tweaks for DX optimization
  - Transpilation: `swc`
    - ~60x speed improvement over `babel`, `tsc`. Better performance than `esbuild`
    - Supports HMR with `react-refresh`
  - Minification: `esbuild`
    - 10x+ performance compared to `terser`, `swc`

### Features

- BONUS: Create, edit, delete nodes
  - Creates new nodes under current working directory (either current selected directory, parent of current selected file, or root if no node is seleted).
  - Automatically expands parent node if collapsed.
  - Collapse-all resets cwd to root.
  - Edit mode:
    - Updates file/folder names based on user input.
    - Automatically updates modified time for file nodes.
    - Cancel button: Reverts to previous name for existing nodes. Deletes unsaved new nodes.
    - Selecting different node automatically exits edit mode.
- BONUS: Drag and drop
  - Provides preview of move result.
  - Automatically expands directories `onDragOver`.
  - Smoother experience: listens for `onMouseDown` instead of `onClick`.
  - Correctly handles edge cases (e.g. invalid attempt to move ancestor into descendant node).

### Design

- Lightweight/Minimalist
  - Simple color scheme
  - Icons instead of text
  - No component library or frontend framework used
- Interactive visual feedback
  - Hover actions
  - Stateful icons
  - Highlight selected node

## TODOs

- Persistence
  - Connect with backend and database to store and retrieve changes to tree.
  - Optionally supplement with frontend caching in `LocalStorage`.
    - Redux tree slice is serializable.
- Interactivity
  - Tooltips on hover for buttons/icons.
  - Right click context menu.
  - Select multiple nodes -> copy, move, delete.
  - Highlight destination directory for drag-and-drop.
- Accessibility
  - `aria-selected`, `aria-expanded`, `role` (`group`, `treeitem`)
  - Use component library with built-in accessibilty support.
  - Add keyboard navigation support.
- Display properties (size, modified)
  - Sort, filter visible nodes by properties.
  - Multiple display modes.
