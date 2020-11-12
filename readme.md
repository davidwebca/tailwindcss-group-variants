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

## Add the groupVariants object to your config and add a custom variant like you normally would

```js
module.exports = {
  variants: {
    margin: ['responsive', 'group-first']
  },
  // Add this to the root of your config file or in your "extend" portion.
  groupVariants: {
    'group-first': ['group', 'first', ':first-child'],
    'group-last': ['group', 'last', ':last-child'],
    // 'variant-name': ['grouping-selector', 'name-suffix', ':grouping-suffix']
    // .grouping-selector:grouping-suffix .grouping-selector-name-suffix\:utility-class{ attribute:value; }
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
/* And all the other margin utilities */
```

Here, you can see that the implementation doesn't limit you to pseudo-classes. By providing the third parameter in full, it also allows you to create "active" parent classes groupings. For example, if you have overlays that receive the ".active" class or accordions that receive the ".open" class with JavaScript to make them visible.

```js
module.exports = {
  variants: {
    height: ['responsive', 'overlay-active', 'accordion-open']
  },
  groupVariants: {
    'overlay-active': ['overlay', 'active', '.active'], // Note the custom name to avoid conflicts with existing pseudo variants like "active"
    'accordion-open': ['accordion', 'open', '.open'],
    // You could even do this insted:
    // 'accordion-open': ['accordion', 'open', '[open="true"]',
  },
  plugins: [
    require('tailwindcss-group-variants'),
  ]
}
```

Generates the following:

```css
.overlay.active .overlay-active\h-0{
  height: 0;
}
.accordion.open .accordion-open\:h-0{
  height: 0;
}
/* And all the other height utilities */
```

Here's an [example](https://codepen.io/davidwebca/pen/YzWdLqz) built with [AlpineJS](https://github.com/alpinejs/alpine).

## But why wouldn't you simply toggle the height class with Alpine?

There's a case to be made for simple examples, but sometimes, you have to toggle a class on multiple elements or multiple classes on a single element. This would result in some burdened JavaScript along with classes whose names and values can change. This method keeps things more semantic (active class is toggled in a single place) and prevents the eventual case where you would need to cleanup classes names in JavaScript files, making your views dryer and logic separated as much as possible.

Beware though. Just like with any regular Tailwind variant, you can increase your CSS file size a lot by using this. Make sure you clean it up properly with the correct purge settings as outlined [here](https://tailwindcss.com/docs/controlling-file-size).

