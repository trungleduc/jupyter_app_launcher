/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run jlpm build:schema to regenerate this file.
 */

export interface ILauncherConfiguration {
  title: string;
  description?: string;
  icon?: string;
  id: string;
  source: string;
  sourceCode?: string;
  cwd?: string;
  type:
    | 'notebook'
    | 'notebook-grid'
    | 'notebook-voila'
    | 'markdown'
    | 'local-server'
    | 'url';
  catalog?: string;
  args?:
    | {
        [k: string]: any;
      }
    | any[];
}
