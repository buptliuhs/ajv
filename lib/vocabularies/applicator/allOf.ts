import type {CodeKeywordDefinition, AnySchema} from "../../types"
import type KeywordCxt from "../../compile/context"
import {alwaysValidSchema} from "../../compile/util"

const def: CodeKeywordDefinition = {
  keyword: "allOf",
  schemaType: "array",
  code(cxt: KeywordCxt) {
    const {gen, schema, it} = cxt
    if (!Array.isArray(schema)) throw new Error("ajv implementation error")
    const valid = gen.name("valid")
    schema.forEach((sch: AnySchema, i: number) => {
      if (alwaysValidSchema(it, sch)) return
      cxt.subschema({keyword: "allOf", schemaProp: i}, valid)
      cxt.ok(valid)
    })
  },
}

export default def