const Realm = require('realm');

const AssetSchema = {
    name: 'Asset',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', indexed: true},
        view: {type: 'int', default: 0},
        title: {type: 'string', default: ''},
        user: {type: 'string'},
        date: {type: 'date'},
        star: {type: 'float', default: 0},
        openToStore: {type: 'bool', default: false},
        thumbnails: {type: 'string?[]', default: []},
        content: {type: 'string', default: ''},
        tags: {type: 'string?[]', default: []},
        html: {type: 'string', default: ''},
        css: {type:'string', default: ''},
        js: {type: 'string', default: ''}
    }
};

const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    key: {type: 'string'},
    id: {type: 'string'},
    password: {type: 'string', optional: true},
    nickname: {type: 'string' },
    profileImageUrl: {type: 'string', optional: true}
  }
};

// const SlideSchema = {
//   name: 'Slide',
//   primaryKey: 'id',
//   properties: {
//       name: {type:'string' },
//       id: {type:'int'},
//       thumbnail: {type:'string', default: ''},
//       note: {type:'string', default: ''},
//       selectedAsset: {type: 'string', optional: true},
//       assetIdCount: {type: 'int', default: 0},
//       assets: {type:'string', default:'[]'}
//   }
// }

const ShowSchema = {
  name: 'Show',
  primaryKey: 'id',
  properties: {
    id: {type:'string'},
    user: {type: 'string'},
    name: {type: 'string', default:'새 발표자료1'},
    sizeUnit: {type: 'string', default:'px'},
    positionUnit: {type: 'string', default: 'px'},
    selectedSlide: {type: 'int', default: 0},
    slideIdCount: {type: 'int', default:0},
    slides: {type: 'string', default: '[{"name":"TEST-SLIDE","id":0,"thumbnail":"","note":"","assetIdCount":0,"assets":[]}]'}
  }
}

const realm = new Realm({schema: [UserSchema, AssetSchema, AssetScriptSchema, ShowSchema, SimpleAssetSchema ]});

module.exports = realm;
