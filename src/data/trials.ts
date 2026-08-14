import type { Rank } from '../types'

export interface TrialInfo {
  title: string
  description: string
  estMinutes: number
  rank: Rank
}

/** Lv.10到達時、Tier1ジョブごとの昇級試練。突破するとジョブチェンジ・進化が解放される。 */
export const EVOLUTION_TRIALS: Record<string, TrialInfo> = {
  swordsman: {
    title: '剣士の昇級試練・千の型',
    description: '休まず60分、全力で身体を鍛え抜く。次の段階へ進む資格を、その身で示せ。',
    estMinutes: 60,
    rank: 'A',
  },
  guardian: {
    title: '守護騎士の昇級試練・不動の構え',
    description: '睡眠・食事・運動のすべてを整えた1日を過ごし、崩れない土台を証明する。',
    estMinutes: 0,
    rank: 'A',
  },
  mage: {
    title: '魔道士の昇級試練・叡智の探求',
    description: '専門分野の書物や資料に、休まず60分向き合い、理解を一段深める。',
    estMinutes: 60,
    rank: 'A',
  },
  priest: {
    title: '神官の昇級試練・静寂の行',
    description: '雑念を払い、30分間の深い瞑想と内省を通して、揺るがぬ心を示す。',
    estMinutes: 30,
    rank: 'A',
  },
  bard: {
    title: '吟遊詩人の昇級試練・語りの真髄',
    description: '人前で話す・発表する・演奏するなど、人の心を動かす行為に本気で挑む。',
    estMinutes: 30,
    rank: 'A',
  },
  thief: {
    title: '盗賊の昇級試練・神速の指先',
    description: '精密さと速さを競う細かい作業を、ミスなく30分やり遂げる。',
    estMinutes: 30,
    rank: 'A',
  },
}

/** Lv.20到達時、ユニークジョブごとの昇級試練。突破すると最終形態(Tier3)への進化が解放される。 */
export const GRAND_TRIALS: Record<string, TrialInfo> = {
  sage: {
    title: '賢者の大試練・叡智の頂',
    description: '専門分野の知識を90分間、ノートにまとめながら深く掘り下げる。賢者としての集大成。',
    estMinutes: 90,
    rank: 'S',
  },
  dragoon: {
    title: '竜騎士の大試練・竜の咆哮',
    description: '全力の運動を90分間やり遂げる。竜と真に同格たりうるかを、その身で証明する。',
    estMinutes: 90,
    rank: 'S',
  },
  paladin: {
    title: '聖騎士の大試練・不屈の誓い',
    description: '鍛錬と祈りを合わせて90分。力と信念、その両方が本物であることを示す。',
    estMinutes: 90,
    rank: 'S',
  },
  alchemist: {
    title: '錬金術師の大試練・賢者の石',
    description: '新しい知識・技術の習得と、それを活かした実践を合わせて90分間行う。',
    estMinutes: 90,
    rank: 'S',
  },
}
