import { actionTypes } from '../actions/ui';
import update from 'react-addons-update';

const initialState = {
  visibleSlideManager: false,
  visibleAssetStore: false,
  visibleAssetEditor: true
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SLIDE_MANAGER:
      return {
        ...state,
        visibleSlideManager : !state.visibleSlideManager
      };
    case actionTypes.ASSET_STORE:
      return {
        ...state,
        visibleAssetStore : !state.visibleAssetStore
      };
    case actionTypes.ASSET_EDITOR:
      return {
        ...state,
        visibleAssetEditor : !state.visibleAssetEditor
      };
    default:
      return state;
  }
}

export default ui
