app.controller('gitUrlController',['$http','$scope','$filter','$window',function($http,$scope,$filter,$window){
    
    var getData = function(param,url,error){
        
        $http.get(url).
                then(function(response) {
    
                    param(response);
                    
                }, function(error) {
                
                    $window.alert('URL not found');
                    
                });
    }
    
    
    $scope.fetchData = function(){
        
        $scope.loading = true;
        $scope.dataAvailable = false;
        var pageNo =1;
        var maximum = 100;
        
        $scope.data = {totalIssues : 0, issuesInLast24Hours:0,issues24to7:0,issues7daysAgo:0};
        
        var timestamp = new Date().getTime();
        
        var gitURL = $scope.gitURL;
        
        var res = gitURL.split('github.com/')
        var url = 'https://api.github.com/repos/'+res[1];
        
        var calcData = function(response){
            
            var data = response.data;
            
            if(data.message)
            {
                $window.alert("Problem with repo. Either Private or problem in url");
                return;
            }

            console.log(data.length)
            if(data.length == 100){
                $scope.data = $filter('dateFilter')(data,$scope.data,timestamp);
                pageNo++;
                getData(calcData,url+"?page="+pageNo+"&per_page="+maximum+"&state=open");
                
            }else{
                $scope.data = $filter('dateFilter')(data,$scope.data,timestamp);
                console.log(JSON.stringify($scope.data))
                $scope.loading = false;
                $scope.dataAvailable = true;
            }
        }
        
        getData(calcData,url+"?page="+pageNo+"&per_page="+maximum+"&state=open");
    }
    
}])