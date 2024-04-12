import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://192.168.0.67:8080/graphql",
    documents: ["src/**/*.tsx"],
    generates: {
        "./src/types.ts": {
            plugins: [
                "@graphql-codegen/typescript",
            ],
        },
        "./src/schema.json": {
            plugins: [
                "introspection",
            ],
        },
    },
};

export default config;
