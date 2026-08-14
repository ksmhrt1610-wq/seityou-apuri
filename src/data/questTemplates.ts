import type { QuestTemplate } from '../types'

/**
 * Master quest library. The daily board is sampled from `kind: 'daily'`
 * templates matching the player's interests/intensity; `kind: 'special'`
 * templates are browsable in the Special Quest catalog and persist until
 * completed or abandoned.
 *
 * Descriptions are written to be immediately actionable (exact reps/sets/
 * minutes) so there's nothing left to decide — just do it. Templates with
 * `requiredItem` only enter the pool once the player has registered that
 * item in their inventory (see data/items.ts).
 */
export const QUEST_TEMPLATES: QuestTemplate[] = [
  // ---------------- STR 筋力 ----------------
  { id: 'str-l1', kind: 'daily', category: 'STR', rank: 'F', intensity: 'low', title: '全身ストレッチ5分', description: '首・肩・腰・脚を、それぞれ30秒ずつ伸ばす。', estMinutes: 5 },
  { id: 'str-l2', kind: 'daily', category: 'STR', rank: 'F', intensity: 'low', title: '階段を3階分使う', description: 'エレベーターやエスカレーターの代わりに、上り下り合わせて3階分は階段を使う。', estMinutes: 3 },
  { id: 'str-l3', kind: 'daily', category: 'STR', rank: 'E', intensity: 'low', title: '早歩きで10分歩く', description: '目安1000歩、いつもより少し速いペースで10分間歩く。', estMinutes: 10 },
  { id: 'str-m1', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '自重サーキット(腕立て・腹筋・スクワット)', description: '腕立て伏せ10回×2セット、腹筋15回×2セット、スクワット15回×2セット。セット間は30秒休憩。', estMinutes: 15 },
  { id: 'str-m2', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '20分のジョギング', description: '息が弾む程度のペースで、20分間止まらずに走る。', estMinutes: 20 },
  { id: 'str-m3', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: 'プランク&スクワットセット', description: 'プランク30秒×3セット、スクワット20回×2セット。セット間は20秒休憩。', estMinutes: 15 },
  { id: 'str-h1', kind: 'daily', category: 'STR', rank: 'B', intensity: 'high', title: 'ジムで本格トレーニング45分', description: 'ベンチプレス・スクワット・デッドリフトなど主要種目を各3セット、合計45分以上行う。', estMinutes: 45 },
  { id: 'str-h2', kind: 'daily', category: 'STR', rank: 'B', intensity: 'high', title: '5kmを走り切る', description: 'ペースは気にせず、5kmという距離を走りきる。', estMinutes: 35 },
  { id: 'str-h3', kind: 'daily', category: 'STR', rank: 'C', intensity: 'high', title: 'タバタ式HIIT20分', description: '20秒全力運動+10秒休憩を1セットとして、8種目×3セット(合計20分)行う。', estMinutes: 20 },
  { id: 'str-item-dumbbell', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: 'ダンベルトレーニング', description: 'ダンベルカール10回×3セット、ショルダープレス10回×3セット。', estMinutes: 15, requiredItem: 'dumbbell' },
  { id: 'str-item-abroller', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '腹筋ローラー(膝つき)', description: '膝をついた姿勢で腹筋ローラーを10回×3セット行う。', estMinutes: 10, requiredItem: 'ab-roller' },
  { id: 'str-item-band', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: 'チューブトレーニング', description: '筋トレチューブでスクワット15回×3セット、ヒップリフト15回×3セット。', estMinutes: 15, requiredItem: 'resistance-band' },
  { id: 'str-item-rope', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '縄跳び300回', description: '休憩を挟んでよいので、合計300回跳ぶ。', estMinutes: 15, requiredItem: 'jump-rope' },
  { id: 'str-item-yogamat', kind: 'daily', category: 'STR', rank: 'E', intensity: 'low', title: 'マットでプランク&ストレッチ', description: 'ヨガマットの上でプランク1分+全身ストレッチ5分。', estMinutes: 6, requiredItem: 'yoga-mat' },
  { id: 'str-sp1', kind: 'special', category: 'STR', rank: 'A', intensity: 'mid', title: '1週間、毎日身体を動かす', description: '7日間、毎日何らかの運動を行い続ける。', estMinutes: 15 },
  { id: 'str-sp2', kind: 'special', category: 'STR', rank: 'A', intensity: 'high', title: '10kmを走り切る', description: 'タイムは気にせず、10kmという距離を完走する。', estMinutes: 70 },
  { id: 'str-sp3', kind: 'special', category: 'STR', rank: 'S', intensity: 'high', title: '筋トレを1ヶ月継続する', description: '週3回以上のトレーニングを1ヶ月続ける。', estMinutes: 30 },

  // ---------------- VIT 体力 ----------------
  { id: 'vit-l1', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '水をコップ1杯多く飲む', description: 'いつもより多めに、コップ1杯(約200ml)の水分をとる。', estMinutes: 1 },
  { id: 'vit-l2', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '朝日を3分浴びる', description: '起床後15分以内にカーテンを開け、3分以上日光を浴びる。', estMinutes: 3 },
  { id: 'vit-l3', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '寝る準備を5分早める', description: 'いつもより5分早く、歯磨き・スキンケアなど就寝準備を始める。', estMinutes: 5 },
  { id: 'vit-m1', kind: 'daily', category: 'VIT', rank: 'D', intensity: 'mid', title: '7時間睡眠を確保する', description: '就寝・起床時刻を逆算して決め、7時間眠る。', estMinutes: 0 },
  { id: 'vit-m2', kind: 'daily', category: 'VIT', rank: 'D', intensity: 'mid', title: '野菜を両手いっぱい食べる', description: 'どこかの食事で、両手のひら1杯分(約120g)の野菜を食べる。', estMinutes: 10 },
  { id: 'vit-m3', kind: 'daily', category: 'VIT', rank: 'D', intensity: 'mid', title: '間食を1回控える', description: 'いつも食べる間食を1回だけ我慢する。', estMinutes: 0 },
  { id: 'vit-h1', kind: 'daily', category: 'VIT', rank: 'C', intensity: 'high', title: '3食すべて主食・主菜・副菜を揃える', description: '朝・昼・夜、3食とも主食・主菜・副菜を揃えて食べる。', estMinutes: 20 },
  { id: 'vit-h2', kind: 'daily', category: 'VIT', rank: 'C', intensity: 'high', title: '23時までに就寝する', description: '今日は23時までにベッドに入る。', estMinutes: 0 },
  { id: 'vit-h3', kind: 'daily', category: 'VIT', rank: 'C', intensity: 'high', title: '1時間ごとに1分立って動く', description: '1時間ごとにアラームをセットし、立ち上がって1分間動く。合計6回以上。', estMinutes: 6 },
  { id: 'vit-item-scale', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '体重を記録する', description: '体重計に乗り、今日の体重をノートかアプリに記録する。', estMinutes: 2, requiredItem: 'scale' },
  { id: 'vit-item-bottle', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: 'マイボトル1本分の水を飲み切る', description: 'マイボトルに水を入れて持ち歩き、1日で1本分(500ml以上)飲み切る。', estMinutes: 0, requiredItem: 'water-bottle' },
  { id: 'vit-sp1', kind: 'special', category: 'VIT', rank: 'A', intensity: 'mid', title: '1週間、23時までに寝る', description: '7日間連続で23時までに就寝する。', estMinutes: 0 },
  { id: 'vit-sp2', kind: 'special', category: 'VIT', rank: 'S', intensity: 'high', title: '1ヶ月、間食を断つ', description: '30日間、間食なしの生活を続ける。', estMinutes: 0 },
  { id: 'vit-sp3', kind: 'special', category: 'VIT', rank: 'A', intensity: 'mid', title: '健康診断を受ける', description: '人間ドックや健康診断の予約・受診をする。', estMinutes: 60 },

  // ---------------- INT 知力 ----------------
  { id: 'int-l1', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '本を5ページ読む', description: '今読んでいる本、あるいは新しい本を5ページ読む。', estMinutes: 8 },
  { id: 'int-l2', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '気になるニュースを深掘りする', description: '気になるニュースを1つ選び、関連記事を2本以上読んで背景を理解する。', estMinutes: 10 },
  { id: 'int-l3', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '新しい言葉を3つ覚える', description: '知らなかった単語・用語を3つ調べて覚える。', estMinutes: 10 },
  { id: 'int-m1', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: 'スマホを手放して30分勉強', description: 'スマホを別の部屋に置き、タイマーで30分間集中して勉強する。', estMinutes: 30 },
  { id: 'int-m2', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: '専門書を1章読む', description: '学びたい分野の本を1章分読み進める。', estMinutes: 30 },
  { id: 'int-m3', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: 'オンライン講座を1レッスン', description: '興味のある講座を1レッスン分進める。', estMinutes: 25 },
  { id: 'int-h1', kind: 'daily', category: 'INT', rank: 'C', intensity: 'high', title: 'ポモドーロ学習4セット', description: '25分学習+5分休憩を1セットとして、4セット(合計2時間)行う。', estMinutes: 120 },
  { id: 'int-h2', kind: 'daily', category: 'INT', rank: 'B', intensity: 'high', title: '資格の過去問1年分', description: '目標とする資格試験の過去問を1年分解く。', estMinutes: 90 },
  { id: 'int-h3', kind: 'daily', category: 'INT', rank: 'C', intensity: 'high', title: '本を1冊読み切る', description: '手に取った本を最後まで読了する。', estMinutes: 90 },
  { id: 'int-item-textbook', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: '参考書を10ページ+章末問題', description: '参考書を10ページ進め、章末問題を解く。', estMinutes: 30, requiredItem: 'textbook' },
  { id: 'int-item-laptop', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: 'PCで作業・学習を30分', description: 'タイピング練習や資料作成など、PCを使った作業を30分行う。', estMinutes: 30, requiredItem: 'laptop' },
  { id: 'int-item-flashcards', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '単語帳を1周復習する', description: '単語帳を1周(約20語)復習する。', estMinutes: 10, requiredItem: 'flashcards' },
  { id: 'int-sp1', kind: 'special', category: 'INT', rank: 'A', intensity: 'mid', title: '1週間で本を1冊読了する', description: '7日以内に1冊、最後まで読み切る。', estMinutes: 30 },
  { id: 'int-sp2', kind: 'special', category: 'INT', rank: 'A', intensity: 'mid', title: '資格試験の学習計画を立てる', description: '目標資格を決め、試験に申し込み学習計画を作る。', estMinutes: 60 },
  { id: 'int-sp3', kind: 'special', category: 'INT', rank: 'S', intensity: 'high', title: '30日間、毎日30分学習する', description: '30日連続で30分以上の学習時間を確保する。', estMinutes: 30 },

  // ---------------- WIL 精神力 ----------------
  { id: 'wil-l1', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '3分間の深呼吸をする', description: '静かな場所で3分、呼吸に集中する。', estMinutes: 3 },
  { id: 'wil-l2', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '今日の感謝を1つ書く', description: '今日あった、感謝できることを1つ書き出す。', estMinutes: 3 },
  { id: 'wil-l3', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '30分スマホを置く', description: '意図的にスマホから離れる時間を30分作る。', estMinutes: 30 },
  { id: 'wil-m1', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '3行日記を書く', description: '「良かったこと1つ」「改善点1つ」「明日やること1つ」を3行で日記に書く。', estMinutes: 10 },
  { id: 'wil-m2', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '10分間瞑想する', description: '静かに座り、10分間マインドフルネスを行う。', estMinutes: 10 },
  { id: 'wil-m3', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '目標を紙に書き出す', description: '今の目標を紙に書き、達成度を確認する。', estMinutes: 10 },
  { id: 'wil-h1', kind: 'daily', category: 'WIL', rank: 'C', intensity: 'high', title: '半日デジタルデトックス', description: '半日、スマホ・SNSから完全に離れる。', estMinutes: 240 },
  { id: 'wil-h2', kind: 'daily', category: 'WIL', rank: 'C', intensity: 'high', title: '朝にタスク3つを書いて実行', description: '朝、その日やるタスクを3つ紙に書き出し、順番通りに実行する。', estMinutes: 15 },
  { id: 'wil-h3', kind: 'daily', category: 'WIL', rank: 'C', intensity: 'high', title: '苦手なタスクを片付ける', description: '先延ばしにしていたタスクに今日着手し終える。', estMinutes: 45 },
  { id: 'wil-item-notebook', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '手帳で今週を見直す', description: '手帳を開き、今週の予定と目標を確認・記入する。', estMinutes: 5, requiredItem: 'notebook' },
  { id: 'wil-item-cushion', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '座禅・瞑想15分', description: '瞑想クッションに座り、15分間座禅・瞑想を行う。', estMinutes: 15, requiredItem: 'meditation-cushion' },
  { id: 'wil-sp1', kind: 'special', category: 'WIL', rank: 'A', intensity: 'mid', title: '1週間毎日日記をつける', description: '7日間連続で振り返り日記を書く。', estMinutes: 10 },
  { id: 'wil-sp2', kind: 'special', category: 'WIL', rank: 'S', intensity: 'high', title: '21日間、瞑想を継続する', description: '21日間、毎日瞑想の習慣を続ける。', estMinutes: 10 },
  { id: 'wil-sp3', kind: 'special', category: 'WIL', rank: 'A', intensity: 'mid', title: '3ヶ月目標と週次レビューを作る', description: '3ヶ月後の目標を設定し、毎週見直す仕組みを作る。', estMinutes: 30 },

  // ---------------- CHA 魅力 ----------------
  { id: 'cha-l1', kind: 'daily', category: 'CHA', rank: 'F', intensity: 'low', title: '身だしなみを整える', description: '鏡の前で髪や服装をチェックし整える。', estMinutes: 5 },
  { id: 'cha-l2', kind: 'daily', category: 'CHA', rank: 'F', intensity: 'low', title: '誰かに感謝を伝える', description: '身近な人に「ありがとう」を言葉で伝える。', estMinutes: 2 },
  { id: 'cha-l3', kind: 'daily', category: 'CHA', rank: 'F', intensity: 'low', title: '自分から笑顔で挨拶する', description: '今日出会う誰かに、自分から挨拶する。', estMinutes: 1 },
  { id: 'cha-m1', kind: 'daily', category: 'CHA', rank: 'D', intensity: 'mid', title: '家族や友人に連絡する', description: 'しばらく話していない人にメッセージや電話をする。', estMinutes: 10 },
  { id: 'cha-m2', kind: 'daily', category: 'CHA', rank: 'D', intensity: 'mid', title: '初対面の人と会話する', description: '知らない人と短くても会話を交わしてみる。', estMinutes: 10 },
  { id: 'cha-m3', kind: 'daily', category: 'CHA', rank: 'D', intensity: 'mid', title: '見た目を新しくする', description: '髪型や服装など、見た目に小さな変化を加える。', estMinutes: 20 },
  { id: 'cha-h1', kind: 'daily', category: 'CHA', rank: 'C', intensity: 'high', title: '人前で発言・発表する', description: '会議やSNSなど、人前で自分の考えを発信する。', estMinutes: 15 },
  { id: 'cha-h2', kind: 'daily', category: 'CHA', rank: 'C', intensity: 'high', title: '新しいコミュニティに参加する', description: '興味のある集まりやイベントに実際に参加する。', estMinutes: 60 },
  { id: 'cha-h3', kind: 'daily', category: 'CHA', rank: 'C', intensity: 'high', title: '苦手な人と建設的に話す', description: '避けがちな相手と、落ち着いて対話をする。', estMinutes: 20 },
  { id: 'cha-item-mirror', kind: 'daily', category: 'CHA', rank: 'F', intensity: 'low', title: '姿見で身だしなみ・姿勢チェック', description: '姿見の前で身だしなみと姿勢を1分間チェックする。', estMinutes: 1, requiredItem: 'mirror' },
  { id: 'cha-sp1', kind: 'special', category: 'CHA', rank: 'A', intensity: 'mid', title: '1週間毎日誰かに感謝を伝える', description: '7日間、毎日1人に感謝の言葉を伝え続ける。', estMinutes: 3 },
  { id: 'cha-sp2', kind: 'special', category: 'CHA', rank: 'A', intensity: 'mid', title: '疎遠な人との関係を再構築する', description: '連絡が途絶えていた相手に連絡を取り、関係を繋ぎ直す。', estMinutes: 20 },
  { id: 'cha-sp3', kind: 'special', category: 'CHA', rank: 'S', intensity: 'high', title: '30分のプレゼンをやり遂げる', description: '人前で30分規模の発表・登壇を成し遂げる。', estMinutes: 30 },

  // ---------------- DEX 器用 ----------------
  { id: 'dex-l1', kind: 'daily', category: 'DEX', rank: 'F', intensity: 'low', title: '机の上を片付ける', description: '目の前の作業スペースを5分で整える。', estMinutes: 5 },
  { id: 'dex-l2', kind: 'daily', category: 'DEX', rank: 'F', intensity: 'low', title: '5分だけ手を動かして作る', description: '短時間でも、何かを作る・組み立てる時間を持つ。', estMinutes: 5 },
  { id: 'dex-l3', kind: 'daily', category: 'DEX', rank: 'F', intensity: 'low', title: 'タイピング練習を5分', description: 'タイピング練習サイトなどで5分練習する。', estMinutes: 5 },
  { id: 'dex-m1', kind: 'daily', category: 'DEX', rank: 'D', intensity: 'mid', title: '部屋を15分掃除する', description: '一部屋、あるいは一箇所を15分集中して掃除する。', estMinutes: 15 },
  { id: 'dex-m2', kind: 'daily', category: 'DEX', rank: 'D', intensity: 'mid', title: '新しいレシピを1品作る', description: '作ったことのない料理に挑戦してみる。', estMinutes: 30 },
  { id: 'dex-m3', kind: 'daily', category: 'DEX', rank: 'D', intensity: 'mid', title: '趣味の作業を30分行う', description: '創作・DIYなど、手を動かす趣味に取り組む。', estMinutes: 30 },
  { id: 'dex-h1', kind: 'daily', category: 'DEX', rank: 'C', intensity: 'high', title: 'スキル練習を2時間', description: '習得したいスキルに2時間集中して取り組む。', estMinutes: 120 },
  { id: 'dex-h2', kind: 'daily', category: 'DEX', rank: 'C', intensity: 'high', title: '部屋を大掃除する', description: '普段手をつけない場所まで含めて掃除する。', estMinutes: 90 },
  { id: 'dex-h3', kind: 'daily', category: 'DEX', rank: 'C', intensity: 'high', title: '小さな作品を完成させる', description: '着手していた制作物を1つ、完成まで持っていく。', estMinutes: 60 },
  { id: 'dex-item-sewing', kind: 'daily', category: 'DEX', rank: 'D', intensity: 'mid', title: '裁縫で繕い物を1つ仕上げる', description: '裁縫道具でボタン付けや簡単な繕い物を1つ仕上げる。', estMinutes: 20, requiredItem: 'sewing-kit' },
  { id: 'dex-item-instrument', kind: 'daily', category: 'DEX', rank: 'D', intensity: 'mid', title: '楽器を15分練習する', description: 'スケール練習または好きな曲のフレーズを15分練習する。', estMinutes: 15, requiredItem: 'instrument' },
  { id: 'dex-item-cookware', kind: 'daily', category: 'DEX', rank: 'D', intensity: 'mid', title: '新しい料理に挑戦する', description: '調理器具を使って、作ったことのない料理に1品挑戦する。', estMinutes: 30, requiredItem: 'cookware' },
  { id: 'dex-item-cleaning', kind: 'daily', category: 'DEX', rank: 'E', intensity: 'low', title: '1部屋を10分間集中掃除', description: '掃除用具一式を使って、1部屋を10分間集中して掃除する。', estMinutes: 10, requiredItem: 'cleaning-kit' },
  { id: 'dex-item-sketchbook', kind: 'daily', category: 'DEX', rank: 'F', intensity: 'low', title: '10分間自由に絵を描く', description: 'スケッチブックに10分間、テーマを決めず自由に描く。', estMinutes: 10, requiredItem: 'sketchbook' },
  { id: 'dex-sp1', kind: 'special', category: 'DEX', rank: 'A', intensity: 'mid', title: '1週間、部屋を整える習慣化', description: '7日間、毎日少しずつ部屋を整える。', estMinutes: 10 },
  { id: 'dex-sp2', kind: 'special', category: 'DEX', rank: 'S', intensity: 'high', title: '30日で新しいスキルを習得する', description: '30日間かけて、新しいスキルを実用レベルまで身につける。', estMinutes: 30 },
  { id: 'dex-sp3', kind: 'special', category: 'DEX', rank: 'A', intensity: 'mid', title: 'ポートフォリオを1つ完成させる', description: '自分の作品・実績をまとめた成果物を完成させる。', estMinutes: 90 },
]

export function templatesByKind(kind: QuestTemplate['kind']): QuestTemplate[] {
  return QUEST_TEMPLATES.filter((t) => t.kind === kind)
}
