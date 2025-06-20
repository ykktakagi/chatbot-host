// data/mfConfig.ts
export type MfTopic = {
  label: string;
  aliases: string[];
};

export const mfTopics: MfTopic[] = [
  {
      "label": "年齢別人口",
      "aliases": [
      "年代別人口",
      "若い人の数",
      "高齢者の数",
      "年齢構成",
      "若い人は多い？",
      "高齢者が多い？",
      "子どもが多い街？",
      "働いてる世代が多い？",
      "年齢層のバランス",
      "高齢化してる？",
      "若者が少ない？",
      "このあたりはファミリー層が多いですよ",
      "シニア層に人気の地域です",
      "子どもの割合は？",
      "高齢者がどれくらい住んでる？",
      "働き盛りの人が多い？",
      "老後も安心して住める？",
      "保育園や学校が必要な家庭が多い？",
      "このあたりは定年後に住む人が増えてます",
      "若い世代が流入してきてますよ",
      "子育て世代にちょうどいい年齢層の構成です",
      "お年寄りが安心して暮らせる環境が整っています",
      "年代構成のバランスは良いですか？"
    ]
  },
  {
      "label": "年齢別人口の年推移",
      "aliases": [
      "年代別人口の推移",
      "年齢構成の変化",
      "人口年推移",
      "昔より高齢化してる？",
      "年齢構成の変化ってある？",
      "若い人が減ってる？",
      "子どもは増えてる？",
      "人口の入れ替わりある？",
      "高齢化が進んでる？",
      "子どもが減ってきた？",
      "若者が減少傾向？",
      "昔と比べて年齢層はどう？",
      "今と昔で世代のバランスが違う？",
      "若い人が出て行ってしまってる？",
      "この地域は昔より高齢者が増えてますね",
      "子育て世代が減っている印象があります",
      "将来的に年齢バランスは大丈夫？",
      "人口ピラミッドに偏りある？",
      "今後の年齢構成がちょっと不安"
    ]
  },
  {
      "label": "通学・通勤スタイル",
      "aliases": [
      "どこまで通勤してる？",
      "通勤・通学先はどこが多い？",
      "市内で通学する人は多い？",
      "県外に通勤してる人は多い？",
      "他の市に通ってる人は多い？",
      "地元で働いてる人が多い？",
      "市外に出る人が多い？",
      "この地域の通勤圏は？",
      "通勤通学の範囲はどのくらい？",
      "電車や車で遠くまで通う人が多い？",
      "都内に通ってる人はどれくらい？",
      "通勤先はバラバラ？",
      "みんな地元で働いてる？",
      "この街から通ってる人って多い？",
      "職場・学校が市内にある人は多い？",
      "外から来る人も多いです",
      "ここから東京に通う人も多いですね",
      "地元就職する人が多い地域です",
      "遠くに通うのは大変そう？",
      "周辺都市に通ってる人が多いエリアです"
    ]
  },
  {
      "label": "通学・通勤スタイルの年推移",
      "aliases": [
      "通学・通勤の推移",
      "通学スタイルの変化",
      "通勤スタイルの年推移",
      "昔はどこに通ってたの？",
      "最近は市外に通う人が増えてる？",
      "地元で働く人って減ってる？",
      "東京に通う人は増えてきてる？",
      "以前はもっと市内通勤が多かった？",
      "他県に通ってる人って前より増えた？",
      "昔はみんな地元で働いてた？",
      "近くで働く人が減ってきた？",
      "地元就職が減ってる？",
      "昔より通勤距離が長くなってる？",
      "このあたりベッドタウン化してきた？",
      "通勤通学の距離が変わってきた？",
      "昔に比べて通学範囲は広がってる？",
      "最近は周辺都市に通ってる人が多くなってきた",
      "市外への通勤・通学が増えてきましたね",
      "生活圏が広がってきてる印象です",
      "ここ数十年で地元で働く人の割合が変わった"
    ]
  },
  {
      "label": "世帯の種類",
      "aliases": [
      "世帯タイプ",
      "単身世帯",
      "核家族世帯",
      "夫婦世帯",
      "一人暮らし",
      "一人暮らしは多い？",
      "家族世帯が多い？",
      "高齢夫婦だけの世帯が多い？",
      "どんな世帯構成が多い？",
      "ファミリー向けの地域？",
      "独身の方にも選ばれています",
      "どんな人が住んでるの？",
      "この地域は単身者が多い？",
      "一人暮らしの人が多い街？",
      "家族で住んでる人が多い？",
      "核家族中心の地域？",
      "親と同居してる人は多い？",
      "DINKsに向いてる？",
      "ファミリー世帯の割合は？",
      "シェアハウス的な住まいも多い？",
      "老夫婦だけの家庭は多い？",
      "子育てファミリーが多く住んでる？",
      "独身でも住みやすい？",
      "シニア単身でも安心？"
    ]
  },
  {
      "label": "世帯の種類の年推移",
      "aliases": [
      "世帯構成の変化",
      "世帯タイプの推移",
      "世帯の年推移",
      "昔より一人暮らしが増えてる？",
      "ファミリーが減ってる？",
      "最近はどんな人が住んでる？",
      "単身者が増えてきた？",
      "昔より家族世帯が減った？",
      "このエリアは単身向けが増えてる？",
      "昔に比べて家族構成が変わった？",
      "独身者が住む街になってきた？",
      "ファミリーより単身者が増加中？",
      "一人暮らしが当たり前になってきた？",
      "家族形態に変化がある？",
      "核家族中心の街だったけど今は違う？",
      "共働き夫婦が多くなってる？",
      "昔は3世代同居が多かった？",
      "世帯の形が多様化してきた？",
      "この街の住み方はどう変わってきた？",
      "昔より世帯が分かれて暮らす傾向？",
      "今は一人で住む方が主流？"
    ]
  },
  {
      "label": "65歳以上の人のいる核家族世帯",
      "aliases": [
      "高齢者のいる世帯",
      "65歳以上がいる世帯",
      "高齢者核家族",
      "お年寄りだけで住んでる家が多い？",
      "高齢者が家族と住んでる？",
      "高齢者が一人じゃないか心配",
      "高齢者世帯の割合は？",
      "おじいちゃんおばあちゃんと一緒に住んでる家って多い？",
      "親と同居している家庭は多い？",
      "介護しやすい環境？",
      "老夫婦と息子夫婦が一緒に暮らす家って多い？",
      "高齢者の家族同居率は？",
      "ひとり暮らしの高齢者は多い？",
      "高齢者が孤立してない？",
      "老後に家族と暮らせる地域？",
      "親を呼び寄せて住む人が多い？",
      "高齢者のいる家庭が目立つ地域？",
      "三世代で住むケースは多い？",
      "子育てと介護の両立が必要な世帯は？",
      "親と一緒に住んでいる人ってどれくらいいる？",
      "高齢者と同居する家庭に向いてる？"
    ]
  },
  {
      "label": "65歳以上の人のいる核家族世帯の年推移",
      "aliases": [
      "高齢者世帯の推移",
      "高齢者核家族の推移",
      "65歳以上の家族構成の変化",
      "高齢者と家族が一緒に暮らす家庭って増えてる？",
      "親と同居してる人が増えてる？",
      "老後に家族と住むケースは増えてきた？",
      "介護のために親と住む人が増えてきた？",
      "昔より高齢者の同居が多くなってる？",
      "高齢の親を呼び寄せる家庭が増えてきた？",
      "三世代同居は増えてる？減ってる？",
      "年々、親と一緒に住む人が増加中？",
      "昔より一人暮らしよりも同居が増えてきた？",
      "高齢化とともに家族構成が変化してる？",
      "高齢者の家族同居率の推移を知りたい",
      "家族に支えられる高齢者が増えている？",
      "この地域は介護のために親と住む人が増えた？"
    ]
  },
  {
      "label": "就業者数（国勢調査）",
      "aliases": [
      "働いている人の数",
      "就業人口",
      "就業者数",
      "仕事をしている人",
      "主婦も働いてる？",
      "休業中の人って多い？",
      "この街は働いてる人が多い？",
      "共働きが多いエリア？",
      "主婦が仕事してる割合は？",
      "学生バイトしてる人多い？",
      "パートやアルバイトの人も含まれてる？",
      "専業主婦はどれくらい？",
      "通学しながら働いてる人って多い？",
      "病気や育休で仕事を休んでる人も多い？",
      "フルタイム勤務の人は多い？",
      "このあたりは働く人の割合が高いです",
      "家事をしながら働く人が多いですね",
      "就労スタイルが多様化してます",
      "主に仕事してる人って何％ぐらい？",
      "休職中の人の割合ってどう？"
    ]
  },
  {
      "label": "就業者数（国勢調査）の年推移",
      "aliases": [
      "就業人口の推移",
      "働いている人の推移",
      "仕事している人の変化",
      "昔より働く人が増えてる？",
      "共働きは増えてきた？",
      "主婦が働くようになってきた？",
      "休業してる人は減ってきてる？",
      "昔はフルタイムが主流だった？",
      "今はパートや家事との両立が多い？",
      "学生のアルバイトって増えてる？",
      "年々仕事のスタイルは変わってる？",
      "就労形態の変化が見える？",
      "時代とともに働き方が変化してる？",
      "この街の働く人の傾向はどう変わってきた？"
    ]
  },
  {
      "label": "店舗数",
      "aliases": [
      "お店の数",
      "店舗の数",
      "お店はいくつある？",
      "飲食店は多い？",
      "スーパーは近い？",
      "ショッピングモールある？",
      "買い物に困らない？",
      "コンビニ多い？",
      "外食できる場所って多い？",
      "駅前にお店が多い？",
      "ホームセンターはある？",
      "商業施設が充実してる？",
      "このあたりは買い物しやすい？",
      "食事できるところは多い？",
      "百貨店はある？",
      "大型店はある？",
      "歩いて買い物行ける？",
      "この街は生活しやすい？",
      "生活圏にお店が多い？",
      "近くに外食できるところある？"
    ]
  },
  {
      "label": "店舗数の年推移",
      "aliases": [
      "店舗の数の推移",
      "お店の数の年推移",
      "飲食店の変化",
      "大型店の推移",
      "昔に比べてお店は減ってる？",
      "昔より飲食店が少なくなった？",
      "スーパーとか閉店してない？",
      "最近はお店が増えてる？減ってる？",
      "外食できる場所って減ってる？",
      "大型ショッピングモールは減ってる？",
      "百貨店の数は昔と比べてどう？",
      "買い物環境は変化してる？",
      "この街はお店が減ってきた印象ある？",
      "以前はもっと賑わってた？",
      "店舗数の推移を見ると活気が減ってきてる？",
      "新しい店より閉店の方が多い？",
      "昔と比べて生活のしやすさ変わった？"
    ]
  },
  {
      "label": "店舗割合",
      "aliases": [
      "商店割合",
      "店舗比率",
      "お店の割合",
      "人口に対する店舗数",
      "住民一人当たりの店の数",
      "人に対してお店は多い？",
      "飲食店って多い方？",
      "人口の割にスーパー少なくない？",
      "お店の密度はどう？",
      "生活に困らない程度に店はある？",
      "この街って買い物しやすい方？",
      "人が多いのにお店が少ない？",
      "この地域は飲食店が集中してる？",
      "人口の割に外食できるところ多い？",
      "人口あたりのお店の多さはどう？",
      "商業施設の密集度って高い？",
      "この街はどれくらい便利？",
      "人とお店のバランスって取れてる？",
      "生活圏に対してお店が足りてる？"
    ]
  },
  {
      "label": "店舗割合の年推移",
      "aliases": [
      "店舗割合の推移",
      "商店比率の推移",
      "お店の密度の変化",
      "昔と比べてお店の密度は？",
      "人口のわりにお店が増えてる？",
      "買い物環境の変化ってある？",
      "飲食店の割合って変わってきてる？",
      "人に対してお店は減ってきてる？",
      "このあたり昔はもっとお店が多かった？",
      "人口減ってお店の割合は変わってきた？",
      "密度が高くなってきてる？",
      "人と店のバランス変わってる？",
      "買い物しやすさはどう変わってきてる？",
      "この街って便利になってきた？",
      "商業施設が減って不便になってない？"
    ]
  },
  {
      "label": "住宅の所有数",
      "aliases": [
      "住宅数",
      "家の数",
      "何軒ある？",
      "いくつ家が建ってる？",
      "持ち家が多い？",
      "借家が多い？",
      "賃貸が中心？",
      "定住志向の方が多いエリアです",
      "この地域は持ち家率が高い？",
      "一戸建てで持ってる人が多い？",
      "賃貸マンションが多い？",
      "賃貸に住んでる人が多い？",
      "この街は持ち家と借家どっちが多い？",
      "マイホーム派が多い地域？",
      "転勤族に向いてる？",
      "住宅の所有傾向ってどうなってる？"
    ]
  },
  {
      "label": "住宅の所有数の年推移",
      "aliases": [
      "住宅数の推移",
      "家の数の推移",
      "持ち家の変化",
      "借家の推移",
      "昔に比べて家は増えてる？",
      "持ち家って増えてきてる？",
      "賃貸が増えてきた？",
      "住宅事情って変わってる？",
      "昔と比べて家の所有状況は？",
      "どんどん家が建ってる？",
      "持ち家派が増えてきた？",
      "賃貸派が増えてきた？",
      "住宅の供給ってどう変わってる？",
      "最近はマンションが増えてる？",
      "昔はもっと持ち家が少なかった？",
      "住まいのスタイルが変わってきた？"
    ]
  },
  {
      "label": "住宅の建て方",
      "aliases": [
      "住宅のタイプ",
      "戸建ての種類",
      "建築様式",
      "戸建てが多い？",
      "アパートタイプ？",
      "マンションタイプが多い？",
      "集合住宅が多い？",
      "この地域は戸建てが多いの？",
      "一軒家とマンションどっちが多い？",
      "アパート暮らしの人が多い？",
      "分譲マンションが多い？",
      "低層住宅が中心？",
      "マンション街っぽい？",
      "戸建て希望なら合ってる？",
      "ファミリーが住む家は多い？",
      "テラスハウスってある？",
      "長屋みたいなタイプも多い？",
      "住まいのスタイルはどんな感じ？"
    ]
  },
  {
      "label": "住宅の建て方の年推移",
      "aliases": [
      "建て方の推移",
      "住宅タイプの推移",
      "戸建ての変化",
      "集合住宅の変化",
      "昔よりアパートが増えてる？",
      "最近マンションが増えてきた？",
      "戸建ては減ってる？増えてる？",
      "このあたりはマンションだらけになってきた？",
      "住宅の形が変わってきてる？",
      "最近は集合住宅が主流になってきた？",
      "建物のスタイルが時代とともに変化してる？",
      "昔は戸建てばかりだった？",
      "最近はアパートばかり建ってる？",
      "長屋みたいな家は減ってきた？",
      "ファミリー向けの家って増えてる？",
      "一人暮らし向けの集合住宅が増加中？"
    ]
  },
  {
      "label": "住宅の構造",
      "aliases": [
      "住宅構造",
      "木造住宅",
      "鉄筋住宅",
      "建物構造",
      "木造の家が多い？",
      "鉄筋の家はある？",
      "地震に強い建物多い？",
      "この地域は木造が主流？",
      "耐火構造の家って多い？",
      "鉄骨造の建物が多い？",
      "コンクリート造りの建物は多い？",
      "アパートは木造？鉄筋？",
      "火事に強い構造になってる？",
      "マンションは鉄筋？",
      "昔ながらの木造住宅が多い地域？",
      "ハイツやメゾネットはどんな構造？",
      "住宅の造りって安全性に影響ある？",
      "最近は非木造が増えてきてる？"
    ]
  },
  {
      "label": "住宅の構造の年推移",
      "aliases": [
      "住宅の構造の推移",
      "住宅構造の変化",
      "木造が多いか",
      "鉄筋が増えているか",
      "昔と比べて住宅の構造って変わってきてる？",
      "非木造って増えてる？",
      "最近は耐火性のある家が多くなってきた？",
      "防火構造の家は増加傾向？",
      "昔は木造ばかりだった？",
      "最近は鉄骨の家が主流？",
      "地震や火事を意識した家が増えてきてる？",
      "集合住宅の構造が時代とともに変化？",
      "建築様式って時代でどう変わる？",
      "鉄筋コンクリート造の家が増加中？",
      "古い家と新しい家で構造に違いがある？"
    ]
  },
  {
      "label": "住宅の建築時期",
      "aliases": [
      "築年数",
      "建築年代",
      "建設時期",
      "古い家が多い？",
      "新しい家は多い？",
      "築浅物件はある？"
    ]
  },
  {
      "label": "居住室の畳数別住宅数",
      "aliases": [
      "部屋の広さ別住宅数",
      "畳数ごとの住宅数",
      "広さ別の住宅",
      "狭い家が多い？",
      "この街ってワンルーム多い？",
      "広い部屋が主流？",
      "畳で見るとどのくらいの広さが多い？",
      "一人暮らし向けの狭い部屋が多い？",
      "6畳や8畳の部屋ってどれくらいある？",
      "ファミリー向けの広い部屋は少ない？",
      "学生用アパートみたいな広さの家が多い？",
      "生活に余裕ある広さの家が多い？",
      "コンパクトな家が多い地域？",
      "このあたりはどんな間取りが主流？",
      "一人向け？それとも家族向け？"
    ]
  },
  {
      "label": "1住宅当たり延べ面積の年推移",
      "aliases": [
      "住宅面積",
      "延べ面積",
      "住宅一戸当たり面積",
      "平均的な家の広さ",
      "昔より広い家が増えてる？",
      "最近の家って狭くなってる？",
      "延べ床面積の推移を知りたい",
      "この地域の家って広い？",
      "昔と比べてゆとりある家になってる？",
      "コンパクト住宅が増えてきた？",
      "家の面積は増えてる？減ってる？",
      "住宅の広さの傾向が変わってきた？",
      "都市化で狭くなってきてる？",
      "ファミリー向けの広さは十分ある？",
      "1軒あたりの広さってどれくらい？",
      "家族で住むのに狭すぎない？"
    ]
  },
  {
      "label": "最寄りの保育所までの距離の住宅数（普通世帯）",
      "aliases": [
      "保育所距離別住宅数",
      "近くの保育所までの距離",
      "保育園は近い？",
      "保育所に通いやすい？",
      "家から保育園まで遠い？",
      "保育園に歩いて行ける？",
      "保育施設って近くにある？",
      "小さい子どもを預ける場所は近い？",
      "子育てしやすい立地？",
      "保育所が近いと通いやすくて安心？",
      "保育所に徒歩で行ける範囲？",
      "保育園に毎日通うの大変じゃない？",
      "保育園の送迎に時間がかかる？",
      "この地域は保育所が密集してる？",
      "保育所の距離感ってどれくらい？",
      "保育園が遠いと共働きに不便？",
      "赤ちゃん連れでも通いやすい地域？"
    ]
  },
  {
      "label": "教育施設数[/可住地面積100k㎡]",
      "aliases": [
      "学校の数",
      "教育機関数",
      "学校数",
      "小学校は近い？",
      "中学校に通いやすい？"
    ]
  },
  {
      "label": "教育施設数",
      "aliases": [
      "学校の数",
      "教育機関数",
      "学校数",
      "幼稚園って多い？",
      "小学校は近くにある？",
      "中学校の数はどれくらい？",
      "高校は近い？",
      "教育環境は充実してる？",
      "学校に通いやすい地域？",
      "この地域は子育てしやすい？",
      "子どもが通う学校って多い？",
      "教育機関がしっかり整備されてる？",
      "共働きでも安心して子どもを通わせられる？",
      "学校が少ないと混雑してる？",
      "教育施設は徒歩圏にある？",
      "進学しやすい地域？",
      "この地域の学区はどうなってる？"
    ]
  },
  {
      "label": "通勤・通学手段別人数",
      "aliases": [
      "通勤手段別人数",
      "通学手段別人数",
      "通勤方法の人数",
      "通勤に何使ってる？",
      "通学に何使ってる？",
      "電車通勤が多い？",
      "徒歩で通える人は多い？",
      "自転車通勤してる人は多い？",
      "自家用車で通ってる人って多い？",
      "この街は電車社会？",
      "みんな通勤は車？",
      "通勤ラッシュってどう？",
      "公共交通の利用者はどれくらい？",
      "通勤手段は多様？",
      "子どもは何で通ってる？",
      "学生は電車通学？",
      "駅まで歩いてる人多い？",
      "車がないと厳しい街？",
      "自転車で通える距離が多い？",
      "複数の交通手段を使ってる人が多い？"
    ]
  },
  {
    "label": "人口推移",
    "aliases": [
      "人口の変化",
      "人口トレンド",
      "人口は増えてる？",
      "人口減少",
      "人口増加",
      "人口の推移",
      "住民数の変化",
      "人口動態",
      "人口統計",
      "この地域の人口は？",
      "人口が減ってる？",
      "人口が増加してる？",
      "住民は増えてる？",
      "過疎化してる？",
      "人口密度の変化"
    ]
  },
  {
    "label": "公示価格推移",
    "aliases": [
      "地価の変化",
      "土地価格",
      "不動産価格推移",
      "地価は上がってる？",
      "公示地価",
      "土地の値段",
      "地価動向",
      "不動産相場",
      "土地価格の推移",
      "地価トレンド",
      "土地が高くなってる？",
      "地価の上昇",
      "不動産価格の変化",
      "土地の相場",
      "地価情報"
    ]
  },
  {
    "label": "駅乗降人員推移",
    "aliases": [
      "駅の利用者数",
      "電車利用者",
      "駅の混雑",
      "乗降客数の変化",
      "駅利用者の推移",
      "電車の利用状況",
      "駅の人の流れ",
      "通勤ラッシュ",
      "駅の賑わい",
      "電車の混雑度",
      "駅利用者数の変化",
      "乗客数の推移",
      "駅の活用度",
      "交通量の変化"
    ]
  }
];
 
  // ここから追加：各トピックに対応する ChartWrapper 用パラメータ
