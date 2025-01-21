# 台灣銀行代碼查詢工具

## 簡介
這是一個基於 Vue.js 的小工具，用於查詢台灣銀行及其分行代碼。使用者可以通過輸入關鍵字快速篩選銀行與分行，並顯示詳細的分行資訊，包括分行代碼、地址和電話等。

## 功能
- **銀行篩選與選擇**：提供所有台灣銀行的列表，支援輸入關鍵字進行篩選。
- **分行篩選與選擇**：選定銀行後，自動載入對應分行列表，支援輸入分行名稱或代碼進行篩選。
- **分行詳細資訊**：顯示分行代碼、地址和電話等詳細資訊。
- **複製功能**：可一鍵複製分行代碼或頁面連結。
- **重新查詢**：支持返回首頁重新進行查詢。

## 技術棧
- Vue 3 (Composition API)
- Vue Router
- Fetch API

## 安裝與使用

### 1. 環境需求
- Node.js >= 14

### 2. 安裝依賴
```bash
npm install
```

### 3. 配置環境變數
在項目根目錄創建一個 `.env` 檔案，並新增以下內容：
```env
VITE_API_BASE_URL=https://your-api-endpoint.com
```
請將 `https://your-api-endpoint.com` 替換為您的 API 伺服器 URL。
可參考.env.example

### 4. 啟動應用
```bash
npm run dev
```
應用將在本地伺服器（默認為 `http://localhost:5173`）上運行。

## 使用說明
1. **查詢銀行**：在 "銀行名稱" 輸入框中輸入關鍵字或代碼，從下拉選單中選擇銀行。
2. **查詢分行**：在 "分行名稱" 輸入框中輸入關鍵字或代碼，從下拉選單中選擇分行。
3. **查看詳細資訊**：選擇分行後，可在下方顯示分行代碼、地址及電話資訊。
4. **複製功能**：點擊 "複製代碼" 或 "複製此頁面連結" 按鈕，快速複製所需資訊。
5. **重新查詢**：點擊 "重新查詢" 按鈕，返回初始狀態。

## 資料來源
本應用所使用的資料來自[政府資料開放平臺](https://data.gov.tw/dataset/6041)。
