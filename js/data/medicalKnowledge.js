// 医疗问答知识库 / Medical Q&A Knowledge Base（全科室版）
// 覆盖 22 大临床科室分类，肝胆外科为重点强化方向
// 所有回答基于权威医学指南与研究证据，仅作健康科普参考，不构成诊疗建议。
// 来源均链接至权威机构官方页面。

import { hepatobiliaryKB } from "./kb/kbHepatobiliary.js";
import { clinicalKB } from "./kb/kbClinical.js";
import { specialtyKB } from "./kb/kbSpecialties.js";

const coreKB = [
  {
    id: "hypertension",
    category: "心血管",
    keywords: ["高血压", "血压", "血压高", "降压", "收缩压", "舒张压", "hypertension", "blood pressure"],
    question: "什么是高血压？如何诊断与管理？",
    answer: `<p><strong>高血压</strong>是指动脉血压持续升高的慢性疾病。根据世界卫生组织（WHO）及中国高血压防治指南，成人静息状态下非同日三次诊室测量，收缩压 ≥ 140 mmHg 和/或舒张压 ≥ 90 mmHg 可诊断为高血压；美国 ACC/AHA 指南将控制目标定得更严格（≥ 130/80 mmHg）。</p>
    <p><strong>分级管理要点：</strong></p>
    <ul>
      <li><strong>生活方式干预</strong>：限盐（每日 < 5g）、控重（BMI 18.5–24）、规律有氧运动（每周 ≥ 150 分钟中等强度）、戒烟限酒、心理平衡。</li>
      <li><strong>药物治疗</strong>：常用五大类——ACEI/ARB、钙通道阻滞剂(CCB)、利尿剂、β受体阻滞剂。应在医师指导下个体化选用，切勿自行停药。</li>
      <li><strong>控制目标</strong>：一般患者 < 140/90 mmHg；合并糖尿病或肾病者可更严格（参考最新指南个体化）。</li>
    </ul>
    <p>高血压被称为"沉默的杀手"，多数患者无明显症状，但长期未控制可致心、脑、肾、眼底等靶器官损害。建议成人每年至少测量一次血压。</p>`,
    sources: [
      { name: "WHO：高血压", url: "https://www.who.int/zh/news-room/fact-sheets/detail/hypertension" },
      { name: "中国高血压防治指南", url: "http://www.chinacdc.cn/" },
      { name: "ACC/AHA 高血压指南", url: "https://www.acc.org/guidelines" },
    ],
  },
  {
    id: "diabetes",
    category: "内分泌",
    keywords: ["糖尿病", "血糖", "血糖高", "降糖", "胰岛素", "二甲双胍", "diabetes", "glucose"],
    question: "2 型糖尿病的诊断标准与日常管理？",
    answer: `<p><strong>2 型糖尿病</strong>是以胰岛素抵抗和相对胰岛素分泌不足为特征的慢性代谢疾病。根据 WHO 与中国 2 型糖尿病防治指南，诊断标准为：</p>
    <ul>
      <li>空腹血糖 ≥ 7.0 mmol/L（需另日复核）</li>
      <li>口服葡萄糖耐量试验(OGTT) 2 小时血糖 ≥ 11.1 mmol/L</li>
      <li>糖化血红蛋白(HbA1c) ≥ 6.5%</li>
      <li>典型症状（多饮、多尿、多食、体重下降）+ 随机血糖 ≥ 11.1 mmol/L</li>
    </ul>
    <p><strong>日常管理"五驾马车"：</strong></p>
    <ul>
      <li><strong>饮食</strong>：控制总热量，均衡膳食，减少精制糖与精制碳水，增加全谷物与蔬菜。</li>
      <li><strong>运动</strong>：每周 ≥ 150 分钟中等强度有氧运动，配合抗阻训练。</li>
      <li><strong>药物</strong>：二甲双胍为一线用药，新型药物 SGLT2 抑制剂与 GLP-1 受体激动剂兼具心肾保护。</li>
      <li><strong>监测</strong>：定期监测血糖与 HbA1c（控制目标一般 < 7.0%，个体化）。</li>
      <li><strong>教育</strong>：掌握低血糖识别与足部护理。</li>
    </ul>
    <p>糖尿病长期控制不佳可致视网膜病变、肾病、神经病变及心血管事件。规范管理可显著降低并发症风险。</p>`,
    sources: [
      { name: "WHO：糖尿病", url: "https://www.who.int/zh/news-room/fact-sheets/detail/diabetes" },
      { name: "中国 2 型糖尿病防治指南", url: "https://www.cma.org.cn/" },
      { name: "ADA 糖尿病诊疗标准", url: "https://diabetesjournals.org/care" },
    ],
  },
  {
    id: "afib",
    category: "心血管",
    keywords: ["房颤", "心房颤动", "心律失常", "房扑", "心悸", "afib", "atrial fibrillation", "arrhythmia"],
    question: "心房颤动的危害与抗凝为何重要？",
    answer: `<p><strong>心房颤动（房颤）</strong>是最常见的持续性心律失常，心房丧失有效收缩，心室律绝对不齐。根据 ACC/AHA/HRS 与 ESC 指南，房颤的主要危害是：</p>
    <ul>
      <li><strong>脑卒中</strong>：房颤患者卒中风险较常人高 4–5 倍，约占所有卒中的 15%。</li>
      <li><strong>心力衰竭</strong>：长期快心室率可致心动过速性心肌病。</li>
      <li><strong>认知下降与生活质量受损</strong>。</li>
    </ul>
    <p><strong>抗凝治疗是核心</strong>：医生常用 CHA₂DS₂-VASc 评分评估卒中风险（充血性心衰、高血压、年龄、糖尿病、卒中史、血管病变、性别）。评分 ≥ 2 分（男）/3 分（女）的瓣膜性房颤患者多需长期口服抗凝药。</p>
    <ul>
      <li>非瓣膜性房颤优先选用<strong>直接口服抗凝药(DOAC)</strong>，如达比加群、利伐沙班等，较华法林更安全便捷。</li>
      <li>是否需节律控制（复律/抗心律失常药/导管消融）由医师依据症状与心脏结构个体化决定。</li>
    </ul>
    <p>房颤常表现为心悸、气短、乏力，但也可无症状，于体检或心电图偶然发现。建议出现疑似症状尽早就医行心电图检查。</p>`,
    sources: [
      { name: "ACC/AHA/HRS 房颤指南", url: "https://www.ahajournals.org/toc/ahf/12/4" },
      { name: "ESC 房颤管理指南", url: "https://www.escardio.org/Guidelines" },
      { name: "中华心血管病杂志", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "heart-attack",
    category: "心血管",
    keywords: ["心梗", "心肌梗死", "心脏病发作", "胸痛", "冠心病", "心绞痛", "heart attack", "mi", "chest pain"],
    question: "急性心肌梗死的预警信号与急救？",
    answer: `<p><strong>急性心肌梗死</strong>多由冠状动脉粥样斑块破裂、血栓形成导致心肌持续缺血坏死。根据 ACC/AHA 与 ESC 指南，典型表现为：</p>
    <ul>
      <li>持续 <strong>胸骨后压榨样疼痛 > 20 分钟</strong>，可向左肩臂、下颌、上腹放射；</li>
      <li>伴大汗、恶心、气短、濒死感；</li>
      <li>部分患者（尤其女性、老人、糖尿病者）症状不典型，可仅表现为乏力、上腹痛或无症状。</li>
    </ul>
    <p><strong>急救关键 — 时间就是心肌：</strong></p>
    <ul>
      <li>立即<strong>拨打 120</strong>，原地静卧，避免活动。</li>
      <li>若有阿司匹林且无禁忌，可遵医嘱嚼服 300mg（疑似急性冠脉综合征时）。</li>
      <li>到达医院后，目标是<strong>进门到球囊扩张(D2B) ≤ 90 分钟</strong>，行急诊 PCI 开通罪犯血管；或无条件时及时静脉溶栓。</li>
    </ul>
    <p>冠心病高危人群（高血压、糖尿病、吸烟、血脂异常、家族史）应积极控制危险因素。出现持续胸痛请即刻就医，切勿自行驾车。</p>`,
    sources: [
      { name: "ACC/AHA STEMI 管理指南", url: "https://www.acc.org/guidelines" },
      { name: "ESC 急性冠脉综合征指南", url: "https://www.escardio.org/Guidelines" },
      { name: "AHA 心脏病发作症状", url: "https://www.heart.org/" },
    ],
  },
  {
    id: "covid19",
    category: "感染",
    keywords: ["新冠", "covid", "新冠后遗症", "长新冠", "冠状病毒", "核酸", "coronavirus"],
    question: "COVID-19 的预防与「长新冠」是什么？",
    answer: `<p><strong>COVID-19</strong>由新型冠状病毒(SARS-CoV-2)引起，主要通过呼吸道飞沫与气溶胶传播。根据 WHO 与中国疾控中心(CDC)：</p>
    <p><strong>预防措施：</strong></p>
    <ul>
      <li>接种新冠疫苗与加强针，可显著降低重症与死亡风险；</li>
      <li>在呼吸道疾病高发期或人群密集场所佩戴口罩；</li>
      <li>勤洗手、保持通风、有症状时居家休息减少传播。</li>
    </ul>
    <p><strong>常见症状：</strong>发热、干咳、乏力、咽痛、嗅觉/味觉减退、肌肉酸痛；重症可出现呼吸困难、低氧血症。</p>
    <p><strong>"长新冠"(Post-COVID condition)</strong>指感染后持续 ≥ 3 个月、影响日常功能、不能用其他诊断解释的症状，常见包括疲劳、注意力下降("脑雾")、气短、心悸等。目前尚无单一特效治疗，以循序渐进的康复管理与多学科评估为主。</p>
    <p>高危人群（高龄、未接种、基础疾病多）感染后建议尽早就医评估抗病毒治疗指征。</p>`,
    sources: [
      { name: "WHO：COVID-19", url: "https://www.who.int/zh/health-topics/coronavirus" },
      { name: "中国疾控中心", url: "https://www.chinacdc.cn/" },
      { name: "WHO：长新冠", url: "https://www.who.int/europe/news-room/fact-sheets/item/post-covid-19-condition" },
    ],
  },
  {
    id: "influenza",
    category: "感染",
    keywords: ["流感", "感冒", "发烧", "发热", "influenza", "flu", "疫苗"],
    question: "流行性感冒与普通感冒的区别及预防？",
    answer: `<p><strong>流行性感冒（流感）</strong>由流感病毒（甲型/乙型）引起，传染性强。根据 WHO 与 CDC：</p>
    <p><strong>流感 vs 普通感冒：</strong></p>
    <ul>
      <li>流感多<strong>急起高热（39–40℃）</strong>、明显全身症状（头痛、肌痛、极度乏力），呼吸道症状相对后发；</li>
      <li>普通感冒多为低热或不发热，以鼻塞、流涕、咽痛为主，全身症状轻。</li>
    </ul>
    <p><strong>并发症</strong>：流感可致肺炎、心肌炎、加重基础疾病，老人、孕妇、慢性病患者及婴幼儿属高危人群。</p>
    <p><strong>预防与处理：</strong></p>
    <ul>
      <li><strong>每年接种流感疫苗</strong>是最有效的预防手段，建议高危人群及照护者秋季接种；</li>
      <li>发病 48 小时内启动抗病毒治疗（奥司他韦等）可缩短病程、降低重症；</li>
      <li>充分休息、补水，对症处理；持续高热、气促、意识改变者需就医。</li>
    </ul>
    <p>保持手卫生、咳嗽礼仪与通风，高发季节少去人群密集场所。</p>`,
    sources: [
      { name: "WHO：流感", url: "https://www.who.int/zh/news-room/fact-sheets/detail/influenza-(seasonal)" },
      { name: "CDC：流感", url: "https://www.cdc.gov/flu/" },
    ],
  },
  {
    id: "sleep",
    category: "生活方式",
    keywords: ["睡眠", "失眠", "入睡", "熬夜", "睡眠质量", "sleep", "insomnia"],
    question: "如何改善睡眠健康？",
    answer: `<p>根据美国睡眠医学会(AASM)与 CDC，成人每晚建议 <strong>7–9 小时</strong>睡眠。长期睡眠不足与心血管疾病、肥胖、糖尿病、抑郁及免疫功能下降相关。</p>
    <p><strong>改善睡眠卫生的建议：</strong></p>
    <ul>
      <li>固定作息：每天同一时间上床与起床（含周末）；</li>
      <li>营造环境：卧室安静、黑暗、凉爽（约 18–20℃）；</li>
      <li>睡前 1 小时远离手机等蓝光屏幕，可阅读或冥想放松；</li>
      <li>午后限制咖啡因，睡前避免饮酒（酒精破坏深睡眠）；</li>
      <li>规律运动，但避免睡前 2–3 小时剧烈运动；</li>
      <li>白天午睡控制在 20–30 分钟，避免过晚。</li>
    </ul>
    <p><strong>需就医的情况：</strong>入睡/维持睡眠困难超过 3 个月、白天严重嗜睡、打鼾伴呼吸暂停（提示睡眠呼吸暂停综合征）、不宁腿等。规范评估可显著改善生活质量。</p>`,
    sources: [
      { name: "CDC：睡眠", url: "https://www.cdc.gov/sleep/" },
      { name: "美国睡眠医学会", url: "https://aasm.org/" },
    ],
  },
  {
    id: "nutrition",
    category: "生活方式",
    keywords: ["营养", "饮食", "吃什么", "膳食", "减肥", "减重", "肥胖", "diet", "nutrition", "weight loss"],
    question: "怎样的膳食结构更健康？",
    answer: `<p>WHO 与中国居民膳食指南强调均衡膳食是慢性病预防的基础。核心原则：</p>
    <ul>
      <li><strong>限盐</strong>：成人每日盐 < 5g（约一啤酒瓶盖），减少加工食品隐形盐；</li>
      <li><strong>控糖</strong>：添加糖 < 25g/日，少喝含糖饮料；</li>
      <li><strong>适量脂肪</strong>：以不饱和脂肪（鱼、坚果、橄榄油）替代饱和脂肪与反式脂肪；</li>
      <li><strong>多样蔬果</strong>：每日蔬菜 ≥ 300g（深色过半）、水果 200–350g；</li>
      <li><strong>全谷物</strong>：精米白面替换部分为全谷物（燕麦、糙米、杂豆）；</li>
      <li><strong>足量饮水</strong>：成人 1500–1700ml/日，首选白水。</li>
    </ul>
    <p>体重管理建议：维持 BMI 在 18.5–24，男性腰围 < 90cm、女性 < 85cm。减重以"能量负平衡"为核心，即合理饮食 + 运动相结合，每周减 0.5–1kg 为宜，避免极端节食。任何特殊饮食（如生酮、间歇性断食）请在专业人士评估后进行。</p>`,
    sources: [
      { name: "WHO：健康膳食", url: "https://www.who.int/zh/news-room/fact-sheets/detail/healthy-diet" },
      { name: "中国居民膳食指南", url: "https://www.cnsoc.org/" },
      { name: "AHA 膳食建议", url: "https://www.heart.org/" },
    ],
  },
  {
    id: "exercise",
    category: "生活方式",
    keywords: ["运动", "锻炼", "健身", "有氧", "跑步", "exercise", "physical activity"],
    question: "每周应运动多少才健康？",
    answer: `<p>WHO 与 AHA 对成人身体活动的建议：</p>
    <ul>
      <li>每周 <strong>≥ 150 分钟中等强度</strong>有氧运动（快走、骑车、游泳、广场舞等），或 75 分钟高强度，或等量组合；</li>
      <li>每周 <strong>≥ 2 次</strong>抗阻训练，覆盖主要肌群，维持肌肉与骨密度；</li>
      <li>减少久坐：每坐 30–60 分钟起身活动几分钟。</li>
    </ul>
    <p><strong>强度判断</strong>：中等强度时"能说话但不能唱歌"；高强度时"无法连续说完一句话"。</p>
    <p>对心血管疾病患者，建议在医师评估后制定<strong>运动处方</strong>（如心脏康复），从低强度起步循序渐进。规律运动可降低心血管死亡风险约 20–30%，并改善血压、血糖、情绪与睡眠。</p>
    <p>运动贵在坚持，将活动融入日常（步行通勤、爬楼梯）同样有效。</p>`,
    sources: [
      { name: "WHO：身体活动", url: "https://www.who.int/zh/news-room/fact-sheets/detail/physical-activity" },
      { name: "AHA 运动建议", url: "https://www.heart.org/" },
    ],
  },
  {
    id: "vaccination",
    category: "预防",
    keywords: ["疫苗", "接种", "打疫苗", "疫苗安全", "vaccine", "immunization"],
    question: "成人需要打疫苗吗？疫苗安全吗？",
    answer: `<p>WHO 明确：疫苗是历史上最有效的公共卫生干预之一，每年挽救数百万生命。成人免疫同样重要：</p>
    <ul>
      <li><strong>流感疫苗</strong>：建议每年秋季接种，尤其老人、孕妇、慢病患者及医务人员；</li>
      <li><strong>肺炎球菌疫苗</strong>：≥ 65 岁及高危人群推荐；</li>
      <li><strong>带状疱疹疫苗</strong>：≥ 50 岁推荐；</li>
      <li><strong>HPV 疫苗</strong>：预防宫颈癌等，建议适龄人群尽早接种；</li>
      <li><strong>破伤风</strong>：每 10 年加强一次。</li>
    </ul>
    <p><strong>关于安全性</strong>：所有疫苗上市前均经严格临床试验与审批，上市后持续监测不良反应。常见一过性反应（局部红肿、低热）通常 1–2 天自行缓解。严重不良反应罕见。获益远大于风险。</p>
    <p>接种禁忌与个体情况请咨询接种医生；有明确过敏史应告知。</p>`,
    sources: [
      { name: "WHO：疫苗", url: "https://www.who.int/zh/health-topics/vaccines-and-immunization" },
      { name: "中国疾控中心免疫规划", url: "https://www.chinacdc.cn/" },
      { name: "CDC 疫苗", url: "https://www.cdc.gov/vaccines/" },
    ],
  },
  {
    id: "smoking-cessation",
    category: "生活方式",
    keywords: ["戒烟", "吸烟", "抽烟", "烟瘾", "尼古丁", "smoking", "tobacco"],
    question: "戒烟有哪些好处与方法？",
    answer: `<p>WHO 与 CDC 指出：吸烟是全球可预防死亡的首要原因，与肺癌、心血管病、慢阻肺、卒中等多种疾病密切相关。<strong>何时戒烟都不晚</strong>：</p>
    <ul>
      <li>戒烟 <strong>20 分钟</strong>：血压与心率开始回落；</li>
      <li><strong>24 小时</strong>：心肌梗死风险开始下降；</li>
      <li><strong>1 年</strong>：冠心病风险约为吸烟者的一半；</li>
      <li><strong>5 年</strong>：卒中风险接近非吸烟者；</li>
      <li><strong>10 年</strong>：肺癌死亡率约为吸烟者的一半。</li>
    </ul>
    <p><strong>科学戒烟方法：</strong></p>
    <ul>
      <li>设定戒烟日，告知家人朋友寻求支持；</li>
      <li>识别并回避诱因（饭后、饮酒、压力情境）；</li>
      <li>药物辅助：尼古丁替代贴片/口香糖、伐尼克兰等可显著提高成功率，需在医师指导下使用；</li>
      <li>行为支持：戒烟门诊、戒烟热线（全国戒烟热线 400-808-5531）。</li>
    </ul>
    <p>戒断期的不适（烦躁、焦虑、注意力下降）多在 2–4 周内缓解。复吸是戒烟过程的一部分，请勿气馁，多次尝试终将成功。</p>`,
    sources: [
      { name: "WHO：烟草", url: "https://www.who.int/zh/health-topics/tobacco" },
      { name: "CDC：戒烟", url: "https://www.cdc.gov/tobacco/" },
      { name: "中国戒烟平台", url: "https://www.chinacdc.cn/" },
    ],
  },
  {
    id: "hyperlipidemia",
    category: "心血管",
    keywords: ["血脂", "胆固醇", "甘油三酯", "低密度脂蛋白", "他汀", "降脂", "hyperlipidemia", "cholesterol"],
    question: "血脂异常如何管理？需要吃他汀吗？",
    answer: `<p><strong>血脂异常</strong>（尤其 LDL-C 升高）是动脉粥样硬化的核心驱动因素。根据 ESC/EAS 与中国血脂指南，管理以 <strong>LDL-C</strong> 为主要靶点，目标因风险分层而异：</p>
    <ul>
      <li>低/中危：LDL-C < 3.4 mmol/L；</li>
      <li>高危（如糖尿病）：LDL-C < 2.6 mmol/L；</li>
      <li>极高危（已发 ASCVD）：LDL-C < 1.8 mmol/L 且较基线降幅 ≥ 50%；</li>
      <li>极极高危：可进一步降至 < 1.4 mmol/L。</li>
    </ul>
    <p><strong>治疗策略：</strong></p>
    <ul>
      <li>生活方式为基础：减少饱和脂肪与反式脂肪、增加可溶性纤维、规律运动、控重戒烟；</li>
      <li><strong>他汀类药物</strong>为一线治疗，明确降低心血管事件；不能达标者可联合依折麦布、PCSK9 抑制剂；</li>
      <li>他汀相关肝酶、肌酶异常通常轻微，应在医师监测下使用，不建议因顾虑副作用自行停药。</li>
    </ul>
    <p>是否需服药由心血管整体风险评估决定，而非单纯看某次化验值。建议 40 岁以上成人定期检测血脂。</p>`,
    sources: [
      { name: "ESC/EAS 血脂指南", url: "https://www.escardio.org/Guidelines" },
      { name: "中国成人血脂异常防治指南", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "heart-failure",
    category: "心血管",
    keywords: ["心衰", "心力衰竭", "心功能", "水肿", "气喘", "heart failure"],
    question: "心力衰竭有哪些信号？如何管理？",
    answer: `<p><strong>心力衰竭</strong>是心脏泵血或充盈功能受损的临床综合征，常见病因为冠心病、高血压、瓣膜病、心肌病等。典型表现：</p>
    <ul>
      <li><strong>呼吸困难</strong>：活动后气促，进展可至夜间端坐呼吸；</li>
      <li><strong>液体潴留</strong>：下肢凹陷性水肿、体重短期内增加；</li>
      <li><strong>疲乏、运动耐量下降</strong>。</li>
    </ul>
    <p>根据 ACC/AHA/ESC 与中国心衰指南，规范管理"四联"药物可显著改善预后、降低住院与死亡：</p>
    <ul>
      <li>ACEI/ARB 或 ARNI（如沙库巴曲缬沙坦）；</li>
      <li>β 受体阻滞剂；</li>
      <li>醛固酮拮抗剂（螺内酯等）；</li>
      <li>SGLT2 抑制剂（达格列净、恩格列净）。</li>
    </ul>
    <p>自我管理要点：每日称体重（增加 > 2kg/3 天需警惕）、限盐限水、规范服药、识别加重信号尽早就医。心衰虽不可逆但可控，规范治疗下许多患者可显著改善生活质量。</p>`,
    sources: [
      { name: "ACC/AHA 心衰指南", url: "https://www.acc.org/guidelines" },
      { name: "ESC 心衰指南", url: "https://www.escardio.org/Guidelines" },
      { name: "中国心力衰竭指南", url: "https://www.cma.org.cn/" },
    ],
  },
  {
    id: "stroke",
    category: "神经",
    keywords: ["卒中", "中风", "脑梗", "脑出血", "脑卒中", "偏瘫", "stroke"],
    question: "如何识别脑卒中（中风）？FAST 口诀？",
    answer: `<p><strong>脑卒中</strong>分缺血性（脑梗死，约 80%）与出血性，是致残致死的重要疾病。根据 AHA/ASA，快速识别口诀 <strong>"BE-FAST"</strong>：</p>
    <ul>
      <li><strong>B</strong>alance 平衡：突发行走不稳、头晕；</li>
      <li><strong>E</strong>yes 眼睛：突发视力模糊或复视；</li>
      <li><strong>F</strong>ace 面部：口角歪斜、一侧下垂；</li>
      <li><strong>A</strong>rm 手臂：一侧无力或麻木，平举时下垂；</li>
      <li><strong>S</strong>peech 言语：说话含糊、不能理解；</li>
      <li><strong>T</strong>ime 时间：出现上述任一立即拨打 120。</li>
    </ul>
    <p><strong>时间窗至关重要</strong>：</p>
    <ul>
      <li>缺血性卒中发病 <strong>4.5 小时</strong>内可静脉溶栓；</li>
      <li>大血管闭塞可在 <strong>24 小时</strong>内评估机械取栓（依影像筛选）。</li>
    </ul>
    <p>每延误 1 分钟，脑组织死亡约 190 万神经元。<strong>切勿自行观察等待</strong>。预防核心是控制高血压、房颤、糖尿病、血脂、戒烟限酒及规律运动。</p>`,
    sources: [
      { name: "AHA/ASA 卒中", url: "https://www.stroke.org/" },
      { name: "WHO：卒中", url: "https://www.who.int/zh/health-topics/stroke" },
    ],
  },
  {
    id: "mental-health",
    category: "心理",
    keywords: ["抑郁", "焦虑", "压力", "情绪", "失眠", "心理", "抑郁", "depression", "anxiety", "mental"],
    question: "出现抑郁焦虑情绪怎么办？何时求助？",
    answer: `<p>WHO 指出：心理健康是整体健康不可分割的部分。短期的情绪低落与焦虑是正常反应，但当持续影响生活时需重视。</p>
    <p><strong>建议求助的情况：</strong></p>
    <ul>
      <li>情绪低落或兴趣丧失持续 <strong>≥ 2 周</strong>；</li>
      <li>严重影响工作、学习、人际或自理；</li>
      <li>出现自伤念头——请<strong>立即求助</strong>专业人员或拨打心理援助热线（全国 400-161-9995）。</li>
    </ul>
    <p><strong>日常心理保健：</strong></p>
    <ul>
      <li>规律作息与运动（运动可改善抑郁焦虑症状）；</li>
      <li>维持社会联结，主动倾诉；</li>
      <li>正念/冥想练习有循证支持；</li>
      <li>减少酒精等物质"自我治疗"——可能加重病情。</li>
    </ul>
    <p>心理疾病与其他疾病一样，是可治疗的医学问题。规范治疗（心理治疗、药物治疗）多数可显著改善。寻求帮助是负责任的表现，而非软弱。</p>`,
    sources: [
      { name: "WHO：心理健康", url: "https://www.who.int/zh/health-topics/mental-health" },
      { name: "国家心理援助热线", url: "https://www.chinacdc.cn/" },
    ],
  },
  {
    id: "cancer-screening",
    category: "预防",
    keywords: ["体检", "筛查", "癌症", "肿瘤", "早筛", "cancer", "screening", "体检"],
    question: "常见癌症筛查建议？",
    answer: `<p>WHO 与各国指南强调：早期筛查可在症状出现前发现癌症或癌前病变，显著提高治愈率。常见循证筛查建议：</p>
    <ul>
      <li><strong>乳腺癌</strong>：女性 40–45 岁起定期乳腺 X 线（钼靶），高危人群提前；</li>
      <li><strong>宫颈癌</strong>：25–65 岁女性定期宫颈细胞学(TCT)±HPV 检测；HPV 疫苗可预防大部分宫颈癌；</li>
      <li><strong>结直肠癌</strong>：45–75 岁建议结肠镜或粪便潜血检测；</li>
      <li><strong>肺癌</strong>：50–80 岁重度吸烟者建议低剂量胸部 CT 筛查；</li>
      <li><strong>前列腺癌</strong>：与医师讨论 PSA 检测的获益与局限。</li>
    </ul>
    <p>需注意：不同指南建议略有差异，应根据<strong>个人危险因素与家族史</strong>与医生共同决策。常规体检项目（血常规、肝肾功能、心电图等）侧重一般健康评估，不能替代针对性肿瘤筛查。</p>
    <p>预防层面：戒烟限酒、均衡膳食、规律运动、防晒、接种 HPV 与乙肝疫苗，可降低约 30–50% 的癌症发生。</p>`,
    sources: [
      { name: "WHO：癌症", url: "https://www.who.int/zh/health-topics/cancer" },
      { name: "美国 USPSTF 筛查建议", url: "https://www.uspreventiveservicestaskforce.org/" },
    ],
  },
  {
    id: "first-aid-choking",
    category: "急救",
    keywords: ["海姆立克", "噎住", "窒息", "异物", "急救", "heimlich", "choking", "急救"],
    question: "异物卡喉窒息如何急救（海姆立克法）？",
    answer: `<p>气道异物梗阻可数分钟内致命，需立即施救。<strong>海姆立克急救法</strong>要点：</p>
    <p><strong>成人/儿童清醒患者：</strong></p>
    <ul>
      <li>站于患者身后，双臂环抱其腰部；</li>
      <li>一手握拳，拳眼置于患者肚脐上方两横指处；</li>
      <li>另一手包握此拳，向<strong>后上方快速用力冲击</strong>，反复 5 次；</li>
      <li>直至异物排出或患者意识丧失。</li>
    </ul>
    <p><strong>1 岁以下婴儿：</strong>采用<strong>拍背压胸法</strong>——5 次背部叩击 + 5 次胸部冲击交替，勿使用腹部冲击。</p>
    <p><strong>意识丧失者</strong>：立即拨打 120，开始心肺复苏(CPR)，每次开放气道时查看口腔有无异物可见、可用手指钩取（不可盲目掏取）。</p>
    <p>建议每个家庭学习基础急救（CPR、AED 使用、海姆立克法），关键时刻可挽救生命。本介绍仅作科普，不能替代系统培训。</p>`,
    sources: [
      { name: "AHA 急救", url: "https://cpr.heart.org/" },
      { name: "红十字会急救", url: "https://www.redcross.org/" },
    ],
  },
];

// 原有条目归入新科室分类体系
const coreCategoryMap = {
  hypertension: "心血管科",
  diabetes: "内分泌科",
  afib: "心血管科",
  "heart-attack": "心血管科",
  covid19: "传染病科",
  influenza: "传染病科",
  sleep: "健康生活方式",
  nutrition: "健康生活方式",
  exercise: "健康生活方式",
  vaccination: "传染病科",
  "smoking-cessation": "健康生活方式",
  hyperlipidemia: "心血管科",
  "heart-failure": "心血管科",
  stroke: "神经科",
  "mental-health": "精神科",
  "cancer-screening": "肿瘤科",
  "first-aid-choking": "急诊科",
};
const coreEntries = coreKB.map((e) => (coreCategoryMap[e.id] ? { ...e, category: coreCategoryMap[e.id] } : e));

// 合并全库：肝胆外科条目置于最前（重点强化方向），其余按核心→内科系统→专科排列
export const medicalKB = [...hepatobiliaryKB, ...coreEntries, ...clinicalKB, ...specialtyKB];

// 兜底回答 / fallback
export const fallbackResponse = {
  answer: `<p>感谢您的提问。本知识库现已覆盖 <strong>22 大临床科室</strong>——内科、外科（<strong>肝胆外科重点强化</strong>）、妇产科、儿科、皮肤科、神经科、精神科、眼科、耳鼻喉科、口腔科、骨科、心血管科、呼吸科、消化科、内分泌科、肾内科、血液科、肿瘤科、传染病科、急诊科及健康生活方式。</p>
    <p><strong>肝胆外科方向</strong>深度覆盖肝炎、肝硬化、肝癌、肝脓肿、胆囊炎、胆石症、胆管炎、胆道肿瘤、胰腺炎、胰腺癌等疾病的诊断、手术、术后护理与并发症防治。</p>
    <p>您可以：</p>
    <ul>
      <li>换用更具体的关键词（如"胆囊结石"、"胰腺炎"、"乙肝"）；</li>
      <li>使用右侧<strong>关键词搜索</strong>或<strong>分类浏览</strong>功能快速定位条目；</li>
      <li>如症状明显或紧急，请<strong>立即就医或拨打 120</strong>，切勿因网络信息延误病情。</li>
    </ul>`,
  sources: [
    { name: "WHO 健康主题", url: "https://www.who.int/zh/health-topics" },
    { name: "国家卫生健康委", url: "http://www.nhc.gov.cn/" },
  ],
};

export const suggestedQuestions = [
  "胆囊结石一定要切除胆囊吗？",
  "急性胰腺炎如何治疗？会复发吗？",
  "乙肝会发展成肝癌吗？如何预防？",
  "原发性肝癌的治疗方式和米兰标准？",
  "急性心肌梗死有哪些预警信号？",
  "如何识别脑卒中（中风）？",
];

// 科室分类（展示顺序）：肝胆外科为重点，置顶并高亮
export const qaTopics = [
  "肝胆外科", "外科", "内科", "心血管科", "呼吸科", "消化科", "内分泌科", "肾内科", "血液科",
  "肿瘤科", "传染病科", "神经科", "精神科", "妇产科", "儿科", "皮肤科", "眼科", "耳鼻喉科",
  "口腔科", "骨科", "急诊科", "健康生活方式",
];

// 分类元数据（图标与说明，用于分类浏览 UI）
export const categoryMeta = {
  "肝胆外科": { icon: "🏥", desc: "重点强化：肝脏、胆道、胰腺疾病的诊断、手术与围手术期管理", featured: true },
  "外科": { icon: "🩻", desc: "普通外科常见急腹症与腹壁疝" },
  "内科": { icon: "💊", desc: "内科常见病综合管理（痛风、风湿免疫等）" },
  "心血管科": { icon: "❤️", desc: "高血压、冠心病、心律失常、心衰、血脂" },
  "呼吸科": { icon: "🫁", desc: "哮喘、慢阻肺等气道疾病" },
  "消化科": { icon: "🍽️", desc: "幽门螺杆菌、胃食管反流等胃肠疾病" },
  "内分泌科": { icon: "🦋", desc: "糖尿病、甲状腺疾病" },
  "肾内科": { icon: "🫘", desc: "慢性肾脏病、蛋白尿、透析" },
  "血液科": { icon: "🩸", desc: "贫血等血液系统疾病" },
  "肿瘤科": { icon: "🎗️", desc: "癌症筛查与肿瘤防治" },
  "传染病科": { icon: "🦠", desc: "流感、新冠、结核、疫苗与感染性疾病" },
  "神经科": { icon: "🧠", desc: "卒中、头痛等神经系统疾病" },
  "精神科": { icon: "🧘", desc: "抑郁焦虑与心理健康" },
  "妇产科": { icon: "🤰", desc: "宫颈健康、孕期保健" },
  "儿科": { icon: "👶", desc: "儿童发热、手足口病" },
  "皮肤科": { icon: "🧴", desc: "湿疹等皮肤问题" },
  "眼科": { icon: "👁️", desc: "近视防控" },
  "耳鼻喉科": { icon: "👂", desc: "过敏性鼻炎" },
  "口腔科": { icon: "🦷", desc: "龋齿与牙周病" },
  "骨科": { icon: "🦴", desc: "腰椎间盘突出、骨质疏松" },
  "急诊科": { icon: "🚑", desc: "CPR、海姆立克等急救技能" },
  "健康生活方式": { icon: "🌱", desc: "睡眠、营养、运动、戒烟" },
};
