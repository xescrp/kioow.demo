
<style>

h4{
	margin-top: 20px;
	margin-bottom: 10px;
}

a{
	color:#FF6059;
	text-decoration: none;
	font-family: Helvetica;
}

ul{
	padding-left:0px;
	margin:0;
}
ul li{
	margin:0px 10px 15px 0;
	list-style:none;
	text-align: left;
}

ul li a{
	margin-left:15px;
}

a.ko::before{
	content:'[ X ] ';
}

pre{
	text-align: left;
    background-color: #FEFEFE;
    padding: 30px;
    border: thin solid #AAA;
}

#openAll{
	background: none;
    color: #333;
    padding: 6px 15px;
    border: 1px solid #333;
    font-weight: 500;
    font-size: 10px;
    float: right;
}

</style>
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script>

$(function() {
	$("#openAll").on('click',function(){
		$.each($('#templatesList a'), function(index,value){
			value.click();
		});
	});
});

</script>