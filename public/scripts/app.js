////////////////////////////
//                        //
//   **FRONT END JS.**    //
//                        //
////////////////////////////
var selectedJack=[];
var $selectJack=$("#jackSec").children();

$selectJack.on("change", function(){
  selectedJack=[];
  jackChange();
})

function jackChange(){  
  for(var index in selectedJack){
    $('.jackSec'+'[value="'+selectedJack[index]+'"]').prop('disabled',true);
  };
  $.each($selectJack, function(index,select){
    if(select.value !== "--"){
      selectedJack.push(select.value);
    }
  })
  $('.jackSec').prop("disabled", false);
  for(var index in selectedJack){
    $('.jackSec'+'[value="'+selectedJack[index]+'"]').prop('disabled',true);
  };
}

var selectedOdette=[];
var $selectOdette=$("#odetteSec").children();
$selectOdette.on("change", function(){
  selectedOdette=[];
  odetteChange()
})
function odetteChange(){
  for(var index in selectedOdette){
    $('.odetteSec'+'[value="'+selectedOdette[index]+'"]').prop('disabled',true);
  }
  $.each($selectOdette, function(index,select){
    if(select.value !== "--"){
      selectedOdette.push(select.value);
    }
  })
  $('.odetteSec').prop("disabled", false);
  for(var index in selectedOdette){
    $('.odetteSec'+'[value="'+selectedOdette[index]+'"]').prop('disabled',true);
  };
}

var selectedCharlotte=[];
var $selectCharlotte=$("#charlotteSec").children();
$selectCharlotte.on("change", function(){
  selectedCharlotte=[];
  charlotteChange()
})
function charlotteChange(){  
  for(var index in selectedCharlotte){
    $('.charlotteSec'+'[value="'+selectedCharlotte[index]+'"]').prop('disabled',true);
  }
  $.each($selectCharlotte, function(index,select){
    if(select.value !== "--"){
      selectedCharlotte.push(select.value);
    }
  })
  $('.charlotteSec').prop("disabled", false);
  for(var index in selectedCharlotte){
    $('.charlotteSec'+'[value="'+selectedCharlotte[index]+'"]').prop('disabled',true);
  };
}

var selectedTock=[];
var $selectTock=$("#tockSec").children();
$selectTock.on("change", function(){
  selectedTock=[];
  tockChange()
})
function tockChange(){
  for(var index in selectedTock){
    $('.tockSec'+'[value="'+selectedTock[index]+'"]').prop('disabled',true);
  }
  $.each($selectTock, function(index,select){
    if(select.value !== "--"){
      selectedTock.push(select.value);
    }
  })
  $('.tockSec').prop("disabled", false);
  for(var index in selectedTock){
    $('.tockSec'+'[value="'+selectedTock[index]+'"]').prop('disabled',true);
  };
};



var currentUserId;
var currentUserEmail;
var currentUserName;
var userName;

//******************DROP DOWN****************//
var userInput = $('#userNameInput');
var breedSelectId = document.getElementsByTagName('select');
var jackList = document.getElementById('jackList');
var odetteList = document.getElementById('odetteList');
var charlotteList = document.getElementById('charlotteList');
var tockList = document.getElementById('tockList');
var breeds = ['\-\-', 'Australian_Cattle_Dog', 'Australian_Kelpie', 'Australian_Shepherd', 'Border_Collie', 'Boxer', 'Cairn_Terrier', 'Chihuahua', 'Corgie', 'Dutch_Shepherd', 'German_Shepherd', 'German_Shorthaired_Pointer', 'Husky', 'Jack_Russell', 'Labrador_Retriever', 'Malinois', 'Miniature_American_Shepherd', 'Miniature_Pinscher', 'Plot_Hound', 'Welsh_Corgi', 'Wheaten_Terrier']


