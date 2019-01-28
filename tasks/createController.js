const assert = require('assert')
const path = require('path')
const mkdirp = require('mkdirp')
const { promises: fs } = require('fs')

main(process.argv.slice(2)).catch(console.error)

async function main(argv) {
  const [controllerName, controllerPath] = argv
  assert(isStringValid(controllerName), 'ControllerName is not passed')
  assert(isStringValid(controllerPath), 'ControllerPath is not passed')

  const templatePath = path.resolve(process.cwd(), 'tasks/templates/controller.template')
  const templateSchemePath = path.resolve(process.cwd(), 'tasks/templates/scheme.template')
  const templateContent = String(await fs.readFile(templatePath))
  const templateSchemeContent = String(await fs.readFile(templateSchemePath))
  const content = templateContent
    .replace(/\${controllerName}/g, ufirst(controllerName))
    .replace(/\${controllerRoutePath}/g, '/path')

  const controllerBasename = path.basename(controllerPath)
  const controllerDirname = path.resolve(
    process.cwd(),
    'src/controllers',
    path.dirname(controllerPath),
  )
  const controllerFilePath = path.resolve(controllerDirname, `${controllerBasename}.ts`)
  const schemeFilePath = path.resolve(process.cwd(), 'src/controllers/scheme.ts')

  mkdirp.sync(controllerDirname)
  await fs.writeFile(controllerFilePath, content)
  const schemeStats = await fs.stat(schemeFilePath).catch(() => null)
  if (schemeStats == null || !schemeStats.isFile()) {
    await fs.writeFile(schemeFilePath, templateSchemeContent)
  }
  console.log('Finished!')
}

function ufirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function isStringValid(value) {
  return typeof value === 'string' && value.length !== 0
}
