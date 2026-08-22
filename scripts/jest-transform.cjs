const { createHash } = require('node:crypto')
const path = require('node:path')
const esbuild = require('esbuild')

function getLoader(filename) {
  switch (path.extname(filename)) {
    case '.ts':
      return 'ts'
    case '.tsx':
      return 'tsx'
    case '.jsx':
      return 'jsx'
    default:
      // The existing Jest tests contain JSX in .js files.
      return 'jsx'
  }
}

module.exports = {
  canInstrument: false,

  getCacheKey(sourceText, sourcePath, transformOptions) {
    return createHash('sha256')
      .update(esbuild.version)
      .update(sourceText)
      .update(sourcePath)
      .update(transformOptions.configString)
      .digest('hex')
  },

  process(sourceText, sourcePath) {
    const result = esbuild.transformSync(sourceText, {
      format: 'cjs',
      jsx: 'transform',
      loader: getLoader(sourcePath),
      sourcefile: sourcePath,
      sourcemap: 'inline',
      target: 'node20'
    })

    return { code: result.code }
  }
}
