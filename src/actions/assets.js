export const actionTypes = {
  ASSET_SET_LEFT : "ASSET_SET_LEFT",
  ASSET_SET_TOP : "ASSET_SET_TOP",
  ASSET_SET_WIDTH : "ASSET_SET_WIDTH",
  ASSET_SET_HEIGHT : "ASSET_SET_HEIGHT",
  ASSET_SET_VALUE : "ASSET_SET_VALUE",
  ASSET_SET_BORDER_COLOR : "ASSET_SET_BORDER_COLOR",
  ASSET_SET_BORDER_WIDTH : "ASSET_SET_BORDER_WIDTH",
  ASSET_SET_BACKGROUND_COLOR : "ASSET_SET_BACKGROUND_COLOR",
  ASSET_CREATE : "ASSET_CREATE"
};

export const createAsset = (assetType, value) => {
  console.log('CreateAsset type:'+assetType+'  value:'+value);
  return {
    type: actionTypes.ASSET_CREATE,
    assetType,
    value
  }
};
