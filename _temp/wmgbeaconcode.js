/*******************************************************************
' Program.........: WMGbeaconcode.JS
' Package.........: WMG Beacon
' Description.....: 
'
'	Combination of WMG Beacon Pre-processing code with Omniture
'	s_code.js.
'
'	Provides WMG Beacon preprocessing functions including
'	autogeneration of the description.
'
' Based on........: s_code.js - Version: 1.1 (Oct 10, 2002)
' Author..........: Ian Leicht (ian.leicht@wmg.com)
'
' Revision History: vX.XX (MM-DD-YY) Author: Description
' v1.00 (10-10-02) IL: Script is born
' v1.01 (10-15-02) IL: Add ;sessionID filtering
' v1.02 (10-18-02) IL: Add querystring filtering
' v1.03 (10-22-02) IL: Add top level directory filtering
' v1.04 (11-12-02) IL: Add anchor (#) filtering
*********************************************************************/

/************************** CONFIG SECTION **************************/

// Toggles whether the URI is included 
var includeURI=true;

// Toggles whether to filter the top level directory from the URI
// This is use for sites like: http://www.wbrnashville.com/nashville/labelHome.jhtml 
// where "/nashville" is redundant.
var filterDirectoryURI=false;

// Toggles whether the QueryString is removed
var includeQueryString=false;

// Querystring parsing:
// parseMode:
// "" = do not parse the querystring
// "include" = only include key/value pairs where the key is in the includeParams list
// "exclude" = only include key/value pairs where the key is not in the excludeParams list
var parseMode="";					 
var includeParams=new Array("artistID","discographyID");
var excludeParams=new Array("sessionID");

/* Link Tracking Config */
var s_trackDownloadLinks=true;
var s_linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,doc,pdf,xls,ra,wmv,ram";
var s_trackExternalLinks=false;
var s_linkInternalFilters=".";

/************ BEGIN WMG BEACON PREPROCESSOR *************************/


function keyValue (key,value) {
	this.key=key;
	this.value=value;
}


var URL = location.href;

// http[s]://domain.com/directory/subdirectory/subsubdir/file.html;sessionid=123456?key=value
//         12          3         4            5                   -                -
var slashIdx1=URL.indexOf("/")
var slashIdx2=URL.indexOf("/",slashIdx1+1)
var slashIdx3=URL.indexOf("/",slashIdx2+1)
var slashIdx4=URL.indexOf("/",slashIdx3+1)
var slashIdx5=URL.indexOf("/",slashIdx4+1)
var protocol=URL.substr(0,slashIdx1-1);
var domain=URL.substr(slashIdx2+1,(slashIdx3-slashIdx2-1));

var Directory;
var URIwQuery;

if (filterDirectoryURI) {
	if (slashIdx4>0) {
		Directory=URL.substr(slashIdx4+1,(slashIdx5-slashIdx4-1));
	}
	URIwQuery=URL.substr(slashIdx4,URL.length);

} else {
	if (slashIdx4>0) {
		Directory=URL.substr(slashIdx3+1,(slashIdx4-slashIdx3-1));
	} 
	URIwQuery=URL.substr(slashIdx3,URL.length);
}

// Parse request into URI + Querystring
var questIdx=URIwQuery.indexOf("?");

if (questIdx>0) {
	var URI=URIwQuery.substr(0,questIdx);
	var QueryString=URIwQuery.substr(questIdx+1,URIwQuery.length-questIdx-1);
} else {
	var URI=URIwQuery;
	var QueryString="";
}

// Querystring parsing routine

if (parseMode.length>0) {
	var arrKeyVal = new Array();

	// split parameters into pairs, assuming pairs are separated by ampersands
	var pairs = QueryString.split("&");

	var j=0;

	// for each pair, we get the name and the value
	for (i = 0; i < pairs.length; i++) {
	   pos = pairs[i].indexOf('=');
	   if (pos == -1) {
	      continue;
		}
		argname = pairs[i].substring(0,pos);
		value = pairs[i].substring(pos+1);

		arrKeyVal[j]=new keyValue(argname,value);

		j=j+1;
	}

	if (parseMode == "include") {
		QueryString="";

		// loop through the querystring parameters
		for (i=0; i<arrKeyVal.length; i++) {
			temp = arrKeyVal[i];
			argname = temp.key
			value=temp.value;
			
			for (j=0; j<includeParams.length; j++) {
				if (argname.toLowerCase() == includeParams[j].toLowerCase()) {
					//document.writeln(arrKeyVal[i].key + "=" + arrKeyVal[i].value + "<br>");
					QueryString=QueryString+arrKeyVal[i].key + "=" + arrKeyVal[i].value + "&";
				}
			}
		}
		QueryString=QueryString.substr(0,QueryString.length-1);
	}
	if (parseMode == "exclude") {
		QueryString="";

		// loop through the querystring parameters
		for (i=0; i<arrKeyVal.length; i++) {

	
			found=false;
			
			for (j=0; j<excludeParams.length; j++) {
				if (arrKeyVal[i].key.toLowerCase() == excludeParams[j].toLowerCase()) {
					found=true;
				}
			}
	
			if (!found) {
				//document.writeln(arrKeyVal[i].key + "=" + arrKeyVal[i].value + "<br>");
				QueryString=QueryString+arrKeyVal[i].key + "=" + arrKeyVal[i].value + "&";
			}
	
		}

		// trim the last &
		QueryString=QueryString.substr(0,QueryString.length-1);

	}
}


