# udemy-learning-log

Udemyでの学習時間を自動的に記録し、GitHubにコミット・プッシュするブラウザ拡張機能です。

## 概要

このプロジェクトは以下の2つのコンポーネントで構成されています：

1. **ブラウザ拡張機能** - Udemyサイトで動画視聴時間を監視
2. **Pythonサーバー** - 学習ログの記録とGitへの自動コミット・プッシュ

## 機能

- Udemyで動画を1時間視聴する毎に自動的に学習ログを記録
- 学習ログは `learning-log.txt` ファイルに保存
- 自動的にGitコミット・プッシュを実行

## セットアップ手順

### 1. 前提条件

- Python 3.x がインストールされていること
- Git がインストールされ、このGitHubリポジトリが**Fork**されていること
- Chromeブラウザが使用できること

### 2. リポジトリのクローン

```bash
git clone git@github.com:ユーザー名/udemy-learning-log.git
cd udemy-learning-log
```

### 3. ブラウザ拡張機能のインストール

1. Chromeブラウザで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このプロジェクトのフォルダを選択

### 4. Gitの設定確認

プロジェクトディレクトリで以下を確認：

```bash
# リモートリポジトリが設定されているか確認
git remote -v

# 必要に応じてリモートリポジトリを設定
git remote add origin git@github.com:ユーザー名/udemy-learning-log.git
```

## 実行手順

### 1. Pythonサーバーの起動

ターミナルでプロジェクトディレクトリに移動し、以下のコマンドを実行：

```bash
python push_log.py
# バックグラウンドで実行したい場合は
python push_log.py &
```

サーバーが正常に起動すると以下のメッセージが表示されます：
```
Push server running at http://localhost:3001
```

### 2. Udemyでの学習開始

1. ブラウザでUdemyサイト（https://www.udemy.com）にアクセス
2. 任意のコースの動画を再生
3. 1時間以上視聴すると自動的に学習ログが記録されます

### 3. 学習ログの確認

- `learning-log.txt` ファイルに学習記録が追加されます
- 自動的にGitコミット・プッシュが実行されます
- GitHubリポジトリで学習履歴を確認できます

## ファイル構成

```
udemy-learning-log/
├── manifest.json      # ブラウザ拡張機能の設定ファイル
├── content.js         # Udemyサイトで動作するスクリプト
├── push_log.py        # ログ記録とGit操作を行うPythonサーバー
├── learning-log.txt   # 学習記録が保存されるファイル
├── LICENSE           # MITライセンス
└── README.md         # このファイル
```

## 動作の仕組み

1. **content.js** がUdemyサイトで動画の視聴時間を監視
2. 1時間以上視聴すると `http://localhost:3001/push` にPOSTリクエストを送信
3. **push_log.py** がリクエストを受信し、現在時刻を `learning-log.txt` に記録
4. 自動的に `git add`、`git commit`、`git push` を実行
5. 継続視聴時に更に1時間毎に再度記録を自動的にpushする

## 注意事項

- Pythonサーバーが起動していない場合、学習ログは記録、GitHubへのpushがされません
- Git認証が正しく設定されている必要があります(gitリポジトリをSSHでクローンできていればOK)
- chromeブラウザ拡張機能が有効になっている必要があります

### サーバーが起動しない場合
- Python 3.x がインストールされているか確認
- ポート3001が他のプロセスで使用されていないか確認
