<template>
	<view>
		<page-loading v-if="!isShowView"></page-loading>
		<view v-if="isShowView" class="news-item">
			<view>
				<image style="width: 100%; height: 375rpx;" :src="detail.img" mode="aspectFill"></image>
			</view>
			<!-- <view class="card_list solid-bottom">
				<view>
					<image style="width: 320rpx;height: 100%; border-radius: 3px;" :src="detail.img" mode="aspectFill"></image>
				</view>
				
				<view class="card_list_body flex flex-direction justify-between">
					<view class="card_title text-black">{{ detail.title }}</view>
					<view class="card_bottom">
						<button class="mini-btn" type="primary" size="mini" @click="navigateTo(detail.url)">想参加</button>
					</view>
				</view>
			</view> -->
			<view class="text-lg  padding-left-sm padding-top-sm solid-bottom">
				<view class="text-black margin-bottom-sm" style="font-size: 38rpx; font-weight: 500;">{{ detail.title }}</view>
				<view class="padding-bottom-sm">
					时间：{{ detail.date }}
				</view>
				<view class="padding-bottom-sm">
					地点：{{ detail.area }}
				</view>
				<view class="padding-bottom-sm">
					主办方：{{ detail.sponsor }}
				</view>
				<view v-if="detail.price" class="padding-bottom-sm">
					门票：{{ detail.price }}元
				</view>
			</view>
			<view class="text-xl padding-left-sm padding-top-sm">
				<text class="margin-right-sm" style="border-left: 3px solid #0081FF;"></text>活动详情
			</view>
			<view class="text-lg padding-sm">
				<!-- {{ detail.brief }} -->
				<rich-text :nodes="detail.brief" style="font-size: 0.7rem; line-height: 50rpx;"></rich-text>
			</view>
			<view class="text-right padding-lr-lg padding-bottom-sm">
				<button class="mini-btn" type="primary" size="mini" @click="navigateTo(detail.url)">想参加</button>
			</view>
		</view>
	</view>
</template>

