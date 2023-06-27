 function myfunction() {
  
  window.location.replace =("https://790a53dc-a3b3-4901-a895-542c1e9308fe-ide.cs50.xyz/home.html");
}


var topmenu =[

{ title:'Home',         url:'/home.html' },
{ title:'Features',        url:'/feature.html' },
{ title:'Contact Us',   url:'/contact' }
];
var actions =[

{ title:'ADD EMPLOYEE',         url:'/home.html' },
{ title:'ADD EVENT',        url:'/feature.html' },
{ title:'ADD NEWS',    }
];

var array;




var ads = [
    { name:'Amazon Echo', url:'https://www.advertgallery.com/wp-content/uploads/2018/02/introducing-amazon-echo-just-ask-alexa-for-music-ad-times-of-india-delhi-16-02-2018.png' },
    { name:'The Fulton Lewis Show', url:'https://upload.wikimedia.org/wikipedia/commons/c/ca/Mutual_Broadcasting_System_-_Fulton_Lewis_Radio_1940s-1950s_Commercial.jpg' },
    { name:'Clarks Shoes', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Clarks_US_vintage_Desert_Boot_advert.jpg/433px-Clarks_US_vintage_Desert_Boot_advert.jpg' }
];


var vueinst = new Vue({

  el: '#vuemain',
  data: {
    text: 'Pretty good.',
    image:ads[0],
    showemp:false,
    showman:false,
    nightmode: false,
    topmenu:topmenu,
    tasks:[],
    employs:[],
    topmenuitem:0,
    topmenuhover:false,
    uu:false,
    app:["iuihiuh"],
    showemplist:false,
    showtasktable:false,
    dashboard:false,
    grouptask:false,
    availability:false,
    taskstatus:false,
    updatedelete:false,
   
    showbox:false,
    showleave:false,
  
    groups:[],
    jaggs:[],

  },
  methods:{
    emp :function(){
		//e.preventDefault()
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.response);
                vueinst.tasks= JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("POST", "/task", true);
        xhttp.setRequestHeader("Content-type", "application/json");
         xhttp.send(JSON.stringify({ TaskID: document.getElementById('taskID').value,Eusername:document.getElementById('employee').value,Taskname:document.getElementById('taskname').value,endTime:document.getElementById('taskdate').value,startTime:document.getElementById('taskdate2').value }));


		// in success handler redirect to employee.html

	},
em :function(){
		//e.preventDefault()
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.response);
                vueinst.jaggs= JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("POST", "/show", true);
        xhttp.setRequestHeader("Content-type", "application/json");
         xhttp.send(JSON.stringify({ Eusername:document.getElementById('employee').value }));


		// in success handler redirect to employee.html

	},



  }

});


















