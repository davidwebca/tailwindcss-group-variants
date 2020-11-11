# Tailwind Group Variants

This plugin is based on the internal code from Tailwind CSS to create group variants (namely group-hover, group-focus) and allows you to create your own

## Install the plugin

```npm install tailwindcss-group-variants```

or

```yarn add tailwindcss-group-variants```

## Add the plugin to your config file

```js
module.exports = {
  plugins: [
    require('tailwindcss-group-variants'),
  ]
}
```

## Add this to your config


```js
module.exports = {
  // Add this to the root of your config file or in your "extend" portion.
  groupVariants: {
    'group-first': ['group', 'first', ':first-child'],
    'group-last': ['group', 'last', ':last-child'],
    // 'variant-name': ['grouping-selector', 'name-suffix', 'grouping-suffix']
  },
  plugins: [
    require('tailwindcss-group-variants'),
  ]
}
```

This will generate the following CSS:

```css
.group:first-child .group-first\:m-0{
  margin: 0;
}
.group:last-child .group-last\:m-0{
  margin: 0;
}
```

By providing the third parameter and allow customizing the pseudo selector, it also allows you to create "active" classes groupings. For example, if you have overlays that receive the ".active" class or accordions that receive the ".open" class with JavaScript to make them visible.

```js
module.exports = {
  variants: {
    margin: ['responsive', 'overlay-active', 'accordion-open']
  },
  groupVariants: {
    'overlay-active': ['overlay', 'active', '.active'], // Note the custom name to avoid conflicts with existing pseudo variants like "active"
    'accordion-open': ['accordion', 'open', '.open'],
  },
  plugins: [
    require('tailwindcss-group-variants'),
  ]
}
```

Generates the following:

```css
.overlay.active .overlay-active\:m-0{
  margin: 0;
}
.accordion.open .accordion-open\:m-0{
  margin: 0;
}
```