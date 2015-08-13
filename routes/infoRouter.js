var express = require('express');
var request = require('request');
var TVDB = require("node-tvdb/compat");
var tvdb = new TVDB("B5D2874D61BF48DA");


var routes = function(){

var infoRouter = express.Router();


	
    infoRouter.use('/:seriesName' , function(req,res, next){
		var seriesName = req.params.seriesName;

			tvdb.getSeriesByName(seriesName, function(err, response) {
    			if(err){
                    //req.shows = {status : 404};
    				//res.send("Show Not Found!").status(404);
    			}else{
    				req.shows = response;
                    next();
    			}
			});
    
    },function(req,res,next){
        
        if( req.shows && req.shows.length > 0){

        var show = req.shows[0];

            if(!!show.IMDB_ID){

            //console.log(show.IMDB_ID);

                request('http://eztvapi.re/show/'+show.IMDB_ID, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    
                    var data = JSON.parse(body);
                    //console.log(data.images.poster);
                    show.poster = data.images.poster;
                    show.status = data.status;
                    show.runtime = data.runtime;
                    show.year = data.year;
                    show.genres = data.genres;

                    req.show = show;
                    next();

                  }else{
                    //console.log("No poster");
                     show.poster = null;
                     req.show = show;
                     next();
                  }
                });

            }else{
                next();
            }

        }else{
            next();
        }

    });



    infoRouter.route('/:seriesName')
        .get(function(req,res){

            if(req.show){
                res.json(req.show).status(200);
            }else{
                res.json({status: 404}).status(404);
            }
            
        });



	

	return infoRouter;

};

module.exports = routes;