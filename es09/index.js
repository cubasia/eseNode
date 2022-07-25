"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_buffer_1 = require("node:buffer");
const data = new Uint8Array(node_buffer_1.Buffer.from("Hello Node.js"));
(0, node_fs_1.writeFile)(".\message.txt", data, (err) => {
    if (err)
        throw err;
    console.log("The file has been saved!");
});