$(document).ready(function() { 
  $.getJSON("/api/user_data", function(data) {//GETS THE CURRENT USER ID!
    currentUserId = data.username._id;
    currentUserEmail = data.username.local.email;
    console.log('current user email: '+currentUserEmail)
    console.log('current user id: '+currentUserId)
    //userInput.val(userInput.val()+currentUserEmail);
  });
  
  $.get("/api/breeds")
    .done(function(breedlist){ 
    var allUsers=[];
    breedlist.forEach(function(listItem){ //get user id from each entry
      allUsers.push(listItem);
    })
    console.log('all users data', {allUsers});
    
    window.setTimeout(function(user){
      allUsers.forEach(function(user){
        if(user.createdBy == currentUserId){        
          $('#userNameInput').val(user.data.userNameInput);        
          $('#jack1').val(user.data.jackFirst.split(' ').join('_'));
          $('#jack2').val(user.data.jackSecond.split(' ').join('_'));
          $('#jack3').val(user.data.jackThird.split(' ').join('_'));
          $('#jack4').val(user.data.jackFourth.split(' ').join('_'));

          $('#odette1').val(user.data.odetteFirst.split(' ').join('_'));
          $('#odette2').val(user.data.odetteSecond.split(' ').join('_'));
          $('#odette3').val(user.data.odetteThird.split(' ').join('_'));
          $('#odette4').val(user.data.odetteFourth.split(' ').join('_'));

          $('#charlotte1').val(user.data.charlotteFirst.split(' ').join('_'));
          $('#charlotte2').val(user.data.charlotteSecond.split(' ').join('_'));
          $('#charlotte3').val(user.data.charlotteThird.split(' ').join('_'));
          $('#charlotte4').val(user.data.charlotteFourth.split(' ').join('_'));

          $('#tock1').val(user.data.tockFirst.split(' ').join('_'));
          $('#tock2').val(user.data.tockSecond.split(' ').join('_'));
          $('#tock3').val(user.data.tockThird.split(' ').join('_'));
          $('#tock4').val(user.data.tockFourth.split(' ').join('_'));
         
        }
        jackChange();
        odetteChange();
        charlotteChange();
        tockChange();
      })
    },500)
    //allUsersResults(thisUser);
  });
  breeds.forEach(function(breed,index){
    var breedObj={
      'optValue': breed,
      'optText': breed
    }
    optionGen(breedSelectId, breedObj)  
  }) 
});

  function optionGen(breedSelectId, breedObj){
    $(breedSelectId).append("<option class='breedOps' value="+breedObj.optValue+">"+breedObj.optText.split('_').join(' ')+"</option>")
    $.each($('option'), function(){
      $(this).addClass($(this).closest('div').attr('id'))
    })
    $('.dogContainer').removeClass('hidey');
  }


  function allUsersResults(){
      //$('#userNameInput').html(''); // REMOVED TO FIX WRONG AUTO POP?
    $('#allUsersContainer').html('');

    $.get("/api/breeds")
    .done(function(breedlist){ 
    var thisUser=[];
    breedlist.forEach(function(listItem){ //get user id from each entry
      thisUser.push(listItem);
    })
    thisUser.forEach(function(user){
      //if(user.data.userNameInput !== currentUserId){ //DONT KNOW WHY I DID THIS!
      $('#userNameInput').val(user.data.userNameInput)
      //}
      $('#wordStreet').text('Word on the street...');
      $('#allUsersContainer').append(
        "<div class='row'>"+
          "<div class='col-sm-8 userNameGen' id='allUsersCol'>"+
            "<p class='respUserName'>"+user.data.userNameInput+"</p>"+
            //"<h5 id='userEmail'>"+user.data.userEmail+"</h4>"+
          "</div>"+
        "</div>"+  
        "<div class='row'>"+
          "<ul class = 'col-sm-3  dogCol jack' id='jackList'>"+  
            "<li>"+user.data.jackFirst.split('_').join(' ')+"</li>"+
            "<li>"+user.data.jackSecond.split('_').join(' ')+"</li>"+
            "<li>"+user.data.jackThird.split('_').join(' ')+"</li>"+
            "<li>"+user.data.jackFourth.split('_').join(' ')+"</li>"+    
          "</ul>"+

          "<ul class = 'col-sm-3 dogCol odette' id='odetteList'>"+ 
            "<li>"+user.data.odetteFirst.split('_').join(' ')+"</li>"+
            "<li>"+user.data.odetteSecond.split('_').join(' ')+"</li>"+
            "<li>"+user.data.odetteThird.split('_').join(' ')+"</li>"+
            "<li>"+user.data.odetteFourth.split('_').join(' ')+"</li>"+            
          "</ul>"+

          "<ul class = 'col-sm-3 dogCol charlotte' id='charlotteList'>"+ 
            "<li>"+user.data.charlotteFirst.split('_').join(' ')+"</li>"+
            "<li>"+user.data.charlotteSecond.split('_').join(' ')+"</li>"+
            "<li>"+user.data.charlotteThird.split('_').join(' ')+"</li>"+
            "<li>"+user.data.charlotteFourth.split('_').join(' ')+"</li>"+         
          "</ul>"+

          "<ul class = 'col-sm-3 dogCol tock' id='tockList'>"+
            "<li>"+user.data.tockFirst.split('_').join(' ')+"</li>"+
            "<li>"+user.data.tockSecond.split('_').join(' ')+"</li>"+
            "<li>"+user.data.tockThird.split('_').join(' ')+"</li>"+
            "<li>"+user.data.tockFourth.split('_').join(' ')+"</li>"+
          "</ul>"+
        "</div>"
        )
      })
    })
    $('.allUserContHidden').addClass('load');
    $('#saveBreeds').removeClass('hidey');
  };

