const plugin = require('tailwindcss/plugin')
const selectorParser = require('postcss-selector-parser')

module.exports = plugin(({ addVariant, config, e }) => {
  const prefixClass = function(className) {
    const prefix = config('prefix');

    const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
    return `${getPrefix(`.${className}`)}${className}`;
  }

  const createGroupVariant = function(groupName, pseudoName, groupPseudoClass, selectorPseudoClass='', groupSeparator='-') {
    return ({ modifySelectors, separator }) => {
        return modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `${groupName}${groupSeparator}${pseudoName}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${prefixClass(groupName)}${groupPseudoClass} `));
              if(selectorPseudoClass!='') {
                classNode.parent.insertAfter(classNode, selectorParser().astSync(`${selectorPseudoClass}`));
              }
            })
          }).processSync(selector);
        })
    }
  }

  let groupVariantsConfig = config('groupVariants')
  for(groupVariantName in groupVariantsConfig) {
    addVariant(groupVariantName, createGroupVariant(...groupVariantsConfig[groupVariantName]))
  }
})