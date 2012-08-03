<?php
echo <<<_END
<!--sliding login panel-->
	<div id="login_panel">
    	<div id="content">
        	<div>
				<div class="column column1">
	            	<!--help text, maybe-->
                    <h3>And now some Lorem Ipsum to fill the content</h3>
                    <p>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent scelerisque commodo massa. Ut volutpat. Maecenas luctus augue quis velit.
                    </p>
                    <p>
	                    Ut volutpat. Maecenas luctus augue quis velit. Lorem ipsum dolor sit amet, adipiscing elit. Scelerisque commodo massa. 
                    </p>                    
                    <p>
                        <a href="#" class="orange-only notextdecoration">Not a member yet? Sign Up</a>
                    </p>
	            	<!--/help text, maybe-->
                </div>
                                
				<div class="column column2">
	                <!--user signin-->
                    <h3>Member Login</h3>
                    <form name="login_form" id="login_form" class="generic-form alignleft_block" action="login.php">
                        <p>
                            <input type="text" name="txt_login_name" id="txt_login_name" class="medium-login user margin-right-10" />
                            <input type="text" name="txt_login_email" id="txt_login_email" class="medium-login password" />
                        </p>
                        <div class="clear10"></div>                                                
                        <p>
                            <input type="checkbox" id="chk_rememberme" name="chk_rememberme" /><label for="chk_rememberme">Remember Me</label>
                            &nbsp;/&nbsp;
                            <a href="#" class="orange-only notextdecoration">Forgot Password?</a>
						</p>                     
                           
                        <div class="clear"></div>
                        
                        <a href="login.php" class="button alignleft_block bold_only notextdecoration" id="btnLoginNow"><span>Login Now</span></a>

                    </form>
	                <!--/user login-->
                </div>
            </div>
        </div>
    	<div id="signin_register">
            <ul>
                <li>Login</li>
                <li><a href="#">&nbsp;</a></li>
            </ul>
    	</div>
    </div>    
    <!--/sliding login panel-->
_END;
?>