$('#saveBreeds').on('click', function(){
  $('.allUserContHidden').removeClass('load');
  $('#saveBreeds').addClass('hidey');
  var usersName;
  if(userInput.val()){
    usersName=userInput.val();
  }else{
    usersName=currentUserEmail;  
  }
  
  var newJack=[];
  var newOdette=[];
  var newCharlotte=[];
  var newTock=[];
  var jack = [$('#jack1 option:selected').text(),$('#jack2 option:selected').text(),$('#jack3 option:selected').text(),$('#jack4 option:selected').text()];
  var odette= [$('#odette1 option:selected').text(), $('#odette2 option:selected').text(), $('#odette3 option:selected').text(), $('#odette4 option:selected').text()];
  var charlotte=[$('#charlotte1 option:selected').text(), $('#charlotte2 option:selected').text(), $('#charlotte3 option:selected').text(), $('#charlotte4 option:selected').text()];
  var tock=[$('#tock1 option:selected').text(), $('#tock2 option:selected').text(), $('#tock3 option:selected').text(), $('#tock4 option:selected').text()]
    
    jack.forEach(function(jacky){
    newJack.push(jacky) 
  })
    odette.forEach(function(detter){
    newOdette.push(detter) 
  })
    charlotte.forEach(function(charlie){
    newCharlotte.push(charlie) 
  })      
    tock.forEach(function(tickTock){
    newTock.push(tickTock) 
  })
  //console.log(newJack, newOdette, newCharlotte, newTock);
  
  var userUrl = "/api/breeds";
  $.ajax({              //ajax POST to db
    method: "POST",
    url: userUrl,
    data:{
      title:"Breed Choices",
      data:{
          userNameInput: usersName,

          userEmail: currentUserEmail,

          jackFirst: newJack[0],
          jackSecond: newJack[1],
          jackThird: newJack[2],
          jackFourth: newJack[3],
               
          odetteFirst: newOdette[0],
          odetteSecond: newOdette[1],
          odetteThird: newOdette[2],
          odetteFourth: newOdette[3],             
      
          charlotteFirst: newCharlotte[0],
          charlotteSecond: newCharlotte[1],
          charlotteThird: newCharlotte[2],
          charlotteFourth: newCharlotte[3],
      
          tockFirst: newTock[0],
          tockSecond: newTock[1],
          tockThird: newTock[2],
          tockFourth: newTock[3],
        
      },
    },
  //})
     // success: function(results){
     //  console.log('User POST success');
     //  // $('#msg').show();
     //  // setTimeout(function(){
     //  //   $('#msg').fadeOut();
     //  // },3000);
     //    //renderResults(results);
     //    allUsersResults()
     //  },
    })
  delay();
});
  

function delay(){
  $('.loadGif').addClass('load')
  window.setTimeout(function(){
    $('.loadGif').removeClass('load');
    allUsersResults()
  },2000)
}


// ************ GLOBAL VARIABLES *********** //


//-----graph-------//
var angerLevel;
var disgustLevel;
var fearLevel;
var joyLevel;
var sadnessLevel;
var text;
//----------------//

var allResults; //list of objects in 'results' collection


// ************** BUTTON FUNCTIONS ************ //


//_________________save results to results collection____________//
$('#saveResults').on('click', function (event){ // Saves results to user db
    console.log("saveResults button clicked")
    text = $("#textToSubmit").val();
    var currentTime = new Date().toLocaleString().split(', '); //time stamp
    var resultsUrl="/api/results"
    $.ajax({              //ajax POST to db
      method: "POST",
      url: resultsUrl,
      data: {
        text: text,
        anger: angerLevel,
        disgust: disgustLevel,
        fear: fearLevel,
        joy: joyLevel,
        sadness: sadnessLevel,
        postTime: currentTime     //adds current-time timestamp
      },
      success: function(results){
        console.log('ajax POST success');
        $('#msg').show();
        setTimeout(function(){
          $('#msg').fadeOut();
        },3000);
        renderResults(results);
        }
      });
    
});


//_________get and show all objects in 'results' collection__________//
$('#showHistory').on('click', function(data){ //gets results from db for display
 $.get("/api/results")//***changed all http, to https
    .done(function(data){  
    let allResults = data;
    console.log(allResults);
    console.log(allResults.length);
    renderResults(allResults);//triggers all results to render to page
    });
  });


