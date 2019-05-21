## Project: Simple Chess

### 描述

一個簡單的西洋棋程式，支援多人同時開房。

----
### 操作方式

npm install \
npm run server \
npm start（開另一個terminal）\
在網址列打 localhost:3000，即可連入。

在 Name 那欄可輸入玩家名字，Create 可創立房間，網址列 localhost:3000/room/ 後面即是房間 ID。\
另一位玩家可以從 Join 輸入該 ID 進入房間。\
觀眾可由 Watch 輸入該 ID 進入房間。

----
### 使用框架/模組/原始碼
前後端溝通：socket.io \
functional css： https://tachyons.io \
行棋邏輯：https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/


----
### 其他說明
有些功能還沒完全做完，如小兵走到底線的特殊規則，或是王車易位。

----
### 我的貢獻
修改原本連結提供的原始碼，改為可支援多人開房 / 觀眾等功能。

----
### 心得
這次的作業一開始光是在查詢怎麼將 react 和 express 整合在一起就花了不少時間，期間查了滿多東西的，雖然最後很多都沒用到，但還是感覺學了不少東西。

此外，為了要寫多人連線的邏輯，讓我對前後端的溝通了解不少。

