
var optionList = [
	{
		"id":"s0001",
		"name":"힘 $pn$x",
		"point":1,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0002",
		"name":"지능 $pn$x",
		"point":1,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0003",
		"name":"체력 $pn$x",
		"point":1,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0004",
		"name":"정신력 $pn$x",
		"point":1,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0005",
		"name":"HPMAX $pn$x",
		"point":1,
		"x":200,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0006",
		"name":"MPMAX $pn$x",
		"point":1,
		"x":200,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0007",
		"name":"HP 1분당 $x $pn",
		"point":1,
		"x":20,
		"positive":"회복",
		"negative":"감소"
	}, 
	{
		"id":"s0008",
		"name":"MP 1분당 $x $pn",
		"point":1,
		"x":20,
		"positive":"회복",
		"negative":"감소"
	}, 
	{
		"id":"s0009",
		"name":"모든 상태변화 내성 $pn$x",
		"point":1,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0010",
		"name":"물리공격력 $pn$x",
		"point":5,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0011",
		"name":"물리방어력 $pn$x",
		"point":5,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0012",
		"name":"마법공격력 $pn$x",
		"point":5,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0013",
		"name":"마법방어력 $pn$x",
		"point":5,
		"x":100,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0014",
		"name":"둑립공격력 $pn$x",
		"point":5,
		"x":150,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0015",
		"name":"물리크리티컬 히트 $pn$x%",
		"point":2,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0016",
		"name":"물리크리티컬 공격력 $pn$x%",
		"point":10,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0017",
		"name":"마법크리티컬 히트 $pn$x%",
		"point":2,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0018",
		"name":"마법크리티컬 공격력 $pn$x%",
		"point":10,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0019",
		"name":"공격속도 $pn$x%",
		"point":2,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0020",
		"name":"이동속도 $pn$x%",
		"point":2,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0021",
		"name":"캐스팅속도 $pn$x%",
		"point":2,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0022",
		"name":"적중률 $pn$x%",
		"point":2,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0023",
		"name":"회피율 $pn$x%",
		"point":2,
		"x":2,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0024",
		"name":"경직률 $pn$x",
		"point":2,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0025",
		"name":"점프력 $pn$x",
		"point":2,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0026",
		"name":"화속성저항 $pn$x",
		"point":1,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0027",
		"name":"수속성저항 $pn$x",
		"point":1,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0028",
		"name":"명속성저항 $pn$x",
		"point":1,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0029",
		"name":"암속성저항 $pn$x",
		"point":1,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0030",
		"name":"모든속성저항 $pn$x",
		"point":1,
		"x":10,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0031",
		"name":"인벤토리 무게 한도 $pn$xkg",
		"point":1,
		"x":3,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0032",
		"name":"3% 확률로 $pn $x 피해의 파이어익스플로전 시전",
		"point":2,
		"x":100,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0033",
		"name":"3% 확률로 $pn $x 피해의 아이스니들 시전",
		"point":2,
		"x":100,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0034",
		"name":"3% 확률로 $pn $x 피해의 라이트닝볼트 시전",
		"point":2,
		"x":100,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0035",
		"name":"3% 확률로 $pn $x 피해의 다크썬더볼트 시전",
		"point":2,
		"x":100,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0036",
		"name":"$x% 확률로 $pn 감전 상태이상 부여",
		"point":2,
		"x":1,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0037",
		"name":"$x% 확률로 $pn 출혈 상태이상 부여",
		"point":2,
		"x":1,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0038",
		"name":"$x% 확률로 $pn 중독 상태이상 부여",
		"point":2,
		"x":1,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0039",
		"name":"$x% 확률로 $pn 빙결 상태이상 부여",
		"point":2,
		"x":1,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0040",
		"name":"$x% 확률로 $pn 저주 상태이상 부여",
		"point":2,
		"x":1,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0041",
		"name":"$x% 확률로 $pn 수면 상태이상 부여",
		"point":2,
		"x":1,
		"positive":"적에게",
		"negative":"나에게"
	}, 
	{
		"id":"s0042",
		"name":"감전 상태이상 적 공격시 피해 $x% $pn",
		"point":5,
		"x":10,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0043",
		"name":"출혈 상태이상 적 공격시 피해 $x% $pn",
		"point":5,
		"x":10,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0044",
		"name":"중독 상태이상 적 공격시 피해 $x% $pn",
		"point":5,
		"x":10,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0045",
		"name":"빙결 상태이상 적 공격시 피해 $x% $pn",
		"point":5,
		"x":10,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0046",
		"name":"저주 상태이상 적 공격시 피해 $x% $pn",
		"point":5,
		"x":10,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0047",
		"name":"500px 주위 아군 힘 $x $pn",
		"point":2,
		"x":50,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0048",
		"name":"500px 주위 아군 지능 $x $pn",
		"point":2,
		"x":50,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0049",
		"name":"500px 주위 아군 체력 $x $pn",
		"point":2,
		"x":50,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0050",
		"name":"500px 주위 아군 정신력 $x $pn",
		"point":2,
		"x":50,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0051",
		"name":"화속성강화 $pn$x",
		"point":5,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0052",
		"name":"수속성강화 $pn$x",
		"point":5,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0053",
		"name":"명속성강화 $pn$x",
		"point":5,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0054",
		"name":"암속성강화 $pn$x",
		"point":5,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0055",
		"name":"모든속성강화 $pn$x",
		"point":5,
		"x":5,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0056",
		"name":"500px 주위 적 화속성저항 $x $pn",
		"point":5,
		"x":5,
		"positive":"감소",
		"negative":"증가"
	}, 
	{
		"id":"s0057",
		"name":"500px 주위 적 수속성저항 $x $pn",
		"point":5,
		"x":5,
		"positive":"감소",
		"negative":"증가"
	}, 
	{
		"id":"s0058",
		"name":"500px 주위 적 명속성저항 $x $pn",
		"point":5,
		"x":5,
		"positive":"감소",
		"negative":"증가"
	}, 
	{
		"id":"s0059",
		"name":"500px 주위 적 암속성저항 $x $pn",
		"point":5,
		"x":5,
		"positive":"감소",
		"negative":"증가"
	}, 
	{
		"id":"s0060",
		"name":"500px 주위 적 모든속성저항 $x $pn",
		"point":5,
		"x":5,
		"positive":"감소",
		"negative":"증가"
	}, 
	{
		"id":"s0061",
		"name":"공격력 $x% $pn",
		"point":10,
		"x":5,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0062",
		"name":"공격시 $x% $pn",
		"point":10,
		"x":5,
		"positive":"추가 피해",
		"negative":"추가 감소"
	}, 
	{
		"id":"s0063",
		"name":"스킬공격력 $x% $pn",
		"point":10,
		"x":5,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0064",
		"name":"모든 15레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0065",
		"name":"모든 20레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0066",
		"name":"모든 25레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0067",
		"name":"모든 30레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0068",
		"name":"모든 35레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0069",
		"name":"모든 40레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0070",
		"name":"모든 45레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0071",
		"name":"모든 50레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0072",
		"name":"모든 60레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0073",
		"name":"모든 70레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0074",
		"name":"모든 75레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0075",
		"name":"모든 80레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0076",
		"name":"모든 85레벨 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0077",
		"name":"모든 스킬 Lv. $pn$x",
		"point":10,
		"x":1,
		"positive":"+",
		"negative":"-"
	}, 
	{
		"id":"s0078",
		"name":"무기에 화속성 $pn",
		"point":5,
		"x":1,
		"positive":"부여",
		"negative":"부여 불가"
	}, 
	{
		"id":"s0079",
		"name":"무기에 수속성 $pn",
		"point":5,
		"x":1,
		"positive":"부여",
		"negative":"부여 불가"
	}, 
	{
		"id":"s0080",
		"name":"무기에 명속성 $pn",
		"point":5,
		"x":1,
		"positive":"부여",
		"negative":"부여 불가"
	}, 
	{
		"id":"s0081",
		"name":"무기에 암속성 $pn",
		"point":5,
		"x":1,
		"positive":"부여",
		"negative":"부여 불가"
	}, 
	{
		"id":"s0082",
		"name":"속성강화 수치가 가장 $pn 속성 부여",
		"point":5,
		"x":1,
		"positive":"높은",
		"negative":"낮은"
	}, 
	{
		"id":"s0083",
		"name":"$x% 확률로 적 무기 $pn",
		"point":10,
		"x":1,
		"positive":"파괴",
		"negative":"강화"
	}, 
	{
		"id":"s0084",
		"name":"$x% 확률로 적 방어구 $pn",
		"point":10,
		"x":1,
		"positive":"파괴",
		"negative":"강화"
	}, 
	{
		"id":"s0085",
		"name":"카운터 공격력 $x% $pn",
		"point":10,
		"x":20,
		"positive":"증가",
		"negative":"감소"
	}, 
	{
		"id":"s0086",
		"name":"카운터 공격 시 $x% 추가피해",
		"point":10,
		"x":20,
		"positive":"추가 피해",
		"negative":"추가 감소"
	}, 
	{
		"id":"s0087",
		"name":"적을 죽이면 10% 확률로 Lv. $x $pn 소환",
		"point":5,
		"x":10,
		"positive":"아군 호도르",
		"negative":"적 헌터"
	}, 
	{
		"id":"s0088",
		"name":"공격 시 $x% 확률로 $pn 남은 체력 20% 감소",
		"point":10,
		"x":1,
		"positive":"적의",
		"negative":"나의"
	}, 
	{
		"id":"s0089",
		"name":"공격 시 $x% 확률로 $pn 물리방어력 $x00 감소",
		"point":10,
		"x":1,
		"positive":"적의",
		"negative":"나의"
	}, 
	{
		"id":"s0090",
		"name":"공격 시 $x% 확률로 $pn 마법방어력 $x00 감소",
		"point":10,
		"x":1,
		"positive":"적의",
		"negative":"나의"
	}
];
