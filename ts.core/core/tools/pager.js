

var Pager;
var Page = function(){
    return {
        items: [],
        index: 1
    };
}

var itemsperpage = 10;

Pager = function (collection, objecttype, key, itemspage) {
    if (itemspage > 0){
        itemsperpage = itemspage;
    }else{
        itemsperpage = 10;
    }

    //Properties.. initalize
    this.Code = '';
    if (key) {
        this.Code = key;
    }
    
    this.Pages = [];
    this.TotalItems = 0;
    this.CurrentPage = 1;
    this.ObjectType = objecttype;

    
    pager = this;

    pager.AddCollection(collection);
}

Pager.prototype.AddCollection = function (collection) {
    var pageitemscount = 0;
    if (collection) {
        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                //Has pages?
                if (pager.Pages.length == 0) {
                    var pg = new Page();
                    pg.index = 0;

                    pager.Pages.push(pg);

                }

                var item = collection[i];
                pageitemscount++;
                pager.TotalItems++;
                if (pageitemscount <= itemsperpage) {
                    pager.Pages[pager.Pages.length - 1].items.push(item);
                } else {
                    pageitemscount = 1;
                    var pg = new Page();
                    pg.items.push(item);
                    pg.index = pager.Pages.length;
                    pager.Pages.push(pg);
                }
            }
        }
    }
}

Pager.prototype.AddItem = function (item) {
    if (pager.Pages.length == 0) {
        var pg = new Page();
        pg.index = 0;

        this.Pages.push(pg);

    }
    if (pager.Pages[pager.Pages.length - 1].items.length <= itemsperpage) {
        pager.Pages[pager.Pages.length - 1].items.push(item);
    }
    else {
        var pg = new Page();

        pg.items.push(item);
        pager.Pages.push(pg);

        pg.index = pager.Pages.length - 1;
        
    }

}

Pager.prototype.GetPage = function (pageindex) {
    if (pager.Pages != null && pager.Pages.length > 0) {
        pager.CurrentPage = pageindex;
        return pager.Pages[pageindex];
    }
    else {
        return null;
    }
}

Pager.prototype.RemovePage = function (pageindex) {
    if (pager.Pages != null && pager.Pages.length > 0) {
        pager.Pages.splice(pageindex, 1);
    }
}


var pager = new Pager;
module.exports.Page = Page;
module.exports.Pager = Pager;