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

## Add the groupVariants object to your config and add a custom variant like you normally would.

I encourage you to use TailwindCSS 2.0's ability to extend variants to avoid messing up the defaults, unless what you want is to definitely remove the defaults. A list of the default variants enabled by utility can be found [here](https://tailwindcss.com/docs/hover-focus-and-other-states#default-variants-reference).

```js
module.exports = {
  variants: {
    extend: {
      margin: ['group-first']
    }
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
    extend: {
      height: ['overlay-active', 'accordion-open']
    }
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
.overlay.active .overlay-active\:h-0{
  height: 0;
}
.accordion.open .accordion-open\:h-0{
  height: 0;
}
/* And all the other height utilities */
```

Here's an [example](https://codepen.io/davidwebca/pen/YzWdLqz) built with [AlpineJS](https://github.com/alpinejs/alpine).

## Advanced

In total, five arguments can be fed to the groupVariants attributes in your configuration. The extra 2 are less likely to be used, but provided for specific use cases. The 4th argument is a selector suffix (not to be confused with the group name suffix). This allows you to add anything to the utility name, for example opacity-100 can become opacity-100-wow... but why would you! This is moreso to add pseudo selectors. Below is an example where you would create a "not hovered" pseudo class on the opacity utility. This enables you to reduce opacity on every element that is NOT hovered. You could create a similar effect where all form elements that are not focused are smaller with transforms, or add specific styles to a group that is hovered AND the element is focused. 

The 5th argument is simply the separator used to create the finished selector name (.group + dash + not-hover). Dash is the default. If you use bem notation style, you could swtich this to double underscores. The first 3 arguments are required, the last 2 are not and you can leave them undefined.

```js
module.exports = {
  variants: {
    extend: {
      opacity: ['not-hover']
    }
  },
  groupVariants: {
    'not-hover': ['group', 'not-hover', ':hover', ':not(:hover)', '-'],
  },
  plugins: [
    require('tailwindcss-group-variants'),
  ]
}
```

Generates the following:

```css
.group:hover .group-not-hover\:opacity-0:not(:hover) {
  opacity: 0;
}

.group:hover .group-not-hover\:opacity-10:not(:hover) {
  opacity: 0.1;
}
/* And all the other opacity utilities */
```

## But why wouldn't you simply toggle the class with Alpine?

There's a case to be made for simple examples, but sometimes, you have to toggle a class on multiple elements or multiple classes on a single element. This would result in some burdened JavaScript along with classes whose names and values can change. This method keeps things more semantic (active class is toggled in a single place) and prevents the eventual case where you would need to cleanup classes names in JavaScript files, making your views dryer and logic separated as much as possible.

Beware though. Just like with any regular Tailwind variant, you can increase your CSS file size a lot by using this. Make sure you clean it up properly with the correct purge settings as outlined [here](https://tailwindcss.com/docs/controlling-file-size).