export interface MfChartConfig {
  chartTitle?: string;
  chartType: string;
  source: string;
  dataKey: string;
  targetYear: string;
  prefectureCode: number;
  prefecture: string;
  localGovCode: number;
  localGov: string;
  axisConfig: {
    xKey: string;
    yKey: string;
    categoryLabel: string;
    xLabel: string;
    yLabel: string;
    unit: string;
  };
}

// トピックごとのチャート設定
export const mfChartConfigs: Record<string, MfChartConfig> = {
  "年齢別人口": {
    chartType: "円グラフ",
    source: "統計ダッシュボード",
    dataKey: "年齢別人口",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: ""
    }
  },
  "年齢別人口の年推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "年齢別人口",
    targetYear: "年推移",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "通学・通勤スタイル": {
    chartType: "レーダーチャート",
    source: "統計ダッシュボード",
    dataKey: "通学・通勤スタイル",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "通学・通勤スタイルの年推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "通学・通勤スタイル",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "世帯の種類": {
    chartType: "凡例付き円グラフ",
    source: "統計ダッシュボード",
    dataKey: "世帯の種類",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: ""
    }
  },
  "世帯の種類の年推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "世帯の種類",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "世帯"
    }
  },
  "65歳以上の人のいる核家族世帯": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "65歳以上の人のいる核家族世帯",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "世帯"
    }
  },
  "65歳以上の人のいる核家族世帯の年推移": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "65歳以上の人のいる核家族世帯",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "世帯"
    }
  },
  "就業者数（国勢調査）": {
    chartType: "横向き棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "就業者数（国勢調査）",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "category",
      yKey: "value",
      categoryLabel: "",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "就業者数（国勢調査）の年推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "就業者数（国勢調査）",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "店舗数": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "店舗数",
    targetYear: "2021年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "店舗"
    }
  },
  "店舗数の年推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "店舗数",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "店舗"
    }
  },
  "店舗割合": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "店舗割合",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "店舗"
    }
  },
  "店舗割合の年推移": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "店舗割合",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "店舗"
    }
  },
  "住宅の所有数": {
    chartType: "円グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の所有数",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: ""
    }
  },
  "住宅の所有数の年推移": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の所有数",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "戸"
    }
  },
  "住宅の建て方": {
    chartType: "円グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の建て方",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: ""
    }
  },
  "住宅の建て方の年推移": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の建て方",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "棟"
    }
  },
  "住宅の構造": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の構造",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "棟"
    }
  },
  "住宅の構造の年推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の構造",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "棟"
    }
  },
  "住宅の建築時期": {
    chartType: "横向き棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "住宅の建築時期",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "category",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "棟"
    }
  },
  "居住室の畳数別住宅数": {
    chartType: "横向き棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "居住室の畳数別住宅数",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "戸"
    }
  },
  "1住宅当たり延べ面積の年推移": {
    chartType: "グループ化棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "1住宅当たり延べ面積",
    targetYear: "年推移",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "㎡"
    }
  },
  "最寄りの保育所までの距離の住宅数（普通世帯）": {
    chartType: "横向き棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "最寄りの保育所までの距離の住宅数（普通世帯）",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "category",
      yKey: "value",
      categoryLabel: "",
      xLabel: "",
      yLabel: "",
      unit: "戸"
    }
  },
  "教育施設数[/可住地面積100k㎡]": {
    chartType: "横向き棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "教育施設数[/可住地面積100k㎡]",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "category",
      yKey: "value",
      categoryLabel: "",
      xLabel: "",
      yLabel: "",
      unit: "校/100k㎡"
    }
  },
  "教育施設数": {
    chartType: "横向き棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "教育施設数",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "category",
      yKey: "value",
      categoryLabel: "",
      xLabel: "",
      yLabel: "",
      unit: "校"
    }
  },
  "通勤・通学手段別人数": {
    chartType: "凡例付き円グラフ",
    source: "統計ダッシュボード",
    dataKey: "通勤・通学手段別人数",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "人口推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "年齢別人口",
    targetYear: "年推移",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人"
    }
  },
  "公示価格推移": {
    chartType: "積み上げ棒グラフ",
    source: "統計ダッシュボード",
    dataKey: "世帯の種類",
    targetYear: "過去10年",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "time",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "円/㎡"
    }
  },
  "駅乗降人員推移": {
    chartType: "円グラフ",
    source: "統計ダッシュボード",
    dataKey: "年齢別人口",
    targetYear: "最新",
    prefectureCode: 14000,
    prefecture: "神奈川県",
    localGovCode: 14205,
    localGov: "藤沢市",
    axisConfig: {
      xKey: "",
      yKey: "value",
      categoryLabel: "category",
      xLabel: "",
      yLabel: "",
      unit: "人/日"
    }
  }
};
