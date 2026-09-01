// 肝胆外科重点知识库 / Hepatobiliary Surgery KB（重点强化方向）
// 覆盖肝脏、胆道、胰腺疾病的诊断标准、治疗方案、手术技术、术后护理、并发症处理及预防
// 内容依据：国家卫健委诊疗规范、中华医学会各专科分会指南、WHO、AASLD/EASL、NCCN 等

export const hepatobiliaryKB = [
  {
    id: "hepatitis-b",
    category: "肝胆外科",
    keywords: ["乙肝", "乙型肝炎", "慢性乙肝", "HBV", "大三阳", "小三阳", "恩替卡韦", "替诺福韦", "抗病毒", "乙肝疫苗", "hepatitis b"],
    question: "慢性乙型肝炎需要治疗吗？会变成肝癌吗？",
    answer: `<p><strong>慢性乙型肝炎</strong>（HBsAg 阳性持续超过 6 个月）经血液、母婴和性接触传播。是否需要治疗，需由感染科/肝病科医生依据指南评估以下指标：</p>
    <ul>
      <li><strong>病毒学</strong>：HBV-DNA 载量；<strong>血清学</strong>：HBeAg（大三阳/小三阳）；<strong>生化</strong>：ALT 升高；<strong>肝纤维化</strong>：FibroScan 无创弹性检测或肝穿刺活检。</li>
      <li><strong>治疗指征</strong>：血清 HBV-DNA 阳性且 ALT 持续升高，或存在显著肝纤维化/肝硬化者。已诊断为代偿期乙肝肝硬化者，只要 HBV-DNA 可检出即建议长期抗病毒治疗。</li>
    </ul>
    <p><strong>一线口服抗病毒药</strong>：恩替卡韦（ETV）、替诺福韦酯（TDF）、丙酚替诺福韦（TAF），强效低耐药，需<strong>长期规律服药、不可自行停药</strong>——随意停药可致病毒反弹甚至重型肝炎。聚乙二醇干扰素为备选方案。</p>
    <p><strong>治疗目标</strong>：最大限度长期抑制 HBV-DNA，减轻肝细胞炎症坏死与纤维化，延缓和减少肝功能衰竭、肝硬化、肝细胞癌（HCC）发生。</p>
    <p><strong>预防</strong>：新生儿<strong>乙肝疫苗普种 + 乙肝免疫球蛋白母婴阻断</strong>是阻断传播最有效的手段；成人未感染且表面抗体阴性者可补种疫苗。</p>
    <p><strong>随访（HCC 监测）</strong>：所有慢性 HBV 感染者建议每 <strong>3–6 个月</strong>复查肝功能、HBV-DNA、甲胎蛋白（AFP）与肝脏超声——规律监测可早期发现肝癌，显著改善预后。</p>`,
    sources: [
      { name: "WHO：乙型肝炎", url: "https://www.who.int/zh/news-room/fact-sheets/detail/hepatitis-b" },
      { name: "中华医学会：慢性乙型肝炎防治指南", url: "https://www.cma.org.cn/" },
      { name: "国家卫生健康委", url: "http://www.nhc.gov.cn/" },
    ],
  },
  {
    id: "cirrhosis",
    category: "肝胆外科",
    keywords: ["肝硬化", "腹水", "门静脉高压", "食管胃底静脉曲张", "肝性脑病", "脾大", "Child-Pugh", "白蛋白", "TIPS", "cirrhosis"],
    question: "肝硬化有哪些并发症？如何管理腹水和消化道出血？",
    answer: `<p><strong>肝硬化</strong>是各种慢性肝病进展至以肝脏弥漫性纤维化、再生结节和假小叶形成为特征的临床阶段。常见病因：慢性乙肝/丙肝、酒精性肝病、非酒精性脂肪性肝病、自身免疫性肝病等。</p>
    <p><strong>诊断与严重度评估</strong>：肝脏超声 ± 弹性成像（FibroScan）、胃镜评估食管胃底静脉曲张；<strong>Child-Pugh 分级</strong>（A/B/C 级）与 MELD 评分用于评估肝脏储备功能与预后。</p>
    <p><strong>四大并发症的处理要点：</strong></p>
    <ul>
      <li><strong>腹水</strong>：限钠（约 2g/日）+ 利尿剂（螺内酯 ± 呋塞米）；顽固性腹水可行治疗性穿刺放液联合白蛋白输注，或行经颈静脉肝内门体分流术（TIPS）。</li>
      <li><strong>食管胃底静脉曲张破裂出血</strong>（急症）：禁食、液体复苏，生长抑素/特利加压素降低门脉压，急诊内镜下套扎或组织胶注射；一级预防可用非选择性 β 受体阻滞剂。</li>
      <li><strong>肝性脑病</strong>：排查诱因（感染、消化道出血、便秘、电解质紊乱），乳果糖保持大便通畅 ± 利福昔明，纠正诱因后多可恢复。</li>
      <li><strong>自发性细菌性腹膜炎（SBP）</strong>：腹水多形核白细胞（PMN）≥ 250/mm³ 即可诊断，经验性三代头孢菌素 + 静脉白蛋白。</li>
    </ul>
    <p><strong>病因治疗是根本</strong>：抗乙肝病毒、戒酒、减重等可显著延缓进展。失代偿期患者应评估<strong>肝移植</strong>指征。无论代偿与否，均需每 <strong>6 个月</strong>行超声 + AFP 筛查肝癌。</p>`,
    sources: [
      { name: "中华医学会肝病学分会：肝硬化诊治指南", url: "https://www.cma.org.cn/" },
      { name: "AASLD 临床实践指南", url: "https://www.aasld.org/practice-guidelines" },
      { name: "EASL 临床实践指南", url: "https://easl.eu/publications/clinical-practice-guidelines/" },
    ],
  },
  {
    id: "liver-cancer",
    category: "肝胆外科",
    keywords: ["肝癌", "肝细胞癌", "肝恶性肿瘤", "甲胎蛋白", "AFP", "米兰标准", "TACE", "介入", "消融", "射频", "肝移植", "肝切除", "靶向", "免疫治疗", "HCC"],
    question: "原发性肝癌如何诊断与治疗？肝移植的米兰标准是什么？",
    answer: `<p><strong>原发性肝细胞癌（HCC）</strong>是我国常见恶性肿瘤，高危因素包括慢性乙肝/丙肝、酒精性肝病、黄曲霉毒素暴露及肝硬化。</p>
    <p><strong>筛查与诊断：</strong></p>
    <ul>
      <li>高危人群（乙肝/丙肝、肝硬化等）每 <strong>6 个月</strong>行肝脏超声 ± AFP 检测；</li>
      <li>典型影像学：动态增强 CT/MRI 显示动脉期强化、门脉期消退的<strong>"快进快出"</strong>表现，结合 AFP 可临床诊断；确诊金标准为病理活检。</li>
      <li>分期采用中国肝癌分期（CNLC）或 BCLC 分期，指导治疗选择。</li>
    </ul>
    <p><strong>治疗体系（多学科 MDT 决策）：</strong></p>
    <ul>
      <li><strong>手术切除</strong>：早期首选之一，适用于肝功能 Child-Pugh A 级、肿瘤局限、剩余肝体积充分者；解剖性肝切除 + 术中超声导航是关键技术。</li>
      <li><strong>消融治疗</strong>（射频/微波）：适用于直径 ≤ 3cm、数目 ≤ 3 个的肿瘤，疗效与小范围切除相近，创伤小。</li>
      <li><strong>肝移植</strong>：符合<strong>米兰标准</strong>（单个肿瘤直径 ≤ 5cm，或肿瘤数目 ≤ 3 个且每个直径 ≤ 3cm，无血管侵犯与肝外转移）者疗效最佳，可同时去除肿瘤与硬化肝。</li>
      <li><strong>TACE</strong>（肝动脉化疗栓塞）：中期肝癌的标准治疗，通过栓塞肿瘤供血动脉 + 局部化疗控制病灶。</li>
      <li><strong>系统治疗</strong>：晚期以靶免联合为主（阿替利珠单抗 + 贝伐珠单抗、信迪利单抗 + 贝伐珠单抗类似物，或多激酶抑制剂仑伐替尼、索拉非尼）。</li>
    </ul>
    <p><strong>术后管理与预防</strong>：防治肝功能不全、腹水、胆瘘；乙肝相关肝癌术后长期抗病毒治疗；术后 2 年内每 3–6 个月复查 AFP + 增强 CT/MRI。预防层面：新生儿乙肝疫苗、规范抗病毒、戒酒、防霉（黄曲霉毒素）可使我国肝癌发病率下降。</p>`,
    sources: [
      { name: "国家卫生健康委：原发性肝癌诊疗指南", url: "http://www.nhc.gov.cn/" },
      { name: "中国抗癌协会肝癌专业委员会", url: "https://www.caca.org.cn/" },
      { name: "NCCN 肝胆肿瘤指南", url: "https://www.nccn.org/" },
    ],
  },
  {
    id: "liver-abscess",
    category: "肝胆外科",
    keywords: ["肝脓肿", "细菌性肝脓肿", "阿米巴肝脓肿", "穿刺引流", "置管引流", "肺炎克雷伯菌", "肝脏感染"],
    question: "肝脓肿是怎么引起的？必须手术吗？",
    answer: `<p><strong>肝脓肿</strong>是病原菌侵入肝脏形成的化脓性病变，感染途径以<strong>胆道逆行感染最常见</strong>（胆管结石、胆道梗阻、胆道手术史），其次为门静脉来源（阑尾炎、憩室炎等腹腔感染）与血行播散；<strong>糖尿病</strong>患者风险显著增高，病原菌以肺炎克雷伯菌、大肠埃希菌多见。</p>
    <p><strong>典型表现与诊断：</strong>发热（多为弛张高热）+ 寒战 + 右上腹痛/肝区叩痛三联征，可伴乏力、纳差、黄疸。诊断首选<strong>腹部超声</strong>（液性占位），增强 CT 敏感性更高并可引导穿刺；血培养 + 穿刺脓液培养明确病原与药敏。</p>
    <p><strong>治疗原则：</strong></p>
    <ul>
      <li><strong>抗生素</strong>：经验性覆盖革兰阴性菌 + 厌氧菌（如三代头孢 ± 甲硝唑），再按药敏调整，总疗程约 <strong>4–6 周</strong>；</li>
      <li><strong>经皮穿刺置管引流</strong>：直径 > 3–5cm 的脓肿首选，超声/CT 引导下置管冲洗引流，多数患者无需开腹手术；</li>
      <li><strong>手术引流</strong>：内科引流无效、脓肿多发分隔/破溃、合并需外科处理的胆道疾病时行腹腔镜或开腹引流；合并胆道梗阻者行 ERCP/PTCD 胆道减压。</li>
      <li><strong>阿米巴肝脓肿</strong>：以甲硝唑等抗阿米巴药物为主，混合感染或药物无效时穿刺引流。</li>
    </ul>
    <p><strong>并发症</strong>：脓肿破溃引起腹膜炎/膈下脓肿/胸腔感染、脓毒症、胆道出血。<strong>预防</strong>：及时规范治疗胆道结石与腹腔感染、控制血糖，是降低肝脓肿风险的关键。</p>`,
    sources: [
      { name: "中华医学会：细菌性肝脓肿诊治共识", url: "https://www.cma.org.cn/" },
      { name: "UpToDate：肝脓肿", url: "https://www.uptodate.com/" },
      { name: "国家卫生健康委", url: "http://www.nhc.gov.cn/" },
    ],
  },
  {
    id: "cholecystitis",
    category: "肝胆外科",
    keywords: ["胆囊炎", "急性胆囊炎", "右上腹痛", "Murphy征", "胆囊切除", "腹腔镜胆囊切除", "LC", "PTGBD", "胆囊穿刺", "cholecystitis"],
    question: "急性胆囊炎发作怎么办？什么时候需要切除胆囊？",
    answer: `<p><strong>急性胆囊炎</strong>绝大多数由胆囊结石嵌顿于胆囊颈部引起（结石性），少数见于重症、创伤、长期禁食患者（非结石性）。</p>
    <p><strong>诊断标准（东京指南 TG18）</strong>：① 局部炎症征象（右上腹压痛/Murphy 征阳性/可及包块）；② 全身炎症证据（发热、白细胞/CRP 升高）；③ 影像学：超声见胆囊增大（> 8×4cm）、壁增厚（≥ 4mm）、"双边征"、超声 Murphy 征阳性。三者同时具备即可确诊。</p>
    <p><strong>严重度分级</strong>：轻度（I 级）/中度（II 级）/重度（III 级，伴器官功能障碍），决定治疗策略。</p>
    <p><strong>治疗：</strong></p>
    <ul>
      <li><strong>基础治疗</strong>：禁食、静脉补液、解痉镇痛，抗生素覆盖革兰阴性菌与厌氧菌（如三代头孢 + 甲硝唑）；</li>
      <li><strong>手术时机</strong>：轻中度患者<strong>发病 72 小时内早期腹腔镜胆囊切除术（LC）</strong>——LC 是胆囊切除的金标准术式，创伤小、恢复快；早期手术并不增加风险，反而避免反复发作；</li>
      <li><strong>重度患者</strong>：先 ICU 器官支持 + 经皮经肝胆囊穿刺引流（PTGBD），待病情稳定后二期手术；</li>
      <li><strong>高龄高危不适合手术者</strong>：PTGBD 引流 + 择期评估。</li>
    </ul>
    <p><strong>并发症</strong>：胆囊坏疽穿孔、气肿性胆囊炎、胆源性胰腺炎、Mirizzi 综合征。<strong>术后注意</strong>：低脂饮食逐步过渡，出现发热、黄疸、胆汁样引流液需警惕胆瘘/胆管损伤及时就诊。<strong>预防</strong>：规律三餐（尤其早餐）、控制体重与血脂。</p>`,
    sources: [
      { name: "东京指南 TG18/TG22（急性胆道感染）", url: "https://www.jges.net/" },
      { name: "中华医学会外科学分会胆道外科学组", url: "https://www.cma.org.cn/" },
      { name: "UpToDate：急性胆囊炎", url: "https://www.uptodate.com/" },
    ],
  },
  {
    id: "gallstones",
    category: "肝胆外科",
    keywords: ["胆结石", "胆囊结石", "胆石症", "胆色素结石", "胆固醇结石", "保胆取石", "胆囊息肉", "gallstones", "结石"],
    question: "胆囊结石一定要切除胆囊吗？",
    answer: `<p><strong>胆囊结石</strong>成人患病率约 10%，危险因素可概括为"5F"（女性 Female、四十岁 Forty、肥胖 Fatty、多产 Fertile、家族史 Family）。</p>
    <p><strong>临床表现</strong>：多数为无症状"静止结石"；症状性结石典型表现为<strong>右上腹或剑突下降发性绞痛</strong>，常于油腻餐后诱发，可向右肩背部放射，伴恶心呕吐。</p>
    <p><strong>诊断</strong>：腹部超声为首选，敏感度 > 95%。</p>
    <p><strong>治疗决策（个体化）：</strong></p>
    <ul>
      <li><strong>无症状结石</strong>：一般随诊观察，指南<strong>不推荐</strong>常规预防性切除；合并胆囊癌高危因素（瓷化胆囊、结石 ≥ 3cm、胆囊腺肌症、息肉进行性增大等）者可考虑手术；</li>
      <li><strong>症状性结石或合并并发症</strong>（急性胆囊炎、胆总管继发结石、胆源性胰腺炎、胆管炎）：行<strong>胆囊切除术</strong>，<strong>腹腔镜胆囊切除（LC）为金标准</strong>；</li>
      <li><strong>"保胆取石"</strong>：术后结石复发率高且有胆囊癌风险，国内外主流指南均未推荐常规开展；</li>
      <li><strong>合并胆总管结石</strong>：首选 <strong>ERCP</strong>（内镜逆行胰胆管造影）取石 + 鼻胆管引流，之后再择期 LC，或行腹腔镜胆总管探查一期解决。</li>
    </ul>
    <p><strong>术后生活</strong>：术后 1 个月内低脂饮食过渡，多数患者肝功能与消化功能代偿良好，可恢复正常生活。<strong>预防</strong>：规律三餐、足量膳食纤维、控制体重、避免快速减重（禁食/极低热量饮食促进胆汁淤积成石）。</p>`,
    sources: [
      { name: "中华医学会外科学分会胆道外科学组：胆囊结石诊疗指南", url: "https://www.cma.org.cn/" },
      { name: "NIDDK：Gallstones", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/gallstones" },
      { name: "UpToDate：胆囊结石", url: "https://www.uptodate.com/" },
    ],
  },
  {
    id: "cholangitis",
    category: "肝胆外科",
    keywords: ["胆管炎", "急性胆管炎", "化脓性胆管炎", "Charcot三联征", "Reynolds五联征", "ERCP", "ENBD", "PTCD", "梗阻性黄疸", "AOSC", "ACST", "胆道梗阻"],
    question: "什么是 Charcot 三联征？急性胆管炎为什么危及生命？",
    answer: `<p><strong>急性胆管炎</strong>是胆道梗阻合并感染所致的急症，最常见病因为<strong>胆总管结石</strong>，其次为胆管狭窄、胆道肿瘤、胆肠吻合口狭窄等。</p>
    <p><strong>诊断（东京指南 TG18）</strong>：胆道感染证据（发热/寒战 + 炎症指标升高）+ 胆汁淤积证据（黄疸、碱性磷酸酶/转肽酶升高）+ 影像学梗阻证据（胆总管扩张、结石/占位）。典型者出现 <strong>Charcot 三联征</strong>——腹痛、寒战高热、黄疸；若再出现<strong>休克与神志改变（Reynolds 五联征）</strong>，提示急性梗阻性化脓性胆管炎（AOSC/ACST），属重症，可迅速进展为脓毒性休克与多器官衰竭。</p>
    <p><strong>治疗核心——"及时胆道减压引流"：</strong></p>
    <ul>
      <li><strong>抗感染</strong>：三代头孢 ± 甲硝唑（胆汁培养调整），重症同时液体复苏 + 器官支持；</li>
      <li><strong>胆道引流（生命线）</strong>：首选 <strong>ERCP</strong>——十二指肠乳头切开（EST）取石 + 鼻胆管引流（ENBD）或胆管支架；ERCP 失败或不适用者行 <strong>PTCD</strong>（经皮经肝穿刺胆道引流）；内镜/介入均不可行时行手术引流；</li>
      <li><strong>病因治疗</strong>：危象解除、病情稳定后处理根本病因——胆囊结石行胆囊切除、肿瘤评估根治性手术。</li>
    </ul>
    <p><strong>并发症</strong>：脓毒症休克、肝脓肿、胆道出血、急性肾损伤。重度胆管炎延误引流病死率高，出现黄疸 + 发热 + 腹痛应<strong>立即就医</strong>。</p>`,
    sources: [
      { name: "东京指南 TG18/TG22（急性胆管炎）", url: "https://www.jges.net/" },
      { name: "中华医学会外科学分会胆道外科学组", url: "https://www.cma.org.cn/" },
      { name: "UpToDate：急性胆管炎", url: "https://www.uptodate.com/" },
    ],
  },
  {
    id: "biliary-tumor",
    category: "肝胆外科",
    keywords: ["胆管癌", "胆囊癌", "胆道肿瘤", "壶腹癌", "无痛性黄疸", "CA19-9", "MRCP", "Bismuth", "肝门部胆管癌", "胆道支架"],
    question: "胆管癌和胆囊癌如何发现与治疗？",
    answer: `<p><strong>胆道肿瘤</strong>包括胆管癌与胆囊癌，恶性程度高，早期诊断困难。</p>
    <p><strong>高危因素</strong>：胆管结石、原发性硬化性胆管炎（PSC）、肝吸虫感染、胆管囊肿；胆囊癌与<strong>胆囊结石（尤其 ≥ 3cm）</strong>、瓷化胆囊密切相关；肝内胆管癌还与乙肝/丙肝相关。</p>
    <p><strong>典型表现</strong>：<strong>无痛性进行性黄疸</strong>（肝门部/远端胆管癌，伴皮肤瘙痒、陶土色大便）、右上腹隐痛、消瘦乏力；血清 <strong>CA19-9</strong> 常升高（辅助诊断与疗效监测）。</p>
    <p><strong>诊断</strong>：增强 CT/MRI + <strong>MRCP</strong>（磁共振胰胆管成像）评估肿瘤浸润范围、血管侵犯与可切除性（肝门部胆管癌采用 Bismuth 分型）；必要时 EUS 引导细针穿刺或 ERCP 刷检获取病理。</p>
    <p><strong>治疗（根治性切除是唯一治愈机会）：</strong></p>
    <ul>
      <li><strong>胆囊癌</strong>：T1b 期以上行胆囊切除 + 肝床楔形/部分肝切除 ± 区域淋巴结清扫；</li>
      <li><strong>肝门部胆管癌</strong>：大范围肝切除（半肝 + 尾状叶）± 术前胆道引流与门静脉栓塞（PVE）以预留足够剩余肝体积；</li>
      <li><strong>远端胆管癌</strong>：胰十二指肠切除术（Whipple 手术）；</li>
      <li><strong>不可切除/晚期</strong>：化疗（吉西他滨 + 顺铂）± 靶向免疫治疗（FGFR2 融合、IDH1 突变者可选相应靶向药），并行姑息性胆道引流（ERCP/PTCD 支架）退黄改善生活质量。</li>
    </ul>
    <p><strong>预防与随访</strong>：及时治疗胆囊结石与胆道感染；胆囊息肉随访中直径 ≥ 1cm、增长快者建议手术；术后定期复查 CA19-9 与增强影像。</p>`,
    sources: [
      { name: "NCCN 肝胆肿瘤指南", url: "https://www.nccn.org/" },
      { name: "中国抗癌协会胆道肿瘤专业委员会", url: "https://www.caca.org.cn/" },
      { name: "国家卫生健康委：胆道肿瘤诊疗指南", url: "http://www.nhc.gov.cn/" },
    ],
  },
  {
    id: "pancreatitis",
    category: "肝胆外科",
    keywords: ["胰腺炎", "急性胰腺炎", "重症胰腺炎", "淀粉酶", "脂肪酶", "胆源性胰腺炎", "高脂血症性胰腺炎", "胰腺坏死", "假性囊肿", "pancreatitis"],
    question: "急性胰腺炎如何治疗？会复发吗？",
    answer: `<p><strong>急性胰腺炎</strong>是胰酶异常激活导致胰腺自身消化的炎症性疾病。病因以<strong>胆石症（胆源性）、酗酒、高甘油三酯血症</strong>三大原因最常见。</p>
    <p><strong>诊断标准（修订 Atlanta 分级，满足 3 项中 2 项）</strong>：① 典型上腹痛（持续性、向腰背部放射）；② 血淀粉酶/脂肪酶 ≥ 3 倍正常上限；③ 影像学特征（增强 CT 为严重度分级的金标准，发病 72 小时后评估更准确）。</p>
    <p><strong>严重度</strong>：轻症（MAP）/ 中度重症 / 重症（SAP：持续 > 48 小时的器官衰竭或坏死性胰腺炎）。</p>
    <p><strong>治疗要点（支持治疗为核心）：</strong></p>
    <ul>
      <li><strong>早期目标导向液体复苏</strong>（乳酸林格液）是最重要的干预；镇痛（阿片类）；</li>
      <li><strong>早期肠内营养</strong>：24–72 小时内启动（经口/鼻空肠管），无需"严格禁食至疼痛消失"；</li>
      <li><strong>病因处理</strong>：胆源性合并胆管炎者 <strong>24 小时内 ERCP</strong> 解除梗阻；胆源性轻症恢复期尽早行胆囊切除，防止复发；高脂血症性需快速降脂（胰岛素/血浆置换）；</li>
      <li><strong>重症管理</strong>：入 ICU；坏死感染采用"升阶梯"策略——发病 ≥ 4 周后经皮穿刺引流 → 微创视频辅助清创（最大限度减少开放手术）。</li>
    </ul>
    <p><strong>并发症</strong>：脓毒症、胰腺假性囊肿（有症状或持续增大者引流）、胰瘘、腹腔出血、ARDS、腹腔间隔室综合征。</p>
    <p><strong>预防复发</strong>：戒酒、胆源性者切除胆囊、甘油三酯控制在 < 5.6 mmol/L、控制体重。轻症多 1 周左右恢复；重症病死率可达 15–30%。</p>`,
    sources: [
      { name: "中华医学会：急性胰腺炎诊治指南", url: "https://www.cma.org.cn/" },
      { name: "IAP/APA 急性胰腺炎管理共识", url: "https://www.uptodate.com/" },
      { name: "NIDDK：Pancreatitis", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/pancreatitis" },
    ],
  },
  {
    id: "pancreatic-cancer",
    category: "肝胆外科",
    keywords: ["胰腺癌", "胰头癌", "壶腹周围癌", "Whipple", "胰十二指肠切除", "胰腺肿瘤", "CA19-9", "FOLFIRINOX", "新辅助", "胰腺"],
    question: "胰腺癌为什么被称为「癌中之王」？治疗有哪些选择？",
    answer: `<p><strong>胰腺癌</strong>恶性程度极高、起病隐匿，总体 5 年生存率约 10%，故称"癌中之王"。</p>
    <p><strong>高危因素</strong>：吸烟（最明确）、慢性胰腺炎、新发糖尿病或糖尿病突然恶化、胰腺癌家族史、肥胖、长期酗酒。</p>
    <p><strong>警惕信号</strong>：上腹/腰背部持续性钝痛（仰卧加重、俯卧缓解）、<strong>无痛性进行性黄疸</strong>（胰头癌，伴瘙痒与陶土色大便）、明显消瘦、新发糖尿病。<strong>CA19-9</strong> 为最常用肿瘤标志物（辅助诊断与疗效监测，不用于单独筛查）。</p>
    <p><strong>诊断与可切除性评估</strong>：胰腺薄层增强 CT（动脉期+门脉期双期扫描）为首选分期手段；MRCP/EUS（超声内镜 + 细针穿刺活检）辅助定性；依据肿瘤与肠系膜上动脉/静脉、腹腔干等血管的关系分为<strong>可切除、交界可切除、不可切除</strong>。</p>
    <p><strong>治疗：</strong></p>
    <ul>
      <li><strong>手术</strong>：胰头癌行<strong>胰十二指肠切除术（Whipple 手术）</strong>——整块切除胰头、十二指肠、胆囊、胆总管下段 + 淋巴结清扫并重建消化道；胰体尾癌行胰体尾切除 + 脾切除；</li>
      <li><strong>新辅助治疗</strong>：交界可切除者先行化疗（FOLFIRINOX 或吉西他滨 + 白蛋白紫杉醇）争取降期后再手术；</li>
      <li><strong>晚期</strong>：全身化疗 ± 姑息性胆道支架退黄、疼痛管理（含腹腔神经丛阻滞）。</li>
    </ul>
    <p><strong>术后主要并发症</strong>：胰瘘（监测引流液淀粉酶）、胃排空延迟、术后出血、腹腔感染。强调<strong>多学科（MDT）诊疗</strong>。预防：戒烟限酒、控制体重、健康饮食。</p>`,
    sources: [
      { name: "NCCN 胰腺癌指南", url: "https://www.nccn.org/" },
      { name: "国家卫生健康委：胰腺癌诊疗指南", url: "http://www.nhc.gov.cn/" },
      { name: "美国国家癌症研究所（NCI）：Pancreatic Cancer", url: "https://www.cancer.gov/types/pancreatic" },
    ],
  },
  {
    id: "hbp-postop",
    category: "肝胆外科",
    keywords: ["术后护理", "术后并发症", "T管", "T管护理", "胆瘘", "肝切除术后", "胆囊切除术后", "术后饮食", "引流管", "腹腔镜术后", "ERAS", "加速康复"],
    question: "肝胆手术后如何护理？引流管和T管怎么管理？",
    answer: `<p><strong>肝胆外科术后康复遵循加速康复外科（ERAS）理念</strong>：早活动、早进食、规范管路管理。分常见情形说明：</p>
    <p><strong>腹腔镜胆囊切除（LC）术后：</strong></p>
    <ul>
      <li>术后 6 小时可床上翻身，次日尽早下床活动，预防血栓与肺部并发症；</li>
      <li>饮食：排气后由清流质 → 低脂半流质，1 个月内避免油炸、肥腻食物，逐步过渡至普食；</li>
      <li><strong>警报信号</strong>：发热、皮肤巩膜黄染、胆汁样切口渗液或引流液增多（警惕胆瘘、胆管损伤）；肩背部酸痛（气腹残留）多 1–2 天自行缓解。</li>
    </ul>
    <p><strong>T 管护理（胆总管切开探查术后）：</strong></p>
    <ul>
      <li>妥善固定防牵拉脱出；引流袋低于腹部水平防逆流；</li>
      <li>记录胆汁量与性状：正常约 <strong>300–700ml/日</strong>、清亮金黄色；胆汁量骤减、浑浊脓性需报告医生；</li>
      <li>夹管训练：无腹痛、发热、黄疸者按医嘱逐步试夹管；拔管前需经 T 管造影确认胆道通畅，一般带管 2 周至 1 个月（长者 3–6 个月）；<strong>T 管意外脱出属急症，立即就医</strong>。</li>
    </ul>
    <p><strong>肝切除术后：</strong></p>
    <ul>
      <li>重点监测<strong>出血</strong>（引流液鲜红、心率增快、血压下降）、<strong>肝功能不全</strong>（黄疸加深、腹水、意识改变）、<strong>胆瘘</strong>与胸腔积液；</li>
      <li>保肝治疗、白蛋白支持、精准液体管理；无肝性脑病风险者给予足量优质蛋白 + 少食多餐。</li>
    </ul>
    <p><strong>随访</strong>：按医嘱复查肝功能、肿瘤标志物与影像；肿瘤术后 2 年内每 3 个月随访一次。</p>`,
    sources: [
      { name: "国家卫生健康委：加速康复外科试点工作方案与指南", url: "http://www.nhc.gov.cn/" },
      { name: "UpToDate：胆囊切除术围手术期管理", url: "https://www.uptodate.com/" },
      { name: "中华医学会外科学分会", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "liver-prevention",
    category: "肝胆外科",
    keywords: ["保肝", "护肝", "脂肪肝", "转氨酶", "肝功能异常", "酒精肝", "药物性肝损伤", "土三七", "养肝", "肝脏健康", "降酶"],
    question: "体检发现转氨酶升高怎么办？如何保护肝脏？",
    answer: `<p><strong>转氨酶（ALT/AST）升高提示肝细胞损伤</strong>，常见原因：脂肪肝、乙肝/丙肝、酒精、药物/中草药损伤（DILI）、自身免疫性肝病等。轻度升高建议 2–4 周后复查，持续异常或明显升高（> 3 倍上限）应到肝病/感染科系统查因，切勿自行服"降酶药"掩盖病情。</p>
    <p><strong>肝脏保护六要点：</strong></p>
    <ul>
      <li><strong>疫苗</strong>：乙肝表面抗体阴性者补种乙肝疫苗；高危人群接种甲肝疫苗；</li>
      <li><strong>戒酒限酒</strong>：酒精性肝病沿"脂肪肝 → 肝炎 → 肝硬化"进展，戒酒各阶段均获益；</li>
      <li><strong>管理代谢</strong>：非酒精性（代谢相关）脂肪性肝病是我国增长最快的肝病——减重 <strong>7–10%</strong> 配合运动可显著逆转脂肪性肝炎；控血糖、控血脂；</li>
      <li><strong>谨慎用药</strong>：不滥用"保肝保健品"与不明中草药（如土三七可致肝窦阻塞综合征）；他汀类药物总体肝安全性良好，不必因顾虑停药；</li>
      <li><strong>防黄曲霉毒素</strong>：霉变花生、玉米等坚决丢弃（强致癌物，与乙肝协同致肝癌）；</li>
      <li><strong>阻断传播</strong>：不共用剃须刀/牙刷，纹身、穿刺选择规范消毒机构。</li>
    </ul>
    <p><strong>重点人群随访</strong>：慢性乙肝/丙肝、肝硬化患者每 6 个月查肝功能 + 病毒学 + AFP + 超声，监测肝硬化与肝癌发生。脂肪肝尚无特效药，<strong>管住嘴、迈开腿</strong>才是核心"保肝药"。</p>`,
    sources: [
      { name: "WHO：肝脏健康与肝炎", url: "https://www.who.int/zh/health-topics/hepatitis" },
      { name: "中华医学会肝病学分会", url: "https://www.cma.org.cn/" },
      { name: "CDC：Viral Hepatitis", url: "https://www.cdc.gov/hepatitis/" },
    ],
  },
];
