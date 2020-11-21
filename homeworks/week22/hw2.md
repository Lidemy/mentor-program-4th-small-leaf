## 請列出 React 內建的所有 hook，並大概講解功能是什麼
* `useState` 會回傳一個 state 的值和一個更新 state 的 setState function，可以在呼叫 useState 時帶上一個參數，而這個參數就是 state 的初始值，參數只會在初始 render 時使用，在後續 render 則會被忽略，此外，如果初始值需要經過複雜的計算才能得到，則可以傳入一個 function，這個 function 只會在初始 render 時才會被調用，而當我們使用 setState 改變 state 的同時，React 會幫我們重新渲染畫面

* `useEffect` 內的函式在預設情況下，useEffect 會在每次 render 後執行，不過 useEffect 還提供了第二個參數 dependencies 的陣列，只要我們把指定的 state 加入陣列，就能監控這個的 state，只有當這個 state 改變時才執行 useEffect，只要每次重新渲染後 dependencies 內的 state 沒有改變，任何 useEffect 裡面的函式就不會被執行，陣列內也可以不放入 state，代表只會在第一次 render 後執行這個 useEffect，同時， useEffect 還能回傳一個 cleanup function，會在移除 useEffect 前先執行這個 cleanup function，這也意味著每一次 useEffect 的更新，都會產生一個新的 useEffect

* `useContext` 可以接收一個 createContext 的回傳值，並回傳這個 context 目前的值，這使得 parent component 下的任何一個 children component 都能更輕易的取得 parent component 的資料

* `useReducer` 會接收 reducer 和 initialState，然後回傳現在的 state 和其配套的 dispatch 方法，reducer 這個函式會依據不同的 action 回傳不同的 state

* `useCallback` 會回傳一個 memoized 的 callback，在這個 useCallback 中也提供了一個 dependencies 的陣列，只有當 dependencies 改變時才會更新，透過 useCallback 可以防止不必要的 render 發生

* `useMemo` 會回傳一個 memoized 的值，useMemo 也提供了一個 dependencies 的陣列，只有當 dependencies 改變時才會更新，useMemo 和 useCallback 都是可以防止不必要的 render 發生，不過 useCallback 回傳一個 function，useMemo 則是回傳一個值

* `useRef` 回傳一個 mutable 的 ref object，.current 屬性被初始為傳入的參數 ( initialValue )，回傳的 object 在 component 的生命週期將保持不變，這也意味著 useRef 在每次 render 時都會給你同一個的 ref object

* `useImperativeHandle` 將 children component 的某些函式透過 ref 的方式 開放給 parent component 呼叫

* `useLayoutEffect`  與 useEffect 的功能相同，不過 useLayoutEffect 觸發的時機點會在 DOM 改變完之後、瀏覽器 paint 之前執行，React 官方建議還是先使用 useEffect，只當它有問題時才嘗試使用 useLayoutEffect

* `useDebugValue` 用來在 React DevTools 中顯示自訂義 hook 的標籤

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
![](https://ithelp.ithome.com.tw/upload/images/20190913/20113277HDQVvBFMMn.png)
[class component 的生命週期表](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

如上圖，class component 的 lifecycle 可區分為三個執行階段，Mounting 當 component 被加入到 DOM 中時會觸發，Updating 當 component 的 props 或 state 更新，重新渲染 (re-rendered) DOM 時觸發，Unmounting 當元件要從 DOM 中被移除時觸發

### Mounting
* `constructor` 一個 React component 的 constructor 會在其被 mount 之前被呼叫

* `getDerivedStateFromProps` 會在一個 component 被 render 前被呼叫，不管是在首次 mount 時或後續的更新時

* `render` 當 render 被呼叫時，它會檢視 this.props 和 this.state 中的變化，並回傳相關元素

* `componentDidMount` 在 component 被 mount（加入 DOM tree 中）後，componentDidMount 會馬上被呼叫

### Updating
* `getDerivedStateFromProps` 會在一個 component 被 render 前被呼叫，不管是在首次 mount 時或後續的更新時

* `shouldComponentUpdate` React 的預設行為是每當 state 有所改變時就重新 render，不過若 shouldComponentUpdate 回傳的值為 false 的話，render 將不會被呼叫，執行時機為getDerivedStateFromProps 和 render 之間

* `render` 當 render 被呼叫時，它會檢視 this.props 和 this.state 中的變化，並回傳相關元素

* `getSnapshotBeforeUpdate` 會在最近一次 render 的 output 被提交給 DOM 時被呼叫

* `componentDidUpdate` 會在更新後馬上被呼叫。這個方法並不會在初次 render 時被呼叫

### Unmounting
* `componentWillUnmount` 會在ㄧ個 component 被 unmount 前呼叫，可以透過 componentWillUnmount 清除一些綁定的資訊

## 請問 class component 與 function component 的差別是什麼？
由於目前還是以 function component 實作為主，所以這題會以 function component 為主體，進而探討兩者之間的差異

function component 本身並沒有 state（如果沒有使用 hook 的話），class component 本身可以定義一個 state 的物件，要修改 state 必須透過 setState 這個內建函式， function component 則是可以透過 hooks 中 useState 定義一個 state 和 setState，相比之下，使用 hooks 管理 state 的方式方便許多，值得一提的是，在 function component 中只要調用了 setState 這個函式就會就會觸發 component 重新渲染，儘管 state 的值並沒有改變，而對 function component 來說，只有 state 真正改變時才會重新渲染，這樣的機制能夠幫我們擋掉一些不必要的 re-render

function component 是以 hook 為主體思考，class component 則是以 instance 為主體思考，因此 function component 並沒有 this，這使得我們不必些出 this.state.xxx 的冗長語法，也不必煩惱在傳入事件處理器時要根據情況來 bind(this)，不過也正是因為 this 的關係，由於 props 與 state 都是 immutable 的，在使用 class component 的時候，React 內部的實現會幫你操控 this 指向 component，也就是說 this 是可變的。class component 能夠隨時拿到 this.props.xxx 最新的改變，可是 function component 並不是這樣的，每一次 render 就是一次 function call，而傳進來的 props 就會是「當時」的 props，不會因為 props 改變而改變。這個就是 function component 與 class component 最大的差別

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
差別在於 component 有沒有被 React 控制，controlled component 會隨著資料的變動進而改變 UI，uncontrolled component 則不會，若要取的 uncontrolled component 的 state 則必須直接操作 DOM 或使用 useRef 方式才能取到值，如果有重新渲染畫面的需求，建議還是使用 Controlled Component 來處理
