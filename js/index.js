// shoot js when DOM is loaded
$(document).ready(function() {
  
    // setting global variables
    var recentTrackUrl = "https://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=shubhaswamy&limit=1&api_key=9f69c0460a627dddc4696e84707458a0&format=json";
   
    var refreshTime = 5000; //look for updated JSON every "xxx" miliseconds
    
    //definig the function which gets JSON data from the last.fm api and sets it to the 
    function setRecentTrack() {
        $.getJSON(recentTrackUrl, function(data){
            var info = data.recenttracks.track[0]; 
                var track = info.name; 
                var artist = info.artist["#text"]; 
                var album = info.album["#text"]; 
                var url = info.url;
                var nowplaying = info["@attr"];
            
            
            
            $(".artist").html(artist);
            $(".track").html(track).attr("href", url);
           if (nowplaying) {
                $(".time").html("Now playing...");
            }
            else {
                var timestamp = parseFloat(info.date.uts); 
                var timeISO = new Date(timestamp * 1000).toISOString();
                $(".time").html("Was listening to ");
                $("time").attr("datetime", timeISO);
                $("time.timeago").timeago(); 
            }
        });
    } 
    //run function on pageload then load on time interval
    setRecentTrack();
    setInterval(setRecentTrack, refreshTime);       

    
});