// 临床各专科知识库 / Specialty KB（外科、妇产科、儿科、皮肤科、眼科、耳鼻喉科、口腔科、骨科、急诊科）

export const specialtyKB = [
  {
    id: "appendicitis",
    category: "外科",
    keywords: ["阑尾炎", "阑尾", "转移性右下腹痛", "麦氏点", "肚子痛", "右下腹痛", "阑尾手术", "appendicitis"],
    question: "转移性右下腹痛？警惕急性阑尾炎",
    answer: `<p><strong>急性阑尾炎</strong>是最常见的外科急腹症，典型表现为<strong>转移性右下腹痛</strong>——起病时疼痛位于上腹或脐周（数小时后"转移"并固定于右下腹），伴恶心呕吐、发热，<strong>麦氏点（脐与右髂前上棘连线中外 1/3 处）压痛、反跳痛</strong>。</p>
    <p><strong>诊断</strong>：病史 + 体征 + 血白细胞/中性粒细胞升高；超声为首选影像（可及肿大阑尾），诊断不明时增强 CT 分辨率高。</p>
    <p><strong>治疗：</strong></p>
    <ul>
      <li><strong>手术切除为首选</strong>：<strong>腹腔镜阑尾切除术</strong>是金标准术式，创伤小、恢复快、切口感染率低，发病 72 小时内手术效果最佳；</li>
      <li>部分早期单纯性阑尾炎可试行抗生素保守治疗，但<strong>复发率高（约 1/3）</strong>，需密切随访；</li>
      <li>阑尾周围脓肿形成者可先行抗感染 + 引流，6–8 周后择期手术。</li>
    </ul>
    <p><strong>延误风险</strong>：阑尾化脓、坏疽、穿孔致<strong>弥漫性腹膜炎</strong>、腹腔脓肿、门静脉炎（肝脓肿）——腹痛持续加重、高热不退须立即就医。<strong>术后注意</strong>：早下床活动、排气后逐步进食；腹腔镜术后 1 周左右恢复正常活动。</p>`,
    sources: [
      { name: "WSES 急性阑尾炎指南", url: "https://www.wses.org.uk/" },
      { name: "中华医学会外科学分会", url: "https://www.cma.org.cn/" },
      { name: "UpToDate：急性阑尾炎", url: "https://www.uptodate.com/" },
    ],
  },
  {
    id: "inguinal-hernia",
    category: "外科",
    keywords: ["疝气", "腹股沟疝", "小肠气", "疝修补", "无张力修补", "嵌顿疝", "hernia"],
    question: "腹股沟的包块时有时无？认识腹股沟疝",
    answer: `<p><strong>腹股沟疝（俗称"疝气"）</strong>是腹腔内容物经腹壁薄弱处突出，表现为<strong>站立、咳嗽时出现的腹股沟可复性包块</strong>，平卧或按压后可回纳；男性多见，可坠入阴囊。</p>
    <p><strong>治疗原则：</strong></p>
    <ul>
      <li><strong>成人腹股沟疝不能自愈，手术修补是唯一根治方法</strong>：开放<strong>无张力疝修补术</strong>（补片）或<strong>腹腔镜疝修补（TAPP/TEP）</strong>，局麻/微创均可选择，术后恢复快、复发率低；</li>
      <li>无症状成人可择期手术，但病程越长缺损越大、嵌顿风险越高；</li>
      <li><strong>1 岁以内婴幼儿</strong>部分可随发育自愈，可暂观察；</li>
      <li><strong>嵌顿疝是急症</strong>：包块突然<strong>不能回纳 + 剧痛 + 呕吐/腹胀</strong>（肠梗阻症状），提示肠管被卡压缺血，须<strong>立即急诊手术</strong>，延误可致肠坏死。</li>
    </ul>
    <p><strong>术后注意</strong>：术后 3 个月内避免重体力劳动、剧烈咳嗽、便秘与前列腺增生用力排尿等腹压增高因素；积极治疗慢性咳嗽与便秘可预防发生与复发。使用疝气带仅为暂缓措施，不能根治。</p>`,
    sources: [
      { name: "中华医学会外科学分会疝与腹壁外科学组", url: "https://www.cma.org.cn/" },
      { name: "UpToDate：腹股沟疝", url: "https://www.uptodate.com/" },
    ],
  },
  {
    id: "low-back-pain",
    category: "骨科",
    keywords: ["腰椎间盘突出", "腰痛", "腰腿痛", "坐骨神经痛", "腰突", "马尾综合征", "腰疼"],
    question: "腰腿痛、坐骨神经痛？腰椎间盘突出如何应对",
    answer: `<p><strong>腰椎间盘突出症</strong>是腰腿痛最常见原因之一，突出髓核压迫神经根所致——典型表现为<strong>腰痛 + 坐骨神经痛</strong>（疼痛沿臀部、大腿后侧放射至小腿、足部），可伴麻木，弯腰、久坐、咳嗽时加重。</p>
    <p><strong>诊断</strong>：症状体征（直腿抬高试验阳性）+ 腰椎 MRI 明确节段与压迫程度。</p>
    <p><strong>绝大多数首选保守治疗（约 80–90% 可缓解）：</strong></p>
    <ul>
      <li>急性期短期休息（不主张长期绝对卧床），NSAIDs 止痛、肌松剂，必要时神经根封闭；</li>
      <li>缓解期<strong>核心肌群锻炼</strong>（平板支撑、小燕飞、游泳）、改良麦肯基训练；</li>
      <li>日常防护：硬板床加合适床垫、避免久坐 > 1 小时、<strong>屈膝下蹲搬重物</strong>（忌直腿弯腰）、控制体重。</li>
    </ul>
    <p><strong>手术指征</strong>：<strong>马尾综合征（大小便功能障碍、会阴部麻木——急症，24–48 小时内手术）</strong>、进行性下肢肌力下降、规范保守治疗 6–12 周无效且症状严重影响生活者；术式以微创椎间孔镜（PELD）为主。</p>`,
    sources: [
      { name: "北美脊柱协会（NASS）腰痛指南", url: "https://www.spine.org/" },
      { name: "中华医学会骨科学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "osteoporosis",
    category: "骨科",
    keywords: ["骨质疏松", "骨密度", "驼背", "补钙", "维生素D", "骨折", "双膦酸盐", "绝经后"],
    question: "年纪大了个子变矮、腰背痛？警惕骨质疏松",
    answer: `<p><strong>骨质疏松症</strong>是以骨量减少、骨微结构破坏为特征的代谢性骨病，表现为<strong>身高变矮、驼背、腰背痛</strong>，最严重的后果是<strong>脆性骨折</strong>（腕部、椎体、髋部——髋部骨折被称为"人生最后一次骨折"，1 年内死亡率可达 20%）。绝经后女性与 65 岁以上男性为高危人群。</p>
    <p><strong>诊断</strong>：双能 X 线骨密度检查（DXA），T 值 ≤ -2.5 即可确诊；筛查手段还包括 FRAX 骨折风险评估。</p>
    <p><strong>防治策略：</strong></p>
    <ul>
      <li><strong>基础措施</strong>：钙摄入 1000–1200mg/日（牛奶、豆制品为主，必要时补充剂）+ <strong>维生素 D 800–1200IU/日</strong>；规律负重运动与晒太阳；</li>
      <li><strong>药物治疗</strong>（确诊者须遵医嘱）：双膦酸盐（阿仑膦酸钠）为一线，其他包括地舒单抗、特立帕肽等；补钙 ≠ 治疗，确诊骨质疏松须规范用药；</li>
      <li><strong>防跌倒是防骨折的关键</strong>：居家防滑防绊、夜灯照明、浴室扶手、合适老花镜与助行器。</li>
    </ul>
    <p>建议女性绝经后、男性 65 岁以上常规骨密度筛查；吸烟、过量咖啡/酒精、长期糖皮质激素使用者为高危人群。</p>`,
    sources: [
      { name: "国际骨质疏松基金会（IOF）", url: "https://www.osteoporosis.foundation/" },
      { name: "中华医学会骨质疏松和骨矿盐疾病分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "hpv-cervical",
    category: "妇产科",
    keywords: ["HPV", "宫颈癌", "宫颈筛查", "TCT", "九价", "二价", "四价", "阴道镜", "HPV阳性"],
    question: "HPV 阳性就是宫颈癌吗？疫苗和筛查怎么选？",
    answer: `<p><strong>宫颈癌</strong>是目前<strong>唯一病因明确、可防可控</strong>的恶性肿瘤——高危型 HPV（16/18 型为主）持续感染是病因。但 <strong>HPV 阳性 ≠ 宫颈癌</strong>：约 80% 女性一生中会感染 HPV，多数在 1–2 年内被免疫力清除，只有少数持续感染才可能进展为癌。</p>
    <p><strong>双保险策略：</strong></p>
    <ul>
      <li><strong>接种 HPV 疫苗</strong>：9–45 岁女性均可接种（二/四/九价）；最佳接种年龄为 9–14 岁（首次性行为前效果最佳）；即使已感染过某型别，疫苗仍可预防其他型别；</li>
      <li><strong>定期筛查</strong>：25–65 岁每 3–5 年行 <strong>TCT（宫颈细胞学）± HPV 检测</strong>；<strong>疫苗不能替代筛查</strong>（疫苗未覆盖所有高危型别）。</li>
    </ul>
    <p><strong>异常结果的处理路径</strong>：TCT 异常（ASCUS/HSIL）或高危型 HPV 持续阳性 → <strong>阴道镜检查</strong> ± 宫颈活检 → 癌前病变（CIN2/3）行宫颈锥切术即可治愈。</p>
    <p>定期筛查 + 及时处理癌前病变，可使宫颈癌发病率下降 90% 以上；WHO 提出"加速消除宫颈癌全球战略"（2030 年目标：90% 女孩接种疫苗、70% 女性筛查、90% 病变治疗）。</p>`,
    sources: [
      { name: "WHO：加速消除宫颈癌", url: "https://www.who.int/zh/health-topics/cervical-cancer" },
      { name: "国家卫生健康委：两癌筛查项目", url: "http://www.nhc.gov.cn/" },
      { name: "中华医学会妇产科学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "pregnancy-care",
    category: "妇产科",
    keywords: ["怀孕", "备孕", "叶酸", "产检", "孕期", "NT", "大排畸", "糖耐", "妊娠糖尿病", "胎动"],
    question: "备孕和孕期要做哪些准备与检查？",
    answer: `<p><strong>孕前准备：</strong></p>
    <ul>
      <li><strong>叶酸 0.4mg/日，孕前 3 个月开始至孕后 3 个月</strong>，可显著降低胎儿神经管畸形风险；</li>
      <li>孕前检查：血常规、血型（含 Rh）、肝肾功能、甲状腺功能、TORCH、乙肝/艾滋病/梅毒筛查；慢性病（糖尿病、高血压、甲亢/甲减）病情稳定后再妊娠；</li>
      <li>戒烟戒酒、规律作息、避免接触放射线与致畸药物（用药前告知医生备孕状态）。</li>
    </ul>
    <p><strong>孕期关键产检节点：</strong></p>
    <ul>
      <li><strong>11–13⁺⁶ 周</strong>：NT 超声 + 早期血清学筛查（唐氏综合征筛查）；</li>
      <li><strong>20–24 周</strong>：系统超声"大排畸"；</li>
      <li><strong>24–28 周</strong>：75g OGTT 糖耐量试验筛查妊娠糖尿病；</li>
      <li>35 岁以上高龄或高危孕妇转诊产前诊断（绒毛/羊水穿刺、无创 DNA 评估）。</li>
    </ul>
    <p><strong>孕期自我管理</strong>：均衡营养、孕期增重按孕前 BMI 个体化（正常 BMI 建议增重 11.5–16kg）；适度运动（散步、孕妇瑜伽）；<strong>孕 28 周后每日计数胎动</strong>（2 小时内 ≥ 6 次为正常），胎动明显减少是胎儿缺氧的警报，须立即就医。</p>`,
    sources: [
      { name: "国家卫生健康委：孕前和孕期保健指南", url: "http://www.nhc.gov.cn/" },
      { name: "WHO：产前保健建议", url: "https://www.who.int/zh/news-room" },
    ],
  },
  {
    id: "pediatric-fever",
    category: "儿科",
    keywords: ["儿童发烧", "小孩发热", "宝宝发烧", "退烧药", "布洛芬", "对乙酰氨基酚", "热性惊厥", "小儿发热"],
    question: "孩子发烧了怎么处理？什么时候必须去医院？",
    answer: `<p><strong>发热是儿童免疫系统对抗感染的正常反应</strong>，处理以"让孩子舒服"为核心目标，而非一味追求体温数字正常。</p>
    <p><strong>居家处理：</strong></p>
    <ul>
      <li>补充水分、松解衣物保持散热、室温适宜；<strong>禁止酒精擦浴、捂汗退烧</strong>；</li>
      <li><strong>≥ 38.2℃ 且明显不适</strong>时用药：<strong>对乙酰氨基酚</strong>（≥ 2–3 月龄）或<strong>布洛芬</strong>（≥ 6 月龄），按体重给药、遵说明书间隔；<strong>严禁给儿童使用阿司匹林</strong>（Reye 综合征风险）；</li>
      <li>两种退烧药不建议常规交替使用。</li>
    </ul>
    <p><strong>必须立即就医的危险信号：</strong></p>
    <ul>
      <li><strong> < 3 个月婴儿发热 ≥ 38℃（任何体温都需急诊评估）</strong>；</li>
      <li>精神萎靡、嗜睡、拒奶拒水、尿量明显减少；</li>
      <li>热性惊厥、囟门隆起、颈部僵硬、皮肤瘀斑/苍白/花纹；</li>
      <li>呼吸急促或费力、持续呕吐/腹泻；发热超过 72 小时不退或反复高热超过 3 天。</li>
    </ul>
    <p>家长观察<strong>精神状态与尿量</strong>比体温数字更重要：退烧药后能玩能吃属轻症表现，持续萎靡则无论体温高低都应及时就诊。</p>`,
    sources: [
      { name: "中华医学会儿科学分会：儿童发热指南", url: "https://www.cma.org.cn/" },
      { name: "美国儿科学会（AAP）HealthyChildren", url: "https://www.healthychildren.org/" },
    ],
  },
  {
    id: "hand-foot-mouth",
    category: "儿科",
    keywords: ["手足口", "手足口病", "EV71", "疱疹性咽峡炎", "幼儿园皮疹", "肠道病毒", "手足口疫苗"],
    question: "孩子得了手足口病怎么办？哪些信号提示重症？",
    answer: `<p><strong>手足口病</strong>由肠道病毒（柯萨奇病毒 A 组、EV71 等）引起，<strong>5 岁以下儿童高发</strong>，经密切接触、飞沫与粪-口途径传播，夏秋季多见。</p>
    <p><strong>典型表现</strong>：发热 + <strong>手、足、口、臀部皮疹或疱疹</strong>（口腔疱疹疼痛明显影响进食），部分仅有疱疹性咽峡炎。多数为轻症，<strong>7–10 天自愈</strong>，无特效抗病毒药，以对症处理为主：退热、口腔护理、流质偏凉饮食、多补水。</p>
    <p><strong>重症预警信号（提示 EV71 脑炎/肺水肿风险，须立即就医）：</strong></p>
    <ul>
      <li>持续高热不退（≥ 39℃ 超过 24–48 小时常规退热效果差）；</li>
      <li><strong>精神差、嗜睡、呕吐、易惊、肢体抖动或肌阵挛</strong>；</li>
      <li>呼吸急促/心率增快、四肢发凉、出冷汗、皮肤花纹（循环障碍表现）。</li>
    </ul>
    <p><strong>预防</strong>：<strong>EV71 疫苗</strong>可显著降低重症与死亡风险（建议 12 月龄前完成 2 剂）；勤洗手（肥皂流水 20 秒）、玩具餐具定期消毒（含氯消毒剂）、患病儿童居家隔离至皮疹结痂（约 2 周）。</p>`,
    sources: [
      { name: "中国疾控中心：手足口病", url: "https://www.chinacdc.cn/" },
      { name: "国家卫生健康委：手足口病诊疗指南", url: "http://www.nhc.gov.cn/" },
    ],
  },
  {
    id: "eczema",
    category: "皮肤科",
    keywords: ["湿疹", "特应性皮炎", "皮肤痒", "荨麻疹", "干燥脱屑", "婴幼儿湿疹", "保湿", "dermatitis"],
    question: "湿疹反复发作怎么办？保湿真的有用吗？",
    answer: `<p><strong>湿疹（特应性皮炎）</strong>是一种慢性复发性炎症性皮肤病，核心机制是<strong>皮肤屏障功能障碍</strong>，表现为反复瘙痒、干燥脱屑、红斑渗出，婴幼儿多见于面颊与四肢伸侧。</p>
    <p><strong>治疗金字塔——基础治疗最重要：</strong></p>
    <ul>
      <li><strong>保湿润肤是基石</strong>：足量、多次涂抹无香料润肤霜（每周 ≥ 100g），洗澡水温 ≤ 37℃、时间 < 10 分钟、使用温和低敏沐浴露——修复屏障可显著减少发作；</li>
      <li><strong>回避诱因</strong>：过热出汗、羊毛化纤摩擦、碱性肥皂、已知致敏食物（个体化，不盲目忌口）；</li>
      <li><strong>阶梯用药（遵医嘱）</strong>：中重度皮损外用糖皮质激素（急性期短期规则使用，恐惧激素而拖延治疗反而加重）或钙调磷酸酶抑制剂（他克莫司，适合面颈部与维持期）；瘙痒明显口服二代抗组胺药；重度可评估生物制剂/光疗。</li>
    </ul>
    <p><strong>误区提醒</strong>：湿疹多不是"湿"而是屏障受损导致干燥，偏方草药泡洗常致接触性皮炎加重。多数儿童湿疹随年龄增长缓解；皮损渗液化脓（继发感染）需及时就诊。</p>`,
    sources: [
      { name: "中华医学会皮肤性病学分会：特应性皮炎指南", url: "https://www.cma.org.cn/" },
      { name: "美国皮肤病学会（AAD）", url: "https://www.aad.org/" },
    ],
  },
  {
    id: "myopia",
    category: "眼科",
    keywords: ["近视", "视力下降", "眼镜", "OK镜", "阿托品", "户外活动", "远视储备", "儿童视力", "myopia"],
    question: "如何科学防控儿童近视？",
    answer: `<p><strong>我国儿童青少年近视率超 50%</strong>，高度近视（> 600 度）可致视网膜脱离、黄斑病变等不可逆损害——近视防控重在"防"与"控进展"。</p>
    <p><strong>预防（关键期：学龄前至小学）：</strong></p>
    <ul>
      <li><strong>每日户外活动 ≥ 2 小时</strong>——自然光照促进视网膜多巴胺分泌，是最有效的预防手段，已获大量循证支持；</li>
      <li>读写遵循"<strong>一拳一尺一寸</strong>"与 <strong>20-20-20 法则</strong>（每 20 分钟远眺 20 英尺外 20 秒）；保证读写光照充足；</li>
      <li>学龄前保留"远视储备"：3 岁左右建立屈光档案，每半年验光一次。</li>
    </ul>
    <p><strong>延缓进展（确诊近视后）：</strong></p>
    <ul>
      <li><strong>角膜塑形镜（OK 镜）</strong>、<strong>低浓度阿托品（0.01%）滴眼液</strong>、离焦框架镜/离焦软镜均有循证证据，需在眼科医师指导下个体化选择；</li>
      <li>配镜足矫，"戴眼镜会加深近视"是误区——欠矫反而不利。</li>
    </ul>
    <p><strong>高度近视者</strong>每年查眼底；出现<strong>突然闪光感、飞蚊剧增、视野缺损</strong>警惕视网膜脱离，立即就诊。</p>`,
    sources: [
      { name: "国家卫生健康委：儿童青少年近视防控适宜技术指南", url: "http://www.nhc.gov.cn/" },
      { name: "WHO：世界视力报告", url: "https://www.who.int/zh/publications/i/item/9789241516570" },
    ],
  },
  {
    id: "allergic-rhinitis",
    category: "耳鼻喉科",
    keywords: ["过敏性鼻炎", "鼻炎", "打喷嚏", "流清水涕", "鼻塞", "花粉症", "螨虫", "脱敏治疗", "生理盐水洗鼻"],
    question: "喷嚏打不停、清涕流不止？过敏性鼻炎这样控制",
    answer: `<p><strong>过敏性鼻炎</strong>典型四联症状：<strong>阵发性喷嚏、大量清水样鼻涕、鼻痒、鼻塞</strong>，季节性发作多与花粉相关，常年性多与尘螨、宠物皮屑、霉菌相关，常合并结膜炎（眼痒流泪）。</p>
    <p><strong>防治组合拳：</strong></p>
    <ul>
      <li><strong>环境控制</strong>：尘螨过敏者勤洗晒床品（55℃ 以上热水）、使用防螨床罩、降低室内湿度；花粉季关窗、外出佩戴口罩与防护镜、回家冲洗鼻腔；</li>
      <li><strong>鼻腔冲洗</strong>：生理盐水/海盐水每日冲洗，安全有效的辅助手段；</li>
      <li><strong>药物治疗</strong>：<strong>鼻用糖皮质激素</strong>（布地奈德、糠酸莫米松等）是一线用药，需<strong>规律使用 2–4 周</strong>达最佳效果（非"一喷就灵"），局部生物利用度低、安全性好；二代口服/鼻用抗组胺药快速缓解症状；</li>
      <li><strong>免疫治疗（脱敏）</strong>：针对尘螨等明确变应原的舌下含服/皮下免疫治疗，是<strong>唯一可能改变疾病自然进程</strong>的手段，疗程 3–5 年，需正规评估。</li>
    </ul>
    <p><strong>关联提示</strong>：过敏性鼻炎是哮喘的重要危险因素（"同一气道，同一疾病"），长期鼻塞、嗅觉减退或合并喘息者应至耳鼻喉科与呼吸科联合评估。</p>`,
    sources: [
      { name: "ARIA 过敏性鼻炎指南", url: "https://www.whiar.org/" },
      { name: "中华医学会耳鼻咽喉头颈外科学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "oral-health",
    category: "口腔科",
    keywords: ["龋齿", "蛀牙", "牙周病", "牙龈出血", "洗牙", "窝沟封闭", "刷牙", "牙线", "口臭", "智齿"],
    question: "刷牙出血、蛀牙怎么办？如何护好一口牙？",
    answer: `<p><strong>龋齿与牙周病</strong>是两大最常见的口腔疾病，均为菌斑驱动的慢性感染，可防可治。</p>
    <p><strong>日常防护四件套：</strong></p>
    <ul>
      <li><strong>巴氏刷牙法</strong>：早晚各一次、每次 <strong>2–3 分钟</strong>，牙刷与牙面呈 45° 震颤清洁龈沟；<strong>含氟牙膏</strong>是防龋关键；</li>
      <li><strong>牙线/牙间刷每日一次</strong>——牙缝菌斑牙刷刷不到，是邻面龋与牙周病的主要来源；</li>
      <li><strong>定期洁牙（洗牙）</strong>：每 <strong>0.5–1 年</strong>一次，清除牙结石，是控制牙龈炎/牙周炎的基础（洗牙不伤牙，出血说明本就有炎症）；</li>
      <li><strong>儿童专项</strong>：乳磨牙与六龄齿<strong>窝沟封闭</strong> + 定期<strong>局部涂氟</strong>，显著降低儿童龋齿率。</li>
    </ul>
    <p><strong>警示信号</strong>：刷牙出血、牙龈红肿口臭（牙龈炎→牙周炎，可致牙齿松动）、冷热敏感（龋齿进展）、夜间自发痛（牙髓炎需根管治疗）——出现后应尽早就诊，<strong>小洞不补，大洞吃苦</strong>。</p>
    <p><strong>其他提示</strong>：吸烟是牙周病与口腔癌的重要危险因素；智齿反复发炎或顶坏邻牙者建议评估拔除。</p>`,
    sources: [
      { name: "WHO：口腔健康", url: "https://www.who.int/zh/health-topics/oral-health" },
      { name: "中华口腔医学会", url: "https://www.cndent.com/" },
    ],
  },
  {
    id: "cpr",
    category: "急诊科",
    keywords: ["心肺复苏", "CPR", "心脏骤停", "AED", "胸外按压", "急救", "除颤", "resuscitation"],
    question: "有人突然倒地没有呼吸，如何做心肺复苏（CPR）？",
    answer: `<p><strong>心脏骤停的黄金抢救时间只有 4–6 分钟</strong>，每延迟 1 分钟除颤，生存率下降约 7–10%。现场第一目击者的行动往往决定生死。</p>
    <p><strong>急救流程：</strong></p>
    <ul>
      <li><strong>1. 判断与呼救</strong>：拍打双肩呼喊无反应、观察胸部无正常呼吸（或仅濒死叹息样呼吸）→ 立即拨打 120 并<strong>请周围人取最近的 AED</strong>；</li>
      <li><strong>2. 胸外按压</strong>：患者仰卧于硬质平面，掌根置于<strong>两乳头连线中点（胸骨下半部）</strong>，双手交叠、手臂垂直，<strong>按压深度 5–6cm、频率 100–120 次/分</strong>，每次按压后让胸廓充分回弹，<strong>尽量减少中断</strong>；</li>
      <li><strong>3. 人工呼吸</strong>（受过培训者）：开放气道（仰头抬颏），<strong>按压 : 吹气 = 30 : 2</strong>；未经培训或不情愿时可<strong>只做持续胸外按压</strong>（Hands-Only CPR）；</li>
      <li><strong>4. AED 到达立即使用</strong>：开机后完全按语音提示操作（贴片位置：右锁骨下 + 左腋中线），分析心律与除颤期间<strong>不要接触患者</strong>，电击后立即继续按压；</li>
      <li><strong>5. 持续循环</strong>直至患者恢复自主呼吸或专业急救人员接管。</li>
    </ul>
    <p><strong>提示</strong>：按压可能造成肋骨损伤，但抢救生命优先。建议人人参加红十字会/急救中心认证的 CPR + AED 培训，本科普不能替代实操训练。</p>`,
    sources: [
      { name: "AHA 心肺复苏与心血管急救指南", url: "https://cpr.heart.org/" },
      { name: "中国红十字会应急救护培训", url: "https://www.redcross.org.cn/" },
    ],
  },
];
