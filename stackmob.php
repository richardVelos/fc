<?php

require_once('OAuth.php');

function send_request($http_method, $url, $auth_header=null, $postData=null) {  
	echo "send_request:<br/>";
	echo print_r($http_method, true)."<br/>";
	echo print_r($url, true)."<br/>";
	echo print_r($auth_header, true)."<br/>";
	echo print_r($postData, true)."<br/>";
	
  $curl = curl_init($url);  
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);  
  curl_setopt($curl, CURLOPT_FAILONERROR, true);  
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  
  switch($http_method) {  
    case 'GET':  
      curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/vnd.stackmob+json;",
				'Content-Length: 0',
				"Accept: application/vnd.stackmob+json; version=0",
				$auth_header));   
      break;  
    case 'POST':
	  	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	  		'Content-Type: application/vnd.stackmob+json; version=0',
				'Content-Length: '.strlen(json_encode($postData)),
				"Accept: application/vnd.stackmob+json; version=0",
				$auth_header));
      curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $http_method);                                          
      curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));  
      break;  
    case 'PUT':
			curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/vnd.stackmob+json;",
				'Content-Length: '.strlen(json_encode($postData)),
				"Accept: application/vnd.stackmob+json; version=0",
				$auth_header));
			curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $http_method);  
			curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));  
			break;  
    case 'DELETE':
			curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/vnd.stackmob+json;",
				'Content-Length: 0',
				"Accept: application/vnd.stackmob+json; version=0",$auth_header));   
			curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $http_method);   
      break;  
  }  
  
  echo $curl."\n\n";
  
  $response = curl_exec($curl);  
  if (!$response) {  
    $response = curl_error($curl);  
  }  
  curl_close($curl);  
  return $response;  
}

//Prepare your StackMob OAuth keys

//you can find your keys here: https://www.stackmob.com/platform/account/apps/reset
//consumer key is your public key
//consumer secret is your private key
$consumer_key = "71f56601-6e20-4a6a-9bae-607c2a3a4ef9";
$consumer_secret = "77b0a091-490b-488c-99b2-47cbce1905bd";

/*
//PUSH - REGISTER A DEVICE
//following REST API endpoint is configured for registering push, as can be seen here:
//http://www.stackmob.com/devcenter/docs/Push-API#a-register_a_device_to_receive_push_notifications|rest
$http_method = "POST"; 
//change this to "http://api.mob1.stackmob.com" if you want to try any CRUD method
$rest_endpoint = "http://push.mob1.stackmob.com"; 
$uri_info_path = "register_device_token_universal"; 
$body = array('token' => array('type' => 'android', 'token' => 'REPLACE WITH YOUR ANDROID C2DM TOKEN'), 'userId' => 'johnsmith');
*/

/*
 * The following are tests you can uncomment to try CRUD methods for objects.
 * You can view the contents of your datastores here: https://www.stackmob.com/platform/api/schemas/browser
 * The following examples are for a "user" object
 */
 
/*
//POST EXAMPLE (Creating object)
//following will create a user named "phptest"
//http://www.stackmob.com/devcenter/docs/Datastore-API#a-post_-_create_object|rest
$http_method = "POST"; 
$rest_endpoint = "http://api.mob1.stackmob.com"; 
$uri_info_path = "user"; 
$body = array('username' => 'phptest', 'password' => 'phptest');
*/

/*
//GET EXAMPLE (Fetching object)
//following will return array of all users
//http://www.stackmob.com/devcenter/docs/Datastore-API#a-get_-_read_objects|rest
$http_method = "GET"; 
$rest_endpoint = "http://api.mob1.stackmob.com"; 
$uri_info_path = "user"; 
$body = NULL;
*/


//GET EXAMPLE WITH FILTER (Fetching object)
//following will return array of all users whose age is greater than or equal to 30
//http://www.stackmob.com/devcenter/docs/Datastore-API#a-inequality_queries_______________|rest
$http_method = "GET"; 
$rest_endpoint = "http://api.mob1.stackmob.com"; 
$uri_info_path = "user?fullname[Richard Adair]=true"; 
$body = NULL;


/*
//GET EXAMPLE WITH FILTER (Fetching object)
//following will return array of all users whose age is greater than or equal to 30
//http://www.stackmob.com/devcenter/docs/Datastore-API#a-inequality_queries_______________|rest
$http_method = "GET"; 
$rest_endpoint = "http://api.mob1.stackmob.com"; 
$uri_info_path = "user?age[gte]=30"; 
$body = NULL;
*/


/*
//PUT EXAMPLE (Editing object)
//following will add an age field to a user named "phptest"
//http://www.stackmob.com/devcenter/docs/Datastore-API#a-put_-_update_object|rest
$http_method = "PUT"; 
$rest_endpoint = "http://api.mob1.stackmob.com"; 
$uri_info_path = "user/phptest"; 
$body = array('age' => 30);
*/

/*
//DELETE EXAMPLE (Deleting object)
//following will add an age field to a user named "phptest"
//http://www.stackmob.com/devcenter/docs/Datastore-API#a-delete_-_delete_object|rest
$http_method = "DELETE"; 
$rest_endpoint = "http://api.mob1.stackmob.com"; 
$uri_info_path = "user/phptest2"; 
$body = NULL;
 */

$endpoint = "$rest_endpoint/$uri_info_path";
$params = NULL;

echo "endpoint: " . $endpoint . "<br/>";

$consumer = new OAuthConsumer($consumer_key, $consumer_secret, NULL);

// Setup OAuth request - Use NULL for OAuthToken parameter
$request = OAuthRequest::from_consumer_and_token($consumer, NULL, $http_method, $endpoint, $params);

// Sign the constructed OAuth request using HMAC-SHA1 - Use NULL for OAuthToken parameter
$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, NULL);

// Extract OAuth header from OAuth request object and keep it handy in a variable
$oauth_header = $request->to_header();

echo "request:<br/>".print_r($request, true)."<br/>";


$response = send_request($request->get_normalized_http_method(), $endpoint, $oauth_header, $body);

echo "response:<br/>" . print_r($response, true) . "<br/>";

?>
