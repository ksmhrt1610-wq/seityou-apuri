import type { QuestTemplate } from '../types'

/**
 * Master quest library. The daily board is sampled from `kind: 'daily'`
 * templates matching the player's interests/intensity; `kind: 'special'`
 * templates are browsable in the Special Quest catalog and persist until
 * completed or abandoned.
 */
export const QUEST_TEMPLATES: QuestTemplate[] = [
  // ---------------- STR 筋力 ----------------
  { id: 'str-l1', kind: 'daily', category: 'STR', rank: 'F', intensity: 'low', title: '軽いストレッチをする', description: '全身を5分ほど伸ばして、身体をほぐそう。', estMinutes: 5 },
  { id: 'str-l2', kind: 'daily', category: 'STR', rank: 'F', intensity: 'low', title: 'エレベーターより階段を使う', description: '移動のどこか一箇所で、階段を選んでみよう。', estMinutes: 3 },
  { id: 'str-l3', kind: 'daily', category: 'STR', rank: 'E', intensity: 'low', title: '10分歩きに出る', description: '近所を10分だけ歩いてくる。散歩でも早歩きでもOK。', estMinutes: 10 },
  { id: 'str-m1', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '自重トレーニング30回', description: '腕立て・腹筋・スクワットを合計30回行う。', estMinutes: 15 },
  { id: 'str-m2', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '20分のジョギング', description: '無理のないペースで20分走る。', estMinutes: 20 },
  { id: 'str-m3', kind: 'daily', category: 'STR', rank: 'D', intensity: 'mid', title: '自重トレーニング15分', description: '好きなメニューを組んで15分間身体を動かす。', estMinutes: 15 },
  { id: 'str-h1', kind: 'daily', category: 'STR', rank: 'B', intensity: 'high', title: '本格トレーニング45分', description: 'ジムなどで45分以上、追い込んで鍛える。', estMinutes: 45 },
  { id: 'str-h2', kind: 'daily', category: 'STR', rank: 'B', intensity: 'high', title: '5km走る', description: 'ペースは気にせず5kmを走りきる。', estMinutes: 35 },
  { id: 'str-h3', kind: 'daily', category: 'STR', rank: 'C', intensity: 'high', title: 'HIIT20分', description: '高強度インターバルトレーニングを20分行う。', estMinutes: 20 },
  { id: 'str-sp1', kind: 'special', category: 'STR', rank: 'A', intensity: 'mid', title: '1週間、毎日身体を動かす', description: '7日間、毎日何らかの運動を行い続ける。', estMinutes: 15 },
  { id: 'str-sp2', kind: 'special', category: 'STR', rank: 'A', intensity: 'high', title: '10kmを走り切る', description: 'タイムは気にせず、10kmという距離を完走する。', estMinutes: 70 },
  { id: 'str-sp3', kind: 'special', category: 'STR', rank: 'S', intensity: 'high', title: '筋トレを1ヶ月継続する', description: '週3回以上のトレーニングを1ヶ月続ける。', estMinutes: 30 },

  // ---------------- VIT 体力 ----------------
  { id: 'vit-l1', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '水をコップ1杯多く飲む', description: 'いつもより多めに水分をとる。', estMinutes: 1 },
  { id: 'vit-l2', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '朝日を浴びる', description: '起きたらカーテンを開けて日光を浴びる。', estMinutes: 3 },
  { id: 'vit-l3', kind: 'daily', category: 'VIT', rank: 'F', intensity: 'low', title: '寝る準備を早めに始める', description: 'いつもより5分早く就寝の支度を始める。', estMinutes: 5 },
  { id: 'vit-m1', kind: 'daily', category: 'VIT', rank: 'D', intensity: 'mid', title: '7時間睡眠を確保する', description: '逆算して寝る時間を決め、7時間眠る。', estMinutes: 0 },
  { id: 'vit-m2', kind: 'daily', category: 'VIT', rank: 'D', intensity: 'mid', title: '野菜を意識して1食摂る', description: 'どこかの食事で野菜を主役にする。', estMinutes: 10 },
  { id: 'vit-m3', kind: 'daily', category: 'VIT', rank: 'D', intensity: 'mid', title: '間食を1回控える', description: 'いつも食べる間食を1回だけ我慢する。', estMinutes: 0 },
  { id: 'vit-h1', kind: 'daily', category: 'VIT', rank: 'C', intensity: 'high', title: '1日の食事を整える', description: '3食すべて栄養バランスを意識して食べる。', estMinutes: 20 },
  { id: 'vit-h2', kind: 'daily', category: 'VIT', rank: 'C', intensity: 'high', title: '23時までに就寝する', description: '今日は23時までにベッドに入る。', estMinutes: 0 },
  { id: 'vit-h3', kind: 'daily', category: 'VIT', rank: 'C', intensity: 'high', title: '1時間ごとに立ち上がる', description: '座りっぱなしを避け、1時間おきに身体を動かす。', estMinutes: 5 },
  { id: 'vit-sp1', kind: 'special', category: 'VIT', rank: 'A', intensity: 'mid', title: '1週間、23時までに寝る', description: '7日間連続で23時までに就寝する。', estMinutes: 0 },
  { id: 'vit-sp2', kind: 'special', category: 'VIT', rank: 'S', intensity: 'high', title: '1ヶ月、間食を断つ', description: '30日間、間食なしの生活を続ける。', estMinutes: 0 },
  { id: 'vit-sp3', kind: 'special', category: 'VIT', rank: 'A', intensity: 'mid', title: '健康診断を受ける', description: '人間ドックや健康診断の予約・受診をする。', estMinutes: 60 },

  // ---------------- INT 知力 ----------------
  { id: 'int-l1', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '本を5ページ読む', description: '今読んでいる本、あるいは新しい本を5ページ読む。', estMinutes: 8 },
  { id: 'int-l2', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '気になるニュースを深掘りする', description: '見出しで終わらせず、1つの記事をしっかり読む。', estMinutes: 10 },
  { id: 'int-l3', kind: 'daily', category: 'INT', rank: 'F', intensity: 'low', title: '新しい言葉を3つ覚える', description: '知らなかった単語・用語を3つ調べて覚える。', estMinutes: 10 },
  { id: 'int-m1', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: '30分集中して勉強する', description: 'スマホを離して30分、学習に集中する。', estMinutes: 30 },
  { id: 'int-m2', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: '専門書を1章読む', description: '学びたい分野の本を1章分読み進める。', estMinutes: 30 },
  { id: 'int-m3', kind: 'daily', category: 'INT', rank: 'D', intensity: 'mid', title: 'オンライン講座を1レッスン', description: '興味のある講座を1レッスン分進める。', estMinutes: 25 },
  { id: 'int-h1', kind: 'daily', category: 'INT', rank: 'C', intensity: 'high', title: '2時間の学習セッション', description: '休憩を挟みつつ合計2時間、学習に取り組む。', estMinutes: 120 },
  { id: 'int-h2', kind: 'daily', category: 'INT', rank: 'B', intensity: 'high', title: '資格の過去問1年分', description: '目標とする資格試験の過去問を1年分解く。', estMinutes: 90 },
  { id: 'int-h3', kind: 'daily', category: 'INT', rank: 'C', intensity: 'high', title: '本を1冊読み切る', description: '手に取った本を最後まで読了する。', estMinutes: 90 },
  { id: 'int-sp1', kind: 'special', category: 'INT', rank: 'A', intensity: 'mid', title: '1週間で本を1冊読了する', description: '7日以内に1冊、最後まで読み切る。', estMinutes: 30 },
  { id: 'int-sp2', kind: 'special', category: 'INT', rank: 'A', intensity: 'mid', title: '資格試験の学習計画を立てる', description: '目標資格を決め、試験に申し込み学習計画を作る。', estMinutes: 60 },
  { id: 'int-sp3', kind: 'special', category: 'INT', rank: 'S', intensity: 'high', title: '30日間、毎日30分学習する', description: '30日連続で30分以上の学習時間を確保する。', estMinutes: 30 },

  // ---------------- WIL 精神力 ----------------
  { id: 'wil-l1', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '3分間の深呼吸をする', description: '静かな場所で3分、呼吸に集中する。', estMinutes: 3 },
  { id: 'wil-l2', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '今日の感謝を1つ書く', description: '今日あった、感謝できることを1つ書き出す。', estMinutes: 3 },
  { id: 'wil-l3', kind: 'daily', category: 'WIL', rank: 'F', intensity: 'low', title: '30分スマホを置く', description: '意図的にスマホから離れる時間を30分作る。', estMinutes: 30 },
  { id: 'wil-m1', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '振り返り日記を書く', description: '今日の出来事・気づきを日記に残す。', estMinutes: 10 },
  { id: 'wil-m2', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '10分間瞑想する', description: '静かに座り、10分間マインドフルネスを行う。', estMinutes: 10 },
  { id: 'wil-m3', kind: 'daily', category: 'WIL', rank: 'D', intensity: 'mid', title: '目標を紙に書き出す', description: '今の目標を紙に書き、達成度を確認する。', estMinutes: 10 },
  { id: 'wil-h1', kind: 'daily', category: 'WIL', rank: 'C', intensity: 'high', title: '半日デジタルデトックス', description: '半日、スマホ・SNSから完全に離れる。', estMinutes: 240 },
  { id: 'wil-h2', kind: 'daily', category: 'WIL', rank: 'C', intensity: 'high', title: '朝に1日の計画を立てて実行', description: '朝にその日の行動計画を立て、計画通りに動く。', estMinutes: 15 },
  { id: 'wil-h3', kind: 'daily', category: 'WIL', rank: 'C', intensity: 'high', title: '苦手なタスクを片付ける', description: '先延ばしにしていたタスクに今日着手し終える。', estMinutes: 45 },
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
  { id: 'dex-sp1', kind: 'special', category: 'DEX', rank: 'A', intensity: 'mid', title: '1週間、部屋を整える習慣化', description: '7日間、毎日少しずつ部屋を整える。', estMinutes: 10 },
  { id: 'dex-sp2', kind: 'special', category: 'DEX', rank: 'S', intensity: 'high', title: '30日で新しいスキルを習得する', description: '30日間かけて、新しいスキルを実用レベルまで身につける。', estMinutes: 30 },
  { id: 'dex-sp3', kind: 'special', category: 'DEX', rank: 'A', intensity: 'mid', title: 'ポートフォリオを1つ完成させる', description: '自分の作品・実績をまとめた成果物を完成させる。', estMinutes: 90 },
]

export function templatesByKind(kind: QuestTemplate['kind']): QuestTemplate[] {
  return QUEST_TEMPLATES.filter((t) => t.kind === kind)
}
