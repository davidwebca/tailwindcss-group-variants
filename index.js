const plugin = require('tailwindcss/plugin')
const selectorParser = require('postcss-selector-parser')

module.exports = plugin(({ addVariant, config, e }) => {
  const prefixClass = function(className) {
  	const prefix = config('prefix');

  	const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
    return `${getPrefix(`.${className}`)}${className}`;
  }

  const createGroupVariant = function(groupName, pseudoName, pseudoClass) {
    return ({ modifySelectors, separator }) => {
        return modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `${groupName}-${pseudoName}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${prefixClass(groupName)}${pseudoClass} `));
            })
          }).processSync(selector);
        })
    }
  }

  let groupVariantsConfig = config('groupVariants')
  groupVariantsConfig.forEach((groupVariant, groupVariantName) => {
  	addVariant(groupVariantName, createGroupVariant(...groupVariant))
  })
})