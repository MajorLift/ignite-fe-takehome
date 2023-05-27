# Sr. Front-end Engineer - Take Home Task

### Objective

Create a file tree component that allows the user to browse a directory structure and interact with files and folders.

### Requirements

- [ ] The component should display a directory tree structure that the user can navigate.
- [ ] The user should be able to open and close directories by clicking on them
- [ ] The component should display files and folders differently.
- [ ] The user should be able to select a file or folder, the selected item should be highlighted.
- [ ] The component should provide a way to expand/collapse all directories.
- Bonus:
  - [ ] Implement a feature to allow users to create a new file or folder within the file tree.
  - [ ] Implement drag-and-drop functionality that allows the user to move files and folders within the directory tree structure.

### Evaluation Criteria

- [ ] The file tree should function as expected, with accurate representation of the provided data mockup.
- [ ] Use of React best practices and hooks, including state management and event handling, while also demonstrating proficiency with TypeScript.
- [ ] The file tree should be visually appealing, easy to use, and provide clear feedback to the user.
- [ ] Code should be well-organized, modular, and easy to understand.

### Deliverables

- [ ] A fully-functional, styled file tree component.
- [ ] A README file explaining the design decisions made and any potential improvements that could be made to the component.
- [ ] A code repository containing the component code, with instructions on how to build and run the component locally.

Good luck!

### Data Mockup

```
const data = {
  name: 'project',
  kind: 'directory',
  children: [
    {
      name: 'src',
      kind: 'directory',
      children: [
        {
          name: 'index.js',
          kind: 'file',
          size: '1KB',
          modified: '2022-03-08 11:30:00'
        },
        {
          name: 'components',
          kind: 'directory',
          children: [
            {
              name: 'Button.jsx',
              kind: 'file',
              size: '2KB',
              modified: '2022-03-07 15:00:00'
            },
            {
              name: 'Card.jsx',
              kind: 'file',
              size: '3KB',
              modified: '2022-03-06 10:00:00'
            }
          ]
        },
        {
          name: 'styles',
          kind: 'directory',
          children: [
            {
              name: 'index.css',
              kind: 'file',
              size: '1KB',
              modified: '2022-03-07 09:00:00'
            },
            {
              name: 'components.css',
              kind: 'file',
              size: '2KB',
              modified: '2022-03-06 12:00:00'
            }
          ]
        }
      ]
    },
    {
      name: 'public',
      kind: 'directory',
      children: [
        {
          name: 'index.html',
          kind: 'file',
          size: '1KB',
          modified: '2022-03-08 10:00:00'
        },
        {
          name: 'favicon.ico',
          kind: 'file',
          size: '5KB',
          modified: '2022-03-07 16:00:00'
        }
      ]
    },
    {
      name: 'package.json',
      kind: 'file',
      size: '1KB',
      modified: '2022-03-08 12:00:00'
    },
    {
      name: 'README.md',
      kind: 'file',
      size: '2KB',
      modified: '2022-03-08 13:00:00'
    }
  ]
};

```
