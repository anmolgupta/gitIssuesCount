'use strict';
/* global require, module,app*/
/* jshint node:true*/
//for filter the original data to get only the date and also getting the required stats from the data
app.filter('dateFilter',function(){
    
    /**Params:
    *data - fetched data from GIT
    *retList - the stats object to be returned
    *timestamp - the value of timestamp which is taken as a reference to calculate the stats
    **/
    return function(data,retList,timestamp){


        data.forEach(item=>{

            if(item.pull_request){
                return;
            }
            
            var created_at = new Date(item.created_at).getTime();
            
            retList.totalIssues++;
            
            if(created_at> (timestamp - (24*60*60*1000)))
                retList.issuesInLast24Hours++;
            
            if((timestamp - (7*24*60*60*1000)) < created_at && created_at < (timestamp - (24*60*60*1000)))
                retList.issues24to7++;
            
            if(created_at < (timestamp - (7*24*60*60*1000)))
                retList.issues7daysAgo++;
        });
        
        return retList;
    };
        
});