function renderResults(allResults){ //renders results history in HTML
  console.log('renderResults function  hit');
  $('#history').html('');
  $.get("/api/results")
    .done(function(data){  
    let allResults = data;
    allResults.forEach(function(result){
    historyHtml=
    "<a href='#' class='list-group-item oneResult' data-result-id='" + result._id + "'>" 
    + result.postTime[0] + " " + "<button type='button' id='commentButton' class='btn-primary btnAdd btnList'>Add Comment</button> <button type='button' id='deleteResultButton' class='btn-danger btnRemove btnList'>Remove Result</button> <button class='bt-default btnReLoad btnList' id='reLoadButton'>Re-Render</button></a> <p>"+result.text+" </p>"
  
    $('#history').append(historyHtml)
    })
  });
};


//______________________add comment to 'result' object___________//
var byId;
$('#history').on('click', '#commentButton', function(event){ //renders comment modal on page
  console.log("comment button clicked");
  byId= $(this).parents('.oneResult').data('result-id');
  console.log(byId);
  $('#commentModal').data(byId);
  $('#commentModal').modal();
  console.log("comment modal front-end");
  $.get("/api/results/"+byId+"") //get comment text from db
    .done(function(data){
      console.log(data);
      console.log(data.comment)
      $('#resultComment').val(data.comment);  //render current comment in comment box
    });
  });
  
    $('#commentModal').on('click','#saveComment', function(event){  //saves comment to db
    console.log('saveComment clicked');
    var commentBox = $('#resultComment').val();
    var clickedUrl = "/api/results/"+ byId + "";
    console.log(clickedUrl)
      $.ajax({
        method: "PUT",
        url: clickedUrl,
        data:{
          comment: commentBox,
          },
        success:function(results){
          console.log("ajax PUT save comment SUCCESS!");
          $("#commentModal").modal('hide');
          $("#resultComment").val('');
          renderResults(results);
        }
      })
      
    });


//_________________delete result object______________//

$('#history').on('click', '#deleteResultButton', function(event){
      console.log('deleteResultButton clicked')
      var byId= $(this).parents('.oneResult').data('result-id');
      console.log(byId);
      var clickedUrl = "/api/results/"+ byId + "";
        $.ajax({
          method: "DELETE",
          url: clickedUrl,
          success: function(results){
            console.log("ajax DELETE success!");
            renderResults(results)
          }
        })
});

//_________________re-GRAPH result __________________//
$('#history').on('click', '#reLoadButton', function(event){
  var byId= $(this).parents('.oneResult').data('result-id');
  $.get("/api/results/"+byId+"") 
    .done(function(data){
      console.log(byId);
      console.log(data);
      text = data.text;
      angerLevel = data.anger;
      disgustLevel = data.disgust;
      fearLevel = data.fear;
      joyLevel = data.joy;
      sadnessLevel = data.sadness;
      graphResults();
    })
 });


/////////////////////////////
//                         //
//   **WATSON API BELOW**  //
//                         //
//                         //
/////////////////////////////





var submitText = function(){
	console.log("Text to submit: " + $("#textToSubmit").val())
  submittedText= $("#textToSubmit").val()
	$.ajax ({
		url:"https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?text="+$("#textToSubmit").val()+"&tones=emotion&sentences=false&version=2016-05-19",
		type: 'Get',
		success: function(data){
		console.log(data.document_tone.tone_categories[0].tones);
		var tones=data.document_tone.tone_categories[0].tones;
		text = submittedText;
    angerLevel= tones[0].score * 100;
		disgustLevel=tones[1].score *100;
		fearLevel = tones[2].score *100;
		joyLevel = tones[3].score *100;
		sadnessLevel = tones[4].score *100;
		graphResults();
	  }
  })
}

function graphResults() {
    var chart = new CanvasJS.Chart("chartContainer",
      {
      backgroundColor: "transparent",
      title:{
        text: "Emotions"    
      },
    
      animationEnabled: true,
      axisY: {
        title: ""
      },
      legend: {
      	
      	fontFamily: "Gruppo", //******font for legend(bottom)******//
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
     
      

      theme: "theme2",
      data: [

      {        
        type: "column",  
        showInLegend: true, 
        // legendMarkerColor: "grey",
        legendText: text,
        dataPoints: [      
        {y: angerLevel, label: "Anger", color:"#e23852"},
        {y: disgustLevel,  label: "Disgust", color:"#529b56"},
        {y: fearLevel,  label: "Fear", color: "#f9e070"},
        {y: joyLevel,  label: "Joy", color: "#ff9bf8"},
        {y: sadnessLevel,  label: "Sadness", color: "#5d7ae2"}               
        ]
      }   
      ]
    });
     chart.render();
}








//app.listen(3000);
