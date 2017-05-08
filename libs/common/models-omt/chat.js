module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Chat = new yourttoocore.List('Chats', {
    	map: { name: 'title' },
    	autokey: { path: 'slug', from: 'title', unique: true }
	});

	Chat.add({
	    code: { type: String, required: true, index: true  },
	    title: { type: String },
	    slug: { type: String, index: true },    
	    date: { type: Types.Date, index: true },
	    userquery: { type: Types.Relationship, index: true, initial: true, ref: 'UserQueries' },
        booking: { type: Types.Relationship, index: true, initial: true, ref: 'Bookings' },
        booking2: { type: Types.Relationship, index: true, initial: true, ref: 'Bookings2' },
	    quote: { type: Types.Relationship, index: true, initial: true, ref: 'Quotes' },
	    traveler: { type: Types.Relationship, index: true, initial: true, ref: 'Travelers' },
	    dmc: { type: Types.Relationship, index: true, initial: true, ref: 'DMCs' },	    
	    affiliate: { type: Types.Relationship, index:true, initial: true, ref: 'Affiliate' },
	    status: { type: String, index: true  }
	});
	
	Chat.schema.add(
	    {
	        messages: {
	            type: [{
	                title: { type: String },
	                message: { type: String },
	                slug: { type: String, index: true   },
	                date: { type: Types.Date, index: true },
	                to : {
	                    status: { type: String },
	                    type : {type: String} ,
                        id : { type: String } ,
                        email : { type: String } ,
                        name : { type: String } ,
                        avatarimg : { type: String }
	                },
	                from : {
	                    status: { type: String },
	                    type :  {type: String} ,
                        id : { type: String } ,
                        email : { type: String } ,
                        name : { type: String } ,
                        avatarimg : { type: String }
	                }
	            }]
	        }
	    });
	
	Chat.schema.virtual('chat.detail').get(function () {
	    return this.title;
	});
	
	
	Chat.addPattern('standard meta');
    Chat.defaultColumns = 'title, slug, type, date|20%, state|20%';
    Chat.register(dbname);
}