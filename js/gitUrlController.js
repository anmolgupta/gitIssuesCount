app.controller('gitUrlController',['$http','$scope','$filter','$window',function($http,$scope,$filter,$window){
    
    //function to get the JSON from the defined URL.
    var getData = function(param,url,error){
        
        $http.get(url).
                then(function(response) {
    
                    param(response);
                    
                }, function(error) {
                
                    $window.alert('URL not found');
                    
                });
    }
    
    //Function which is called on pressing submit button from front end
    $scope.fetchData = function(){
        
        $scope.loading = true;  //For loading
        $scope.dataAvailable = false; //For data visibility panel.
        
        var pageNo =1; //default page number
        var maximum = 100; //default number of records.
        
        $scope.data = {totalIssues : 0, issuesInLast24Hours:0,issues24to7:0,issues7daysAgo:0}; //initilize stats object
        
        var timestamp = new Date().getTime(); //Timestamp to compare which is passed as a function argument.
        
        var gitURL = $scope.gitURL; 
        
        var res = gitURL.split('github.com/')
        var url = 'https://api.github.com/repos/'+res[1]; //constructing the GIT API url
        
        //callback function for getting the response.
        var calcData = function(response){
            
            var data = response.data;
            
            //if message not found error contains in response
            if(data.message)
            {
                $window.alert("Problem with repo. Either Private or problem in url");
                return;
            }

            console.log(data.length)
            
            //getting stats from the data fetched.
            $scope.data = $filter('dateFilter')(data,$scope.data,timestamp);
            
            if(data.length == 100){    
                pageNo++;
                getData(calcData,url+"?page="+pageNo+"&per_page="+maximum+"&state=open");
                
            }else{
            
                console.log(JSON.stringify($scope.data))
                $scope.loading = false;
                $scope.dataAvailable = true;
            }
        }
        
        getData(calcData,url+"?page="+pageNo+"&per_page="+maximum+"&state=open");
    }
    
}])