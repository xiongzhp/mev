define([], function(){
	var DashboardItems = function DashboardItems(){
		return function(){			
			var _self = this;
			this["Original Data"] = {				
					name: "Original Data",
					templateUrl: "app/views/dataset/_templates/dataset.heatmap.tpl.html",
					viewModel: "DatasetHeatmapVMFactory"
			};
			this["Histogram"] = {
					name: "Histogram"					
			};
			this["GeneSD"] = {
					name: "GeneSD"					
			};
			this["GeneMAD"] = {
					name: "GeneMAD"					
			};
			this.$add = function(item){
				_self[item.name] = item;
			};
		};
	};
	DashboardItems.$name="DashboardItems";
	DashboardItems.provider="factory";	
	DashboardItems.$inject=[];
	
	return DashboardItems;
});