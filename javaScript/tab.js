function tab(){
	var tab_t = document.getElementById("tab_t");
    var tab_t_li = tab_t.getElementsByTagName("li");
    var tab_c = document.getElementById("tab_c");
    var tab_c_li = tab_c.getElementsByTagName("div");
    var len = tab_t_li.length;
    document.getElementById("hana").style.overflow = 'auto';
    document.getElementById("google").style.overflow = 'auto';
    document.getElementById("baidu").style.overflow = 'auto';
    var i=0;
    var evt = "onclick";
    for(i=0; i<len; i++){
        tab_t_li[i].index = i;
    }
        
    tab_t_li[0][evt] =function(){
    	var j;
        for(j=0; j<len; j++){
            tab_t_li[j].className ='';
        }
        tab_t_li[this.index].className ='act';
            
        document.getElementById("hana").className = '';
        document.getElementById("hana").style.overflow = 'auto';
        document.getElementById("google").className = 'hide';
        document.getElementById("baidu").className = 'hide';
        process();
    }
    
    tab_t_li[1][evt] =function(){
    	var j;
        for(j=0; j<len; j++){
            tab_t_li[j].className ='';
        }
        tab_t_li[this.index].className ='act';
            
        document.getElementById("google").className = '';
        document.getElementById("google").style.overflow = 'auto';
        document.getElementById("hana").className = 'hide';
        document.getElementById("baidu").className = 'hide';
        googlecalcRoute();
    }
    
    tab_t_li[2][evt] =function(){
    	var j;
        for(j=0; j<len; j++){
            tab_t_li[j].className ='';
        }
        tab_t_li[this.index].className ='act';
            
        document.getElementById("baidu").className = '';
        document.getElementById("baidu").style.overflow = 'auto';
        document.getElementById("hana").className = 'hide';
        document.getElementById("google").className = 'hide';
        baiducalcRoute();
    }
}