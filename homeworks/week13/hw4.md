## Webpack 是做什麼用的？可以不用它嗎？
webpack 是用來將模組打包的工具，它可以將許多分散的模組按照依賴關係和規則打包整合成一個或多個模組，而 webpack 最厲害的地方就在於它打包的資源不只是限於 JS，甚至能打包 CSS、圖片、第三方模組，通過 webpack 提供的 loaders 還能在打包的過程中順便轉譯、壓縮，經過處理就能輕易的在瀏覽器上引入打包後的模組，當然你也可以不使用 webpack，不過上述所提到的的程序都必須使用其他工具做整合，但在檔案相容性及維護性的部分可能就不如使用 webpack 方便了

## gulp 跟 webpack 有什麼不一樣？
gulp 的主要功能是開發流程的**控制管理**，我們可以通過 gulp 提供的各種 plugin 配置不同的 task，然後再定義執行順序，進而去構建整個開發流程

webpack 則是注重在**打包模組**的功能，透過 loader 和 plugin 把開發時的各種資源進行轉化，在按照依賴關係和規則進而打包成符合開發環境的前端資源

## CSS Selector 權重的計算方式為何？
從權重高排到低：
1. !important
2. inline style
3. ID
4. Class
5. Elements

[參考資料](https://muki.tw/tech/css-specificity-document/)
