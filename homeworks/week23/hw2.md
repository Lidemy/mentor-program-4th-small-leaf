## 為什麼我們需要 Redux？

在規模較大的專案當中，經常會透過不同的 component 來改變 state，對於這樣的情況可能不利於追蹤是哪個 component 改變了 state，但如果我們採用 Redux 來管理共同的 state，不管是在追蹤資料還是 debug 都會變得輕鬆許多

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一個狀態管理工具，可以讓開發者更容易的管理 state，在我們詳細的講解流程之前先附上一張流程圖![](https://camo.githubusercontent.com/b6cdb7830c8fb063578ff72efd8d0cb25146e1f991b9881435564f4bd36457ac/68747470733a2f2f692e696d6775722e636f6d2f6c566d72597a372e676966)

### 三大元件

- `action`：是一個物件，action 必須帶有一個 type 用來描述發生的事件類別，如果有額外的資料可以放在 payload

```js
const Action = {
  type: 'plus',
  // payload: {
  //   message: ...
  // }
};
```

- `reducer`：是一個函式，用來接收當前的 state 與 action，會根據不同的 action 更新 state 的狀態，當 reducer 被執行的時候，initialState 會當作 state 的預設值

```js
const initialState = { value: 0 };

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'plus': {
      return {
        value: state.value + 1,
      };
    }

    default: {
      return state;
    }
  }
}
```

reducer 還有一些使用的規則需要注意

1. 新的 state 狀態只能是透過當前的 state 與 action 物件來取得
2. 不可以修改當前的 state，需要透過額外複製一份當前 state 的狀態，並從那份狀態來進行更新
3. reducer 必須是一個 pure function，不可以在此設計非同步邏輯、隨機值或者其他會造成 side effect 的行為

- `store`：負責儲存整個 state tree，可以透過 redux 中提供的 createStore 來創建 store，需要帶入一個 reducer 的參數

```js
import { createStore } from 'redux';
import rootReducer from './reducers';

export default createStore(rootReducer);
```

createStore 會回傳一個物件，會有以下幾個 method

1. `dispatch(action)`： 透過這個方法讓 store 知道我們想要觸發哪一個事件(藉由傳入 action 物件得知)，這是唯一觸發 state 變更的方法
2. `getState()`： 回傳現在 store 的 state
3. `subscribe(listener)`： 會在 state 改變時被呼叫的 function
4. `replaceReducer(nextReducer)`： 可以被用來實作 hot reloading 與 code splitting

## 該怎麼把 React 跟 Redux 串起來？

Redux 官方有提供一個 react-redux 的套件，可以讓我們很方便地將 React 跟 Redux 串起來，我們可以透過 connect API 和 hooks API 兩種方法來連結

### connect API

開始前我們必須先從 react-redux 中引入 Provider 並在 component 的最頂層使用 `<Provider store={store}>` 傳入 store，讓所有 children component 都拿得到 store

要使用 connect()，你需要定義一個 mapStateToProps 的 function，它會轉換目前 Redux store state 成為 presentational component 的 props

除了讀取 state，container component 也可以 dispatch actions。以類似的方式，你可以定義一個 mapDispatchToProps() 的 function，它接收 dispatch() method 並回傳你想要傳給 presentational component 的 callback props

在建立完 mapStateToProps 和 mapDispatchToProps 完後，我們就可以用 higher order component 的方式將 store 和 component 綁定在一起

```js
const connectToStore = connect(mapStateToProps, mapDispatchToProp);
const ConnectedComponent = connectToStore(Component);
export default ConnectedComponent;
```

也可以簡化成

```js
export default connect(mapStateToProps, mapDispatchToProp)(Component);
```

這樣在 presentational component 的 props 裡就拿得到 dispatch 和 state 了

### hooks API

一樣要先在 component 的最頂層使用 `<Provider store={store}>` 傳入 store，讓所有 children component 都拿得到 store

在想使用 props 的 children component 中，從 react-redux 中引入 useDispatch、useSelector， 就可以直接在 children component 中 dispatch(action) 也可以根據自訂的 selector 來拿到不同的 state 了
