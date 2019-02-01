import * as assert from 'assert'
import * as path from 'path'
import * as mkdirp from 'mkdirp'
import { promises as fs } from 'fs'
import { upperFirst, template } from 'lodash'

main(process.argv.slice(2)).catch(console.error)

async function main(argv: ReadonlyArray<string>) {
  const [controllerName, controllerPath] = argv
  assert(isStringValid(controllerName), 'ControllerName is not passed')
  assert(isStringValid(controllerPath), 'ControllerPath is not passed')

  const templatePath = path.resolve(process.cwd(), 'tasks/templates/controller.template')
  const templateSchemePath = path.resolve(process.cwd(), 'tasks/templates/scheme.template')
  const templateContent = template(String(await fs.readFile(templatePath)))
  const templateSchemeContent = String(await fs.readFile(templateSchemePath))
  const content = templateContent({
    controllerName: upperFirst(controllerName),
    controllerRoutePath: '/path',
  })
  const controllerAbstractDirname = path.dirname(controllerPath)
  const controllerBasename = path.basename(controllerPath)
  const controllerDirname = path.resolve(process.cwd(), 'src/controllers', controllerAbstractDirname)
  const controllerFilePath = path.resolve(controllerDirname, `${controllerBasename}.ts`)
  const schemeFilePath = path.resolve(controllerDirname, 'scheme.ts')

  mkdirp.sync(controllerDirname)
  await fs.writeFile(controllerFilePath, content)
  const schemeStats = await fs.stat(schemeFilePath).catch(() => null)
  if (schemeStats == null || !schemeStats.isFile()) {
    await fs.writeFile(schemeFilePath, templateSchemeContent)
  }
  console.log('Finished!')
}

function isStringValid(value: any): value is string {
  return typeof value === 'string' && value.length !== 0
}
