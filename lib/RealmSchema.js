import Realm,{BSON} from 'realm';
import { createRealmContext } from '@realm/react';

export class Highlight extends Realm.Object {
    
    static schema = {
      name: 'Highlight',
      properties: {
        _id: 'objectId',
        name:'string',
        backtrace: 'int',
        total:'int',
        categoryId:'objectId',
      
      },
      primaryKey: '_id',
    };
  }

export class Profile extends Realm.Object {
    
    static schema = {
      name: 'Profile',
      properties: {
        _id: 'objectId',
        email:'string',
        password: 'string',
      },
      primaryKey: '_id',
    };
  }
  
  export class Category extends Realm.Object {
    static schema = {
      name: 'Category',
      properties: {
        _id: 'objectId',
        name: 'string',
        highlights: 'Highlight[]'
      },
      primaryKey: '_id',
    };
  }
  // Create a configuration object
  const realmConfig = {
    schema: [Highlight, Category, Profile],
    schemaVersion:18,
    deleteRealmIfMigrationNeeded: true,
  };
  // Create a realm context
  export const realmContext = createRealmContext(realmConfig);

  