import fs from 'fs'
import path from 'path'
import packageInfo from '../package.json'

const destFile = path.resolve(
  __dirname,
  '../node_modules/@megalo/regular-template-compiler/node_modules/vue-template-compiler/package.json'
)
let content = fs.readFileSync(destFile, 'utf8')
const fromVersion = '2.5.17'
let destVersion = packageInfo.dependencies.vue
if (destVersion.startsWith('~') || destVersion.startsWith('^')) {
  destVersion = destVersion.substring(1)
}
content = content.replace(`"version": "${fromVersion}"`, `"version": "${destVersion}"`)
fs.writeFileSync(destFile, content, 'utf8')
console.log(`Rewrite regular-template-compiler's version from ${fromVersion} to ${destVersion} for file ${destFile}.`)