<script>
	import pageLoading from '@/components/loadmore/loading.vue'
	export default {
		components:{
			pageLoading
		},
		data(){
			return {
				isShowView: false,
				details:[
					{
						img:'../../../static/active/ctf_finish.jpg',
						title: '2019 KCTF 总决赛',
						url: 'https://ctf.kanxue.com/game-team_list-10-8.htm',
						date: '2019年12月1日',
						area: '线上（看雪CTF官网）',
						sponsor: '看雪',
						brief: '<h3> 1、赛制 </h3><p>本届KCTF团队赛为线上赛，由论坛会员自由组成攻、防两方团队，每个团队人数不超过 5人。由防守方出题，攻击方夺旗。 </p> <p> 攻防团队通过前三轮晋级赛，争取决赛名额，共「18」支战队晋级。 </p> <p> &gt;&nbsp;比赛赛题：签到题+总决赛9支防守方战队所出的9道题 </p> <p> &gt;&nbsp;比赛时间：弹性制 </p> <p> &gt;&nbsp;赛题公布：比赛开始时（12月1日）中午12点，放出第一题 </p> <p> &gt; 参赛战队：18支晋级战队+大众队 </p> <p> <br/> </p> <blockquote> <div> 为了活跃比赛气氛，让更多的人参与到比赛中来，我们特别对外开放总决赛赛题。即，所有未能晋级总决赛团队的选手，均可以个人身份提交flag，参与比赛，获取个人积分。这部分选手之间相互PK，主办方将对成绩进行排名。每题率先在PK中第一个提交赛题答案的选手，可成功进入大众队，仅保留首次提交答案所得积分。 </div> </blockquote> <blockquote></blockquote> <blockquote> <div> 什么是大众队？ </div> </blockquote> <blockquote></blockquote> <blockquote> <div> 在决赛中，攻击方，除了已经晋级的18个攻击团队以外，引入一个&quot;大众队”。大众队可正式参与总决赛，与其他总决赛选手争夺终极大奖。 </div> </blockquote> <blockquote></blockquote> <blockquote> <div> 大众队奖品分配方案： </div> </blockquote> <blockquote> <div> 按照“为大众队挣得积分”排序，按积分贡献的比例分配奖金或奖品。 </div> </blockquote> <blockquote></blockquote> <blockquote> <div> 大众队证书方案： </div> </blockquote> <blockquote> <div> 大众队成绩第一者，给予获奖证书。 </div> </blockquote> <blockquote></blockquote> <blockquote> <div> 注意： </div> </blockquote> <blockquote> <div> 大众队获胜后，仅奖励给个人（含积分和奖品），不给个人所在团队加分。 </div> </blockquote> <blockquote> <div> 场外选手通过提交正确flag仅可获取个人积分，并不计入其所在的团队。成绩列表，会列在场外赛列表栏里。 </div> </blockquote> <h3> 2、赛期 </h3> <p> 规则：顺序发题、弹性赛期（新决赛规则） </p> <p> <br/> </p> <ul> <li> 防守题的赛期根据被破解情况决定，最少1天，最多4天。 </li> </ul> <ul> <li> 一律中午12点发题。发题当天记作第0天。 </li> </ul> <ul> <li> 若第i天上午6点该题被破解次数大于等于3^(3-i)，则在第i天中午12点结束该题，发下一题。 </li> </ul> <p> <br/> </p> <p> 解释： </p> <p> 发题后的第1天6点，若破解次数少于9人，则继续比赛；&nbsp; </p> <p> 发题后的第2天6点，若破解次数少于3人，则继续比赛； </p> <p> 发题后的第3天6点，若破解次数少于1人，则继续比赛； </p> <p> 以上任意一天继续比赛的条件不满足，就中午12点换下一题；（6点至12点之间的破解，依然有效） </p> <p> 发题后的第4天中午12点，此题一定结束。 </p> <h3> 3、攻击方比赛规则 </h3> <h4> 答案提交 </h4> <p> （1）题目发布之时开始，得到正确答案，请及时在比赛平台：ctf.kanxue.com&nbsp;提交； </p> <p> （2）每个团队，任何团队成员都可提交答案，但仅限一名成员提交答案，比如团队5人中，1人提交正确答案后，其余4人则无法提交答案； </p> <p> （3）在最终成绩公布前请在【答案提交区】发表解题分析文章、所用工具、源代码等材料，且文章有理有据能够详细完成说明自己获得答案的整个过程，否则不予发放奖品。 </p> <h4> 解题规则 </h4> <p> （1）PWN题目公布时，会提供给攻击者服务器IP和漏洞程序对应的端口，必要时会提供漏洞程序二进制文件，攻击者需要利用漏洞获得服务器SHELL，找到FLAG并提交。FLAG提交格式为&nbsp;flag{***}&nbsp;&nbsp; </p> <p> （2）CrackMe题目有两种规则“方案一（老规则）”和“方案二（新规则）”，具体参考&nbsp;&nbsp;看雪.纽盾 KCTF 2019晋级赛Q3防守方规则&nbsp; 5.2部分。提交的注册码注册码字符集限定为[&#39;!&#39;,&#39;~&#39;]，即ASCII码范围是[33,126]，共94个可选字符。若是方案二（新规则），需要找出特定用户名（“KCTF”，不含引号）的序列号。若注册码有多解，平台不认可提交的注册码，请加比赛专用QQ群：8601428，联系管理验证。 </p> <p> （3）WEB题目发布时，会提供给攻击者一个URL，攻击者应根据发现的WEB漏洞从服务器获得FLAG。FLAG提交格式为flag{***}。 </p>'
					},
					{
						img:'../../../static/active/20zhou.jpg',
						title: '看雪20周年',
						url: 'http://www.kanxue.cn/mrt.htm',
						date: '2019年12月28日',
						area: '中国·上海',
						sponsor: '看雪',
						brief: '<p> 不知不觉看雪社区已经走过了20个春秋， 正是由于看雪致力于做一个有温度的社区，才能用真心换真情，从一个6M的免费空间，到今天的近百万注册用户。&nbsp;<br/> </p> <p> 感谢与你们一起共同见证中国互联网发展的20年，莫失莫忘、不离不弃，这20年艰难坎坷，看雪走过的每一步都离不开大家的支持和帮助。 </p> <p> 在看雪学院的弱冠之年，让我们一起重新出发。 </p> <p> 值此20周年之际，我们将于12月28日，在上海举办一个20周年庆典，届时我们将邀请到业内精英和企业豪杰。诚邀您携手共进，共创未来！ </p><p><br/></p><h3> 主办方： </h3> <p> 看雪学院（kanxue.com）是一个专注于PC、移动、智能设备安全研究及逆向工程的开发者社区！成立于2000年，经历了近二十年的磨砺，见证了国内安全行业的发展，被誉为安全界的黄埔军校。它是中国最早的安全人员交流学习社区，通过二十年的发展在行业内树立了令人尊敬的专业形象。 </p> <ul> <li> <p> 历史悠久&nbsp;始创于2000年，是国内首个讨论加密解密技术的论坛，看雪见证了整个中国互联网的发展及国内安全领域大环境的发展。 </p> </li> </ul> <ul> <li> <p> 注重培养人才&nbsp;看雪始终关注安全技术领域的最新发展，为IT专业人士、技术专家提供了一个氛围良好的交流与合作空间。多年来，看雪网站培养了一批批综合素质高，技术能力强的人才，这些人已成为中国网络空间安全的中坚力量。此外，看雪还为IT企业源源不断输送了众多优秀人才，获得用人企业的一致肯定和好评，如腾讯、阿里、百度、360、京东、绿盟、天融信等互联网和安全公司等，很多科技公司和研究机构已将看雪学院当作国内信息安全技术高端人才培训基地，并保持着长期合作关系。 </p> </li> </ul> <ul> <li> <p> 专业权威&nbsp;近二十年来积累了大量有价值的技术资料，与电子工业出版社、邮电出版社、机械电子出版社等知名出版机构有着良好的合作关系。推出的十多部技术专著和相关书籍，有不少入选为大学信息技术专业的教辅材料，如《加密与解密》、《微软.NET程序的加密与解密》、《0day安全：软件漏洞分析技术》、《Android软件安全与逆向分析》等，影响广泛。 </p> </li> </ul> <p> <br/> </p>'
					}
				],
				detail: {}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        console.log(option.id);
			if(option.id && option.id <= this.details.length && this.details[option.id]) {
				this.detail = this.details[option.id];
			} else {
				console.log("访问有误");
			}
		},
		onReady(){
			this.isShowView = true;
		},
		methods:{
			navigateTo(url){
				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	/* 内容列表 */
	.card_list {
		width: 100%;	
		display: flex;
		padding: 20rpx;
		
		box-sizing: border-box;
	}
	
	.avatar_img {
		width: 220rpx;
		height: 220rpx;
		
		border-radius: 6rpx;
	}
	
	.card_list .card_list_body {
		height: 220rpx;
		padding-left: 20rpx;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
	}
	
	.card_list .card_title {
		width: 100%;
		line-height: 36upx;
		font-size: 36rpx;
		font-weight: 500;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.card_list .card_bottom {
		width: 100%;
		
	}
	
	.card_list .card_bottom view {
		font-size: 28rpx !important;
	}
	
</style>
