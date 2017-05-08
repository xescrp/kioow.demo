<div class="padded-xl bordered" >
    <div class="row">          
        <div class="col-md-12">  
			<h5 class="bold mt-zero">Histórico de cambios</h5>
			<hr class="mt-b mb-b" />
			<div class="mt-b" ng-repeat="comment in query.comments">      
				<time class="text-xs text-gray">{{comment.date | date:'medium'}}</time>
				| <span>{{comment.text}}</span> <small class="italic text-gray">{{comment.user}}</small> 
				<hr class="mt-b mb-b" />
            </div>
        </div>
        <div class="col-md-12">
            <div class="input-group">
				<input type="text" ng-model="newComment" class="form-control" placeholder="escribir aquí comentario..." />
				<span class="input-group-btn">
					<button class="btn btn-primary" type="button" ng-click="addComment(newComment)">Guardar</button> 
				</span>   
			</div>
		</div>
    </div>
</div>