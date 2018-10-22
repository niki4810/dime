import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import compose from 'ramda/src/compose';
import rootReducer from '../reducers/index';

const getStore = (initialState) => {
  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk)
  );
  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
};

export  default getStore;
