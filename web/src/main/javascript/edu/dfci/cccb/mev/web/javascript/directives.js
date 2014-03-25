define(
        ['angular', 'jquery', 'd3', 'services'],
        function(angular, jq, d3) {

            return angular
                    .module('myApp.directives', [])
                    .directive('appVersion',
                            ['appVersion', function(version) {
                                return function(scope, elm, attrs) {
                                    elm.text(version);
                                };
                            }])
                    .directive('appName', ['appName', function(name) {
                        return function(scope, elm, attrs) {
                            elm.text(name);
                        };
                    }])
                    .directive(
                            'mainNavigation',
                            [
                                    'mainMenuBarOptions',
                                    function(opts) {
                                        return {
                                            restrict : 'A',
                                            templateUrl : '/container/view/elements/mainNavigation',
                                            link : function(scope) {
                                                scope.menu = opts;
                                            }
                                        };
                                    }])
                    .directive(
                            'heatmapNavigation',
                            [function() {
                                return {
                                    restrict : 'A',
                                    templateUrl : '/container/view/elements/heatmapNavigation'
                                };
                            }])
                    .directive(
                            'heatmapPanels',
                            [
                                    '$routeParams',
                                    function($routeParams) {
                                        return {
                                            restrict : 'A',
                                            templateUrl : '/container/view/elements/heatmapPanels',
                                            link : function(scope, elems, attrs) {
                                                
                                                document.title = "MeV: "
                                                        + $routeParams.datasetName;

                                                

                                                var rightPanel = jq('#rightPanel'), leftPanel = jq('#leftPanel'), centerTab = jq('div#tab'), pageWidth = jq(
                                                        'body')
                                                        .width() - 50, panelCycle = 1;

                                                var isDragging = false;

                                                centerTab
                                                        .mousedown(function(mouse) {
                                                            isDragging = true;
                                                            mouse
                                                                    .preventDefault();
                                                        });

                                                jq(document)
                                                        .mouseup(
                                                                function() {
                                                                    isDragging = false;
                                                                })
                                                        .mousemove(
                                                                function(mouse) {
                                                                    if (isDragging
                                                                            && mouse.pageX < pageWidth
                                                                                    * (9 / 10)
                                                                            && mouse.pageX > 0) {
                                                                        showSidePanel = 1;
                                                                        leftPanel
                                                                                .css(
                                                                                        "width",
                                                                                        mouse.pageX);
                                                                        rightPanel
                                                                                .css(
                                                                                        "width",
                                                                                        pageWidth
                                                                                                - mouse.pageX);
                                                                        
                                                                        jq('span#tab-icon')
                                                                            .attr("class", "glyphicon glyphicon-chevron-left glyphicon-white")
                                                                            
                                                                        leftPanel
                                                                                .children()
                                                                                .show();
                                                                    }

                                                                    if (isDragging
                                                                            && mouse.pageX < pageWidth
                                                                                    * (1 / 7)
                                                                            && mouse.pageX > 0) {
                                                                        leftPanel.children().hide();
                                                                        jq('div#tab').click()
                                                                    }

                                                                });
                                                
                                                var delay = 700, clicks = 0, timer = null;
                                                
                                                jq('div#tab').on("click", function(e){
                                                    clicks++;
                                                    if (clicks === 1){
                                                        timer = setTimeout(function(){
                                                            collapseSidePanel();
                                                            clicks = 0;
                                                        }, delay);
                                                    } else if (clicks === 2) {
                                                        clearTimeout(timer);
                                                        expandSidePanel();
                                                        clicks = 0;
                                                    }
                                                })
                                                .on("dblclick", function(e){
                                                   e.preventDefault(); 
                                                });
                                                
                                                function expandSidePanel() { //Double click to expand
                                                    if (panelCycle == 1) { //Middle value to left expand full
                                                        
                                                        jq('span#tab-icon')
                                                            .attr("class", "glyphicon glyphicon-chevron-left glyphicon-white");
                                                        
                                                        leftPanel
                                                            .css(
                                                                    "width",
                                                                    pageWidth* (9 / 10));
                                                        leftPanel
                                                            .children()
                                                            .show();
                                                        
                                                        rightPanel
                                                            .css(
                                                                    "width",
                                                                    pageWidth *(1- (9 / 10) ) );
                                                        
                                                        panelCycle = 2;
                                                        
                                                    } else if (panelCycle == 0){ //left hidden to middle
                                                        jq('span#tab-icon')
                                                            .attr("class", "glyphicon glyphicon-chevron-left glyphicon-white")
                                                        
                                                        leftPanel
                                                            .css("width", pageWidth* (3 / 10));
                                                        
                                                        leftPanel
                                                            .children()
                                                            .show();
                                                        
                                                        rightPanel.css("width",
                                                                    pageWidth *(1- (3 / 10) ) );
                                                        
                                                        panelCycle = 1;
                                                    }
                                                };

                                                function collapseSidePanel() { //Click to close

                                                    if (panelCycle == 1) { //Middle value to left close
                                                        
                                                        jq('span#tab-icon')
                                                            .attr("class", "glyphicon glyphicon-chevron-right glyphicon-white");
                                                        
                                                        leftPanel
                                                                .css(
                                                                        "width",
                                                                        0);
                                                        leftPanel
                                                                .children()
                                                                .hide();
                                                        rightPanel
                                                                .css(
                                                                        "width",
                                                                        pageWidth - 30);
                                                        panelCycle = 0;
                                                        
                                                        
                                                    } else if (panelCycle == 2) { //Left expanded full to middle
                                                        jq('span#tab-icon')
                                                            .attr("class", "glyphicon glyphicon-chevron-left glyphicon-white")
                                                        leftPanel
                                                            .css("width", pageWidth* (3 / 10));
                                                        
                                                        leftPanel
                                                            .children()
                                                            .show();
                                                        
                                                        rightPanel.css("width",pageWidth *(1- (3 / 10) ) );
                                                        
                                                        panelCycle = 1;
                                                    }

                                                };

                                                scope.showLimmaTables = true;

                                            }
                                        };
                                    }])
                    .directive(
                            'sideNavigationBar',
                            [function() {
                                return {
                                    restrict : 'E',
                                    templateUrl : '/container/view/elements/sideNavigationBar',
                                    link : function(scope) {

                                        scope.clusterAnalysisClickOpen = function(id) {

                                            jq('a#clustersTabLink')
                                                    .trigger("click");

                                            jq(id.href).collapse(
                                                    "show");

                                            jq('div.fixed-height')
                                                    .animate(
                                                            {
                                                                scrollTop : jq(
                                                                        id.dataParent)
                                                                        .offset().top
                                                            }, 200);
                                        }

                                        scope.limmaAnalysisClickOpen = function(id) {

                                            jq('a#limmaTabLink')
                                                    .trigger("click");

                                            jq(id.href).collapse(
                                                    "show");

                                            jq('div.fixed-height')
                                                    .animate(
                                                            {
                                                                scrollTop : jq(
                                                                        id.dataParent)
                                                                        .offset().top
                                                            }, 200);
                                        }
                                    }
                                };
                            }])
                            .directive('limmaAccordionList',[function() {
                                    return {
                                        
                                        restrict : 'E',
                                        templateUrl : '/container/view/elements/limmaAccordionList'
                                        
                                    };

                            }])
                    .directive(
                            'limmaAccordion',
                            ['$filter', '$routeParams', '$http', 'alertService', function($filter, $routeParams, $http, alertService) {
                                return {
                                    restrict : 'E',
                                    templateUrl : '/container/view/elements/limmaAccordion',
                                    link : function(scope) {

                                        var headers = {
                                            'ID' : "id",
                                            'Log-Fold-Change' : "logFoldChange",
                                            'Average Expression' : "averageExpression",
                                            'P-Value' : "pValue",
                                            'Q-Value' : "qValue"
                                        }
                                        
                                        scope.filterParams = {
                                                'id' : '',
                                                'logFoldThreshold' : undefined,
                                                'pValueThreshold' : undefined
                                        }
                                        
                                        scope.selectionParams = {
                                                name: undefined,
                                                color: '#'+Math.floor(Math.random()*16777215).toString(16)
                                        }
                                        
                                        scope.addSelections = function(){
                                            
                                            var userselections = scope.limma.datar.results;
                                            
                                            var step1 = $filter('filter')(scope.limma.datar.results, {
                                                id: scope.filterParams.id
                                            });
                                            
                                            var step2 = $filter('filterThreshold')(step1, scope.filterParams.logFoldThreshold, 'logFoldChange')
                                            var step3= $filter('filterThreshold')(step2, scope.filterParams.pValueThreshold, 'pValue')
                                            var step4 = step3.map(function(d){
                                                return d.id
                                            })
                                            
                                            console.log(scope.selectionParams.color)
                                            
                                            $http({
                                                method:"PUT", 
                                                url:"/dataset/" + $routeParams.datasetName + "/" 
                                                + 'row' 
                                                + "/selection/" + scope.selectionParams.name,
                                                params:{
                                                    format:'json',
                                                    properties : [{
                                                        selectionColor: scope.selectionParams.color, 
                                                        selectionDescription:'first mock selection'
                                                    }],
                                                    keys: step4
                                                }
                                            })
                                            .success(function(response){
                                                    scope.$emit('SeletionAddedEvent', 'row');
                                                    var message = "Added " + scope.selectionParams.name + " as new Selection!";
                                                    var header = "Heatmap Selection Addition";
                                                     
                                                    alertService.success(message,header);
                                            })
                                            .error(function(data, status, headers, config) {
                                                var message = "Couldn't add new selection. If "
                                                    + "problem persists, please contact us.";

                                                 var header = "Selection Addition Problem (Error Code: "
                                                    + status
                                                    + ")";
                                                 
                                                 alertService.error(message,header);
                                            });
                                            
                                        }

                                        var ctr = -1;
                                        scope.limmaTableOrdering = undefined;

                                        scope.reorderLimmaTable = function(header) {

                                            ctr = ctr * (-1);
                                            if (ctr == 1) {
                                                scope.limmaTableOrdering = headers[header];
                                            } else {
                                                scope.limmaTableOrdering = "-"
                                                        + headers[header];
                                            }
                                        }
                                    }

                                };
                            }])
                    .directive(
                            'clusterAccordionList',
                            [function() {
                                return {
                                    restrict : 'E',
                                    templateUrl : '/container/view/elements/clusterAccordion'                                    
                                };
                            }])
                    .directive(
                            'expressionPanel',
                            [
                                    '$routeParams',
                                    function($routeParams) {
                                        return {
                                            restrict : 'AC',
                                            templateUrl : '/container/view/elements/expressionPanel',                                            
                                            link : function(scope) {

                                                scope.buildPreviousAnalysisList();

                                                scope.datasetName = $routeParams.datasetName;

                                            }
                                        };
                                    }])
                    .directive('bsprevanalysis', function() {

                        return {

                            restrict : 'C',
                            scope : {

                                bindid : '@',
                                parentid : '@',
                                header : '@',
                                data : '@'

                            }
                        };

                    })
                    .directive(
                            'bsTable',
                            function() {

                                return {
                                    scope : {
                                        data : "="
                                    },
                                    restrict : 'E',
                                    templateUrl : "/container/view/elements/table"

                                };

                            })
                    .directive(
                            'bsImgbutton',
                            function() {

                                return {
                                    scope : {
                                        icon : "@",
                                        title : "@",
                                        align : "@"
                                    },
                                    restrict : 'E',
                                    template : "<button class='btn btn-success pull-{{align}}' "
                                            + "title='{{title}}'>  "
                                            + "<i class='icon-{{icon}}'></i> Download"
                                            + "</button>"

                                };

                            })
                    .directive(
                            'prevlimma',
                            function() {

                                return {

                                    restrict : 'C',
                                    templateUrl : "/container/view/elements/prevlimmashell"

                                };

                            })
                    .directive(
                            'bsmodal',
                            [
                                    '$compile',
                                    function($compile) {

                                        return {

                                            restrict : 'E',
                                            scope : {

                                                bindid : '@',
                                                header : '@',
                                                test : '@',
                                                func : '&'

                                            },
                                            transclude : true,
                                            templateUrl : "/container/view/elements/modal"

                                        };

                                    }])
                    .directive(
                            'modalHierarchical',
                            [
                                    '$http',
                                    '$routeParams',
                                    'alertService',
                                    function($http, $routeParams, alertService) {

                                        return {
                                            restrict : 'C',
                                            templateUrl : "/container/view/elements/hierarchicalbody",
                                            link : function(scope, elems, attrs) {

                                                scope.availableMetrics = [
                                                        'euclidean',
                                                        'manhattan',
                                                        'pearson'];

                                                scope.availableAlgorithms = [
                                                        'average',
                                                        'complete',
                                                        'single'];

                                                scope.dimensions = [{
                                                    name : 'Rows',
                                                    value : 'row'
                                                }, {
                                                    name : 'Columns',
                                                    value : 'column'
                                                }];

                                                scope.clusterInit = function() {
                                                    var q = {
                                                        name : scope.clusterName,
                                                        dataset : $routeParams.datasetName,
                                                        dimension : scope.selectedDimension,
                                                        metric : scope.selectedMetric,
                                                        algorithm : scope.selectedAlgorithm,

                                                    };
                                                    
                                                    var message = "Started clustering analysis for "
                                                        + q.name;

                                                    var header = "Hierarchical Clustering Analysis";
                                                     
                                                    alertService.info(message,header);

                                                    $http(
                                                            {

                                                                method : 'POST',
                                                                url : 'dataset/'
                                                                        + q.dataset
                                                                        + '/analyze/hcl/'
                                                                        + q.name
                                                                        + '('
                                                                        + q.dimension.value
                                                                        + ','
                                                                        + q.metric
                                                                        + ','
                                                                        + q.algorithm
                                                                        + ')'

                                                            })
                                                            .success(function(data, status, headers, config) {
                                                                            
                                                                            scope.buildPreviousAnalysisList()
                                                                            var message = "Clustering analysis for "
                                                                                + q.name + " complete!";

                                                                            var header = "Hierarchical Clustering Analysis";
                                                                             
                                                                            alertService.success(message,header);
                                                                        
                                                                    })
                                                                    
                                                            .error(function(data, status, headers, config) {
                                                                
                                                                var message = "Could not perform clustering. If "
                                                                    + "problem persists, please contact us.";
                                                                var header = "Clustering Problem (Error Code: "
                                                                    + status
                                                                    + ")";
                                                                alertService.error(message,header);
                                                                
                                                            });

                                                    resetSelections()

                                                };

                                                function resetSelections() {
                                                    scope.clusterName = "";
                                                    scope.selectedDimension = "";
                                                    scope.selectedMetric = "";
                                                    scope.selectedAlgorithm = "";
                                                }

                                            }

                                        };

                                    }])
                    .directive(
                            'modalKmeans',
                            function() {

                                return {
                                    restrict : 'C',
                                    templateUrl : "/container/view/elements/kMeansBody"

                                };

                            })
                    .directive(
                            'modalLimma',
                            [
                                    "$http",
                                    "$routeParams",
                                    "alertService",
                                    function($http, $routeP,alertService) {

                                        return {
                                            restrict : 'C',
                                            templateUrl : "/container/view/elements/limmaBody",
                                            link : function(scope, elems, attrs) {

                                                scope.dimensions = [{
                                                    name : "Column",
                                                    value : "column"
                                                }]; 
                                                
                                                scope.analysisDimension = {
                                                    name : "Column",
                                                    value : "column"
                                                };

                                                scope.limmaInit = function() {
                                                    

                                                    var message = "Started limma analysis for "
                                                        + scope.analysisName;

                                                    var header = "LIMMA Analysis";
                                                     
                                                    alertService.info(message,header);

                                                    $http(
                                                            {
                                                                method : 'POST',
                                                                url : '/dataset/'
                                                                        + $routeP.datasetName
                                                                        + '/analyze/limma/'
                                                                        + scope.analysisName
                                                                        + "(dimension="
                                                                        + "column"
                                                                        + ",experiment="
                                                                        + scope.analysisExperiment.name
                                                                        + ",control="
                                                                        + scope.analysisControl.name
                                                                        + ")"

                                                            })
                                                            .success(
                                                                    function(data, status, headers, config) {
                                                                        
                                                                        var message = "Completed limma analysis for "
                                                                            + scope.analysisName;

                                                                        var header = "LIMMA Analysis Complete";
                                                                         
                                                                        alertService.success(message,header);
                                                                        scope
                                                                                .buildPreviousAnalysisList()
                                                                    })
                                                            .error(function(data, status, headers, config) {
                                                                var message = "Error on limma analysis for "
                                                                    + scope.analysisName;

                                                                var header = "LIMMA Analysis Problem (Error Code: "
                                                                    + status
                                                                    + ")";
                                                                 
                                                                alertService.success(message,header);
                                                            });

                                                    resetSelections();                                                    
                                                    
                                                   

                                                };

                                                function resetSelections() {
                                                    scope.analysisName = "";
                                                    scope.analysisDimension = {
                                                        name : "Column",
                                                        value : "column"
                                                    }; // Column dimension
                                                    // forcing #576
                                                    scope.analysisControl = "";
                                                    scope.analysisExperiment = "";
                                                }

                                            }

                                        };

                                    }])
                    .directive(
                            'uploadsTable',
                            [function() {
                                return {
                                    restrict : 'A',
                                    scope : {
                                        uploads : '='
                                    },
                                    templateUrl : '/container/view/elements/uploadsTable',
                                    link : function(scope, elems, attrs) {

                                        scope.datasets = [];

                                        scope
                                                .$watch(
                                                        "uploads",
                                                        function(newVal, oldVal) {
                                                            if (oldVal != undefined) {
                                                                scope.datasets = newVal
                                                            }
                                                        })

                                    }
                                }
                            }])
                    .directive(
                            'uploadDrag',
                            [ function(){

                                return {
                                    restrict : 'C',
                                    templateUrl : '/container/view/elements/uploadDragAndDrop',
                                    link : function(scope, elems, attrs) {

                                        jq('#upload-button')
                                                .click(
                                                        function() {
                                                            jq(
                                                                    '#upload-input')
                                                                    .click();
                                                        });

                                        jq('#upload-input')
                                                .on(
                                                        "change",
                                                        function() {

                                                            var input = document
                                                                    .getElementById('upload-input'), files = new Array();

                                                            for ( var i = 0; i < input.files.length; i++) {
                                                                files
                                                                        .push(input.files[i]);

                                                                if (files.length == input.files.length) {
                                                                    files
                                                                            .map(function(file) {

                                                                                var formdata = new FormData;
                                                                                formdata
                                                                                        .append(
                                                                                                'upload',
                                                                                                file);
                                                                                formdata
                                                                                        .append(
                                                                                                'name',
                                                                                                file.name);
                                                                                var xhr = new XMLHttpRequest();

                                                                                xhr.upload
                                                                                        .addEventListener(
                                                                                                "progress",
                                                                                                function(e) {
                                                                                                    return;
                                                                                                });

                                                                                xhr.onreadystatechange = function() {
                                                                                    if (xhr.readyState == 4
                                                                                            && xhr.status == 200) {

                                                                                        scope
                                                                                                .loadUploads();

                                                                                    };
                                                                                };

                                                                                xhr
                                                                                        .open(
                                                                                                "POST",
                                                                                                "/dataset",
                                                                                                true);
                                                                                xhr
                                                                                        .send(formdata);
                                                                            });
                                                                };
                                                            };

                                                        });

                                    }
                                };

                            }])
                    .directive(
                            'datasetSummary',
                            function() {
                                return {
                                    restrict : 'A',
                                    scope : {
                                        datasetobj : "&"
                                    },
                                    templateUrl : '/container/view/elements/datasetSummary',
                                };

                            })
                    .directive(
                            'd3RadialTree',
                            [function() {

                                return {
                                    restrict : 'A',
                                    scope : {
                                        data : '=',
                                        diameter : '@'

                                    },
                                    templateUrl : '/container/view/elements/d3RadialTree',
                                    link : function(scope, elems, attr) {

                                        function noder(d) {

                                            var a = [];

                                            if (!d.children) {
                                                a.push(d);
                                            } else {
                                                d.children
                                                        .forEach(function(child) {
                                                            noder(
                                                                    child)
                                                                    .forEach(
                                                                            function(j) {
                                                                                a
                                                                                        .push(j)
                                                                            });
                                                        });
                                            };

                                            return a;
                                        };

                                        var padding = 20;
                                        var dendogram = {
                                            height : 200 + padding,
                                            width : pageWidth = jq(
                                                    'body').width()
                                                    * (2 / 5) // Nicely define
                                        // width
                                        };

                                        d3
                                                .select(elems[0])
                                                .append("svg")
                                                .attr(
                                                        {
                                                            width : dendogram.width,
                                                            height : (dendogram.height + (padding))
                                                        });

                                        var svg = d3.select(elems[0])
                                                .select("svg")

                                        var Cluster = d3.layout
                                                .cluster()
                                                .sort(null)
                                                .separation(
                                                        function(a, b) {
                                                            return a.parent == b.parent
                                                                    ? 1
                                                                    : 1
                                                        })
                                                .value(
                                                        function(d) {
                                                            return d.distance;
                                                        })
                                                .children(
                                                        function(d) {
                                                            return d.children;
                                                        });

                                        var labelsGutter = 50;
                                        svg.append("g").attr('class',
                                                'smallDendogram');

                                        var dendogramWindow = d3
                                                .select(elems[0])
                                                .select("svg")
                                                .select(
                                                        "g.smallDendogram")

                                        var xPos = d3.scale
                                                .linear()
                                                .domain([0, 1])
                                                .range(
                                                        [
                                                                padding,
                                                                dendogram.width
                                                                        - padding])
                                        var yPos = d3.scale
                                                .linear()
                                                .domain([0, 1])
                                                .range(
                                                        [
                                                                padding,
                                                                dendogram.height
                                                                        - padding
                                                                        - labelsGutter])

                                        function Path(d) {
                                            // Path function builder for TOP
                                            // heatmap tree path attribute

                                            return "M"
                                                    + (xPos(d.target.x))
                                                    + ","
                                                    + (yPos(d.target.y))
                                                    + "V"
                                                    + (yPos(d.source.y))
                                                    + "H"
                                                    + (xPos(d.source.x));

                                        };

                                        function drawAnalysisTree(canvas, cluster, tree, type) {

                                            canvas.selectAll('*')
                                                    .remove();
                                            var nodes = cluster
                                                    .nodes(tree);
                                            var links = cluster
                                                    .links(nodes);

                                            var labels = noder(tree);

                                            if (labels.length <= 50) {
                                                canvas
                                                        .selectAll(
                                                                "text")
                                                        .data(labels)
                                                        .enter()
                                                        .append(
                                                                "text")

                                                        .attr(
                                                                "transform",
                                                                function(d) {
                                                                    return "translate("
                                                                            + xPos(d.x)
                                                                            + ","
                                                                            + yPos(d.y)
                                                                            + ")rotate(90)"
                                                                })
                                                        .attr(
                                                                "text-anchor",
                                                                "start")
                                                        .attr("dx", 5)
                                                        .attr("dy", 3)
                                                        .text(
                                                                function(d) {
                                                                    return d.name
                                                                })

                                            }

                                            canvas
                                                    .selectAll("path")
                                                    .data(links)
                                                    .enter()
                                                    .append("path")
                                                    .attr(
                                                            "d",
                                                            function(d) {
                                                                return Path(d)
                                                            })
                                                    .attr(
                                                            "stroke",
                                                            function() {
                                                                return "grey"
                                                            }).attr(
                                                            "fill",
                                                            "none");

                                            canvas
                                                    .selectAll(
                                                            "circle")
                                                    .data(nodes)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("r", 2.5)
                                                    .attr(
                                                            "cx",
                                                            function(d) {
                                                                return xPos(d.x);
                                                            })
                                                    .attr(
                                                            "cy",
                                                            function(d) {
                                                                return yPos(d.y);
                                                            })
                                                    .attr(
                                                            "fill",
                                                            function(d) {
                                                                return "red"
                                                            })
                                                    .on(
                                                            "click",
                                                            function(d) {
                                                                //
                                                            });

                                        };
                                        scope
                                                .$watch(
                                                        'data',
                                                        function(newval, oldval) {
                                                            if (newval) {
                                                                drawAnalysisTree(
                                                                        dendogramWindow,
                                                                        Cluster,
                                                                        newval.root,
                                                                        "horizontal");
                                                            }
                                                        });

                                    } // end link
                                };

                            }])
                    .directive(
                            'bsTable',
                            function() {

                                return {
                                    scope : {
                                        data : "="
                                    },
                                    restrict : 'E',
                                    templateUrl : "/container/view/elements/table.html"

                                };

                            })
                    .directive(
                            'visHeatmap',
                            ["$routeParams","$http", "alertService", function($routeParams, $http, alertService) {

                                return {

                                    restrict : 'E',
                                    templateUrl : "/container/view/elements/visHeatmap",
                                    link : function(scope, elems, attr) {

                                        var svgWidth = Math
                                                .floor(jq(
                                                        '#rightPanel')
                                                        .css('width')
                                                        .slice(0, -2) * .9);
                                                        

                                        var heatmapMarginLeft = Math
                                                .floor(svgWidth * .15), heatmapMarginRight = Math
                                                .floor(svgWidth * .15), heatmapMarginTop = 200, heatmapMarginBottom = 100, heatmapColumnSelectionsGutter = 0, heatmapRowSelectionsGutter = 0;

                                        var heatmapCellsWidth = svgWidth
                                                - heatmapMarginLeft
                                                - heatmapMarginRight;
                                        
                                        var legendPosition = {
                                                margin:{
                                                    left: 5,
                                                    top:10
                                                },
                                                width:heatmapMarginLeft*.80,
                                                height: heatmapMarginTop*.80
                                              };

                                        var heatmapCellsHeight = undefined;
                                        var heatmapCellHeight = undefined;

                                        var window = d3
                                                .select("vis-heatmap");

                                        // Color Scales
                                        var leftshifter = d3.scale
                                                .linear().rangeRound(
                                                        [255, 0]);
                                        var rightshifter = d3.scale
                                                .linear().rangeRound(
                                                        [0, 255]);

                                        // X Scales
                                        var XLabel2Index = d3.scale
                                                .ordinal();
                                        var XIndex2Label = d3.scale
                                                .ordinal();
                                        var XIndex2Pixel = d3.scale
                                                .linear();

                                        // YScales
                                        var YLabel2Index = d3.scale
                                                .ordinal();
                                        var YIndex2Label = d3.scale
                                                .ordinal();
                                        var YIndex2Pixel = d3.scale
                                                .linear();

                                        // Selections Scales
                                        var colSelectionsX = d3.scale
                                                .ordinal();
                                        var colSelectionsY = d3.scale
                                                .ordinal();
                                        var rowSelectionsX = d3.scale
                                                .ordinal();
                                        var rowSelectionsY = d3.scale
                                                .ordinal();

                                        // Axis Scales
                                        var xAxisd3 = d3.svg.axis();
                                        var yAxisd3 = d3.svg.axis();

                                        // Tree Scales

                                        var verticalTreeX = d3.scale
                                                .linear().domain(
                                                        [0, 1]);

                                        var verticalTreeY = d3.scale
                                                .linear().domain(
                                                        [0, 1]);

                                        var horizontalTreeX = d3.scale
                                                .linear().domain(
                                                        [0, 100]);

                                        var horizontalTreeY = d3.scale
                                                .linear().domain(
                                                        [0, 100]);

                                        window.append("svg").attr(
                                                "class", "chart")
                                                .attr("width",
                                                        svgWidth);
                                        var svg = d3
                                                .select("svg.chart")

                                        var vis = svg;

                                        vis.append("g").attr("class",
                                                "cells")
                                        var rects = d3
                                                .select("g.cells");

                                        vis.append("g").attr("class",
                                                "selections")
                                        var selections = d3.select(
                                                "g.selections");

                                        selections.append("g").attr(
                                                "class",
                                                "colSelections")
                                        var columnSelections = d3
                                                .select("g.colSelections");

                                        selections.append("g").attr(
                                                "class",
                                                "rowSelections");
                                        var rowSelections = d3
                                                .select("g.rowSelections");

                                        vis.append("g").attr("class",
                                                "xlabels");
                                        var xlabels = d3
                                                .select("g.xlabels");

                                        vis.append("g").attr("class",
                                                "ylabels")
                                        var ylabels = d3
                                                .select("g.ylabels");
                                        
                                        vis.append("g").attr("class", "legend");
                                        var legend = d3.select('g.legend');
                                        

                                        function drawSelections(columnData, rowData) {

                                            // definitions
                                            var columnCells = [], rowCells = [];
                                            // Data building
                                            columnData.selections
                                                    .forEach(function(selection) {
                                                        selection.keys
                                                                .forEach(function(key) {

                                                                    columnCells
                                                                            .push({
                                                                                row : selection.name,
                                                                                col : key,
                                                                                color : selection.properties.selectionColor
                                                                            });
                                                                });
                                                    });

                                            rowData.selections
                                                    .forEach(function(selection) {
                                                        selection.keys
                                                                .forEach(function(key) {

                                                                    rowCells
                                                                            .push({
                                                                                col : selection.name,
                                                                                row : key,
                                                                                color : selection.properties.selectionColor
                                                                            });
                                                                });
                                                    });

                                            // Clearing canvas
                                            columnSelections.selectAll("rect").remove();
                                            rowSelections.selectAll("rect").remove();

                                            // Canvas adding

                                            columnSelections.selectAll("rect")
                                                    .data(columnCells)
                                                    .enter()
                                                    .append("rect")
                                                    .attr(
                                                            {
                                                                "class" : "columnSelection",
                                                                "height" : function(d) {

                                                                    return colSelectionsY
                                                                            .rangeBand();
                                                                },
                                                                "width" : function(d) {
                                                                    return colSelectionsX
                                                                            .rangeBand();
                                                                },
                                                                "x" : function(d, i) {
                                                                    return colSelectionsX(d.col);
                                                                },
                                                                "y" : function(d, i) {
                                                                    return colSelectionsY(d.row);
                                                                },
                                                                "fill" : function(d) {
                                                                    return d.color;
                                                                }
                                                            });

                                            rowSelections.selectAll("rect")
                                                    .data(rowCells)
                                                    .enter()
                                                    .append("rect")
                                                    .attr(
                                                            {
                                                                "class" : "rowSelection",
                                                                "height" : function(d) {

                                                                    return rowSelectionsY
                                                                            .rangeBand();
                                                                },
                                                                "width" : function(d) {
                                                                    return rowSelectionsX
                                                                            .rangeBand();
                                                                },
                                                                "x" : function(d, i) {
                                                                    return rowSelectionsX(d.col);
                                                                },
                                                                "y" : function(d, i) {
                                                                    return rowSelectionsY(d.row);
                                                                },
                                                                "fill" : function(d) {
                                                                    return d.color;
                                                                }
                                                            });

                                        };

                                        function drawLabels(xAxis, yAxis) {

                                            var xband = (XIndex2Pixel(1) - XIndex2Pixel(0)) / 2;

                                            xlabels.selectAll("text")
                                                    .remove();

                                            if (XLabel2Index.domain().length <= 50) {

                                                xlabels
                                                        .selectAll(
                                                                "text")
                                                        .data(
                                                                XLabel2Index
                                                                        .domain())
                                                        .enter()
                                                        .append(
                                                                "text")
                                                        .attr(
                                                                'dx',
                                                                -heatmapMarginTop)
                                                        .attr(
                                                                'y',
                                                                function(d) {
                                                                    return XIndex2Pixel(XLabel2Index(d))
                                                                            + xband
                                                                            + 7;
                                                                })
                                                        // .style("text-anchor",
                                                        // "start")
                                                        .attr(
                                                                "transform",
                                                                "rotate(-90)")
                                                        .text(
                                                                function(d) {
                                                                    return d
                                                                            .substr(
                                                                                    0,
                                                                                    8)
                                                                })
                                                        .style(
                                                                "font-size",
                                                                "14px")
                                                        .append("title")
                                                        .text(function(d) {
                                                                return d
                                                            })

                                            }

                                            yAxis
                                                    .attr(
                                                            "transform",
                                                            "translate("
                                                                    + (heatmapMarginLeft
                                                                            + heatmapCellsWidth + heatmapRowSelectionsGutter)
                                                                    + ")")
                                                    .call(yAxisd3)
                                                    .selectAll("text")
                                                    .style(
                                                            "text-anchor",
                                                            "start")
                                                    .attr(
                                                            "dy",
                                                            ((YIndex2Pixel(1) - YIndex2Pixel(0)) / 2)
                                                                    + "px");

                                        };

                                        function drawCells(hc) {

                                            hc
                                                    .attr(
                                                            {
                                                                "class" : "cell",
                                                                "height" : function(d) {

                                                                    return YIndex2Pixel(1)
                                                                            - YIndex2Pixel(0)-1;
                                                                },
                                                                "width" : function(d) {
                                                                    return XIndex2Pixel(1)
                                                                            - XIndex2Pixel(0)-1;
                                                                },
                                                                "x" : function(d, i) {
                                                                    return XIndex2Pixel(XLabel2Index(d.column));
                                                                },
                                                                "y" : function(d, i) {
                                                                    return YIndex2Pixel(YLabel2Index(d.row));
                                                                },
                                                                "fill" : function(d) {
                                                                    return cellColor(d.value);
                                                                },
                                                                "value" : function(d) {
                                                                    return d.value;
                                                                },
                                                                "index" : function(d, i) {
                                                                    return i;
                                                                },
                                                                "row" : function(d, i) {
                                                                    return d.row;
                                                                },
                                                                "column" : function(d, i) {
                                                                    return d.column;
                                                                },
                                                            })
                                                    .append("title")
                                                    .text(
                                                            function(d) {
                                                                return "Value: "
                                                                        + d.value
                                                                        + "\nRow: "
                                                                        + d.row
                                                                        + "\nColumn: "
                                                                        + d.column
                                                            });

                                        };

                                        function redrawCells() {

                                            svg
                                                    .selectAll(
                                                            '.cell')
                                                    .transition()
                                                    .delay(200)
                                                    .duration(2000)
                                                    .attr(
                                                            {
                                                                "x" : function(d, i) {
                                                                    return XIndex2Pixel(XLabel2Index(d.column));
                                                                },
                                                                "y" : function(d, i) {
                                                                    return YIndex2Pixel(YLabel2Index(d.row));
                                                                },
                                                                "fill" : function(d, i) {
                                                                    return cellColor(d.value)
                                                                }
                                                            });

                                        };

                                        function scaleUpdates(cols, rows, min, max, avg) {

                                            var fixedHeight = true;

                                            if (fixedHeight) {
                                                heatmapCellsWidth = cols.keys.length * 15;
                                                svg
                                                        .attr(
                                                                "width",
                                                                heatmapMarginLeft
                                                                        + heatmapCellsWidth
                                                                        + heatmapRowSelectionsGutter
                                                                        + 120)
                                            }

                                            heatmapCellHeight = 15;

                                            heatmapCellsHeight = heatmapCellHeight
                                                    * rows.keys.length;
                                            dendogramLeft.height = heatmapCellsHeight;

                                            svg
                                                    .attr(
                                                            "height",
                                                            heatmapCellsHeight
                                                                    + heatmapMarginTop
                                                                    + heatmapMarginBottom);

                                            leftshifter.domain([min,
                                                    avg]); // Color Update

                                            rightshifter.domain([avg,
                                                    max]) // Color Update

                                            // Selection Scales update

                                            if (cols.selections.length > 0) {

                                                heatmapColumnSelectionsGutter = 50;

                                                colSelectionsX
                                                        .domain(
                                                                cols.keys)
                                                        .rangeBands(
                                                                [
                                                                        heatmapMarginLeft,
                                                                        heatmapMarginLeft
                                                                                + heatmapCellsWidth]);

                                                colSelectionsY
                                                        .domain(
                                                                cols.selections
                                                                        .map(function(d) {
                                                                            return d.name
                                                                        }))
                                                        .rangeBands(
                                                                [
                                                                        heatmapMarginTop,
                                                                        heatmapMarginTop
                                                                                + heatmapColumnSelectionsGutter]);
                                            };

                                            if (rows.selections.length > 0) {

                                                heatmapRowSelectionsGutter = .25 * heatmapMarginRight;

                                                rowSelectionsX
                                                        .domain(
                                                                rows.selections
                                                                        .map(function(d, i) {
                                                                            return d.name
                                                                        }))
                                                        .rangeBands(
                                                                [
                                                                        heatmapMarginLeft
                                                                                + heatmapCellsWidth,
                                                                        heatmapMarginLeft
                                                                                + heatmapCellsWidth
                                                                                + heatmapRowSelectionsGutter]);

                                                rowSelectionsY
                                                        .domain(
                                                                rows.keys)
                                                        .rangeBands(
                                                                [
                                                                        heatmapMarginTop + heatmapColumnSelectionsGutter,
                                                                        heatmapMarginTop + heatmapColumnSelectionsGutter
                                                                                + heatmapCellsHeight]);
                                            };

                                            XLabel2Index
                                                    .domain(cols.keys)
                                                    .range(
                                                            cols.keys
                                                                    .map(function(d, i) {
                                                                        return i
                                                                    }));

                                            YLabel2Index
                                                    .domain(rows.keys)
                                                    .range(
                                                            rows.keys
                                                                    .map(function(d, i) {
                                                                        return i
                                                                    }));

                                            XIndex2Label
                                                    .domain(
                                                            cols.keys
                                                                    .map(function(d, i) {
                                                                        return i
                                                                    }))
                                                    .range(
                                                            cols.keys
                                                                    .map(function(d, i) {
                                                                        return d
                                                                    }));

                                            YIndex2Label
                                                    .domain(
                                                            rows.keys
                                                                    .map(function(d, i) {
                                                                        return i
                                                                    }))
                                                    .range(
                                                            rows.keys
                                                                    .map(function(d, i) {
                                                                        return d
                                                                    }));

                                            XIndex2Pixel
                                                    .domain(
                                                            [
                                                                    0,
                                                                    cols.keys.length])
                                                    .range(
                                                            [
                                                                    heatmapMarginLeft,
                                                                    heatmapMarginLeft
                                                                            + heatmapCellsWidth]);

                                            YIndex2Pixel
                                                    .domain(
                                                            [
                                                                    0,
                                                                    rows.keys.length])
                                                    .range(
                                                            [
                                                                    heatmapMarginTop
                                                                            + heatmapColumnSelectionsGutter,
                                                                    heatmapMarginTop
                                                                            + heatmapColumnSelectionsGutter
                                                                            + heatmapCellsHeight]);

                                            xAxisd3
                                                    .scale(
                                                            XIndex2Pixel)
                                                    .orient("top")
                                                    .ticks(
                                                            cols.keys.length)
                                                    .tickFormat(
                                                            function(d) {
                                                                if (d % 1 == 0
                                                                        && d >= 0
                                                                        && d < cols.keys.length) {
                                                                    return XIndex2Label(d);

                                                                }
                                                            });

                                            yAxisd3
                                                    .scale(
                                                            YIndex2Pixel)
                                                    .orient("right")
                                                    .ticks(
                                                            rows.keys.length)
                                                    .tickFormat(
                                                            function(d) {
                                                                if (d % 1 == 0
                                                                        && d >= 0
                                                                        && d < rows.keys.length) {
                                                                    return YIndex2Label(
                                                                            d)
                                                                            .substr(
                                                                                    0,
                                                                                    15);
                                                                }
                                                            });

                                            verticalTreeX
                                                    .range([4,
                                                            heatmapMarginLeft]);

                                            verticalTreeY
                                                    .range([
                                                            heatmapMarginTop
                                                                    + heatmapColumnSelectionsGutter,
                                                            heatmapCellsHeight
                                                                    + heatmapMarginTop
                                                                    + heatmapColumnSelectionsGutter]);

                                            horizontalTreeX
                                                    .range([
                                                            heatmapMarginLeft,
                                                            heatmapCellsWidth
                                                                    + heatmapMarginLeft]);

                                            horizontalTreeY
                                                    .range([
                                                            4,
                                                            (2 * heatmapMarginTop) / 3]);

                                        };

                                        function drawHeatmap(data) {

                                            scope.theData = data;

                                            var chunks = [];

                                            scaleUpdates(data.column,
                                                    data.row,
                                                    data.min,
                                                    data.max,
                                                    data.avg);

                                            function chunker(ar, chunksize) {
                                                var R = [];
                                                if (chunksize <= 0
                                                        || !chunksize) {
                                                    return [ar]
                                                }
                                                for ( var j = 0; j < ar.length; j++) {
                                                    var start = j
                                                            * chunksize;
                                                    var end = chunksize
                                                            * (j + 1)
                                                    R.push(ar.slice(
                                                            start,
                                                            end))
                                                }
                                                return R;
                                            }

                                            var chunks = chunker(
                                                    data.values, 1000);
                                            var poolPosition = 0;
                                            var stream;

                                            function dCells() {
                                                drawCells(d3
                                                        .select(
                                                                "g.cells")
                                                        .selectAll(
                                                                "rect")
                                                        .data(
                                                                chunks[poolPosition],
                                                                function(d) {
                                                                    return [
                                                                            d.column,
                                                                            d.row]
                                                                })
                                                        .enter()
                                                        .append(
                                                                "rect"))
                                                poolPosition += 1
                                                if (poolPosition >= chunks.length) {
                                                    clearInterval(stream)
                                                }
                                            };

                                            var stream = setInterval(
                                                    dCells, 500)

                                            drawSelections(
                                                    data.column,
                                                    data.row)

                                            drawLabels(xlabels,
                                                    ylabels);
                                            
                                            drawColorScale(data.min,
                                                    data.max,
                                                    data.avg);

                                        };
                                        
                                        function drawColorScale(min, max){
                                            var arr = d3.range(101)
                                            
                                            var scale = d3.scale.linear().domain([0, arr.length]).range([max, min])
                                            
                                            var yPosition = d3.scale.linear().domain([0, arr.length])
                                                .range([40 + legendPosition.margin.top, 
                                                        (legendPosition.margin.top + legendPosition.height) - 40 ])
                                            
                                            var colorScaleCellSpacing = yPosition(1) - yPosition(0);
                                            
                                            d3.select("g.colorScale").selectAll('rect').remove()
                                            
                                            d3.select("g.colorScale").selectAll('rect').data(arr).enter()
                                                .append('rect')
                                                .attr({
                                                    y: function(d, i){
                                                        return yPosition(i);
                                                    },
                                                    x: legendPosition.margin.left + (legendPosition.width*.1),
                                                    width: legendPosition.width*.4,
                                                    height: colorScaleCellSpacing,
                                                    fill: function(d, i){
                                                        return cellColor(scale(i))
                                                    }
                                                })
                                                
                                            d3.select("g.colorScale").selectAll("line").data(arr).enter()
                                                .append("line")
                                                .attr({
                                                    "class": "colorScaleAxis", 
                                                    x1:legendPosition.margin.left + (legendPosition.width*.1)//start of rects
                                                        + legendPosition.width*.4 //widths of rects
                                                        + 6, //spacing
                                                    x2: legendPosition.margin.left + (legendPosition.width*.1)//start of rects
                                                        + legendPosition.width*.4 //widths of rects
                                                        + 13, //spacing
                                                    y1:function(d, i){
                                                        return yPosition(i) + (colorScaleCellSpacing/2) ;
                                                    },
                                                    y2:function(d, i){
                                                        return yPosition(i) + (colorScaleCellSpacing/2);
                                                    },
                                                    stroke: function(d, i){ 
                                                        return (i%25 == 0)? "black":"none";
                                                    },
                                                    "stroke-width": 1
                                                });
                                            
                                            d3.select("g.colorScale").selectAll("text").data(arr).enter()
                                                .append("text")
                                                .attr({
                                                    x: legendPosition.margin.left + (legendPosition.width*.1)//start of rects
                                                    + legendPosition.width*.4 //widths of rects
                                                    + 16, //spacing
                                                    y:function(d, i){
                                                        return yPosition(i) + (colorScaleCellSpacing/2) + 3 ;
                                                    },
                                                    'style':'font-size:8'
                                                })
                                                .text(function(d, i){
                                                    var returnstring = String(scale(i)).split(".")[0]
                                                    if (returnstring.length > 1){
                                                        returnstring = returnstring + "." + String(scale(i)).split(".")[1][3]
                                                    }
                                                    return (i%50 == 0)? returnstring:""
                                                }).append("title")
                                                    .text(function(d, i){
                                                        return scale(i);
                                                    })
                                        };

                                        function updateDrawHeatmap(data) {

                                            scaleUpdates(data.column,
                                                    data.row,
                                                    data.min,
                                                    data.max,
                                                    data.avg);

                                            redrawCells(heatmapcells);

                                            drawLabels(xlabels,
                                                    ylabels);

                                            drawSelections(
                                                    data.column,
                                                    data.row);
                                            

                                        };

                                        var heatmapcells = undefined;

                                        scope
                                                .$watch(
                                                        'heatmapData',
                                                        function(newval, oldval) {

                                                            if (newval
                                                                    && !oldval) {

                                                                $(
                                                                        '#loading')
                                                                        .modal(
                                                                                'hide');

                                                                if (newval.column.root) {
                                                                    scope.heatmapTopTree = newval.column.root;
                                                                }

                                                                if (newval.row.root) {
                                                                    scope.heatmapLeftTree = newval.row.root;
                                                                }

                                                                drawHeatmap(newval);

                                                            } else
                                                                if (newval
                                                                        && oldval) {

                                                                    updateDrawHeatmap(newval);

                                                                }

                                                        });
                                        
                                        scope.$watch('heatmapData.column.keys', function(newval, oldval){
                                            if (newval
                                                    && oldval){
                                                updateDrawHeatmap(scope.heatmapData);
                                            }
                                        });
                                        
                                        scope.$watch('heatmapData.row.keys', function(newval, oldval){
                                            if (newval
                                                    && oldval){
                                                updateDrawHeatmap(scope.heatmapData);
                                            }
                                        });

                                        // Dendogram Stuff

                                        var Cluster = d3.layout
                                                .cluster()
                                                .sort(null)
                                                .separation(
                                                        function(a, b) {
                                                            return a.parent == b.parent
                                                                    ? 1
                                                                    : 1
                                                        })
                                                .value(
                                                        function(d) {
                                                            return d.distance;
                                                        })
                                                .children(
                                                        function(d) {
                                                            return d.children;
                                                        });

                                        var dendogramLeft = {
                                            height : heatmapCellsHeight,
                                            width : heatmapMarginLeft
                                        };

                                        var dendogramTop = {
                                            height : (2 * heatmapMarginTop) / 3,
                                            width : heatmapCellsWidth
                                        };

                                        var verticalTreeX = d3.scale
                                                .linear()
                                                .domain([0, 1])
                                                .range(
                                                        [4,
                                                                heatmapMarginLeft]);

                                        var verticalTreeY = d3.scale
                                                .linear()
                                                .domain([0, 1])
                                                .range(
                                                        [
                                                                heatmapMarginTop
                                                                        + heatmapColumnSelectionsGutter,
                                                                heatmapCellsHeight
                                                                        + heatmapMarginTop
                                                                        + heatmapColumnSelectionsGutter]);

                                        var horizontalTreeX = d3.scale
                                                .linear()
                                                .domain([0, 1])
                                                .range(
                                                        [
                                                                heatmapMarginLeft,
                                                                heatmapCellsWidth
                                                                        + heatmapMarginLeft]);

                                        var horizontalTreeY = d3.scale
                                                .linear()
                                                .domain([0, 1])
                                                .range(
                                                        [
                                                                4,
                                                                (2 * heatmapMarginTop) / 3]);

                                        svg
                                                .append("g")
                                                .attr('class',
                                                        'leftDendogram');

                                        var dendogramLeftWindow = d3.select("g.leftDendogram")
                                        svg
                                                .append("g")
                                                .attr('class',
                                                        'topDendogram');
                                        var dendogramTopWindow = d3.select("g.topDendogram")
                                        
                                        legend
                                            .append('rect')
                                            .attr({
                                                "x": legendPosition.margin.left,
                                                "y": legendPosition.margin.top,
                                                "width": legendPosition.width,
                                                "height": legendPosition.height,
                                                "rx":10,
                                                "ry":10,
                                                "class": "legendBorder",
                                                "style":"stroke-width:1;stroke:grey;fill:none"
                                            });
                                        
                                        legend.append("text")
                                        .attr({
                                            'id': "legendTitle",
                                            'text-anchor':'middle',
                                            'x': ((legendPosition.height)/2 ) + legendPosition.margin.left - 14,
                                            'y': 20 + legendPosition.margin.top,
                                            'style':'font-size:20'
                                            
                                        })
                                        .text("Legend");
                                        
                                        legend.append("text")
                                            .attr({
                                                'id': "columnSelectionAdd",
                                                'x': 20,
                                                'y': ((legendPosition.margin.top)+legendPosition.height)-22,
                                                'data-toggle': 'modal',
                                                'role': 'button',
                                                'data-target': "#columnSelectionsModal",
                                                'style':'font-size:10'
                                            })
                                            .text("Add Column Selections");
                                        
                                        legend.append("text")
                                            .attr({
                                                'id': "rowSelectionAdd",
                                                'x': 20,
                                                'y': ((legendPosition.margin.top)+legendPosition.height)-10,
                                                'data-toggle': 'modal',
                                                'role': 'button',
                                                'data-target': "#rowSelectionsModal",
                                                'style':'font-size:10'
                                            })
                                            .text("Add Row Selections");
                                        
                                        legend.append("g").attr("class", "colorScale");
                                        var colorScale = d3.select("g.colorScale");
                                        
                                        scope.treeSelections = {
                                                horizontal:[],
                                                vertical:[]
                                        };
                                        
                                        //Add Tree Selection Function
                                        scope.addTreeSelection = function(type, orientation, name){
                                            
                                            var params = {
                                                    'dimension':{'type':type, 'value':orientation},
                                                    'name':name,
                                                    'color':'#ff0000'
                                            }
                                            
                                            if (scope.treeSelections[params.dimension.value].length > 0){
                                                
                                                $http({
                                                    method:"POST", 
                                                    url:"/dataset/" + $routeParams.datasetName + "/" 
                                                    + params.dimension.type 
                                                    + "/selection/",
                                                    data:{
                                                    	name: params.name,
                                                    	properties: {
                                                    		selectionDescription: 'first mock selection',
                                                    		selectionColor: params.color,                     
                                                    	},
                                                        keys: scope.treeSelections[params.dimension.value]
                                                    }
                                                })
                                                .success(function(response){
                                                        scope.$emit('SeletionAddedEvent', params.dimension.type);
                                                        var message = "Added New Selection!";
                                                        var header = "Heatmap Selection Addition";
                                                         
                                                        alertService.success(message,header);
                                                })
                                                .error(function(data, status, headers, config) {
                                                    var message = "Couldn't add new selection. If "
                                                        + "problem persists, please contact us.";

                                                     var header = "Heatmap Download Problem (Error Code: "
                                                        + status
                                                        + ")";
                                                     
                                                     alertService.error(message,header);
                                                });
                                                
                                            }
                                        };
                                        
                                        scope.$watch('heatmapData.column.selections', function(newval, oldval){
                                            
                                            if(newval
                                                    && oldval){
                                                updateDrawHeatmap(scope.heatmapData)
                                            }
                                            
                                        })
                                        
                                        scope.$watch('heatmapData.row.selections', function(newval, oldval){
                                            if(newval
                                                    && oldval){
                                                updateDrawHeatmap(scope.heatmapData)
                                            }
                                            
                                        })
                                        

                                        // Left Dendogram Builder
                                        scope
                                                .$watch(
                                                        'heatmapTopTree',
                                                        function(newval, oldval) {

                                                            if (newval) {

                                                                var tree = newval;
                                                                drawTree(
                                                                        dendogramTopWindow,
                                                                        Cluster,
                                                                        tree,
                                                                        'horizontal')
                                                                    
                                                            }

                                                        });

                                        scope
                                                .$watch(
                                                        'heatmapLeftTree',
                                                        function(newval, oldval) {

                                                            if (newval) {

                                                                var tree = newval;
                                                                drawTree(
                                                                        dendogramLeftWindow,
                                                                        Cluster,
                                                                        tree,
                                                                        'vertical');
                                                            }

                                                        });

                                        scope
                                                .$watch(
                                                        'selectedColor',
                                                        function(newval, oldval) {

                                                            if (newval && oldval && scope.heatmapData) {

                                                                redrawCells(heatmapcells);
                                                                drawColorScale(scope.heatmapData.min, scope.heatmapData.max)

                                                            }

                                                        });
                                        


                                        function drawTree(canvas, cluster, tree, type) {

                                            canvas.selectAll('*')
                                                    .remove();
                                            
                                            var nodes = cluster
                                                    .nodes(tree);
                                            var links = cluster
                                                    .links(nodes);

                                            canvas
                                                    .selectAll("path")
                                                    .data(links)
                                                    .enter()
                                                    .append("path")
                                                    .attr(
                                                            "d",
                                                            function(d) {
                                                                return (type == 'horizontal')
                                                                        ? horizontalPath(d)
                                                                        : verticalPath(d)
                                                            })
                                                    .attr(
                                                            "stroke",
                                                            function() {
                                                                return (type == 'horizontal')
                                                                        ? "blue"
                                                                        : "red"
                                                            }).attr(
                                                            "fill",
                                                            "none");

                                            canvas
                                                    .selectAll(
                                                            "circle")
                                                    .data(nodes)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("r", 4)
                                                    .attr(
                                                            "cx",
                                                            function(d) {

                                                                return (type == 'horizontal')
                                                                        ? horizontalTreeX(d.x)
                                                                        : verticalTreeX(d.y);

                                                            })
                                                    .attr(
                                                            "cy",
                                                            function(d) {
                                                                return (type == 'horizontal')
                                                                        ? horizontalTreeY(d.y)
                                                                        : verticalTreeY(d.x);
                                                            })
                                                    .attr(
                                                            "fill",
                                                            function(d) {
                                                                return (type == 'horizontal')
                                                                        ? "blue"
                                                                        : "red"
                                                            })
                                                    .on(
                                                            "click",
                                                            function(d) {
                                                                nodeclick(d, canvas, type)
                                                            })
                                                    .on('mouseover', function(){
                                                        //console.log(this)
                                                    });

                                        };
                                        
                                        
                                        
                                        var walk = function(d, nColor, pColor,  canvas, type){

                                            d.children.forEach(function(dc){ //Loop through each child, recursively calling walk() as necessary.

                                                canvas.selectAll('circle')
                                                    .filter(function(db){
                                                        return dc === db ? 1 : 0;
                                                    })
                                                    .transition().style("fill",nColor).duration(500)
                                                    .transition().duration(500);

                                                canvas.selectAll("path")
                                                    .filter(function(dp){
                                                        return (dc.x === dp.source.x && dc.y === dp.source.y) ? 1 : 0;
                                                    })
                                                    .transition().style("stroke", pColor).duration(500);

                                                if(dc.children){ //Check if children exist, if so, recurse the previous function.
                                                    walk(dc, nColor, pColor, canvas, type);
                                                } else {
                                                    if(nColor == '#00ff00'){
                                                        if(scope.treeSelections[type].indexOf(dc.name) == -1){
                                                            scope.treeSelections[type].push(dc.name);
                                                        };
                                                    } else {
                                                        var index = scope.treeSelections[type].indexOf(dc.name);
                                                        scope.treeSelections[type].splice(index, 1);
                                                    }
                                                };
                                            });
                                        };
                                        
                                        var nodeclick = function(d, canvas, type){
                                           

                                            var nColor = (type == 'horizontal')? 'blue' : 'red'; //Initial nonselected color of a node.
                                            var pColor = (type == 'horizontal')? 'blue' : 'red'; //Initial nonselected color of a branch.

                                            var cir = canvas //Selects all the circles representing nodes but only those which were the clicked circle, using datum as the equality filter.
                                                .selectAll("circle")
                                                .filter(function(db){
                                                    return d === db ? 1 : 0;
                                                });

                                            var path = canvas.selectAll("path") //Selects all paths but only those which have the same source coordinates as the node clicked.
                                                .filter(function(dp){
                                                    return (d.x === dp.source.x && d.y === dp.source.y) ? 1 : 0;
                                                });

                                            //Check the state of the clicked node. If 'active' (color is green) swap to inactive colors and pass those colors down to all children and vice versa.
                                            if(cir.style('fill') == '#00ff00'){

                                                cir.style('fill', nColor)
                                                    .transition().duration(500); //Change radius of nonactive nodes.

                                                path.transition().style('stroke', pColor).duration(500);

                                            } else {

                                                nColor = '#00ff00';
                                                pColor = '#00ff00';
                                                cir.style('fill', nColor)
                                                    .transition().duration(500);
                                                path.transition().style('stroke', pColor).duration(500);

                                            };

                                            if(d.children){ //Check if the node clicked is not a leaf. If the node has children, travel down the three updating the colors to indicate selection.
                                                walk(d, nColor, pColor, canvas, type);
                                            } else {
                                                if(nColor == '#00ff00'){ //Check color to see if indicated action is a select/deselect
                                                    if(scope.treeSelections[type].indexOf(d.name) == -1){ //Check if gene already is in the array.
                                                        scope.treeSelections[type].push(d.name)
                                                    }
                                                } else { //Algorithm for removing genes from the list on a deselect.
                                                    var index = scope.treeSelections[type].indexOf(d.name); //Get the index of the given gene in the gene array.
                                                    scope.treeSelections[type].splice(index, 1); //Splice that gene out of the array using its gotten index.
                                                };
                                            };

                                        };
                                        
                                        function horizontalPath(d) {
                                            // Path function builder for TOP
                                            // heatmap tree path attribute

                                            return "M"
                                                    + horizontalTreeX(d.target.x)
                                                    + ","
                                                    + horizontalTreeY(d.target.y)
                                                    + "V"
                                                    + horizontalTreeY(d.source.y)
                                                    + "H"
                                                    + horizontalTreeX(d.source.x);

                                        };
                                        function verticalPath(d) {

                                            // Path function builder for LEFT
                                            // heatmap tree path attribute

                                            return "M"
                                                    + verticalTreeX(d.source.y)
                                                    + ","
                                                    + verticalTreeY(d.source.x)
                                                    + "V"
                                                    + verticalTreeY(d.target.x)
                                                    + "H"
                                                    + verticalTreeX(d.target.y)

                                        };

                                        function cellColor(val) {

                                            var color = {
                                                red : 0,
                                                blue : 0,
                                                green : 0
                                            }

                                            if (scope.selectedColor == "Green-Black-Red") {

                                                if (val <= leftshifter
                                                        .domain()[1]) {
                                                    color.red = leftshifter(val);

                                                } else {

                                                    color.green = rightshifter(val);
                                                };

                                            } else
                                                if (scope.selectedColor == "Red-White-Blue") {

                                                    ls = d3.scale
                                                            .linear()
                                                            .domain(
                                                                    [
                                                                            leftshifter
                                                                                    .domain()[0],
                                                                            leftshifter
                                                                                    .domain()[1]])
                                                            .rangeRound(
                                                                    [
                                                                            leftshifter
                                                                                    .range()[1],
                                                                            leftshifter
                                                                                    .range()[0]]);

                                                    rs = d3.scale
                                                            .linear()
                                                            .domain(
                                                                    [
                                                                            rightshifter
                                                                                    .domain()[0],
                                                                            rightshifter
                                                                                    .domain()[1]])
                                                            .rangeRound(
                                                                    [
                                                                            rightshifter
                                                                                    .range()[1],
                                                                            rightshifter
                                                                                    .range()[0]]);

                                                    if (val <= ls
                                                            .domain()[1]) {
                                                        color.blue = "255";
                                                        color.red = ls(val);
                                                        color.green = ls(val);

                                                    } else {

                                                        color.red = "255";
                                                        color.blue = rs(val);
                                                        color.green = rs(val);

                                                    };

                                                } else { // default
                                                    // Yellow-Black-Blue
                                                    if (val <= leftshifter
                                                            .domain()[1]) {
                                                        color.blue = leftshifter(val);

                                                    } else {
                                                        color.red = rightshifter(val);
                                                        color.green = rightshifter(val);
                                                    };
                                                };

                                            return "rgb(" + color.red
                                                    + ","
                                                    + color.green
                                                    + ","
                                                    + color.blue
                                                    + ")";

                                        }

                                    } // End Link Function

                                }; // End return obj
                            }]);

        });