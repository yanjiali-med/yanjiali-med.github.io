// 内科系统知识库 / Internal Medicine KB（心血管、呼吸、消化、内分泌、肾内、血液、内科、传染病、肿瘤等）
// 心血管科、内分泌科等原有条目见 medicalKnowledge.js，此处为新增补充

export const clinicalKB = [
  {
    id: "asthma",
    category: "呼吸科",
    keywords: ["哮喘", "气喘", "喘息", "支气管哮喘", "吸入激素", "哮喘发作", "asthma", "咳嗽变异性"],
    question: "哮喘能根治吗？如何规范控制？",
    answer: `<p><strong>支气管哮喘</strong>是气道慢性炎症性疾病，表现为反复发作的喘息、气促、胸闷或咳嗽（夜间/凌晨加重），多数不能"根治"但可<strong>良好控制</strong>，与常人一样生活运动。</p>
    <p><strong>诊断</strong>：典型症状 + 可变气流受限客观证据（支气管舒张试验、呼气峰流速变异率或激发试验阳性）。</p>
    <p><strong>规范治疗（GINA 指南阶梯方案）：</strong></p>
    <ul>
      <li><strong>含吸入性糖皮质激素（ICS）的规律治疗是控制核心</strong>，不可凭感觉停药；GINA 新策略推荐"ICS-福莫特罗"按需联合缓释方案，降低急性发作风险；</li>
      <li><strong>缓解药 ≠ 控制药</strong>：单用短效支气管扩张剂（沙丁胺醇）而不用激素治疗，反而增加重症发作风险；</li>
      <li>重度哮喘可评估生物制剂（抗 IgE、抗 IL-5 等）靶向治疗。</li>
    </ul>
    <p><strong>自我管理</strong>：识别并回避诱因（尘螨、花粉、宠物、冷空气、运动诱发者可预先用药）、掌握峰流速仪监测与书面行动计划、每年接种流感疫苗。<strong>急性发作信号</strong>：用药后仍持续喘憋、说话断句、口唇发绀——立即急诊。</p>`,
    sources: [
      { name: "GINA 全球哮喘防治倡议", url: "https://ginasthma.org/" },
      { name: "WHO：哮喘", url: "https://www.who.int/zh/news-room/fact-sheets/detail/asthma" },
    ],
  },
  {
    id: "copd",
    category: "呼吸科",
    keywords: ["慢阻肺", "COPD", "肺气肿", "慢性支气管炎", "咳痰", "长期咳嗽", "吸烟肺", "肺功能"],
    question: "长期吸烟咳嗽气短，警惕慢阻肺？",
    answer: `<p><strong>慢性阻塞性肺疾病（慢阻肺/COPD）</strong>是我国最常见的慢性呼吸系统疾病，吸烟是最主要病因，长期咳嗽、咳痰、进行性气短是典型信号。</p>
    <p><strong>诊断金标准</strong>：肺功能检查显示<strong>吸入支气管扩张剂后 FEV1/FVC < 0.7</strong>（持续性气流受限）。40 岁以上吸烟者出现症状应主动做肺功能检查——早诊早治可显著减缓肺功能下降。</p>
    <p><strong>稳定期管理：</strong></p>
    <ul>
      <li><strong>戒烟是唯一能阻止疾病进展的关键措施</strong>（任何阶段都有效）；</li>
      <li>长效支气管扩张剂（LAMA/LABA）为基础，按 GOLD 分级个体化联合；急性发作频繁者评估 ICS 联合方案；</li>
      <li>接种流感与肺炎球菌疫苗、肺康复运动训练、营养支持。</li>
    </ul>
    <p><strong>急性加重期</strong>（痰量增多/脓痰、气短加重）：及时就医，必要时短效支气管扩张剂、全身激素与抗感染治疗，居家备氧疗者遵医嘱。<strong>长期家庭氧疗</strong>适用于慢性低氧血症患者（每日 > 15 小时）。</p>`,
    sources: [
      { name: "GOLD 慢阻肺全球倡议", url: "https://goldcopd.org/" },
      { name: "WHO：慢性阻塞性肺病", url: "https://www.who.int/zh/news-room/fact-sheets/detail/chronic-obstructive-pulmonary-disease-(copd)" },
    ],
  },
  {
    id: "h-pylori",
    category: "消化科",
    keywords: ["幽门螺杆菌", "Hp", "吹气试验", "尿素呼气", "胃病", "胃癌", "四联", "分餐", "helicobacter"],
    question: "查出幽门螺杆菌阳性，一定要治疗吗？",
    answer: `<p><strong>幽门螺杆菌（Hp）</strong>是 WHO 认定的胃癌 Ⅰ 类致癌因子，与胃炎、消化性溃疡、胃黏膜相关淋巴瘤密切相关；我国感染率约 40–50%。</p>
    <p><strong>检测</strong>：首选 <strong>¹³C/¹⁴C 尿素呼气试验</strong>（非侵入、准确）；注意检测前停用质子泵抑制剂 ≥ 2 周、抗生素与铋剂 ≥ 4 周，否则易假阴性。</p>
    <p><strong>治疗</strong>：目前指南推荐<strong>对无症状感染者也建议根除</strong>（获益-风险比良好），标准方案为 <strong>铋剂四联疗法 14 天</strong>：PPI + 铋剂 + 两种抗生素，须由医生根据当地耐药情况与过敏史开具，<strong>切勿自行买药或半途停药</strong>（导致耐药、根除失败）。完成疗程 ≥ 4 周后复查呼气试验确认根除。</p>
    <p><strong>预防再感染</strong>：家庭内传播是主要途径——推行<strong>分餐制或公筷公勺</strong>、餐具定期消毒、不口对口喂婴幼儿；家庭成员阳性者建议同查同治。</p>
    <p><strong>何时需胃镜</strong>：反复上腹痛、消瘦、贫血、黑便、吞咽困难等报警症状，或 40 岁以上未做过胃镜者，根除治疗前后均可评估胃黏膜状态。</p>`,
    sources: [
      { name: "中华医学会消化病学分会：幽门螺杆菌学组共识", url: "https://www.cma.org.cn/" },
      { name: "IARC/WHO：幽门螺杆菌与胃癌", url: "https://www.iarc.fr/" },
    ],
  },
  {
    id: "gerd",
    category: "消化科",
    keywords: ["胃食管反流", "反酸", "烧心", "胃灼热", "反流", "胸骨后痛", "GERD", "嗳气"],
    question: "经常反酸烧心怎么办？",
    answer: `<p><strong>胃食管反流病（GERD）</strong>典型表现为<strong>烧心（胸骨后灼热感）与反流</strong>，可伴胸痛、咽异物感、慢性咳嗽——症状与心绞痛等易混淆，反复胸痛应先排查心脏疾病。</p>
    <p><strong>生活方式是基础治疗：</strong></p>
    <ul>
      <li>减重（超重者减轻 10% 可明显缓解）、戒烟限酒；</li>
      <li>睡前 <strong>3 小时</strong>不进食；抬高床头 15–20cm（垫高床头而非只垫枕头）；</li>
      <li>少食多餐，减少高脂、辛辣、巧克力、咖啡、浓茶与碳酸饮料。</li>
    </ul>
    <p><strong>药物治疗</strong>：质子泵抑制剂（PPI，如奥美拉唑）为一线药物，标准试验疗程 <strong>8 周</strong>，宜餐前 30–60 分钟服用；症状控制后按医嘱逐步减量，不建议长期自行维持。</p>
    <p><strong>报警症状须尽快胃镜</strong>：吞咽困难或疼痛、不明原因消瘦、贫血/黑便、呕吐、年龄 > 45 岁新发症状——排查反流性食管炎分级、Barrett 食管（癌前状态需定期随访）与其他器质性疾病。</p>`,
    sources: [
      { name: "ACG 胃食管反流指南", url: "https://gi.org/guideline/" },
      { name: "中华医学会消化病学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "thyroid-nodule",
    category: "内分泌科",
    keywords: ["甲状腺结节", "甲状腺", "TI-RADS", "穿刺", "甲亢", "甲减", "甲状腺癌", "甲状腺功能"],
    question: "体检发现甲状腺结节，是癌吗？",
    answer: `<p><strong>甲状腺结节</strong>随高分辨率超声普及检出率高达 20–60%，但其中<strong>约 90–95% 为良性</strong>，多数仅需随访。</p>
    <p><strong>评估三步走：</strong></p>
    <ul>
      <li><strong>甲状腺功能</strong>（TSH、FT3、FT4）：判断有无甲亢/甲减及"高功能结节"；</li>
      <li><strong>超声 TI-RADS 分级</strong>：依据结节边界、钙化（微钙化）、纵横比、血流等特征评估恶性风险——3 类及以下良性可能大，4 类及以上建议进一步评估；</li>
      <li><strong>细针穿刺（FNA）</strong>：对超声可疑结节行细胞学检查，是术前判断良恶性的金标准。</li>
    </ul>
    <p><strong>恶性结节特点</strong>：多数为甲状腺乳头状癌，进展慢、预后极好（规范治疗后 10 年生存率 > 95%）；治疗以外科手术为主，部分低危微小癌可在医生指导下主动监测。</p>
    <p><strong>随访建议</strong>：良性小结节每 <strong>6–12 个月</strong>复查超声；短期内结节迅速增大、出现声嘶、颈部淋巴结肿大需及时就诊。日常碘摄入适量即可，无需盲目"忌碘"或"补碘"。</p>`,
    sources: [
      { name: "中华医学会内分泌学分会：甲状腺结节指南", url: "https://www.cma.org.cn/" },
      { name: "ATA 甲状腺指南", url: "https://www.thyroid.org/professionals/" },
    ],
  },
  {
    id: "ckd",
    category: "肾内科",
    keywords: ["慢性肾脏病", "肾不好", "肌酐", "尿蛋白", "蛋白尿", "血尿", "透析", "肾衰", "eGFR", "尿毒症"],
    question: "肌酐升高、尿蛋白阳性说明什么？慢性肾病如何延缓？",
    answer: `<p><strong>慢性肾脏病（CKD）</strong>定义为肾脏结构或功能异常 ≥ 3 个月（eGFR < 60、尿蛋白阳性、影像学异常等），按 eGFR 分为 G1–G5 期；我国主要病因为慢性肾炎、糖尿病肾病与高血压肾损害。</p>
    <p><strong>早期信号</strong>：泡沫尿（蛋白尿）、夜尿增多、双下肢水肿、血压升高——很多患者早期无症状，<strong>尿常规 + 肾功能 + 尿蛋白/肌酐比值</strong>是最简便的筛查组合。</p>
    <p><strong>延缓进展的核心措施：</strong></p>
    <ul>
      <li><strong>控制血压 < 130/80 mmHg</strong>，首选 ACEI/ARB 类（沙坦/普利类，兼具降尿蛋白作用）；</li>
      <li>糖尿病患者控糖达标，新型药物 SGLT2 抑制剂已被证实具有明确肾脏保护；</li>
      <li>优质低蛋白饮食（在营养师指导下）、限盐；</li>
      <li><strong>避免肾毒性因素</strong>：慎用布洛芬等非甾体抗炎药、不明成分"偏方/中草药"，对比剂检查前告知医生肾病病史。</li>
    </ul>
    <p><strong>并发症管理</strong>：肾性贫血（铁剂 + 促红细胞生成素）、钙磷代谢与骨病、代谢性酸中毒。进展至 G5 期（尿毒症）时以<strong>血液透析、腹膜透析或肾移植</strong>替代治疗——规律透析患者可长期生存，肾移植为最佳生活质量选择。</p>`,
    sources: [
      { name: "KDIGO 慢性肾脏病管理指南", url: "https://kdigo.org/guidelines/" },
      { name: "中华医学会肾脏病学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "anemia",
    category: "血液科",
    keywords: ["贫血", "缺铁", "补铁", "头晕乏力", "面色苍白", "月经多", "血红蛋白低", "anemia"],
    question: "贫血就是缺铁吗？补铁有哪些讲究？",
    answer: `<p><strong>贫血</strong>（男性 Hb < 120g/L，女性 < 110g/L）最常见类型是缺铁性贫血，但贫血 ≠ 缺铁——还需排查巨幼细胞性贫血（缺乏叶酸/维生素B12）、溶血、血液系统疾病等。</p>
    <p><strong>缺铁性贫血表现</strong>：乏力、头晕、面色/睑结膜苍白、活动后心悸气短，重者出现指甲变脆、异食癖。</p>
    <p><strong>诊断组合</strong>：血常规（小细胞低色素）+ 铁代谢（血清铁、铁蛋白降低）。<strong>更重要的是查找病因</strong>：育龄女性常见月经过多；<strong>男性及绝经后女性的缺铁性贫血必须排查消化道失血</strong>（胃溃疡、肠道肿瘤），建议胃肠镜评估。</p>
    <p><strong>补铁讲究：</strong></p>
    <ul>
      <li>口服铁剂（琥珀酸亚铁等）<strong>空腹或两餐间</strong>服用吸收最佳；与维生素 C 同服促进吸收；</li>
      <li>避免与浓茶、牛奶、咖啡同服（抑制铁吸收）；</li>
      <li>Hb 恢复正常后<strong>仍需继续补铁 3–6 个月</strong>补足储存铁；服铁剂期间大便发黑属正常现象；</li>
      <li>不能耐受口服或不吸收者可静脉铁剂。</li>
    </ul>
    <p><strong>饮食</strong>：红肉、动物肝脏、血制品富含易吸收的血红素铁，配合新鲜蔬果。贫血明显伴心血管症状者遵医嘱评估输血指征。</p>`,
    sources: [
      { name: "WHO：贫血", url: "https://www.who.int/zh/health-topics/anaemia" },
      { name: "中华医学会血液学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "gout",
    category: "内科",
    keywords: ["痛风", "尿酸", "高尿酸", "脚趾痛", "关节红肿", "秋水仙碱", "别嘌醇", "非布司他", "嘌呤", "gout"],
    question: "痛风急性发作怎么办？尿酸要降到多少？",
    answer: `<p><strong>痛风</strong>是尿酸钠结晶沉积于关节引起的炎症，与高尿酸血症（血尿酸 > 420 μmol/L）直接相关。典型急性发作：<strong>第一跖趾关节（大脚趾根部）突发的红、肿、热、剧痛</strong>，常于夜间或饮酒、暴食后出现。</p>
    <p><strong>分期治疗原则：</strong></p>
    <ul>
      <li><strong>急性期</strong>：小剂量秋水仙碱、非甾体抗炎药（NSAIDs）或糖皮质激素，<strong>越早用药越有效</strong>（24 小时内启动）；急性期<strong>不新开始</strong>降尿酸药物；</li>
      <li><strong>间歇期降尿酸</strong>：反复发作（≥ 2 次/年）、痛风石、尿酸性肾石或合并 CKD 者需长期降尿酸——别嘌醇（HLA-B*5801 基因筛查阴性者用，防严重药疹）或非布司他；目标一般 <strong>< 360 μmol/L</strong>，有痛风石者 < 300 μmol/L；急性发作时已服药者<strong>不要停药</strong>。</li>
    </ul>
    <p><strong>饮食与生活（占尿酸影响约 20%）：</strong>限制内脏、浓肉汤、部分海鲜；<strong>戒啤酒与果糖饮料</strong>（升尿酸作用显著）；每日饮水 > 2000ml；控制体重、规律有氧运动；合并高血压者慎用噻嗪类利尿剂。</p>
    <p><strong>肾功能不全者</strong>慎用 NSAIDs，降酸方案由风湿免疫科/肾内科医师个体化制定。</p>`,
    sources: [
      { name: "中华医学会风湿病学分会：痛风诊疗规范", url: "https://www.cma.org.cn/" },
      { name: "ACR 痛风管理指南", url: "https://www.rheumatology.org/" },
    ],
  },
  {
    id: "tuberculosis",
    category: "传染病科",
    keywords: ["结核", "肺结核", "TB", "咳嗽两周", "盗汗", "咯血", "抗结核", "卡介苗", "tuberculosis"],
    question: "咳嗽两周以上要查结核吗？肺结核能治愈吗？",
    answer: `<p><strong>肺结核</strong>由结核分枝杆菌引起，经呼吸道飞沫传播，仍是我国重大传染病之一。</p>
    <p><strong>警惕信号</strong>：<strong>咳嗽、咳痰 ≥ 2 周</strong>，或伴咯血、午后低热、夜间盗汗、明显消瘦——应及时到结核病定点医疗机构就诊。</p>
    <p><strong>诊断</strong>：痰涂片抗酸染色/分枝杆菌培养、分子检测（Xpert MTB/RIF 快速且可测耐药）、胸部影像学（好发上叶尖后段与下叶背段）。</p>
    <p><strong>治疗（可治愈，关键在规范）：</strong></p>
    <ul>
      <li>标准方案 <strong>6 个月</strong>：2 个月强化期（异烟肼+利福平+吡嗪酰胺+乙胺丁醇）+ 4 个月巩固期（异烟肼+利福平）；</li>
      <li><strong>DOTS 全程督导</strong>：规律、全程服药是治愈核心——<strong>擅自停药/漏服是耐多药结核的主要诱因</strong>，耐多药治疗长达 9–20 个月且药物昂贵、副作用多；</li>
      <li>常见副作用监测：尿酸升高（吡嗪酰胺）、视力/色觉变化（乙胺丁醇）、肝功能与周围神经炎（异烟肼，可加维生素 B6）。</li>
    </ul>
    <p><strong>预防</strong>：传染期患者佩戴口罩、分室居住并通风；密切接触者筛查；新生儿卡介苗可降低儿童重症结核风险。我国对肺结核提供<strong>免费抗结核药物</strong>与部分检查减免政策。</p>`,
    sources: [
      { name: "WHO：结核病", url: "https://www.who.int/zh/health-topics/tuberculosis" },
      { name: "中国疾控中心结核病预防控制", url: "https://www.chinacdc.cn/" },
    ],
  },
];
