export type OpenApiFile = { name: string; spec: any };

export type PotentialFileCategory =
  | "page"
  | "snippet"
  | "mintConfig"
  | "potentialYamlOpenApiSpec"
  | "potentialJsonOpenApiSpec"
  | "staticFile";

export type FileCategory =
  | "page"
  | "snippet"
  | "mintConfig"
  | "openApi"
  | "staticFile";
