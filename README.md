# MovieVault

MovieVault 是一個使用 Next.js 建立的電影資訊網站，整合了 TMDB (The Movie Database) API，提供電影資訊瀏覽和管理功能。

## 功能特點

### 🎬 電影瀏覽

- 瀏覽熱門電影列表
- 無限滾動載入更多電影
- 依照不同條件排序（人氣、評分、上映日期、片名）
- 依照類型篩選電影

### 🔍 搜尋功能

- 即時電影搜尋
- 搜尋結果排序
- 自動載入更多搜尋結果

### 📌 個人收藏

- 將喜歡的電影加入待看清單
- 管理待看清單（新增/移除）
- 待看清單排序功能
- 隨機電影推薦功能

### 🎯 電影詳情

- 完整電影資訊展示
- 演員陣容介紹
- 相關電影推薦

## 技術架構

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **API**: TMDB API
- **動畫**: Framer Motion
- **狀態管理**: React Context

## 開始使用

1. 安裝依賴：

```bash
npm install
```

2. 設定環境變數：
   建立 `.env.local` 文件並添加以下設定：

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token
```

3. 啟動開發伺服器：

```bash
npm run dev
```

4. 開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)
