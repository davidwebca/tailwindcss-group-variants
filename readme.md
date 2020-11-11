# Tailwind Group Variants

## This plugin is based on the internal code from Tailwind CSS to create group variants (namely group-hover, group-focus) and allows you to create your own

### Add this to your config


```js
module.exports = {
  // Add this to the root of your config file or in your "extend" portion.
  groupVariants: {
    'group-first': ['group', 'first', ':first-child'],
    'group-first': ['group', 'first', ':first-child']
  }
}
```
