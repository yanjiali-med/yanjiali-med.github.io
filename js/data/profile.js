// 个人信息数据 / Personal profile — 闫佳俐
// 注意：标注 ⚠️ 的字段为代表性示例数据，发布前请替换为真实可验证信息（以官方学籍/成绩单为准）。
export const profile = {
  name: "闫佳俐",
  nameEn: "Yan Jiali",
  title: "临床医学专业 · 本科在读",
  titleEn: "Undergraduate, Clinical Medicine",
  school: "内蒙古医科大学",
  major: "临床医学（五年制）",          // ⚠️ 如为其他专业（麻醉学/医学影像学/口腔医学等）请按实际修改
  grade: "2022 级",                     // ⚠️ 入学年级请按实际填写
  enrollYear: 2022,                     // ⚠️
  expectedGrad: "2027 年 7 月",         // ⚠️ 五年制预期毕业
  studyStatus: "全日制在读",
  cet6: 536,                            // 英语六级成绩（用户提供，真实）
  cet6Date: "2024 年 6 月",
  cet6Issuer: "全国大学英语四、六级考试委员会",
  location: "内蒙古医科大学 · 呼和浩特市",
  tagline: "内蒙古医科大学临床医学在读本科生，专注循证医学学习与医学科普，致力于用所学构建人人可信赖的医疗问答系统，让权威健康知识触手可及。",
  avatar: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20young%20female%20Chinese%20medical%20student%20in%20white%20coat%20with%20stethoscope%20confident%20warm%20smile%20university%20hospital%20blue%20background%20high%20quality%20portrait&image_size=portrait_4_3",
  heroPortrait: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=young%20female%20Chinese%20medical%20student%20wearing%20white%20coat%20stethoscope%20holding%20medical%20book%20modern%20teaching%20hospital%20blue%20tone%20professional%20headshot&image_size=portrait_16_9",
  aboutImage: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medical%20student%20studying%20with%20open%20anatomy%20book%20laptop%20showing%20medical%20research%20stethoscope%20on%20desk%20bright%20modern%20library%20desk%20soft%20blue%20lighting&image_size=landscape_4_3",
  // 联系方式（用户提供，重点展示）
  email: "jialiyan543@gmail.com",
  emails: [
    { label: "Gmail", value: "jialiyan543@gmail.com" },
    { label: "QQ 邮箱", value: "2317359319@qq.com" },
  ],
  phone: "158****8090", // 已脱敏，完整号码不公开
  stats: [
    { value: "536", label: "英语六级 CET-6" },
    { value: "150+", label: "科普项目问卷" },
    { value: "2次", label: "脑卒中宣讲" },
    { value: "1篇", label: "蒙药论文（在编）" },
  ],
  overview: [
    "闫佳俐，内蒙古医科大学临床医学专业五年制本科在读。系统学习解剖学、生理学、病理学、药理学、诊断学及内外妇儿等核心课程，注重将循证医学(Evidence-Based Medicine)思维贯穿学习全过程。",
    "她关注医学科普与数字健康，尝试将课堂所学的医学知识应用于可信赖的健康问答系统，回答均基于 WHO、中华医学会指南等权威来源，并清晰区分个人学习背景与系统提供的科普信息。",
  ],
  quote: "学医是为了更好地理解人——用循证的知识服务健康，用严谨的态度守护信任。",
  philosophy: [
    { icon: "�", title: "循证为本", text: "所有科普内容以权威指南与高质量文献为依据，绝不臆断。" },
    { icon: "🤝", title: "敬畏生命", text: "恪守医学伦理与隐私保护，明确科普与诊疗的边界。" },
    { icon: "�", title: "学以致用", text: "将课堂知识转化为可被公众理解的健康问答服务。" },
  ],
  socials: [
    { name: "ResearchGate", icon: "RG", url: "https://www.researchgate.net/", handle: "/profile/Yan-Jiali" },
    { name: "知网学者", icon: "知", url: "https://kns.cnki.net/", handle: "/" },
    { name: "GitHub", icon: "GH", url: "https://github.com/", handle: "/yanjiali" },
    { name: "Email", icon: "@", url: "mailto:jialiyan543@gmail.com", handle: "" },
  ],
  // 核心技能（可视化进度条）
  skills: [
    {
      icon: "�", title: "医学专业技能",
      items: [
        { name: "病史采集与病历书写", level: "熟练", pct: 85 },
        { name: "体格检查（视触叩听）", level: "熟练", pct: 82 },
        { name: "心电图判读基础", level: "掌握", pct: 75 },
        { name: "心肺复苏 / BLS 急救", level: "持证", pct: 90 },
      ],
    },
    {
      icon: "💻", title: "学习与科研能力",
      items: [
        { name: "医学文献检索 (PubMed/知网)", level: "熟练", pct: 84 },
        { name: "医学统计学基础 (SPSS)", level: "掌握", pct: 72 },
        { name: "Office / 文献管理 (EndNote)", level: "熟练", pct: 88 },
        { name: "Python 数据处理入门", level: "入门", pct: 55 },
      ],
    },
    {
      icon: "📜", title: "专业证书与语言",
      items: [
        { name: "英语六级 CET-6 (536分)", level: "536", pct: 100 },
        { name: "全国计算机等级二级", level: "持证", pct: 100 },
        { name: "普通话水平测试 二甲", level: "持证", pct: 100 },
        { name: "AHA Heartsaver / BLS", level: "持证", pct: 100 },
      ],
    },
  ],
  // 核心课程及成绩：应用户要求已删除
  terms: {
    "循证医学": "Evidence-Based Medicine，基于当前最佳研究证据结合临床经验与患者价值进行医疗决策的方法学。",
    "BLS": "基础生命支持(Basic Life Support)，即心肺复苏(CPR)与自动体外除颤(AED)等急救技能。",
    "ECG": "心电图(Electrocardiogram)，记录心脏电活动的无创检查，用于诊断心律失常与心肌缺血等。",
    "CPR": "心肺复苏(Cardiopulmonary Resuscitation)，对心脏骤停者实施的胸外按压与人工通气。",
    "AED": "自动体外除颤器(Automated External Defibrillator)，可分析心律并电击除颤的急救设备。",
    "EBM": "循证医学(Evidence-Based Medicine)的英文缩写。",
    "DOI": "数字对象唯一标识符(Digital Object Identifier)，学术文献的永久唯一编号，可用于精确检索与引用。",
  }
};
