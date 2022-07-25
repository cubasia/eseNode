"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetSchemaUpdate = exports.planetSchema = exports.TypeDate = exports.DateKind = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.DateKind = Symbol("DateKind");
exports.TypeDate = typebox_1.Type.String({ format: "date-time" });
//updateDate: Type.Optional(TypeDate), // gestione di un campo data
exports.planetSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    diameter: typebox_1.Type.Integer(),
    moons: typebox_1.Type.Integer(),
}, { additionalProperties: false });
exports.planetSchemaUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    diameter: typebox_1.Type.Integer(),
    moons: typebox_1.Type.Integer(),
}, { additionalProperties: false }));