// strip out anything after a ; in the URL (for ePromo environment)
var semicolonIdx=URI.indexOf(";");
if (semicolonIdx>0) {
	URI=URI.substr(0,semicolonIdx);
}

// strip out anything after a # in the URL (i.e. anchors)
var poundIdx=URI.indexOf("#");
if (poundIdx>0) {
	URI=URI.substr(0,poundIdx);
}


// Build the page description if none has been created yet

if (!s_pageName) {
	var s_pageName = document.title;

	if (includeURI) {
		if (URI != null) {
			s_pageName = s_pageName + " | " + URI; 
		}
	}

	if ((includeQueryString) && (QueryString.length>0)) {
		s_pageName = s_pageName + "?" + QueryString;
	}
}

var s_prop5=domain;

/************** END WMG BEACON PREPROCESSOR *************************/

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_un,s_ios=0,s_csss=0,s_q='',s_code='',code='',s_lnk=0,s_vb,s_tfs=
0,s_etfs=0,s_wd=window,s_d=s_wd.document,s_n=navigator,s_u=
s_n.userAgent,s_apn=s_n.appName,s_v=s_n.appVersion,s_apv,s_i,s_ie=
s_v.indexOf('MSIE '),s_ns6=s_u.indexOf('Netscape6/');if(s_v.indexOf(
'Opera')>=0||s_u.indexOf('Opera')>=0)s_apn='Opera';var s_isie=(s_apn==
'Microsoft Internet Explorer'),s_isns=(s_apn=='Netscape'),s_isopera=(
s_apn=='Opera'),s_ismac=(s_u.indexOf('Mac')>=0);if(s_ie>0){s_apv=
parseInt(s_i=s_v.substring(s_ie+5));if(s_apv>3)s_apv=parseFloat(s_i)}
else if(s_ns6>0)s_apv=parseFloat(s_u.substring(s_ns6+10));else s_apv=
parseFloat(s_v);function s_num(x){var s=x.toString(),g='0123456789',p,
d;for(p=0;p<s.length;p++){d=s.substring(p,p+1);if(g.indexOf(d)<0)
return 0}return 1}function s_rep(s,o,n){var c=s.indexOf(o);while(c>=0)
{s=s.substring(0,c)+n+s.substring(c+o.length,s.length);c=s.indexOf(o)}
return s}function s_ape(s){return s_rep(escape(s),'+','%2B')}
function s_pt(s,d,f,a){var t=s,x=0,y,r;while(t){y=t.indexOf(d);y=y<0?
t.length:y;t=t.substring(0,y);r=f(t,a);if(r)return r;x+=y+d.length;t=
s.substring(x,s.length)}return ''}function s_cet(f,a,et,oe,fb){var r,
d=0;s_wd.s_oe=0
/*@cc_on@if(@_jscript_version>=5){try{return f(a)}catch(e){return et(e)}d=1}@end@*/
if(!d){if(s_ismac&&s_u.indexOf('MSIE 4')>=0)return fb(a);else{
s_wd.s_oe=s_wd.onerror;s_wd.onerror=oe;r=f(a);if(s_wd.s_oe)
s_wd.onerror=s_wd.s_oe;return r}}}function s_gtfset(e){return s_tfs}
function s_gtfsoe(e){if(s_wd.s_oe)s_wd.onerror=s_wd.s_oe;s_etfs=1;var
code=s_gs(s_un);if(code)s_d.write(code);s_etfs=0;return true}
function s_gtfsfb(a){return s_wd}function s_gtfsf(w){var p=w.parent,l=
w.location;s_tfs=w;if(p&&p.location!=l&&p.location.host==l.host){
s_tfs=p;return s_gtfsf(s_tfs)}return s_tfs}function s_gtfs(){if(!s_tfs
){s_tfs=s_wd;if(!s_etfs)s_tfs=s_cet(s_gtfsf,s_tfs,s_gtfset,s_gtfsoe,
s_gtfsfb)}return s_tfs}function s_ca(un){
var ci=un.indexOf(','),fun=ci<0?un:un.substring(0,ci),imn='s_i_'+fun
if(!s_ios&&s_apv>=4&&!s_isopera&&(s_ns6<0||s_apv>=6.1))s_ios=1;if(
!s_csss&&s_ios&&!s_d.images[imn]){s_d.write('<im'+'g name="'+imn+'" h'
+'eight=1 width=1 border=0>');if(!s_d.images[imn])s_ios=0}}
function s_it(un){s_ca(un)}function s_mr(un,sess,q){var ci=un.indexOf(
','),fun=ci<0?un:un.substring(0,ci),imn='s_i_'+fun,unc=s_rep(fun,'_',
'-'),rs='http://wmgmulti.112.2O7.net/b/ss/'+un+'/'+(s_csss?0:1)+'/F.2-xeLvs/'+sess
+'?'+'[AQB]&box=split'+(q?q:'')+(s_q?s_q:'')+'&[AQE]'
if(s_ios){s_d.images[imn].src=rs;return ''}return '<im'+'g sr'+'c="'
+rs+'" width=1 height=1 border=0>'}function s_gg(v){var g='s_'+v
return s_wd[g]?s_wd[g]:s_wd[v]}var s_qav='';function s_havf(t,a){var
b=t.substring(0,4),s=t.substring(4),n=parseInt(s),k='s_g_'+t,m=
's_vpm_'+t,q=t;s_wd[k]=s_wd[m]?s_wd['s_vpv_'+t]:s_gg(t);s_wd[m]=0;if(
t=='channel')q='ch';else if(s_num(s)){if(b=='prop')q='c'+n;else if(b==
'eVar')q='v'+n}if(s_wd[k]&&t!='linkName'&&t!='linkType')s_qav+='&'+q
+'='+s_ape(s_wd[k]);return ''}function s_hav(){var n,av='pageName,cha'
+'nnel,server,pageType,pageValue,product,campaign,state,zip,events,pr'
+'oducts,purchaseID,eVarCFG,linkName,linkType';for(n=1;n<26;n++)av+=
',prop'+n;for(n=1;n<21;n++)av+=',eVar'+n;s_qav='';s_pt(av,',',s_havf,0
);return s_qav}
function s_lnf(t,h){var te=t.indexOf('=');if(t&&te>0&&h.indexOf(
t.substring(te+1))>=0)return t.substring(0,te);return ''}
function s_ln(h){if(s_gg('linkNames'))return s_pt(s_gg('linkNames'),
',',s_lnf,h);return ''}function s_ltdf(t,h){if(t&&h.substring(
h.length-(t.length+1))=='.'+t)return 1;return 0}function s_ltef(t,h){
if(t&&h.indexOf(t)>=0)return 1;return 0}function s_lt(h){var lft=
s_gg('linkDownloadFileTypes'),lif=s_gg('linkInternalFilters')?s_gg(
'linkInternalFilters'):s_wd.location.hostname;h=h.toLowerCase();if(
s_gg('trackDownloadLinks')&&lft&&s_pt(lft,',',s_ltdf,h))return 'd';if(
s_gg('trackExternalLinks')&&lif&&!s_pt(lif.toLowerCase(),',',s_ltef,h)
)return 'e';return ''}function s_lc(e){s_wd.linkName=''
s_wd.s_linkName='';s_wd.linkType='';s_wd.s_linkType='';s_lnk=this
setTimeout('s_gs("");',0);if(this.s_oc)return this.s_oc(e);return true
}function s_ls(){if(s_d.links&&(s_gg('trackDownloadLinks')||s_gg(
'trackExternalLinks'))){var l,ln,oc;for(ln=0;ln<s_d.links.length;ln++)
{l=s_d.links[ln];oc=l.onclick?l.onclick.toString():'';if(oc.indexOf(
"s_gs(")<0&&oc.indexOf("s_lc(")<0){l.s_oc=l.onclick;l.onclick=s_lc}}}}
function s_gs(un){s_un=un;var trk=1,tm=new Date,sed=Math&&Math.random?
Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+
Math.floor(tm.getTime()/10800000)%10+sed,yr=tm.getYear(),t,q='';yr=yr<
1900?yr+1900:yr;t=tm.getDate()+'/'+tm.getMonth()+'/'+yr+' '
+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay(
)+' '+tm.getTimezoneOffset();if(!s_q){s_d.cookie='s_cc=true; path=/'
var tfs=s_gtfs(),tl=tfs.location,r=tfs.document.referrer,s='',c='',v=
'',p='',bw='',bh='',j='1.0',vb=s_vb?s_vb:'',a=s_apn+' '+s_apv,g=
s_wd.location,o=navigator.platform,k=s_d.cookie.indexOf('s_cc=')>=0?
'Y':'N',hp='',ct='';if(s_apv>=4)s=screen.width+'x'+screen.height;if(
s_isns||s_isopera){if(s_apv>=3){j='1.1';var i1=0,i2=0,sta;while(i2<30
&&i1<navigator.plugins.length){sta=navigator.plugins[i1].name;if(
sta.length>100)sta=sta.substring(0,100);sta+=';';if(p.indexOf(sta)<0)
p+=sta;i1++;i2++}v=navigator.javaEnabled()?'Y':'N'}if(s_apv>=4){
j='1.2';c=screen.pixelDepth;bw=s_wd.innerWidth;bh=s_wd.innerHeight}if(
s_apv>=4.06)j='1.3'}else if(s_isie){if(s_apv<4)r='';if(s_apv>=4){v=
navigator.javaEnabled()?'Y':'N';j='1.2';c=screen.colorDepth}if(s_apv>=
5){bw=s_d.documentElement.offsetWidth;bh=
s_d.documentElement.offsetHeight;j='1.3';if(!s_ismac&&s_d.body){
s_d.body.addBehavior("#default#homePage");hp=s_d.body.isHomePage(tl)?
"Y":"N";s_d.body.addBehavior("#default#clientCaps");ct=
s_d.body.connectionType}}}s_q=(r?'&r='+s_ape(r):'')+(s?'&s='+s_ape(s):
'')+(c?'&c='+s_ape(c):'')+(o?'&o='+s_ape(o):'')+(j?'&j='+j:'')+(v?
'&v='+v:'')+(k?'&k='+k:'')+(bw?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(vb?
'&vb='+vb:'')+(ct?'&ct='+s_ape(ct):'')+(hp?'&hp='+hp:'')+(g?'&g='
+s_ape(g):'')+(a?'&a='+s_ape(a):'')+(p?'&p='+s_ape(p):'')}if(s_gg(
'usePlugins'))s_wd.s_doPlugins();q+=(t?'&t='+s_ape(t):'')+s_hav()
if(!s_lnk&&s_wd.s_block_recall)trk=0;s_wd.s_block_recall=1
if(s_lnk){var lnkh=s_lnk.href?s_lnk.href:'',lnkn=s_gg('linkName')?
s_gg('linkName'):s_ln(lnkh),lnkt=s_gg('linkType')?s_gg('linkType'
).toLowerCase():s_lt(lnkh);if(lnkh&&!s_gg('linkLeaveQueryString')){
lnkq=lnkh.indexOf('?');lnkh=lnkh.substring(0,lnkq<0?lnkh.length:lnkq)}
if(lnkt&&(lnkh||lnkn))q+='&pe=lnk_'+(lnkt=='d'||lnkt=='e'?s_ape(lnkt):
'o')+(lnkh?'&pev1='+s_ape(lnkh):'')+(lnkn?'&pev2='+s_ape(lnkn):'')
else trk=0;s_lnk=0}
if(!trk)return '';var code='';if(un){if(s_wd.s_vs&&!s_wd.s_vs(un,tm,
yr,sed))return '';code+=s_mr(un,sess,q);}else if(s_wd.s_unl)for(var
unn=0;unn<s_wd.s_unl.length;unn++){if(s_wd.s_vs&&!s_wd.s_vs(
s_wd.s_unl[unn],tm,yr,sed))return '';code+=s_mr(s_wd.s_unl[unn],sess,q
);}return code}function s_wdl(e){s_wd.s_wd_l=1;var r=true;if(s_wd.s_ol
)r=s_wd.s_ol(e);if(s_wd.s_ls)s_wd.s_ls();return r}function s_wds(un){
s_wd.s_wd_l=1;if(s_apv>=3&&(!s_isie||!s_ismac||s_apv>=5)){s_wd.s_wd_l=
0;if(!s_wd.s_unl)s_wd.s_unl=new Array;s_wd.s_unl[s_wd.s_unl.length]=un
var ol=s_wd.onload?s_wd.onload.toString():'';if(ol.indexOf("s_wdl(")<0
){s_wd.s_ol=s_wd.onload;s_wd.onload=s_wdl}}}function s_dc(un){s_wds(un
);s_ca(un);return s_gs(un)}

