<div class="row-fluid"> <!-- Start Column Expand Tabs -->
	<div class="span6" id="leftPanel">
		<div class="well">
		
			<div class="row-fluid">
				<button id="expandLeft" class="btn btn-primary pull-right" ng-click="expandLeft()"><i class="icon-chevron-right"></i></button>
				<button id="closeLeft" class="btn btn-primary pull-right" ng-click="expandBoth()"><i class="icon-chevron-left"></i></button>
			</div>
			
			<br>
			
		    <div expression-Panel></div>
		</div>
	</div>

	<div class="span6" id="rightPanel">
		<div class="well">
		
			<div class="row-fluid">
		    	<button class="btn btn-primary pull-left" id="expandRight" ng-click="expandRight()"><i class="icon-chevron-left"></i></button>
				<button class="btn btn-primary pull-left" id="closeRight" ng-click="expandBoth()"><i class="icon-chevron-right"></i></button>
		    </div>
		    
		    <br>
		    
		    <div analysis-Panel></div>
	    </div>
	</div>
</div> <!--End column expand tabs -->