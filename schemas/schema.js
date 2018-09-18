import * as React from 'react';
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { settings } from '@ludens-reklame/klosser-theme-[theme]';
import Schemas from '@ludens-reklame/klosser/dist/sanity';

const schemas = new Schemas();

schemas.createSettings(
  settings.fields,
  settings.fieldsets,
  settings.queryFields,
  settings.queryFieldsets
);

schemas.createSection(settings.blocks, settings.containerFields);

export default createSchema({
  name: 'default',
  types: schemaTypes.concat(schemas.toArray())
});
