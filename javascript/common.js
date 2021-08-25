var isMac=navigator.appVersion.indexOf('Mac');

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function closeDiv(ToClose){
	//alert(ToClose);
	CloseIt=MM_findObj(ToClose);
	CloseIt.style.visibility = 'hidden';
}

function Divrelocater(){ 
	OneToGo=MM_findObj(Divrelocater.arguments[0]);
	//alert(Divrelocater.arguments[1]);
	OneToGo.location = Divrelocater.arguments[1];
	OneToGo.src = Divrelocater.arguments[1];
	}
	


function togglemenu(){
 var titlehtml = "<table width=100% border=0><tr><td class=titletable>";
 	 titlehtml += togglemenu.arguments[7];
	 titlehtml += "</td><td align=right><a href=# onClick=togglemenu('";
	 titlehtml += togglemenu.arguments[0];
	 titlehtml +="','hidden',80,410,350,150,'/blank.htm','hidden'); class=title><img src=img/close.gif border=0></a></td></tr></table>";
	
	myThing=MM_findObj(togglemenu.arguments[0]);
	divThing=MM_findObj(togglemenu.arguments[0]+'title');
	inThing=togglemenu.arguments[0]+'content';
	 
	myThing.style.visibility = togglemenu.arguments[1];
	myThing.style.top = togglemenu.arguments[2] ;
	myThing.style.left = togglemenu.arguments[3] ;
	if (isMac>0){
	myThing.style.width = togglemenu.arguments[4]+6 ;
	myThing.style.height = togglemenu.arguments[5]+6 ;
	}else{
	myThing.style.width = togglemenu.arguments[4] ;
	myThing.style.height = togglemenu.arguments[5] ;
	}
	divThing.innerHTML= titlehtml;
	Divrelocater(inThing,togglemenu.arguments[6]);
//return false;
}

function newstogglemenu(){
 var titlehtml = "<table width=100% border=0><tr><td class=titletable colspan=2>";
 	 titlehtml += newstogglemenu.arguments[7];
	 titlehtml += "</td>"; /*<td align=right><a href=# onClick=togglemenu('";
	 titlehtml += togglemenu.arguments[0];*/
	 //titlehtml += "','hidden',80,410,350,150,'/blank.htm','hidden'); class=title><img src=img/close.gif border=0></a></td></tr></table>";
	 titlehtml += "</tr></table>";
	
	myThing=MM_findObj(newstogglemenu.arguments[0]);
	divThing=MM_findObj(newstogglemenu.arguments[0]+'title');
	inThing=newstogglemenu.arguments[0]+'content';
	 
	myThing.style.visibility = newstogglemenu.arguments[1];
	myThing.style.top = newstogglemenu.arguments[2] ;
	myThing.style.left = newstogglemenu.arguments[3] ;
	if (isMac>0){
	myThing.style.width = newstogglemenu.arguments[4]+6 ;
	myThing.style.height = newstogglemenu.arguments[5]+6 ;
	}else{
	myThing.style.width = newstogglemenu.arguments[4] ;
	myThing.style.height = newstogglemenu.arguments[5] ;
	}
	divThing.innerHTML= titlehtml;
	Divrelocater(inThing,newstogglemenu.arguments[6]);
//return false;
}

function audiotogglemenu(){
 var titlehtml = "<table width=100% border=0><tr><td class=titletable>";
 	 titlehtml += audiotogglemenu.arguments[7];
	 titlehtml += "</td><td align=right><a href=# onClick=audiotogglemenu('";
	 titlehtml += audiotogglemenu.arguments[0];
	 titlehtml +="','hidden',80,410,350,150,'/blank.htm','hidden'); class=title><img src=img/close.gif border=0></td></tr></table>";
	
	myThing=MM_findObj(audiotogglemenu.arguments[0]);
	divThing=MM_findObj(audiotogglemenu.arguments[0]+'title');
	inThing=audiotogglemenu.arguments[0]+'content';
	 
	myThing.style.visibility = audiotogglemenu.arguments[1];
	divThing.innerHTML= titlehtml;
	Divrelocater(inThing,audiotogglemenu.arguments[6]);
//return false;
}

