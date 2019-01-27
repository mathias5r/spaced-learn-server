import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const types = fileLoader(path.join(__dirname, "./types"));
const declarations = fileLoader(path.join(__dirname, "./declarations"));
const typesDef =  mergeTypes([...types, ...declarations ], { all: true });

export default typesDef;