/**change way to login**/ 
	$('.jump-btn').on('click',function(){
		$(this).addClass('dn');
		$(this).siblings().removeClass('dn');
		// clearInterval();
		// $('.user-telepwd-btn').text('获取验证码');
	})

/*tel**/
	$('.user-tele').on('change',function(){
		var thisval = $(this).val();
		telVertify(thisval,$(this));
	})
	function telVertify(thisval,that){
		if (!isNaN(thisval)) {
			if($.trim(thisval).length==11){
				$('.tel-vertify').text('');
				return true;
			}else{
				that.parent().find('.tel-vertify').text('手机号必须是11位数字！');
				return false;
			}
		}else{
			that.parent().find('.tel-vertify').text('手机号必须是数字！');
			return false;
		}
	}

/**pwd***/ 
	var pwdval = '';
	$('.user-pwd').on('change',function(){
		var thisval = $(this).val();
		pwdVertify(thisval,$(this));
	})
	function pwdVertify(thisval,that){
		var pattern_chin = /[\u4e00-\u9fa5]/g;
		var pattern_s = /\s/g;
		var count_chin='',count_s='';
		if (thisval=='') {
			that.parent().find('.pwd-vertify').text('密码不能空');
			return false;
		}else{
			if (thisval.match(pattern_chin)) {
				count_chin = thisval.match(pattern_chin).length;
			}
			if (thisval.match(pattern_s)) {
				count_s = thisval.match(pattern_s).length;
			}
			if(count_chin==0&&count_s==0) {// 符合规则
				$('.pwd-vertify').text('');
				pwdval = thisval;
				return true;
				
			} else {// 存在非法字符
				that.parent().find('.pwd-vertify').text('密码不能含有汉字和空格');
				return false;
			}
		}
	}

	var pwdr = '';
	$('.user-pwdr').on('change',function(){
		if ( $(this).val() == pwdval ) {
			$('.pwdr-vertify').text('');
			pwdr = true
		}else{
			$(this).parent().find('.pwdr-vertify').text('两次密码不相同');
			pwdr = false
		}
	})

/**get vertifu code**/ 
	var time_num=60;
	$('.user-telepwd-btn').off('click').on('click',function(){
		var that = $(this);
		var thisval = $('#telepwd').find('.user-tele').val();
		if (time_num==60&&telVertify(thisval,that.parent().parent())) {
			var int = window.setInterval(function(){
				if (time_num>0) {
					that.text(time_num-- +'s');
				}else if(time_num==0){
					window.clearInterval(int);
					that.text('获取验证码');
					time_num=60;
				}
			},1000)
		}
	})

/****************send msg**/

/**veitify**/ 
	$('.user-telepwd').on('change',function(){
		var thisval = $(this).val();
		if (thisval!='') {
			$('.telmsg-vertify').text('')
		}else{
			$('.telmsg-vertify').text('验证码不能为空')
		}
	})

/**register**/ 
	$('.btn-register').off('click').on('click',function(){
		var user_tele = $('.user-tele').val(),
			user_telepwd = $('.user-telepwd').val(),
			user_pwd = $('.user-pwd').val();
		if (telVertify(user_tele,$(this))&&pwdVertify(user_pwd,$(this))&&pwdr) {
			if(user_telepwd!=''){
				console.log('tttt')	
			}else{
				$('.telmsg-vertify').text('验证码不能为空')
			}
			
		}else{
			if (!pwdr) {
				$('.pwdr-vertify').text('需要验证两次输入密码');
			}
			console.log('ffff')
		}
	})

/**login**/
	$('.login-pwd').off('.click').on('click',function(){
		var telval = $('#pwdlogin').find('.user-tele').val(),
			user_pwdval = $('#pwdlogin').find('.user-pwd').val();

		if(telVertify(telval,$(this))&&pwdVertify(user_pwdval,$(this))){
			console.log('tttt');
		}
	})

	$('.login-message').off('.click').on('click',function(){
		var telval = $('#telepwd').find('.user-tele').val(),
			user_telepwd = $('.user-telepwd').val();

		if(telVertify(telval,$(this))){
			if (user_telepwd!='') {
				console.log('tttt');
			}else{
				$('.telmsg-vertify').text('验证码不能为空')
			}
			
		}else{
			console.log('ffff');
		}
	})

/**end**/ 