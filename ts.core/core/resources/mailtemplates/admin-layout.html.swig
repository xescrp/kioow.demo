<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>{{SUBJECT}}</title>
		<style type="text/css">
			{% include "css/te-neutral-main.css" %}
		</style>
	</head>
	<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
		<center>
            	<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                		<tr>
					<td align="center" valign="top" id="bodyCell">
						<!-- BEGIN TEMPLATE // -->
		                        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
		                        	<tr>
								<td align="center" valign="top">						
									<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer">
										<!-- BEGIN HEADER // -->
										{% include "partials/te-dmc-header.html.swig" %}
										<!-- // END HEADER -->
										{% block body %}
										{% endblock %}
	
											<tr>
	                                		<td align="center" valign="top">
											<!-- BEGIN FOOTER // -->
											{% include "partials/dmc-footer.html.swig" %}
											<!-- // END FOOTER -->
											</td>
                                		</tr> 
									</table>
								</td>
                    			</tr>
                		</table>						
						<!-- // END TEMPLATE -->
					</td>
				</tr>
			</table>
		</center>
	</body>
</html>


	