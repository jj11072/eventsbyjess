import { type SchemaTypeDefinition } from 'sanity'
import event from './event';
import service from './service';
import teamMember from './teamMember';
import contact from './contact';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
}

export const schemaTypes = [event, service, teamMember, contact];
