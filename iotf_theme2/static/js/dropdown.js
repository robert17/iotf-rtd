var host = location.host.replace("docs.","");
var conUrl = "https://"+host;
//conUrl = "https://internetofthings.ibmcloud.com";

qwest.get(conUrl+'/api/v0001/auth/',null,{cache:{GET:'false'}})
 .then(function(response){
    var id = response.id;
    document.querySelector("[href='https://internetofthings.ibmcloud.com/login']").text=id;
    document.getElementById("landing_login").style.display = "none";
    document.getElementById("landing_id_outter").style.display = "";
    document.getElementById("landing_id_text").innerHTML = id;
    
    document.getElementById("landing_id_outter_mobile").style.display = "";
    document.getElementById("landing_id_text_mobile").innerHTML = response.id;
 });
qwest.get(conUrl+'/api/v0001/organizations/',null,{cache:{GET:'false'}})
 .then(function(response){
    var getId = document.getElementById("landing_org");
    var getId_mobile = document.getElementById("landing_org_mobile");
    var getId_counter = document.getElementById("landing_id_counter");
    getId_counter.innerHTML=getId_counter.innerHTML+ response.length;
    
    function addAfter(id){
        var target = document.getElementById(id);
        var newLi = document.createElement('li');
        target.parentNode.insertBefore(newLi, target.nextSibling );
        return newLi;
      }	
    
    if(response.length===0){
        var a = document.createElement('a');
        var a_mobile = document.createElement('a');
        var br = document.createElement('br');
        var span = document.createElement('span');				            
        a.className='nav-org-id';          		            
        a.innerHTML = a.innerHTML+ "";
        span.className='nav-org-type';		        
        span.innerHTML=span.innerHTML+ "You are not a member of any organization.";
        a.appendChild(span);
        var li=addAfter("landing_org");
        li.appendChild(a);
        var li_mobile=addAfter("landing_org_mobile");	
        a_mobile.innerHTML =  a_mobile.innerHTML + "You are not a member of any organization.";
        li_mobile.appendChild(a_mobile);
    }
    	       
   	for (var i=response.length-1; i>=0; i--){
   		
       	var orgUrl = "/dashboard/#/organizations/";
        var concat = conUrl+orgUrl+response[i].id+"/home";
        var a = document.createElement('a');
        var a_mobile = document.createElement('a')
        var br = document.createElement('br');
        var span = document.createElement('span');		
        
        a.className='nav-org-id';
        a.href=concat;		          		            
        a.innerHTML = a.innerHTML+ response[i].id;
        a.appendChild(br);
        span.className='nav-org-type';		        
        span.innerHTML=span.innerHTML+ response[i].type;
        a.appendChild(span);
        var li=addAfter("landing_org");
        li.appendChild(a);
        var li_mobile=addAfter("landing_org_mobile");	
        a_mobile.innerHTML =  a_mobile.innerHTML+ response[i].id + " - "+response[i].type;
        a_mobile.href=concat;
        li_mobile.appendChild(a_mobile);
    }
 });
$('#landing_logout_link').click(function(){
	$('#myModal').modal('show');
});
$('#landing_logout_link_mobile').click(function(){
	$('#myModal').modal('show');
});
$('#nav-org-scroller').niceScroll({
	autohidemode: "leave",
	cursorwidth: "10px",
	cursorcolor: "#8A8A8A",
	cursorborder: ".5px solid #fff",
	cursorborderradius: "0",
	cursoropacitymax:"0.65",
	railpadding: { top: 0, right: 1, left: 0, bottom: 0 }
}); 
