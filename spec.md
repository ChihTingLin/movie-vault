# 🎬 專案名稱：MovieVault - 電影數據庫前端應用

## 專案概述

**MovieVault** 是一個以 Next.js 為基礎建構的前端應用，串接第三方電影資料來源（如 TMDB API），讓使用者能夠搜尋電影、查看詳細資料、收藏待看清單、並享受推薦娛樂互動功能（如隨機選片）。整體介面將以 TailwindCSS + shadCN 結合設計系統打造，具備良好的使用者體驗與開發維護性。

---

## 技術棧

- Node版本：20.14
- **框架**：Next.js（App Router）
- **樣式工具**：TailwindCSS
- **UI Component Library**：shadCN UI
- **API 整合**：TMDB API 或其他第三方電影 API
- **狀態管理**：React Context / Zustand（依規模彈性採用）
- **請求管理**：React Query 或 SWR
- **資料緩存與錯誤處理機制**
- **測試框架**：Jest + React Testing Library

---

## 功能規格

### 1. 搜尋電影

- 搜尋欄位（支援即時輸入）
- 顯示搜尋結果（以卡片呈現電影資訊）
- 支援無限滾動（IntersectionObserver 或 pagination）

### 2. 電影詳情頁

- 點擊卡片展開詳情頁
- 包含以下資訊：
  - 封面圖、標題、簡介、上映日期
  - 演員列表、導演資訊、預告片（YouTube Embed）
  - 使用者評論（若 API 支援）

### 3. 收藏功能（待看清單）

- 每部電影卡片支援加入/移除清單
- 本地儲存（LocalStorage）或帳號登入狀態下同步儲存（未必開發登入）

### 4. 待看清單頁面

- 顯示所有加入收藏的電影
- 支援依標題、日期、自定順序排序
- 操作功能（移除、排序方式選擇）

### 5. 響應式設計

- 支援手機、平板、桌機
- 使用 TailwindCSS 的響應式工具類別實作

### 6. API 錯誤處理

- 包含：
  - 無資料提示
  - API 逾時/格式錯誤提示
  - 使用錯誤邊界 (Error Boundary) 或 fallback UI

---

## 架構設計

### 專案目錄結構（Next 13 App Router）

app/
layout.tsx
page.tsx
movie/
[id]/
page.tsx
watchlist/
page.tsx
lottery/
page.tsx
components/
MovieCard.tsx
MovieDetail.tsx
WatchlistButton.tsx
SearchBar.tsx
Spinner.tsx
ErrorFallback.tsx
LotteryWheel.tsx
lib/
api.ts
tmdb.ts
utils.ts
hooks/
useInfiniteScroll.ts
useWatchlist.ts
types/
movie.ts

## 測試規格

- **元件測試**：`MovieCard`, `WatchlistButton`, `SearchBar`
- **邏輯測試**：`useWatchlist`, `api.ts` 對錯誤資料的處理
- **UI 測試**：搜尋流程、加入移除清單流程
- 使用 `Jest` 搭配 `React Testing Library` 模擬互動行為與邏輯正確性

## 開發體驗（DX）

- Eslint + Prettier + Husky（Git Hook）
- 使用 TypeScript + 型別守衛保護資料完整性
- Vercel Preview Deploy（可協作）
- shadCN UI 內建 CLI 模組產生元件與變體
- 支援 `.env` 環境參數自動切換
