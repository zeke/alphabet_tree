$(function() {
  
  Node = {
    // baseUrl: 'http://henrietta.local:5000/',
    baseUrl: 'http://falling-stream-5863.herokuapp.com/',
    
    letters: ('abcdefghijklmnopqrstuvwxyz').split(''),
    
    fetchSummary: function(prefix) {
      var path = (prefix == undefined || prefix == '') ? "summary" : "summary/"+prefix;
      var url = Node.baseUrl + path;
      $.getJSON(url, function(data) {
        Node.renderSummary(data);
      });
    },
    
    renderSummary: function(summary) {
      console.log(summary);
      
      // Update the 'up' link
      if (summary.query.length == 0) {
       $('li#up').empty(); 
      } else {
        var previous_prefix = summary.query.substr(0, summary.query.length-1);
        $('li#up').html($("#upTemplate").tmpl({prefix: previous_prefix}));
      }
      
      // Iterate over each letter in the alphabet..
      $.each(Node.letters, function(index, letter) {
        var prefix = summary.query+letter;
        var view = {
          prefix: prefix, 
          count: summary.children[prefix]
        };
        
        if (view.count > 0) {  
          $('li#'+letter).html($("#resultTemplate").tmpl(view));
        } else {
          $('li#'+letter).empty();
        }
        
      });

    }
    
  };
  
  Stage = {
    
    adaptToScale: function() {
      console.log('adaptToScale');
      var letter_width = ($(window).width()/7);
      var letter_height = ($(window).height()/4);
      $('ul#letters li').width(letter_width);
      $('ul#letters li').height(letter_height);
    }

  };

  Stage.adaptToScale();
  setTimeout('Stage.adaptToScale()', 400);
  setTimeout('Stage.adaptToScale()', 800);
  
  Node.fetchSummary();
});

$(window).resize(function() {
	Stage.adaptToScale();
});

