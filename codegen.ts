
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: 'src/utils/graphql/**/*.graphql',
  generates: {
    "generated/graphql-backend.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
      config: {
        enumsAsConst: true
      }
    },
    "generated/graphql-frontend.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        enumsAsConst: true
      }
    }
  }
};

export default config;
