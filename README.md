## Project: Simple Chess

### 描述

一個簡單的西洋棋程式，支援多人同時開房。

----
### 操作方式
1. npm install
2. npm run server
3. npm start（開另一個terminal
4. 在網址列打 localhost:3000，即可連入。

- 在 Name 那欄可輸入玩家名字（默認為 Player），Create 可創立房間，網址列 localhost:3000/room/ 後面即是房間 ID。
- 另一位玩家可以從 Join 輸入 ID 進入房間。
- 觀眾可選擇 Watch， 輸入 ID 進入房間。

----
### 使用框架/模組/原始碼
- [React](https://reactjs.org)
- [Express](https://expressjs.com)
- [Socket.io](socket.io)
- [Tachyons.io](https://tachyons.io) (functional css)
- https://github.com/TalhaAwan/react-chess (offline chess)


----
### 其他說明
有些功能還沒完全做完，如小兵走到底線的特殊規則，或是王車易位。

----
### 我的貢獻
修改原本連結提供的原始碼，改為可支援多人開房 / 觀眾等功能。

----
### 心得
這次的作業一開始光是在查詢怎麼將 react 和 express 整合在一起（搭配 hot-loader 等等）就花了不少時間，期間查了滿多東西的，雖然最後很多都沒用到，但還是感覺學了不少。

此外，為了要寫多人連線的邏輯，也讓我對前後端的溝通了解不少，可惜這次還來不及連結到 database，希望 final project 可以做出更完整的作品。

最後，透過這次作業，真心覺得要先想好整體架構QQ

----
### 螢幕截圖
<img src=https://i.imgur.com/bIxDozf.png width="400"/>
<br><br>
<img src=https://i.imgur.com/eaFGk09.png width="400"/>