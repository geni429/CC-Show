import { actionTypes } from '../actions/assets';
import { getState } from '../store';

const initialState = {
  assetIdCount: 0,
  assets: []
}

const assets = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSET_CREATE:
      let sizeUnit = getState().slideContext.sizeUnit;
      let positionUnit = getState().slideContext.positionUnit;
      let currentId = state.assetIdCount+1;
      return {
        ...state,
        assetIdCount: currentId,
        assets: [...assets, {
          id: currentId,
          type: action.assetType,
          value: action.value,
          height: '20'+sizeUnit,
          width: '20'+sizeUnit,
          x: '0'+positionUnit,
          y: '0'+positionUnit
        }]
      }
    default:
      return state
  }
}

export default assets
